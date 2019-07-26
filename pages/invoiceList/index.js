var app = getApp();
const util = require("../../utils/util.js");
// const utilAata = require("../../utils/dataName.js");
const api = require("../../config/api.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    invoiceList: [{ gfdwmc: '杭州xx有限公司', kprq: "2019-06-01 00:00:00", jshj: "656", sehj: "876", jehj: "908" }, { gfdwmc: '杭州xx有限公司', kprq: "2019-06-01 00:00:00", jshj: "656", sehj: "876", jehj: "908" }],
    qySelectByNsrsbhData: {//企业信息
      nsrsbh: '',
      qyid: '',
      kjnd: '',
      kjqj: ''
    }
  }, 
  onLoad:function(options){
    console.log(options)
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
    console.log(detaileData)
    // console.log(e)
    app.Tips('/pages/invoiceDetaile/index?detaileData=' + detaileData)
  },
})