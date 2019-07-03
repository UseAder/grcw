var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var e = require("../../lib/wxParse/wxParse.js")
Page({
  data: {
    detai: {},
    news: {},
    id: ''
  },
  onLoad: function(option) {
    var that = this
    if (!option.id || option.id == undefined) return app.Tips({
      title: '缺少参数无法展示详情!'
    });
    else
      that.setData({
        id: option.id
      })
    that.pageNewsDetails()
  },
  pageNewsDetails: function() {
    var that = this
    util.request(api.PageNewsDetails, {id:that.data.id}, "POST").then(function(res) {
      var news=res
      news.add_time=util.formatTimeTwo(news.add_time, 'Y/M/D h:m:s')
      that.setData({
        news: news
      })
     
      e.wxParse("newsDetail", "html", res.content, that);
    })

  },
  onShareAppMessage: function() {
    return {
      title: "快报详情",
      desc: "快报详情",
      path: "/pages/newsdetail/news"
    };
  }
});