var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '物流信息', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,   
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
      title: '杭州注册公司代理',
      desc: '杭州注册公司代理',
      path: '/pages/gr_index/index'
    }
  },
})