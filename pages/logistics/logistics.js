var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    logisticData:{//物流信息查询条件
      order_sn: "",//订单id
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
    that.setData({
      "logisticData.order_sn": options.order_sn,
    });
    that.logisticList()
  },
  logisticList: function () {
    var that = this
    util.request(api.OrderLogistic, { order_sn: that.data.logisticData.order_sn},'POST').then(function (res) {
      // if(!res.code==200)return
      that.setData({
        track: res.data,
        'logistic.State': res.data[0].status || '',
        'logistic.ShipperCode': res.com || '',
        'logistic.LogisticCode': res.nu|| '',
        
      })
      // if (res.data.orderinfo){
      //   that.setData({
      //     'logistic.goods_num': res.data.orderinfo.goods_num || '',
      //     'logistic.goods_pic': res.data.orderinfo.goods_pic || '',
      //   })
      // }
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