const pay = require('../../services/pay.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: false,
    order:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      status: options.status,
      order: options.order||''
    })
  },
  payOrder() {
    let that = this;
    var openid = app.globalData.openid
    var order_sn = that.data.order
    pay.payOrder({ order_sn: order_sn, openid: openid }).then(res => {
      that.setData({
        status: 'true'
      });
    }).catch(res => {
      app.Tips({
        title: '支付失败' });
    });
  },
 onShareAppMessage: function () {
    return {
      title: '果然财务',
      desc: '果然财务',
      path: '/pages/index/index'
    }
  },
})