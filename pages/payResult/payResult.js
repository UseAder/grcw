const pay = require('../../services/pay.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '付款结果', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    status: false,
    order: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      status: options.status,
      order: options.order || ''
    })
  },
  payOrder() {
    let that = this;
    var openid = app.globalData.openid
    var order_sn = that.data.order
    pay.payOrder({
      order_sn: order_sn,
      openid: openid
    }).then(res => {
      that.setData({
        status: 'true'
      });
    }).catch(res => {
      app.Tips({
        title: '支付失败'
      });
    });
  },
  onShareAppMessage: function() {
    return {
      title: '杭州注册公司代理',
      desc: '杭州注册公司代理',
      path: '/pages/gr_index/index'
    }
  },
})