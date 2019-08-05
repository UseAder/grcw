var app = getApp();
Page({
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '发票详情', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,   
    invoiceDetaile: {}
  },
  onLoad: function (options) {
    let item = JSON.parse(options.detaileData);
    this.setData({ invoiceDetaile: item });
  }
  ,
  onShareAppMessage: function () {
    return {
      title: '杭州注册公司代理',
      desc: '杭州注册公司代理',
      path: '/pages/gr_index/index'
    }
  },
})