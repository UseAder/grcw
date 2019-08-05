const pay = require('../../services/pay.js');
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var app = getApp();

Page({
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的订单', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    ImageUrl: api.ImageUrl,

    order: {},
    orderNav: [{
        status: 0,
        type: 5,
        title: '全部'
      },
      {
        status: 1,
        type: 0,
        title: '未付款'
      },
      {
        status: 2,
        type: 10,
        title: '待发货'
      },
      {
        status: 3,
        type: 20,
        title: '已发货'
      },
      {
        status: 4,
        type: 30,
        title: '已完成'
      },

    ],
    status: 0, //当前所在滑块的index
    orderStatus: 5, //订单状态
    aheight: 0,
    orderList: []
  },

  onLoad: function(options) {
    console.log(options)
    this.setData({
      status: options.type
    })
    // 页面初始化 options为页面跳转所带来的参数
  },

  toOrderDetails: function(e) {
    var order_sn = e.currentTarget.dataset.order_sn,
      that = this
    that.setData({
      'order.order_sn': order_sn
    })
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?order=' + JSON.stringify(that.data.order)
    });
  },
  goQuestionnaire: function(e) {
    var order_num = e.currentTarget.dataset.order_num;
    wx.navigateTo({
      url: '/pages/questionnaire/questionnaire?order_num=' + order_num
    });
  },
  /**
   * 取消订单
   * 
   */
  cancelOrder: function(e) {
    var order_sn = e.currentTarget.dataset.order_sn;
    if (!order_sn) return app.Tips({
      title: '缺少订单号无法取消订单'
    });
    var that = this;
    wx.showModal({
      title: '订单取消',
      content: '确定要取消此订单？',
      success: function(res) {
        if (res.confirm) {
          util.request(api.OrderDelete, {
            order_sn: order_sn
          }, "post").then(function(res) {
            if (res.code == 200)
              that.getOrderList()
            app.Tips({
              title: '订单已取消',
              icon: 'success'
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
  confirmOrder: function(e) {
    var order_sn = e.currentTarget.dataset.order_sn;
    if (!order_sn) return app.Tips({
      title: '缺少订单号无法确认订单'
    });
    var that = this;
    wx.showModal({
      title: '确认收货',
      content: '是否确认收货？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.OrderConfirm, {
            order_sn: order_sn
          }, 'post').then(function (res) {
            if (res.code == 200)
              app.Tips({
                title: '已确认收货',
                icon: 'success'
              }, function () {
                that.getOrderList()
              });
          })
        }
      }
    })
   
  },

  /**
   * 查看物流
   */
  viewLogistics: function(e) {
    var order_sn = e.currentTarget.dataset.order_sn;
    if (!order_sn) return app.Tips({
      title: '缺少订单信息无法查看物流'
    });
    wx.navigateTo({
      url: '/pages/logistics/logistics?order_sn=' + order_sn
    })
  },
  /**
   * 再来一单
   */
  anotherOrder: function(e) {
    var order_id = e.currentTarget.dataset.order_id;
    if (!order_id) return app.Tips({
      title: '缺少订单号无法查看订单详情'
    });
    wx.navigateTo({
      url: '/pages/order_details/index?order_id=' + order_id
    })
  },

  /**
   * 去订单详情  立即付款
   */
  payOrder(e) {
    console.log(e)
    console.log(app.globalData.openid)

    let that = this
    var order_sn = e.currentTarget.dataset.order_sn;
    var openid = app.globalData.openid
    pay.payOrder({
      order_sn: order_sn,
      openid: openid
    }).then(res => {
      app.Tips({
        title: '付款成功',
        icon: 'success'
      }, function() {
        that.getOrderList()
      });
    }).catch(res => {
      app.Tips({
        title: '支付失败'
      });
    });
  },


  // goOrderDetails: function (e) {
  //   var order_id = e.currentTarget.dataset.order_id;
  //   if (!order_id) return app.Tips({ title: '缺少订单号无法查看订单详情' });
  //   wx.navigateTo({ url: '/pages/order_details/index?order_id=' + order_id })
  // },
  /**
   * 切换类型
   */
  statusClick: function(e) {

    var orderStatus = e.currentTarget.dataset.type;
    var status = e.currentTarget.dataset.status;
    if (status == this.data.status) return;
    this.setData({
      status: status,
      orderStatus: orderStatus
    });
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  //切换
  swiperTab: function(e) {
    let that = this;
    var orderNav = that.data.orderNav
    that.setData({
      status: e.detail.current,
      orderStatus: orderNav[e.detail.current].type
    })
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  /**
   * 获取订单列表
   */
  getOrderList: function() {
    var that = this,
      uid = that.data.uid;
    util.request(api.GetOrder, {
      uid: uid
    }, 'post').then(function(res) {
      that.setData({
        'orderList': res
      });
      that.setData({
        aheight: that.data.orderList.length * 700
      });
    })
  },
  /**
   * 删除订单
   */
  delOrder: function(e) {
    var order_id = e.currentTarget.dataset.order_id;
    var index = e.currentTarget.dataset.index,
      that = this;
    app.baseGet(app.U({
      c: 'user_api',
      a: 'user_remove_order',
      q: {
        uni: order_id
      }
    }), function(res) {
      that.data.orderList.splice(index, 1);
      that.setData({
        orderList: that.data.orderList,
        'orderData.unpaid_count': that.data.orderData.unpaid_count - 1
      });
      return app.Tips({
        title: '删除成功',
        icon: 'success'
      });
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      uid: app.globalData.uid
    })
    this.getOrderList();
  },
  onShareAppMessage: function () {
    return {
      title: '杭州注册公司代理',
      desc: '杭州注册公司代理',
      path: '/pages/gr_index/index'
    }
  },
})