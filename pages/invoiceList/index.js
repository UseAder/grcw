var app = getApp();
const util = require("../../utils/util.js");
// const utilAata = require("../../utils/dataName.js");
// const api = require("../../config/api.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    invoiceList:[]
  },
  // 发票
  jxfp: function (loadJudge) {
    var qyid = '511130911492956160'
    var that = this
    if (loadJudge){
      util.requestGUOran('http://openapi.yunzhangfang.com/open/api/info/invoice/selectSalesInvoice', {
        "qyidList": qyid,
        "kjnd": 2019,
        "kjqj": 1,
      }, "get").then(function (res) {
        that.setData({
          invoiceList: res.result
        })
      })
    }else{
      util.requestGUOran('http://openapi.yunzhangfang.com/open/api/info/invoice/selectEntryInvoice', {
        "qyidList": qyid,
        "kjnd": 2018,
        "kjqj": 12
      }, "get").then(function (res) {
        that.setData({
          invoiceList: res.result
        })
      })
    }
  },
  goInvoiceDetaile:function(e){
    var Index = e.currentTarget.dataset.index,that=this
    let detaileData = JSON.stringify(that.data.invoiceList[Index]);
    console.log(detaileData)
    // console.log(e)
    app.Tips('/pages/invoiceDetaile/index?detaileData=' + detaileData)
  },
  onLoad:function(options){
    console.log(options)
    var that=this
    if (options.loadJudge=="true"){
      wx.setNavigationBarTitle({ title: '销项发票列表' })
      that.jxfp(true)
    }else{
      that.jxfp(false)
      wx.setNavigationBarTitle({ title: '进项发票列表' })
    }
  }
})