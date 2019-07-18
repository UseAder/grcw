var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    logisticData:{//物流信息查询条件
      "oid": "",//订单id
      "order_loginstics": "",//需要查询的快递公司编号
      "loginstics_num": ""//需要查询的快递单号
    },
    logistic:{
      State:'',
      ShipperCode:'',
      LogisticCode:'',
      goods_num:'',
      goods_pic: '',
    },
    imgUrl: "/images/20190505171229.png ",
    track: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
      // 页面初始化 
    // that.setData({
    //   "logisticData.oid": options.oid,
    //   "logisticData.loginstics_num": options.loginstics_num,
    //   "logisticData.order_loginstics": options.order_loginstics
    // });
    // that.logisticList()
  },
  logisticList: function () {
    var that = this
    util.request(api.OrderLogistic, { order_sn:'B717479761633422'},'POST').then(function (res) {
      if(!res.code==200)return
      that.setData({
        track: res.data.logistic.Traces.reverse(),
        'logistic.State': res.data.logistic.State || '',
        'logistic.ShipperCode': res.data.logistic.ShipperCode || '',
        'logistic.LogisticCode': res.data.logistic.LogisticCode || '',
        
      })
      if (res.data.orderinfo){
        that.setData({
          'logistic.goods_num': res.data.orderinfo.goods_num || '',
          'logistic.goods_pic': res.data.orderinfo.goods_pic || '',
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '酒宫御品',
      desc: '酒宫御品',
      path: '/pages/index/index'
    }
  },
})