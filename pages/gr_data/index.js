var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const wxh = require('../../utils/wxh.js');

Page({

  data: {
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '果然数据', //导航栏 中间的标题
      color: 'none'
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    ImageUrl: api.ImageUrl,
    imgHeight: 0,
    logindialog: false,
    phone: '', //手机号
    corporateName: '', //公司名称
    code: '', //验证码
    yzmyz: '', //判断是否与输入验证码验证
    codename: '获取验证码',
    disabled: false, //验证码发送状态
    zymConfirm: false, //验证成功状态
    information: {
      title: "欢迎光临",
      company: "果然财务集团财税平台",
      phone: "17706407642"
    },
    qyInformation: { //该企业信息
      login_time: "",
      nsrsbh: "",
      out_time: "",
      phone: "",
      // poster: []
    },
    dataCategories: [], //类别
  },
  phoneCall: function(e) {
    if (e.currentTarget.dataset.replyPhone == '17600402407') {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.replyPhone,
        success: function() {
          console.log("成功拨打电话")
        },
      })
    }

  },
  // 打开登录弹框

  open_login: function() {
    this.setData({
      logindialog: true
    });
  },
  // 关闭登录弹框
  close_login: function() {
    this.setData({
      logindialog: false
    });
  },
  delete_login: function() {
    var that = this
    wx.showModal({
      title: '系统提醒',
      content: '是否退出登录？',
      success: function(res) {
        if (res.confirm) {
          that.setData({
            qyInformation: {},
            corporateName: '', //公司名称
            phoneText: '',
            codename: '获取验证码',
            code: '', //验证码
            zymConfirm: false,
          })
          that.DeleteLoginData()
          that.DemoDemo()

        } else if (res.cancel) {
          return false;
        }
      }
    })
  },
  toDataAnalysis: function(e) {
    var that = this
    var currentIndex = e.currentTarget.dataset.currentindex; //
    var classifyViewId = e.currentTarget.dataset.classifyviewid; //获取当前长按图片下标
    var dataCategories = that.data.dataCategories; //获取当前长按图片下标
    wx.navigateTo({
      url: '/pages/dataAnalysis/index?classifyViewId=' + classifyViewId + '&currentIndex=' + currentIndex + '&dataCategories=' + JSON.stringify(dataCategories),
    })
  },
  DeleteLoginData: function(e) {
    var that = this
    app.Tips({
      title: "注：由于您是使用微信登录或未登录，当前展示示例数据",
    });
    app.globalData.zymConfirm = false
    wx.setStorageSync('zymConfirm', false);
    that.setData({
      logindialog: true,
    })
    if (that.data.interval) {
      clearInterval(that.data.interval);
      that.setData({
        interval: null
      });
    }

  },
  // inputAccount: function (e) {
  //   console.log(e.detail.value)
  // this.setData({
  //   account: e.detail.value
  // });
  // },
  // 获取输入框公司名称 
  getCorporateName: function(e) {
    this.setData({
      corporateName: e.detail.value
    })
  },
  // 获取输入框验证码
  getCodeValue: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取验证码接口
  obtainYzm: function() {
    var that = this;
    var corporateName = that.data.corporateName;
    util.request(api.LoginPhone, {
      company: corporateName
    }, "POST").then(function(res) {
      console.log(res)
      if (res.code == 300) {
        app.Tips({
          title: res.msg
        });
      } else if (res.code == 200) {
        app.Tips({
          title: ' 验 证 码 已 发 送 至 手 机 ' +
            res.data.phone.substring(0, 3) + '****' + res.data.phone.substring(7),
        });
        that.setData({
          phone: res.data.phone,
          phoneText: '正在向手机' + res.data.phone.substring(0, 3) + '****' + res.data.phone.substring(7) + '发送验证消息...'
        })
        util.request(api.LoginMessage, {
          phone: res.data.phone
        }, "POST").then(function(res) {
          that.setData({
            yzmyz: res.yzm
          })
          var num = 60;
          var timer = setInterval(function() {
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
  save: function() {
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
      phone: that.data.phone,
      company: that.data.corporateName
    }, "POST").then(function(res) {
      app.Tips({
        title: res.msg,
      });
      if (res.code == 200) {
        app.Tips({
          title: res.msg,
        });
        that.setData({
          logindialog: false,
          'qyInformation.nsrsbh': res.data.nsrsbh,
          'qyInformation.out_time': res.data.out_time,
          'qyInformation.phone': res.data.phone,
          'qyInformation.corporateName': res.data.company,
          // 'qyInformation.poster': res.data.poster,
          'dataCategories': res.data.type,
          'zymConfirm': true
        })

        app.globalData.zymConfirm = true
        wx.setStorageSync('dataCategories', that.data.dataCategories);
        wx.setStorageSync('nsrsbh', that.data.qyInformation.nsrsbh);
        wx.setStorageSync('zymConfirm', app.globalData.zymConfirm);
        wx.setStorageSync('corporateName', res.data.company);
        wx.setStorageSync('out_time', res.data.out_time);
        wxh.time(7200, that)
      }
    })
  },

  DemoDemo: function() {
    var that = this
    util.request(api.DemoDemo, {}, "get").then(function(res) {
      if (res.code == 200) {
        wx.setStorageSync('proportion', res.data.proportion.personal)
        that.setData({
          poster_footer: res.data.poster_footer,
          poster_header: res.data.poster_header,
          information: res.data.information
        })
        if (app.globalData.zymConfirm) {
          that.setData({
            dataCategories: wx.getStorageSync('dataCategories')
          })
        } else {
          that.setData({
            dataCategories: res.data.type,
          })
        }
      }
    })
  },
  onLoad: function() {
    var that = this
    const query = wx.createSelectorQuery()
    query.select('#gr_data_image').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res) {
      console.log(res[0])
      that.setData({
        imgHeight: res[0].height // #the-id节点的上边界坐标
      })
    })
    that.DemoDemo()
  },
  onReady: function() {

  },
  onShow: function() {
    var that = this
    that.setData({
      zymConfirm: app.globalData.zymConfirm
    })
    if (app.globalData.zymConfirm) {
      that.setData({
        'qyInformation.corporateName': wx.getStorageSync('corporateName'),
        'qyInformation.nsrsbh': wx.getStorageSync('nsrsbh'),
        dataCategories: wx.getStorageSync('dataCategories')
      })
    } else {
      that.setData({
        logindialog: true,
      })
    }

  },
  onShareAppMessage: function() {}

})