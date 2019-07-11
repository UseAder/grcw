var app = getApp();
const util = require("../../utils/util.js");
const utilAata = require("../../utils/dataName.js");
const api = require("../../config/api.js");
import * as echarts from '../../components/ec-canvas/echarts';
function initChart(canvas, width, height, data) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    title: {
      show: 'true',
      x: 'center',
      y: height / 2 - 23,
      text: '累计金额',
      subtext: '25444.22',
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
    color: ["#7C8DFF", "#FDE683"],
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
      data: data
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    qySelectByNsrsbhData:{//企业信息
      nsrsbh: '',
      qyid:'',
      kjnd:'2018',
      kjqj:'5'
    },
    dataTime:{
      start_date: '2015-09',
      end_date: '2019-09',
    },
    ec: {
      onInit: initChart
    },
    colors: ["#7C8DFF", "#FDE683", "#10D98F", "#356AF4", "#FE5153"],
    lbkzList: [{
      name: '资产', data: [{
        value: 55,
        name: '流动资产合计'
      }, {
        value: 20,
        name: '非流动资产合计'
      }]
    },
    { name: '负债和所有者权益(或股东权益)', data: [{ value: 10, name: '负债合计' }, { value: 4, name: '所有者权益(或股东权益)' }] },

    { name: '纳税', data: [{ value: 10 }, { value: 7 }] },
    ],
    chartsWidth: 0,
    dataName: {}, //资产负债表表·余额表·利润表  明细账
    dataInvoiceList: { //发票清单 销项发票·进项发票·费用发票 
      xxfpData: {},
      jxfpData: {}
    },
    dataWages: [], //工资
    dataNssb: {
      list: [],
      total: 0.00
    },

    classifyViewId: 1,
    jxfbList: [],
    categories: [{
      name: "老板看账",
      id: 1,
      pic: "/images/data/data1.png"
    }, {
      name: "纳税申报",
      id: 2,
      pic: "/images/data/data2.png"
    }, {
      name: "现金流量",
      id: 3,
      pic: "/images/data/data3.png"
    }, {
      name: "资产负债",
      id: 4,
      pic: "/images/data/data4.png"
    }, {
      name: "明细账",
      id: 5,
      pic: "/images/data/data5.png"
    }, {
      name: "利润率",
      id: 6,
      pic: "/images/data/data6.png"
    }, {
      name: "发票清单",
      id: 7,
      pic: "/images/data/data7.png"
    }, {
      name: "工资",
      id: 8,
      pic: "/images/data/data8.png"
    }], //类别
    dataQyselectFullKjbb: [], //会计报表
  },
  // 日期时间改变 重新搜索数据
  bindDateChange: function (e) {
    var that=this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var picker_date = e.detail.value.split('-')
    that.setData({
      'qySelectByNsrsbhData.kjnd': picker_date[0],
      'qySelectByNsrsbhData.kjqj': picker_date[1]
    })
    that.dataList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 第一步 获取纳税人识别号
    var that = this
    that.setData({
      'qySelectByNsrsbhData.nsrsbh': options.nsrsbh ||'91330103MA27X5AC26'
    })
 // 第二步 通过纳税人识别号获取企业信息
    if (that.data.qySelectByNsrsbhData.nsrsbh){
      that.dataQySelectByNsrsbh()
    }
    // this.setData({
    //   dataName: utilAata.DataName
    // })
    // that.onReadyWxCharts()
  },

  // 第二步 通过纳税人识别号获取企业信息
  dataQySelectByNsrsbh: function () {
    var that = this
    util.requestGUOran(api.DataQySelectByNsrsbh, {
      nsrsbh: that.data.qySelectByNsrsbhData.nsrsbh
    }, "GET"
    ).then(function (res) {
      if (res.code == 0)
      that.setData({
        'qySelectByNsrsbhData.qyid': res.result[0].qyid
      })
      // 第三步 1.通过纳税人识别号获取纳税申报
      that.dataList()
    })
  },
  // 第三步 数据加载集合
  dataList: function () {
    var that=this
    that.DataTaxSelectTaxReportByNsrsbh()
  },
  // 第三步 1.通过纳税人识别号获取纳税申报
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
        'dataNssb.total': total
      })

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
    console.log(list[parentindex].children, Index);
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
    console.log(list[parentindex].children, Index);
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
    console.log(list[parentindex].children, Index);
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
    console.log(data)
    for (let i = 0, len = data.length; i < len; i++) { //其他最外层列表变为关闭状态
      if (index != i) {
        data[i].show = false;
        console.log(data[i].children)
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
    console.log(id)
    that.setData({
      classifyViewId: index,
      toView: id
    });
  },


  // 会计报表
  ceshi2: function () {
    var that = this
    console.log(1)
    util.requestGUOran(api.DataQyselectFullKjbb, {
      "qyidList": ["511130911492956160"],
      "kjnd": 2018,
      "kjqj": 11,
      "sheetNames": ["资产负债表", "利润表", "现金流量表", '纳税申报']
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
      console.log(xjllZmkName)
      that.setData({
        "dataName.zcfzZmkName": zcfzZmkName,
        "dataName.lrbZmkName": lrbZmkName,
        "dataName.xjllZmkName": xjllZmkName
      })
    })
  },

  mxz: function () {
    var that = this
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
      that.setData({
        "dataName.mxbZmkName": mxbZmkName,
      })
    })
  },


  mxz1: function () {
    var that = this
    util.requestGUOran('http://openapi.yunzhangfang.com/open/api/info/kmye/selectBalanceSheet', {
      "qyidList": ["511130911492956160"],
      "kjnd": 2019,
      "kjqj": 1
    }, "get").then(function (res) {

    })
  },
  // 发票
  jxfp: function () {
    var qyid = '511130911492956160'
    var that = this
    util.requestGUOran('http://openapi.yunzhangfang.com/open/api/info/invoice/selectSalesInvoice', {
      "qyidList": qyid,
      "kjnd": 2019,
      "kjqj": 1,
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
        'dataInvoiceList.xxfpData.jshj': jshj,
        'dataInvoiceList.xxfpData.sehj': sehj
      })
    })
    util.requestGUOran('http://openapi.yunzhangfang.com/open/api/info/invoice/selectEntryInvoice', {
      "qyidList": qyid,
      "kjnd": 2018,
      "kjqj": 12
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
        'dataInvoiceList.jxfpData.jshj': jshj,
        'dataInvoiceList.jxfpData.sehj': sehj
      })
    })
  },
  goDataAnalysis: function (e) {
    var loadJudge = e.currentTarget.dataset.loadjudge
    console.log(loadJudge)
    console.log(e)
    app.Tips('/pages/invoiceList/index?loadJudge=' + loadJudge)
  },
  goMxzlist: function (e) {
    app.Tips('/pages/mxzlist/index?mxzData=' + JSON.stringify(this.data.dataName.mxbZmkName))
  },

  gz: function () {
    var that = this
    util.requestGUOran('http://openapi.yunzhangfang.com/open/api/info/gssb/selectPersonalTaxSheet', {
      // "qyidList":'511130911492956160',
      // "qyidList": '510820220202606592',
      // "qyidList": '519553111833096192',
      "qyidList": '510835766759436288',
      "kjnd": 2018,
      "kjqj": 11
    }, "get").then(function (res) {
      that.setData({
        dataWages: res.result
      })

    })
  },

  sbxx: function () {
    var that = this
    util.requestGUOran('http://openapi.yunzhangfang.com/open/api/info/zcpz/selectSbxx', {
      // "qyidList":'511130911492956160',
      // "qyidList": '510820220202606592',
      // "qyidList": '519553111833096192',
      "qyidList": '510820220202606592',
      "kjnd": 2018,
      "kjqj": 9
    }, "get").then(function (res) {
      // that.setData({
      //   dataWages: res.result
      // })

    })
  },
  onShow: function () {
    // var that = this;
    // that.ceshi2()
    // that.mxz()
    // that.jxfp()
    // that.gz()
    // that.nssb()
    // that.sbxx()
  },
  // dataQyzcpzSelectSbxx: function () {
  //   var that = this
  //   util.requestGUOran(api.DataQyzcpzSelectSbxx, {
  //     "qyidList": "511130911492956160",
  //     "kjnd": 2019,
  //     "kjqj": 1
  //   }, "get").then(function (res) {
  //     console.log(res)

  //   })
  // },
})