var app = getApp();
const util = require("../../utils/util.js");
let utilAata = require("../../utils/dataName.js");
let utilAata1 = require("../../utils/dataName1.js");
const api = require("../../config/api.js");
import * as echarts from '../../components/ec-canvas/echarts';
var chart0 = null
var chart1 = null
var chart2 = null


function initChart2(canvas, width, height) { //这里多加一个参数
  chart2 = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart1);
  var option = {
    title: {
      show: 'true',
      x: 'center',
      y: 52,
      text: '累计金额',
      subtext: 111,
      animationType: 'scale',

      textStyle: {
        baseline: 'top',
        color: '#717882',
        fontSize: 13,
      },
      subtextStyle: {
        baseline: 'top',
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    backgroundColor: "#ffffff",
    color: ["#7C8DFF", "#FDE683", "#10D98F", "#356AF4", "#FE5153"],
    series: [{
      name: '123',
      type: 'pie',
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      radius: ['55%', '100%'],
      data: [{
        value: 2,
        name: '个人'
      }, {
        value: 8,
        name: '企业'
      }],

    }]
  }

  chart2.setOption(option);
  return chart2;
}

function initChart1(canvas, width, height) { //这里多加一个参数
  chart1 = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart1);
  var option = {
    title: {
      show: 'true',
      x: 'center',
      y: 52,
      text: '累计金额',
      subtext: 111,
      animationType: 'scale',

      textStyle: {
        baseline: 'top',
        color: '#717882',
        fontSize: 13,
      },
      subtextStyle: {
        baseline: 'top',
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    backgroundColor: "#ffffff",
    color: ["#7C8DFF", "#FDE683", "#10D98F", "#356AF4", "#FE5153"],
    series: [{
      name: '123',
      type: 'pie',
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      radius: ['55%', '100%'],
      data: [{
        value: 10,
        name: '流动资产合计'
      }, {
        value: 1,
        name: '非流动资产合计'
      }],

    }]
  }

  chart1.setOption(option);
  return chart1;
}

function initChart0(canvas, width, height) { //这里多加一个参数
  chart0 = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart0);
  var option = {
    title: {
      show: 'true',
      x: 'center',
      y: 52,
      text: '累计金额',
      subtext: 111,
      animationType: 'scale',

      textStyle: {
        baseline: 'top',
        color: '#717882',
        fontSize: 13,
      },
      subtextStyle: {
        baseline: 'top',
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    backgroundColor: "#ffffff",
    color: ["#7C8DFF", "#FDE683", "#10D98F", "#356AF4", "#FE5153"],
    series: [{
      name: '123',
      type: 'pie',
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      radius: ['55%', '100%'],
      data: [{
        value: 10,
        name: '流动资产合计'
      }, {
        value: 1,
        name: '非流动资产合计'
      }],

    }]
  }
  chart0.setOption(option);
  return chart0;
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '数据分析', //导航栏 中间的标题
      color:'#FF9900'
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,   
    viewTop:0,//元素距离顶部的距离
    windowHeight:0,
    loading: false,
    lbkzList: [{
      name: '资产',
      ec: {},
      data: [{
        value: 10,
        name: '流动资产合计'
      }, {
        value: 10,
        name: '非流动资产合计'
      }]
    },
    {
      name: '负债和所有者权益(或股东权益)',
      ec: {},
      data: [{
        value: 10,
        name: '负债合计'
      }, {
        value: 10,
        name: '所有者权益(或股东权益)'
      }]
    },
      {
        name: '社保税额',
        ec: {},
        data: [{
          value: 2,
          name: '个人'
        }, {
          value: 8,
          name: '企业'
        }]
      },
    ],

    qySelectByNsrsbhData: { //企业信息
      nsrsbh: '',
      qyid: '',
      kjnd: '',
      kjqj: ''
    },
    dataTime: {
      start_date: '2018-09',
      end_date: ''
    }, //时间
    colors: ["#7C8DFF", "#FDE683", "#10D98F", "#356AF4", "#FE5153"],
    scrollLeft: 0, //设置横向滚动条位置
    dataName: {}, //*资产负债表表·余额表·利润表  明细账   数据
    laobanData: {}, //*老板看账
    dataWages: [], //*工资  数据
    dataInvoiceList: { //*发票清单 销项发票·进项发票·费用发票  数据
      xxfpData: {},
      jxfpData: {}
    },
    dataNssb: { //*纳税申报 数据
      list: [],
      total: 0.00
    },
    classifyViewId: 1,
    categories: [] //类别
  },
  echartInit0(e) {
    initChart0(e.detail.canvas, e.detail.width, e.detail.height);
  },
  echartInit1(e) {
    console.log(1)
    initChart1(e.detail.canvas, e.detail.width, e.detail.height);
  },
  echartInit2(e) {
    initChart2(e.detail.canvas, e.detail.width, e.detail.height);
  },
  // 日期时间改变 重新搜索数据
  bindDateChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var picker_date = e.detail.value.split('-')
    that.setData({
      'qySelectByNsrsbhData.kjnd': picker_date[0],
      'qySelectByNsrsbhData.kjqj': picker_date[1]
    })
    if (app.globalData.zymConfirm) {
      that.dataList()
    } else {
      app.Tips({
        title: "注：由于您是使用微信登录或未登录，当前展示示例数据",
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    var that=this
    console.log(that.data.lbkzList)
    console.log(that.data.sbTotalPrice)
  },
  /**
 * 生命周期函数--监听页面卸载
 */
  onLoad: function (options) {
    console.log(options)
    // 第一步 获取纳税人识别号

    var that = this
    that.viewTop()
    that.endDate() // 获取当前时间作为时间picker的结束时间
    if (app.globalData.zymConfirm) {
      that.setData({
        'qySelectByNsrsbhData.nsrsbh': wx.getStorageSync('nsrsbh'),
        categories: wx.getStorageSync('dataCategories'),
        pieLoad: options.classifyViewId
      })
    } else {
      that.setData({
        // 'qySelectByNsrsbhData.nsrsbh': '91330103MA27X5AC26',
        'qySelectByNsrsbhData.nsrsbh': '',
        categories: JSON.parse(options.dataCategories),
        pieLoad: options.classifyViewId,
        'dataName': utilAata1.DataName,
        'laobanData': utilAata1.LaobanData,
        'dataNssb.list': utilAata1.DataNssb.list,
        'dataNssb.total': utilAata1.DataNssb.total,
        'dataInvoiceList': utilAata1.DataInvoiceList,
        'dataWages': utilAata1.DataWages
      })
      console.log(that.data.laobanData)
    }
  },
 viewTop:function(){
   var that = this

   wx.getSystemInfo({
     success: (res) => {
       console.log(res)
       that.setData({
         windowHeight: res.windowHeight
       })
        //  this.globalData.windowHeight = res.windowHeight
     }
   })
   const query = wx.createSelectorQuery()
   query.select('#viewTop').boundingClientRect()
   query.selectViewport().scrollOffset()
   query.exec(function (res) {
     console.log(res[0].top)
     that.setData({
       viewTop: res[0].top       // #the-id节点的上边界坐标
     })
   })
 },
 
  //onload中 获取当前时间作为时间picker的结束时间
  endDate: function () {
    var that = this
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth()) : date.getMonth());
    // var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    that.setData({
      'dataTime.end_date': Y + '-' + M,
      'qySelectByNsrsbhData.kjnd': Y,
      'qySelectByNsrsbhData.kjqj': M
    })
  },
  // 第二步 通过纳税人识别号获取企业信息
  dataQySelectByNsrsbh: function () {
    var that = this
    util.requestGUOran(api.DataQySelectByNsrsbh, {
      nsrsbh: that.data.qySelectByNsrsbhData.nsrsbh
    }, "GET").then(function (res) {
      that.setData({
        'qySelectByNsrsbhData.qyid': res.result[0].qyid,
        dataName: utilAata.DataName,
        laobanData: utilAata.LaobanData

      })
      // 第三步 1.通过纳税人识别号获取纳税申报
      that.dataList()
    })
  },
  // 第三步 数据加载集合
  dataList: function () {
    var that = this
    that.DataTaxSelectTaxReportByNsrsbh() //纳税申报表
    that.DataQyzcpzSelectSbxx() //社保信息 暂时不用
    that.Fpmx()
    that.DataQyselectPersonalTaxSheet() //查询个税申报明细 工资
  },
  //canvas 老板看帐
  LaoBanKz: function () {
    var that = this
    var proportion = wx.getStorageSync('proportion')
    var sbTotalPrice = that.data.sbTotalPrice
    
    that.setData({
      'lbkzList[0].data[0].value': Number(that.data.dataName.zcfzZmkName[0].children[0].cols[1]) ,
      'lbkzList[0].data[1].value': Number(that.data.dataName.zcfzZmkName[0].children[1].cols[1]),
        'lbkzList[1].data[0].value': Number(that.data.dataName.zcfzZmkName[1].cols[1]),
          'lbkzList[1].data[1].value': Number(that.data.dataName.zcfzZmkName[2].cols[1]),
          'lbkzList[2].data[0].value': Number(that.data.sbTotalPrice * proportion),
            'lbkzList[2].data[1].value': Number(that.data.sbTotalPrice * (1 - proportion).toFixed(2)),
    })


    chart0.setOption(that.getOption(0));
    chart1.setOption(that.getOption(1));
    chart2.setOption(that.getOption(2));

  },
  getOption: function (i) {
    var totlePrice = 0,
      that = this,
      lbkzList = that.data.lbkzList[i].data
    for (var j in lbkzList) {
      totlePrice += lbkzList[j].value * 1
    }
    var option = {
      title: {
        show: 'true',
        x: 'center',
        y: 52,
        text: '累计金额',
        subtext: totlePrice.toFixed(2),
        animationType: 'scale',

        textStyle: {
          baseline: 'top',
          color: '#717882',
          fontSize: 13,
        },
        subtextStyle: {
          baseline: 'top',
          color: '#000000',
          fontSize: 18,
          fontWeight: 'bold'
        }
      },
      backgroundColor: "#ffffff",
      color: that.data.colors,
      series: [{
        name: '123',
        type: 'pie',
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        },
        radius: ['55%', '100%'],
        data: lbkzList

      }]
    }
    return option;
  },

  // 第三步 1.通过纳税人识别号获取--纳税申报表()
  DataTaxSelectTaxReportByNsrsbh: function () {
    var that = this
    util.requestGUOran(api.DataTaxSelectTaxReportByNsrsbh, {
      "nsrsbh": that.data.qySelectByNsrsbhData.nsrsbh,
      "kjnd": that.data.qySelectByNsrsbhData.kjnd,
      "kjqj": that.data.qySelectByNsrsbhData.kjqj
    }, "get").then(function (res) {
      if (res.result)
        var total = 0;
      for (var i in res.result) {
        if (res.result[i].kkMoney != null) {
          total += Number(res.result[i].kkMoney)
        }
      }
      that.setData({
        'dataNssb.list': res.result,
        'dataNssb.total': total.toFixed(2)
      })
      console.log(that.data.dataNssb)
    })
  },
  // 第三步 2.会计报表"资产负债表", "利润表", "现金流量表"
  DataQyselectFullKjbb: function () {
    var that = this
    util.requestGUOran(api.DataQyselectFullKjbb, {
      "qyidList": [that.data.qySelectByNsrsbhData.qyid],
      "kjnd": that.data.qySelectByNsrsbhData.kjnd,
      "kjqj": that.data.qySelectByNsrsbhData.kjqj,
      "sheetNames": ["资产负债表", "利润表", "现金流量表"]
    }, "post").then(function (res) {
      var zbzList = res.result[0].zbzList[0].rowList
      var zcfzZmkName = that.data.dataName.zcfzZmkName
      for (var j in zcfzZmkName) {
        for (var item in zbzList) {
          if (zcfzZmkName[j].name == zbzList[item].rowName) {
            zcfzZmkName[j].cols = Object.values(zbzList[item].cols)
          }
          for (var c in zcfzZmkName[j].children) {
            if (zcfzZmkName[j].children[c].name == zbzList[item].rowName) {
              zcfzZmkName[j].children[c].cols = Object.values(zbzList[item].cols)
            }
            for (var i in zcfzZmkName[j].children[c].ziChildren) {
              if (zcfzZmkName[j].children[c].ziChildren[i].name == zbzList[item].rowName) {
                zcfzZmkName[j].children[c].ziChildren[i].cols = Object.values(zbzList[item].cols)
                if (zcfzZmkName[j].children[c].ziChildren[i].cols[0] == 0 && zcfzZmkName[j].children[c].ziChildren[i].cols[1] == 0) { }
              }
            }
          }
        }
      }
      var laobanDataZcfz = that.data.laobanData.zcfzZmkName
      for (var j in laobanDataZcfz) {
        for (var item in zbzList) {
          if (laobanDataZcfz[j].name == zbzList[item].rowName) {
            laobanDataZcfz[j].cols = Object.values(zbzList[item].cols)
          }
        }
      }
      var lrbList = res.result[0].zbzList[1].rowList
      var lrbZmkName = that.data.dataName.lrbZmkName
      for (var j in lrbZmkName) {
        for (var item in lrbList) {
          if (lrbZmkName[j].name == lrbList[item].rowName) {
            lrbZmkName[j].cols = Object.values(lrbList[item].cols)
          }
          for (var c in lrbZmkName[j].children) {
            if (lrbZmkName[j].children[c].name == lrbList[item].rowName) {
              lrbZmkName[j].children[c].cols = Object.values(lrbList[item].cols)
            }
            for (var i in lrbZmkName[j].children[c].ziChildren) {
              if (lrbZmkName[j].children[c].ziChildren[i].name == lrbList[item].rowName) {
                lrbZmkName[j].children[c].ziChildren[i].cols = Object.values(lrbList[item].cols)
                if (lrbZmkName[j].children[c].ziChildren[i].cols[0] == 0 && lrbZmkName[j].children[c].ziChildren[i].cols[1] == 0) { }
              }
            }
          }
        }
      }

      var laobanDataLrb = that.data.laobanData.lrbZmkName
      for (var j in laobanDataLrb) {
        for (var item in lrbList) {
          if (laobanDataLrb[j].name == lrbList[item].rowName) {
            laobanDataLrb[j].cols = Object.values(lrbList[item].cols)
          }
        }
      }
      var xjllList = res.result[0].zbzList[2].rowList
      var xjllZmkName = that.data.dataName.xjllZmkName
      for (var j in xjllZmkName) {
        for (var item in xjllList) {
          if (xjllZmkName[j].name == xjllList[item].rowName) {
            xjllZmkName[j].cols = Object.values(xjllList[item].cols)
          }
          for (var c in xjllZmkName[j].children) {
            if (xjllZmkName[j].children[c].name == xjllList[item].rowName) {
              xjllZmkName[j].children[c].cols = Object.values(xjllList[item].cols)
            }
            for (var i in xjllZmkName[j].children[c].ziChildren) {
              if (xjllZmkName[j].children[c].ziChildren[i].name == xjllList[item].rowName) {
                xjllZmkName[j].children[c].ziChildren[i].cols = Object.values(xjllList[item].cols)
                if (xjllZmkName[j].children[c].ziChildren[i].cols[0] == 0 && xjllZmkName[j].children[c].ziChildren[i].cols[1] == 0) { }
              }
            }
          }
        }
      }
      that.setData({
        "dataName.zcfzZmkName": zcfzZmkName,
        "dataName.lrbZmkName": lrbZmkName,
        "dataName.xjllZmkName": xjllZmkName,
        "laobanData.zcfzZmkName": laobanDataZcfz,
        "laobanData.lrbZmkName": laobanDataLrb
      })
      that.LaoBanKz() //老板看账
    })
  },

  // 第三步 4.发票清单
  Fpmx: function () {
    var that = this
    util.requestGUOran(api.DataQyselectSalesInvoice, {
      "qyidList": that.data.qySelectByNsrsbhData.qyid,
      "kjnd": that.data.qySelectByNsrsbhData.kjnd,
      "kjqj": that.data.qySelectByNsrsbhData.kjqj
    }, "get").then(function (res) {
      var dataInvoiceList = res.result
      var jshj = 0,
        sehj = 0
      for (var i in dataInvoiceList) {
        jshj += dataInvoiceList[i].jshj
        sehj += dataInvoiceList[i].sehj
      }
      that.setData({
        'dataInvoiceList.xxfpData.leng': dataInvoiceList.length || 0,
        'dataInvoiceList.xxfpData.jshj': jshj.toFixed(2),
        'dataInvoiceList.xxfpData.sehj': sehj.toFixed(2)
      })
      console.log()
    })
    util.requestGUOran(api.DataQyselectEntryInvoice, {
      "qyidList": that.data.qySelectByNsrsbhData.qyid,
      "kjnd": that.data.qySelectByNsrsbhData.kjnd,
      "kjqj": that.data.qySelectByNsrsbhData.kjqj
    }, "get").then(function (res) {
      var dataInvoiceList = res.result
      var jshj = 0,
        sehj = 0
      for (var i in dataInvoiceList) {
        jshj += dataInvoiceList[i].jshj
        sehj += dataInvoiceList[i].sehj
      }
      that.setData({
        'dataInvoiceList.jxfpData.leng': dataInvoiceList.length || 0,
        'dataInvoiceList.jxfpData.jshj': jshj.toFixed(2),
        'dataInvoiceList.jxfpData.sehj': sehj.toFixed(2)
      })
    })
  },
  // 第三步 5.查询个税申报明细 工资
  DataQyselectPersonalTaxSheet: function () {
    var that = this
    util.requestGUOran(api.DataQyselectPersonalTaxSheet, {
      "qyidList": that.data.qySelectByNsrsbhData.qyid,
      "kjnd": that.data.qySelectByNsrsbhData.kjnd,
      "kjqj": that.data.qySelectByNsrsbhData.kjqj
    }, "get").then(function (res) {
      that.setData({
        dataWages: res.result
      })

    })
  },
  // 社保信息暂时不用
  DataQyzcpzSelectSbxx: function () {
    var that = this
    util.requestGUOran(api.DataQyzcpzSelectSbxx, {
      "qyidList": that.data.qySelectByNsrsbhData.qyid,
      "kjnd": that.data.qySelectByNsrsbhData.kjnd,
      "kjqj": that.data.qySelectByNsrsbhData.kjqj
    }, "get").then(function (res) {
      that.setData({
        sbTotalPrice: res.result[0].zje
      })
      that.DataQyselectFullKjbb() //会计报表
    })
  },
  onReadyWxCharts: function () {

  },
  /**
   * 资产负债表折叠效果
   */
  //点击最外层列表展开收起
  listTap(e) {
    console.log('触发了最外层');
    let Index = e.currentTarget.dataset.parentindex, //获取点击的下标值
      list = this.data.dataName.zcfzZmkName;
    list[Index].show = !list[Index].show || false; //变换其打开、关闭的状态
    if (list[Index].show) { //如果点击后是展开状态，则让其他已经展开的列表变为收起状态
      this.packUp(list, Index);
    }
    this.setData({
      'dataName.zcfzZmkName': list
    });
  },
  //点击里面的子列表展开收起
  listItemTap(e) {
    let parentindex = e.currentTarget.dataset.parentindex, //点击的内层所在的最外层列表下标
      Index = e.currentTarget.dataset.index,
      list = this.data.dataName.zcfzZmkName;
    list[parentindex].children[Index].show = !list[parentindex].children[Index].show || false; //变换其打开、关闭的状态
    if (list[parentindex].children[Index].show) { //如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开
      for (let i = 0, len = list[parentindex].children.length; i < len; i++) {
        if (i != Index) {
          list[parentindex].children[i].show = false;
        }

      }
    }
    this.setData({
      'dataName.zcfzZmkName': list
    });
  },
  /**
   * 利润表折叠效果
   */
  //点击最外层列表展开收起
  listTap1(e) {
    console.log('触发了最外层');
    let Index = e.currentTarget.dataset.parentindex, //获取点击的下标值
      list = this.data.dataName.lrbZmkName;
    list[Index].show = !list[Index].show || false; //变换其打开、关闭的状态
    if (list[Index].show) { //如果点击后是展开状态，则让其他已经展开的列表变为收起状态
      this.packUp(list, Index);
    }
    this.setData({
      'dataName.lrbZmkName': list
    });
  },
  //点击里面的子列表展开收起
  listItemTap1(e) {
    let parentindex = e.currentTarget.dataset.parentindex, //点击的内层所在的最外层列表下标
      Index = e.currentTarget.dataset.index,
      list = this.data.dataName.lrbZmkName;
    list[parentindex].children[Index].show = !list[parentindex].children[Index].show || false; //变换其打开、关闭的状态
    if (list[parentindex].children[Index].show) { //如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开
      for (let i = 0, len = list[parentindex].children.length; i < len; i++) {
        if (i != Index) {
          list[parentindex].children[i].show = false;
        }

      }
    }
    this.setData({
      'dataName.lrbZmkName': list
    });
  },
  /**
   * 现金流量表折叠效果
   */
  //点击最外层列表展开收起
  listTap2(e) {
    console.log('触发了最外层');
    let Index = e.currentTarget.dataset.parentindex, //获取点击的下标值
      list = this.data.dataName.xjllZmkName;
    list[Index].show = !list[Index].show || false; //变换其打开、关闭的状态
    if (list[Index].show) { //如果点击后是展开状态，则让其他已经展开的列表变为收起状态
      this.packUp(list, Index);
    }
    this.setData({
      'dataName.xjllZmkName': list
    });
  },
  //点击里面的子列表展开收起
  listItemTap2(e) {
    let parentindex = e.currentTarget.dataset.parentindex, //点击的内层所在的最外层列表下标
      Index = e.currentTarget.dataset.index,
      list = this.data.dataName.xjllZmkName;
    list[parentindex].children[Index].show = !list[parentindex].children[Index].show || false; //变换其打开、关闭的状态
    if (list[parentindex].children[Index].show) { //如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开
      for (let i = 0, len = list[parentindex].children.length; i < len; i++) {
        if (i != Index) {
          list[parentindex].children[i].show = false;
        }

      }
    }
    this.setData({
      'dataName.xjllZmkName': list
    });
  },
  //让所有的展开项，都变为收起
  packUp(data, index) {
    for (let i = 0, len = data.length; i < len; i++) { //其他最外层列表变为关闭状态
      if (index != i) {
        data[i].show = false;
        if (data[i].children) {
          for (let j = 0; j < data[i].children.length; j++) { //其他所有内层也为关闭状态

            data[i].children[j].show = false;
          }
        }

      }
    }
  },
  swithNav: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    that.setData({
      classifyViewId: index,
      toView: id
    });
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
    // chart0.setOption(that.getOption(0));
    // chart1.setOption(that.getOption(1));
  },
  // 跳转发票清单
  goDataAnalysis: function (e) {
    var loadJudge = e.currentTarget.dataset.loadjudge,
      that = this;
    app.Tips('/pages/invoiceList/index?loadJudge=' + loadJudge + '&qySelectByNsrsbhData=' + JSON.stringify(that.data.qySelectByNsrsbhData))
  },
  // 跳转明细
  goMxzlist: function (e) {
    var that = this,
      kmlx = e.currentTarget.dataset.kmlx
    console.log(kmlx)
    // if (this.data.loading)
    app.Tips('/pages/mxzlist/index?qySelectByNsrsbhData=' + JSON.stringify(that.data.qySelectByNsrsbhData) + '&kmlx=' + kmlx)
  },
  handleCanvarToImg(that) {
    console.log(1)
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 260,
      height: 180,
      canvasId: 'mychart-pie',
      success: function (res) {
        console.log(res)
        that.setData({
          radarImg: res.tempFilePath
        });
      }
    });

  },
  onReady() {
    var that = this,
      currentIndex = that.data.pieLoad
    var Index = 0
    if (app.globalData.zymConfirm) {
      that.dataQySelectByNsrsbh()
    }
    console.log(that.data.categories)
    for (var i in that.data.categories) {
      if (currentIndex == that.data.categories[i].id) {
        Index = i
      }
    }
    that.setData({
      classifyViewId: currentIndex,
    });
    if (Index > 3) {
      that.setData({
        scrollLeft: (Index - 3) * 177.5
      });
    }
  },
  onPageScroll: function (e) {
    if (this.data.classifyViewId == 2) {
      console.log(e)
      this.setData({
        scrollTop: e.scrollTop
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '杭州注册公司代理',
      desc: '杭州注册公司代理',
      path: '/pages/gr_index/index'
    }
  },
})