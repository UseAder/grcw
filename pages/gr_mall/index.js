const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    // 
  },
})