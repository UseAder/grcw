var app = getApp();
const util = require("../../utils/util.js");
// const utilAata = require("../../utils/dataName.js");
const api = require("../../config/api.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '发票列表', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,   
    invoiceList: [{ gfdwmc: '杭州xx有限公司', kprq: "-- -- --", jshj: "--", sehj: "--", jehj: "--" }, { gfdwmc: '杭州xx有限公司', kprq: "-- -- -- ", jshj: "--", sehj: "--", jehj: "--" }],
    qySelectByNsrsbhData: {//企业信息
      nsrsbh: '',
      qyid: '',
      kjnd: '',
      kjqj: ''
    }
  }, 
  onLoad:function(options){
    var that=this
    var qySelectByNsrsbhData = JSON.parse(options.qySelectByNsrsbhData) 
    that.setData({
      qySelectByNsrsbhData: qySelectByNsrsbhData
    })
    if (options.loadJudge=="true"){
      wx.setNavigationBarTitle({ title: '销项发票列表' })
      that.jxfp(true)
    }else{
      that.jxfp(false)
      wx.setNavigationBarTitle({ title: '进项发票列表' })
    }
  },
  // 发票
  jxfp: function (loadJudge) {
    var that = this
    if (loadJudge) {
      util.requestGUOran(api.DataQyselectSalesInvoice, {
        "qyidList": that.data.qySelectByNsrsbhData.qyid,
        "kjnd": that.data.qySelectByNsrsbhData.kjnd,
        "kjqj": that.data.qySelectByNsrsbhData.kjqj
      }, "get").then(function (res) {
        if(res.code!=0)return
        that.setData({
          invoiceList: res.result
        })
      })
    } else {
      util.requestGUOran(api.DataQyselectEntryInvoice, {
        "qyidList": that.data.qySelectByNsrsbhData.qyid,
        "kjnd": that.data.qySelectByNsrsbhData.kjnd,
        "kjqj": that.data.qySelectByNsrsbhData.kjqj
      }, "get").then(function (res) {
        if (res.code != 0) return
        that.setData({
          invoiceList: res.result
        })
      })
    }
  },
  goInvoiceDetaile: function (e) {
    var Index = e.currentTarget.dataset.index, that = this
    let detaileData = JSON.stringify(that.data.invoiceList[Index]);
    app.Tips('/pages/invoiceDetaile/index?detaileData=' + detaileData)
  },

  onShareAppMessage: function () {
    return {
      title: '杭州注册公司代理',
      desc: '杭州注册公司代理',
      path: '/pages/gr_index/index'
    }
  },
})