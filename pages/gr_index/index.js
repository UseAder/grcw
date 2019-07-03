var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    swiper_height: 0,//swper自适应高度
    swiper_length: 0,//swper自适应条数
    banner: [],
    brand: [],// 商标
    channel: [],// 首页menu
    news: [],// 首页news
    copenCompany: [],// 首页 小切换
  },
  /*
  **首页menu
  */
  getIndexData: function () {
    var that = this;
    util.request(api.IndexUrl).then(function (res) {
      that.setData({
        banner: res.chart,
        channel: res.function,
        copenCompany: res.type,
        news: res.news,
        brand: res.brand
      })
      that.heightReady()
    })
  },
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.heightReady()
  },
  swithNav: function (e) {
    var a = e.target.dataset.current;
    if (this.data.currentTab == a) return !1;
    this.setData({
      currentTab: a
    });
    this.heightReady()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (a) {
    var that = this;
    // 判断是否已经授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
            }
          })
        } else {//未授权，跳到授权页面
          // wx.navigateTo({
          //   url: '/pages/authorize/authorize',//授权页面
          // })
        }
      }
    })
    this.getIndexData()

    
  },
  heightReady: function () {
    var that = this
    let copenCompany = that.data.copenCompany[that.data.currentTab].list
    let currentTab = that.data.currentTab
    that.setData({
      swiper_length: Math.ceil(copenCompany.length / 2)
    })
    util.get_wxml(`.column-list${currentTab}`, (rects) => {
      let sum_heigth = 0
      that.setData({
        swiper_height: rects[0].height * 2
      })
      // 就是循环相加每个列表的高度，然后赋值给swiper_height,便可以求出当前tab栏的高度，赋值给swiper 便可以swiper高度自适应
    })
  }
})