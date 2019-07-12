var app = getApp();
const util = require("../../utils/util.js");
const utilAata = require("../../utils/dataName.js");
const api = require("../../config/api.js");
Page({
  data: {
    mxzData: [],
    status: 0,//当前所在滑块的index
    aheight: 0,
    dataName: {}
  },
  onLoad: function (options) {
    var mxzData = []
    if (options.mxzData) {
      mxzData = JSON.parse(options.mxzData);
    }
    var that = this
    that.setData({
      dataName: utilAata.DataName
    })
    var mxbList = mxzData
    var mxbZmkName = that.data.dataName.mxbZmkName
    for (var j in mxbZmkName) {
      for (var item in mxbList) {
        if (mxbZmkName[j].kmlx == mxbList[item].kmlx) {
          mxbZmkName[j].children.push(mxbList[item])
        }
      }
    }
    that.setData({
      mxzData: mxbZmkName,
      status: options.kmlx-1
    })
    console.log(options.kmlx)
    that.setData({
      aheight: that.data.mxzData[0].children.length * 539
    });
  },
  /**
   * 切换类型
  */
  statusClick: function (e) {
    var status = e.currentTarget.dataset.status;
    if (status == this.data.status) return;
    this.setData({ status: status });
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