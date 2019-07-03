var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({
  data: {
    orderNav: [
      { status: 0, type: 5, title: '全部' },
      { status: 1, type: 0, title: '待付款' },
      { status: 2, type: 1, title: '待发货' },
      { status: 3, type: 2, title: '已发货' },
      { status: 4, type: 3, title: '已完成' },
    ],
    loading: false,//是否加载中
    loadend: false,//是否加载完毕
    loadTitle: '加载更多',//提示语
    status: 0,//当前所在滑块的index
    orderStatus: 5,//订单状态
    aheight: 0,
    orderList: []
  },

  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
  },

  toGoodsDetails: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/goods-details/index?id=' + id });
  },
  goQuestionnaire: function (e) {
    var order_num = e.currentTarget.dataset.order_num;
    wx.navigateTo({ url: '/pages/questionnaire/questionnaire?order_num=' + order_num });
  },
  /**
   * 取消订单
   * 
  */
  cancelOrder: function (e) {
    var order_id = e.currentTarget.dataset.order_id;
    if (!order_id) return app.Tips({ title: '缺少订单号无法取消订单' });
    var that = this;
    util.request(api.OrderDelete + order_id, {}, "DELETE"
    ).then(function (res) {
      if (res.code == 200)
        app.Tips({ title: '删除成功', icon: 'success' }, function () {
          that.getOrderList()
        });
    })
  },
  /**
   * 确认收货
   * 
  */
  confirmOrder: function (e) {
    var order_id = e.currentTarget.dataset.order_id;
    if (!order_id) return app.Tips({ title: '缺少订单号无法确认订单' });
    var that = this;
    util.request(api.OrderConfirm, { id: order_id }
    ).then(function (res) {
      if (res.code == 200)
        app.Tips({ title: '已确认收货', icon: 'success' }, function () {
          that.getOrderList()
        });
    })
  },

  /**
   * 查看物流
  */
  viewLogistics: function (e) {
    var order_id = e.currentTarget.dataset.order_id;
    if (!order_id) return app.Tips({ title: '缺少订单号无法查看订单详情' });
    wx.navigateTo({ url: '/pages/order_details/index?order_id=' + order_id })
  },
  /**
  * 再来一单
 */
  anotherOrder: function (e) {
    var order_id = e.currentTarget.dataset.order_id;
    if (!order_id) return app.Tips({ title: '缺少订单号无法查看订单详情' });
    wx.navigateTo({ url: '/pages/order_details/index?order_id=' + order_id })
  },

  /**
   * 去订单详情  立即付款
  */
  goOrderDetails: function (e) {
    var order_id = e.currentTarget.dataset.order_id;
    if (!order_id) return app.Tips({ title: '缺少订单号无法查看订单详情' });
    wx.navigateTo({ url: '/pages/order_details/index?order_id=' + order_id })
  },
  /**
   * 切换类型
  */
  statusClick: function (e) {

    var orderStatus = e.currentTarget.dataset.type;
    var status = e.currentTarget.dataset.status;
    if (status == this.data.status) return;
    this.setData({ status: status, orderStatus: orderStatus });
    // this.setData({ orderStatus: status, loadend: false, page: 1, orderList: [] });
    // this.getOrderList();
  },
  //切换
  swiperTab: function (e) {
    let that = this;
    var orderNav = that.data.orderNav
    that.setData({
      status: e.detail.current,
      orderStatus: orderNav[e.detail.current].type
    })
  },
  /**
   * 获取订单列表
  */
  getOrderList: function () {
    var that = this;
    util.request(api.GetOrder, { uid: wx.getStorageSync('uid')}
    ).then(function (res) {
      if (res.code == 200) {
        that.setData({
          orderList: res.data
        });
        that.setData({
          aheight: that.data.orderList.length * 539
        });
      }
    })
  },

  /**
   * 删除订单
  */
  delOrder: function (e) {
    var order_id = e.currentTarget.dataset.order_id;
    var index = e.currentTarget.dataset.index, that = this;
    app.baseGet(app.U({ c: 'user_api', a: 'user_remove_order', q: { uni: order_id } }), function (res) {
      that.data.orderList.splice(index, 1);
      that.setData({ orderList: that.data.orderList, 'orderData.unpaid_count': that.data.orderData.unpaid_count - 1 });
      return app.Tips({ title: '删除成功', icon: 'success' });
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderList();
  }
})