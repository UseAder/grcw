var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../services/user.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  userInfoHandler() {
    var that=this
    wx.showLoading({
      title: '登录中...',
    })
    user.loginByWeixin().then(res => {
      if (res.code == 200) {
        that.setData({
          userInfo: wx.getStorageSync('userInfo')
        })
        wx.navigateBack()
      }
      wx.hideLoading();
     
    }).catch((err) => {
      wx.hideLoading();

      console.log(err)
    });
  },
})