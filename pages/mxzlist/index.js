var app = getApp();
const util = require("../../utils/util.js");
const utilAata = require("../../utils/dataName.js");
const api = require("../../config/api.js");
Page({
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '明细账', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,   
    mxzData: [
      { name: '资产', children: [{ kmmc: '库存现金(测试)', jf0: '--', df0: '--', qmDf: '--', bqJf: '--', bqDf: '--'}] },
      { name: '负债', children: [{ kmmc: '短期借款(测试)', jf0: '--', df0: '--', qmDf: '--', bqJf: '--', bqDf: '--' }]  },
     
      { name: '权益', children: [{ kmmc: '实收资本(测试)', jf0: '--', df0: '--', qmDf: '--', bqJf: '--', bqDf: '--' }]  },
      { name: '损益', children: [{ kmmc: '主营业务收入(测试)', jf0: '--', df0: '--', qmDf: '--', bqJf: '--', bqDf: '--' }] },
      { name: '成本', children: [{ kmmc: '生产成本(测试)', jf0: '--', df0: '--', qmDf: '--', bqJf: '--', bqDf: '--' }] }],
    status: 0,//当前所在滑块的index
    aheight: 0,
    dataName: {}
  },
  onLoad: function (options) {
    var that = this

    var qySelectByNsrsbhData = JSON.parse(options.qySelectByNsrsbhData)
    that.setData({
      qySelectByNsrsbhData: qySelectByNsrsbhData,
      status: options.kmlx - 1
    })
    // var mxzData = []
    // if (options.mxzData) {
    //   mxzData = JSON.parse(options.mxzData);
    // }
    that.setData({
      dataName: utilAata.DataName
    })
    that.DataQyselectFullmxb()
    // var mxbList = mxzData
    // var mxbZmkName = that.data.dataName.mxbZmkName
    // for (var j in mxbZmkName) {
    //   for (var item in mxbList) {
    //     if (mxbZmkName[j].kmlx == mxbList[item].kmlx) {
    //       mxbZmkName[j].children.push(mxbList[item])
    //     }
    //   }
    // }
    // that.setData({
      // mxzData: mxbZmkName,
    //   status: options.kmlx-1
    // })
    // console.log(options.kmlx)
    // that.setData({
    //   aheight: that.data.mxzData[0].children.length * 400
    // });
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
  // heightReady: function () {
  //   var that = this
  //   let copenCompany = that.data.copenCompany[that.data.currentTab].list
  //   let currentTab = that.data.currentTab
  //   that.setData({
  //     swiper_length: Math.ceil(copenCompany.length / 2)
  //   })
  //   util.get_wxml(`.column-list${currentTab}`, (rects) => {
  //     let sum_heigth = 0
  //     that.setData({
  //       swiper_height: rects[0].height * 2
  //     })
  //     // 就是循环相加每个列表的高度，然后赋值给swiper_height,便可以求出当前tab栏的高度，赋值给swiper 便可以swiper高度自适应
  //   })
  // }
  // 第三步 3.明细账
  DataQyselectFullmxb: function () {
    var that = this
    util.requestGUOran(api.DataQyselectFullmxb, {
      "qyidList": that.data.qySelectByNsrsbhData.qyid,
      "kjnd": that.data.qySelectByNsrsbhData.kjnd,
      "kjqj": that.data.qySelectByNsrsbhData.kjqj
    }, "get").then(function (res) {
      if(res.code!=0)return
      var mxbList = res.result
      var mxbZmkName = that.data.dataName.mxbZmkName
      for (var j in mxbZmkName) {
        for (var item in mxbList) {
          if (mxbZmkName[j].kmlx == mxbList[item].kmlx) {
            mxbZmkName[j].children.push(mxbList[item])
          }
        }
      }
      that.setData({
        "mxzData": mxbZmkName,
      })
      that.setData({
      aheight: that.data.mxzData[0].children.length * 400
    });
    })
  },
  onShareAppMessage: function() {
    return {
      title: '杭州注册公司代理',
      desc: '杭州注册公司代理',
      path: '/pages/gr_index/index'
    }
  },
})