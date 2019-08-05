var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../services/user.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '用户授权', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,   
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
  onShareAppMessage: function () {
    return {
      title: '杭州注册公司代理',
      desc: '杭州注册公司代理',
      path: '/pages/gr_index/index'
    }
  },
})