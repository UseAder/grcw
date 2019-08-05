var app = getApp();
const api = require('../../config/api.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saveDisplay: true,
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '果然财务', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,  

    userInfo: {
      nickname: '',//联系人
      phone: '', //手机号
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getUserInfo();
  },
  // 获取输入框公司名称 
  getCorporateName: function (e) {
    var that = this

    that.setData({
      corporateName: e.detail.value
    })
    if (that.data.corporateName) {
      if (/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.data.corporatePhone)) {
        that.setData({
          saveDisplay: false
        })

      }
    } else {
      that.setData({
        saveDisplay: true
      })
    }
  },

  getCorporatePhone: function (e) {
    var that = this
    that.setData({
      corporatePhone: e.detail.value
    })
    if (/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.data.corporatePhone)) {

      if (that.data.corporateName) {
        that.setData({
          saveDisplay: false
        })
      }
    } else {
      that.setData({
        saveDisplay: true
      })
    }
  },
  /**
   * 提交修改
   */
  formSubmit: function (e) {
    var that = this,
      // value = e.detail.value,
      formId = e.detail.formId;
    if (!that.data.corporateName) return app.Tips({
      title: '请输入您要查询的公司'
    });
    if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.data.corporatePhone))
      return app.Tips({
        title: '请输入正确的手机号码'
      });
    that.handleContact()
  },
  // 提交公司数据消息，打开客服
  handleContact() {
    var that = this;
    var save = {}
    save.uid = app.globalData.uid
    save.company = that.data.corporateName
    save.phone = that.data.corporatePhone

    util.request(api.MessageAdd, save, 'POST').then(function (res) {
      if (res.code == 200) {
        app.Tips({
          title: '商机提交成功'
        });
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '杭州注册公司代理',
      desc: '杭州注册公司代理',
      path: '/pages/gr_index/index'
    }
  },

})