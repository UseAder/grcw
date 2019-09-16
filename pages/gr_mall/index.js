

const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var app = getApp();
var user = require('../../services/user.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '商城', //导航栏 中间的标题
    },
    userInfo: {
      username: app.globalData.userInfo.username,
      photo: app.globalData.userInfo.photo
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,   
    windowHeight:0,
    ImageUrl: api.ImageUrl,
    classifyViewId: 0,
    categories: [], //类别
    goodsList: []
  },


  tapClassify: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    var id = e.target.dataset.id;
    that.setData({
      classifyViewId: index,
      toView: id
    });
  },
  toDetailsTap: function (t) {
    var a = t.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/goods/goods?id=" + a
    });
  },
  getCatalog: function (options) {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    util.request(api.GoodsGoods).then(function (res) {
      that.setData({
        categories: res,
        classifyViewId: res[0].function_id,
        goodsList: res
      });
      if (options.id) {
        that.setData({
          classifyViewId: options.id
        })
      }
      wx.hideLoading();
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCatalog(options);
    var that = this
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })
    // 
  }, onShareAppMessage: function () { },
  /**
  * 调用微信登录
  */
  userInfoHandler: function () {
    var that = this
    user.loginByWeixin().then((res) => {
      if (res.code == 200) {
        that.setData({
          userInfo: res.data
        })
      }
    })
  },
  onShow: function () {
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
          that.setData({
            userInfo: app.globalData.userInfo,
          })
        }
      }
    }
  },

})