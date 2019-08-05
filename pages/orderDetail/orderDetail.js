var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();
Page({
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '订单详情', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,  
    ImageUrl: api.ImageUrl,
 
    orderInfo: {},
    orderGoods: [],
    handleOption: {},
    status: 0,
    tempdesc: "",
    order: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      order: JSON.parse(options.order) || {}
    })

    this.getOrderDetail();
  },
  getOrderDetail() {
    let that = this;
    util.request(api.OrderDetail, {
      order_sn: that.data.order.order_sn,
    },'POST').then(function (res) {
        console.log(res.data);
      var orderInfo = res.order
      orderInfo.update_time=util.formatTimeTwo(orderInfo.update_time,'Y-M-D h:m:s')
      // if (orderInfo.order_status==0){

      // }
        that.setData({
          orderInfo: orderInfo,
          orderGoods: res.goods,
        });      
    });
  },
  /**
   * 取消订单
   * 
  */
  cancelOrder: function (e) {
    var order_sn = e.currentTarget.dataset.order_sn;
    if (!order_sn) return app.Tips({ title: '缺少订单号无法取消订单' });
    var that = this;
    wx.showModal({
      title: '订单取消',
      content: '确定要取消此订单？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.OrderDelete, { order_sn: order_sn }, "post"
          ).then(function (res) {
            if (res.code == 200)
              app.Tips({ title: '订单已取消', icon: 'success' }, function () {
                that.getOrderList()
              });
          })
        }
      }
    })

  },
  /**
   * 确认收货
   * 
  */
  confirmOrder: function (e) {
    var order_sn = e.currentTarget.dataset.order_sn;
    if (!order_sn) return app.Tips({ title: '缺少订单号无法确认订单' });
    var that = this;
    util.request(api.OrderConfirm, { order_sn: order_sn }, 'post'
    ).then(function (res) {
      if (res.code == 200)
        app.Tips({ title: '已确认收货', icon: 'success' }, function () {
          that.getOrderList()
        });
    })
  },
  /**
     * 去订单详情  立即付款
    */
  payOrder(e) {
    console.log()
    let that = this
    var order_sn = that.data.order.order_sn;
    var openid = app.globalData.openid
    pay.payOrder({ order_sn: order_sn, openid: openid }).then(res => {
      app.Tips({ title: '付款成功', icon: 'success' }, function () {
        that.getOrderList()
      });
    }).catch(res => {
      app.Tips({
        title: '支付失败'
      });
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