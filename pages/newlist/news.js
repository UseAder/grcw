var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '果然快报', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,   
    ImageUrl: api.ImageUrl,
    newsList: [],
    goodsList: [],
    id: null,
    pid: 10,
    page: 1,
    loading: false,//是否加载中
    loadend: false,//是否加载完毕
    loadTitle: '我也是有底线的',//提示语
  },
  onLoad: function () {
    // 页面初始化 
    this.pageNewsPage()
  },
  //分类商品
  // pageNews: function () {
  //   var that = this;
  //   util.request(api.PageNews)
  //     .then(function (res) {
  //       that.setData({
  //         newsList: res,
  //       });
  //     });
  // },
  //分类商品
  pageNewsPage: function () {
    var that = this;
    if (that.data.loadend) return;
    if (that.data.loading) return;
    that.setData({
      loading: true, loadTitle: '加载更多'
    })
    util.request(api.PageNewsPage, { page: that.data.page},'POST')
      .then(function (res) {
        var list = res|| [];
        var loadend = list == ''
        that.data.newsList = util.SplitArray(list, that.data.newsList);
        that.setData({
          newsList: that.data.newsList,
            page: that.data.page + 1,
            loadend: loadend,
            loading: false,
            loadTitle: loadend ? "我也是有底线的" : '加载更多',
        });
      });
  },
  switchCate: function (event) {
    var that = this;
    var id = event.currentTarget.dataset.id
    if (that.data.id == id) {
      return false;
    }
    that.setData({
      page: 1,
      loadend: false,
      loading: false,
      goodsList: [],
      id: id
    });
    that.goodsGoods();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.pageNewsPage();
  },
  onShareAppMessage: function () {

  },
})