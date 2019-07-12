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
      kjnd:'',
      kjqj:''
    },
    dataTime:{
      start_date: '2018-09',
      end_date: '',
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

  //初始化图表
  initChart: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
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
      'qySelectByNsrsbhData.nsrsbh': options.nsrsbh || '91330103MA27X5AC26'
    })
    that.endDate()// 获取当前时间作为时间picker的结束时间
 // 第二步 通过纳税人识别号获取企业信息91330109MA2CDE721G
    if (that.data.qySelectByNsrsbhData.nsrsbh){
      that.dataQySelectByNsrsbh()
    }
    // that.onReadyWxCharts()
  },
  //onload中 获取当前时间作为时间picker的结束时间
  endDate:function(){
    var that=this
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth()) : date.getMonth() );
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
    }, "GET"
    ).then(function (res) {
      if (res.code == 0)
      that.setData({
        'qySelectByNsrsbhData.qyid': res.result[0].qyid,
          dataName: utilAata.DataName
      })
      // 第三步 1.通过纳税人识别号获取纳税申报
      that.dataList()
    })
  },
  // 第三步 数据加载集合
  dataList: function () {
    var that=this
    that.DataTaxSelectTaxReportByNsrsbh()//纳税申报表
    that.DataQyselectFullKjbb()//会计报表
    that.DataQyselectFullmxb()//明细表
    that.Fpmx()
    that.DataQyselectPersonalTaxSheet()//查询个税申报明细 工资
    // that.DataQyzcpzSelectSbxx() //社保信息 暂时不用
  },
  //canvas 老板看帐
    LaoBanKz:function(){
      var that=this
      console.log(that.data.dataName.zcfzZmkName[1].cols[1])

      console.log(that.data.dataName.zcfzZmkName[0].children[0].cols[1])
      console.log(that.data.dataName.zcfzZmkName[0].children[1].cols[1])

      console.log(that.data.lbkzList[0].data[1])
      that.setData({
        'lbkzList[0].data[0].value': that.data.dataName.zcfzZmkName[0].children[0].cols[1],             'lbkzList[0].data[1].value': that.data.dataName.zcfzZmkName[0].children[1].cols[1],
        'lbkzList[1].data[0].value': that.data.dataName.zcfzZmkName[1].cols[1], 
        'lbkzList[1].data[1].value': that.data.dataName.zcfzZmkName[2].cols[1],
      })
      console.log(that.data.ec.onInit())
      // ec: {
      //   onInit: initChart
      // },
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
      // console.log(that.data.dataName.zcfzZmkName[0].children[0].cols)
    
      that.setData({
        "dataName.zcfzZmkName": zcfzZmkName,
        "dataName.lrbZmkName": lrbZmkName,
        "dataName.xjllZmkName": xjllZmkName
      })

      that.LaoBanKz()//老板看账
    })
  },
   // 第三步 3.明细账
  DataQyselectFullmxb: function () {
    var that = this
    util.requestGUOran(api.DataQyselectFullmxb, {
      "qyidList": that.data.qySelectByNsrsbhData.qyid,
      "kjnd": that.data.qySelectByNsrsbhData.kjnd,
      "kjqj": that.data.qySelectByNsrsbhData.kjqj
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
  },
  // 跳转发票清单
  goDataAnalysis: function (e) {
    var loadJudge = e.currentTarget.dataset.loadjudge,that=this;
    app.Tips('/pages/invoiceList/index?loadJudge=' + loadJudge + '&qySelectByNsrsbhData=' + JSON.stringify(that.data.qySelectByNsrsbhData) )
  },
  // 跳转明细
  goMxzlist: function (e) {
    var kmlx = e.currentTarget.dataset.kmlx
    app.Tips('/pages/mxzlist/index?mxzData=' + JSON.stringify(this.data.dataName.mxbZmkName) + '&kmlx=' + kmlx)
  }
})