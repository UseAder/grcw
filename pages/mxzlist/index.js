var app = getApp();
const util = require("../../utils/util.js");
const utilAata = require("../../utils/dataName.js");
const api = require("../../config/api.js");
Page({
  data: {
    mxzData: [],
    loading: false,//是否加载中
    loadend: false,//是否加载完毕
    loadTitle: '加载更多',//提示语
    status: 0,//当前所在滑块的index
    aheight: 0,
    orderList: [],
    dataName:{}
  },

  onLoad: function (options) {
    // var mxzData=[]
    // if (options.mxzData) {
    //   mxzData = JSON.parse(options.mxzData);
    // }

    var that = this
    this.setData({
      // classifyViewId: options.id,
      dataName: utilAata.DataName
    })
    util.requestGUOran(api.DataQyselectFullmxb, {
      "qyidList": "511130911492956160",
      "kjnd": 2019,
      "kjqj": 1
    }, "get").then(function (res) {
      var mxbList = res.result
      var mxbZmkName = that.data.dataName.mxbZmkName
      for (var j in mxbZmkName) {
        for (var item in mxbList) {
          if (mxbZmkName[j].kmlx == mxbList[item].kmlx) {
            mxbZmkName[j].children.push(mxbList[item])
          }
        }
      }
      console.log(mxbZmkName)

      that.setData({
        mxzData: mxbZmkName

        // "dataName.mxbZmkName": mxbZmkName,
      })
      that.setData({
        aheight: that.data.mxzData[0].children.length * 539
      });
    // 页面
    // this.setData({
    });
    // console.log(this.data.mxzData)
    // var that=this
    // that.setData({
    //   aheight: that.data.mxzData.length * 539
    // });
    // 页面初始化 options为页面跳转所带来的参数
  },
  /**
   * 切换类型
  */
  statusClick: function (e) {
    var status = e.currentTarget.dataset.status;
    if (status == this.data.status) return;
    this.setData({ status: status});
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  //切换
  swiperTab: function (e) {
    let that = this;
    var orderNav = that.data.orderNav
    that.setData({
      status: e.detail.current,
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
  getOrderList: function () {
    var that = this;
    util.request(api.GetOrder, { type: 5 }
    ).then(function (res) {
      if (res.code == 200) {
        that.setData({
          orderList: res.data
        });
       
      }
    })
  },



})