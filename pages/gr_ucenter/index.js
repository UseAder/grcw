var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var user = require('../../services/user.js');
Page({
  data: {
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '个人中心', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,   
    userInfo: {
      username: app.globalData.userInfo.username,
      photo: app.globalData.userInfo.photo
    },
  },
  onShow: function() {
    var that = this
    if (app.globalData.openid) {
      that.setData({
        userInfo: app.globalData.userInfo,
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.employIdCallback = openid => {
        if (openid != '') {
          console.log(1.3)
          that.setData({
            userInfo: app.globalData.userInfo,
          })
        }
      }
    }
  },
  /**
   * 调用微信登录
   */
  userInfoHandler: function() {
    var that = this
    user.loginByWeixin().then((res) => {
      console.log(res.data)
      if (res.code == 200) {
        that.setData({
          userInfo: res.data
        })
      }
    })
  },
  // 我的订单
  myorder: function() {
    wx.navigateTo({
      url: "/pages/order/order"
    })
  },
  // 地址管理
  addressmanager: function(a) {
    wx.navigateTo({
      url: "/pages/address-select/index"
    })
  },
  // 消息模板
  goxiaoximoban: function () {
    wx.navigateTo({
      url: '/pages/xiaoximoban/xiaoximoban'
    })
  },
  // 购物车
  tax: function(a) {
    wx.navigateTo({
      url: "/pages/cart/cart"
    })
  },
  call: function () {
    wx.navigateTo({
      url: "/pages/brand/brand"
    });
  },
   onShareAppMessage: function () { }

})