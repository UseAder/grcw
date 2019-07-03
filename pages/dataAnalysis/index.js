var app = getApp();
const util = require("../../utils/util.js");
const utilAata = require("../../utils/dataName.js");
const api = require("../../config/api.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataName: {}, //划分主模块
    classifyViewId: 1,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      classifyViewId: options.id,
      dataName: utilAata.DataName
    })
    var that = this
    // util.requestGUOran(api.DataQySelectByNsrsbh, {
    //     pageNum: 2,
    //     pageSize: 10
    //   }, "GET"

    // ).then(function(res) {
    //   console.log(res)

    // })
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
  swithNav: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    console.log(e)
    that.setData({
      classifyViewId: index,
      toView: id
    });
  },


  // 会计报表
  ceshi2: function() {
    var that = this
    console.log(1)
    util.requestGUOran(api.DataQyselectFullKjbb, {
      "qyidList": ["511130911492956160"],
      "kjnd": 2018,
      "kjqj": 11,
      "sheetNames": ["资产负债表", "利润表"]
    }, "post").then(function(res) {
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
                if (zcfzZmkName[j].children[c].ziChildren[i].cols[0] == 0 && zcfzZmkName[j].children[c].ziChildren[i].cols[1] == 0) {
                }
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
                if (lrbZmkName[j].children[c].ziChildren[i].cols[0] == 0 && lrbZmkName[j].children[c].ziChildren[i].cols[1] == 0) {
                }
              }
            }
          }
        }
      }
      console.log(lrbZmkName)
      that.setData({
        "dataName.zcfzZmkName": zcfzZmkName,
        "dataName.lrbZmkName": lrbZmkName
      })
    })
  },
  onShow: function() {
    var that = this;
    that.ceshi2()
  },

})