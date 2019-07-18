var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const wxh = require('../../utils/wxh.js');

Page({
  data: {
    logindialog: false,

    phone: '', //手机号
    corporateName: '杭州优狐科技',//公司名称
    code: '', //验证码
    yzmyz: '',//判断是否与输入验证码验证
    codename: '获取验证码',
    disabled: false, //验证码发送状态
    zymConfirm: false,//验证成功状态
    qyInformation: {//该企业信息
      login_time: "",
      nsrsbh: "1460652757116",
      out_time: "",
      phone: "",
      poster: []
    },

    dataCategories: [{
      function_title: "老板看账",
      function_id: 6,
      function_url: "/images/data/data1.png"
    }, {
      function_title: "纳税申报",
        function_id: 7,
      function_url: "/images/data/data2.png"
    }, {
      function_title: "现金流量",
        function_id: 8,
      function_url: "/images/data/data3.png"
    }, {
      function_title: "资产负债",
        function_id: 9,
      function_url: "/images/data/data4.png"
    }, {
      function_title: "明细账",
        function_id: 10,
      function_url: "/images/data/data5.png"
    }, {
      function_title: "利润率",
        function_id: 11,
      function_url: "/images/data/data6.png"
    }, {
      function_title: "发票清单",
        function_id: 12,
      function_url: "/images/data/data7.png"
    }, {
      function_title: "工资",
        function_id: 13,
      function_url: "/images/data/data8.png"
    },], //类别
  },
    // 打开登录弹框

  open_login: function () {
    this.setData({
      logindialog: true
    });
  },
  // 关闭登录弹框
  close_login: function () {
    this.setData({
      logindialog: false
    });
  },
  // inputAccount: function (e) {
  //   console.log(e.detail.value)
    // this.setData({
    //   account: e.detail.value
    // });
  // },
  // 获取输入框公司名称 
  getCorporateName: function (e) {
    this.setData({
      corporateName: e.detail.value
    })
  },
  // 获取输入框验证码
  getCodeValue: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取验证码接口
  obtainYzm: function () {
    var that = this;
    var corporateName = that.data.corporateName;
    util.request(api.LoginPhone, { company: corporateName }, "POST"
    ).then(function (res) {
      console.log(res)
      if (res.code == 300) {
        app.Tips({
          title: res.msg
        });
      } else if (res.code == 200) {
        app.Tips({
          title: ' 验 证 码 已 发 送 至 手 机 '
            + res.data,
        });
        that.setData({
          phone: res.data
        })
        util.request(api.LoginMessage, { phone: res.data }, "POST"
        ).then(function (res) {
          that.setData({
            yzmyz: res.yzm
          })
          var num = 60;
          var timer = setInterval(function () {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              that.setData({
                codename: '重新发送',
                disabled: false
              })
            } else {
              that.setData({
                disabled: true,
                codename: num + "s"
              })
            }
          }, 1000)
        })
      }
    })
  },
  save: function () {
    var that = this;
    if (that.data.corporateName == "") {
      wx.showToast({
        title: '公司名称不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.code == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.code != that.data.yzmyz) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    util.request(api.PhoneLogin, {
      yzm: Number(that.data.code),
      phone: that.data.phone
    }, "POST"
    ).then(function (res) {
      app.Tips({
        title: res.msg,
      });
      if (res.code == 200) {
        app.Tips({
          title: res.msg,
        });
        that.setData({
          // 'qyInformation.login_time': res.data.login_time,
          logindialog: false,

          'qyInformation.nsrsbh': res.data.nsrsbh,
          'qyInformation.out_time': res.data.out_time,
          'qyInformation.phone': res.data.phone,
          'qyInformation.poster': res.data.poster,
          'dataCategories': res.data.type,
          'zymConfirm': true
        })
        var data = new Date().getTime() + 72000000
        app.globalData.zymConfirm = true
        wx.setStorageSync('dataCategories', that.data.dataCategories);
        wx.setStorageSync('nsrsbh', that.data.qyInformation.nsrsbh);
        wx.setStorageSync('zymConfirm', app.globalData.zymConfirm );
        wxh.time(data,null)
      }
    })
  },
  // 导航头部字体。背景 改变
  zymConfirmNav: function () {
    // if (!app.globalData.zymConfirm)
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#ECC935',
        animation: {
          duration: 30,
          timingFunc: 'linear'
        }
      });
      
    // else
    //   wx.setNavigationBarColor({
    //     frontColor: '#000000',
    //     backgroundColor: '#ffffff',
    //     animation: {
    //       duration: 30,
    //       timingFunc: 'linear'
    //     }
    //   });
  },
  onLoad: function () {
    var that = this
    
    },
  onShow: function () {
    var that = this
    that.setData({
      zymConfirm: app.globalData.zymConfirm
    })
    if (app.globalData.zymConfirm){
      that.setData({
        dataCategories: wx.getStorageSync('dataCategories')
      })
    }
    that.zymConfirmNav()
  }
})