var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionsData: {},
    total: null, //合计
    checkedAddress: {},
    checkedGoodsList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      optionsData: options
    })

  },
  onShow: function() {
    var optionsData = this.data.optionsData
    if (optionsData.cid) {
      var cid = JSON.parse(optionsData.cid)
      this.orderIndexAll(cid)
    }
    if (optionsData.number) {
      this.orderDan(optionsData)
    }
  },
  // 选择地址
  selectAddress() {
    //选择该收货地址
    wx.navigateTo({
      url: "/pages/address-select/index"
    });
  },
  // 单个商品
  orderDan: function(options) {
    var that = this
    util.request(api.OrderDan, options, "POST").then(function(res) {
      var goods = [{
        ad_address: res.goods_brand,
        goods_discount: res.goods_discount,
        goods_brand: res.goods_brand,
        goods_name: res.goods_name,
        cart_num: res.number
      }]
      var checkedAddress = res.address
      that.setData({
        checkedGoodsList: goods,
        total: res.total,
        checkedAddress: res.address
      })
    })
  },
  // 批量商品
  orderIndexAll: function(cidArray) {
    var that = this
    util.request(api.OrderIndexAll, {
      cid: cidArray,
      uid: wx.getStorageSync('uid'),
    }, "POST").then(function(res) {
      that.setData({
        checkedGoodsList: res.goods,
        total: res.total,
        checkedAddress: res.address
      })
    })
  },
  // 立即购买
  submitOrder: function() {
    var optionsData = this.data.optionsData
     
    if (!this.data.checkedAddress) return app.Tips({ title: '请选择收货地址' });
    if (optionsData.cid) {
      var cid = JSON.parse(optionsData.cid)
      this.cartPay(cid)
    }
    if (optionsData.number) {
      this.buynowPay(optionsData)
    }

  },
  //立即购买支付
  buynowPay: function(optionsData) {
    var that = this
    var grderAllGmData = {
      gid: optionsData.id,
      number: optionsData.number,
      uid: wx.getStorageSync('uid'),
      address: that.data.checkedAddress.ad_id,
      openid: 'oZ6JV47et--iTC6pMr0QdU0q2g7Q',
    }
    wx.navigateTo({
      url: '/pages/cart/cart',
    })
    // util.request(api.OrderGm, grderAllGmData, "POST").then(function(res) {
    //   // that.requestPayment(res);
    // })
  },
  //购物车支付
  cartPay: function(optionsData) {
    var that = this
    var grderAllGmData = {
      cid: optionsData,
      uid: wx.getStorageSync('uid'),
      address: that.data.checkedAddress.ad_id,
      openid: 'oZ6JV47et--iTC6pMr0QdU0q2g7Q',
    }
 
    util.request(api.OrderAllGm, grderAllGmData, "POST").then(function(res) {
      that.requestPayment(res);
    })
  },
  //申请支付
  requestPayment: function(obj) {
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function(res) {
        wx.navigateBack({ delta: 1 });
      },
      'fail': function(res) {
        wx.navigateBack({ delta: 1 });
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})