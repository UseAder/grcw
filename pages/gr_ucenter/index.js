var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var user = require('../../services/user.js');
Page({
  data: {
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
  }
})