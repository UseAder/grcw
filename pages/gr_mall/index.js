const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyViewId: null,
    categories: [
      { id: 10, name: "初夏专区" },
      { id: 14, name: "爆款专区" },
      { id: 15, name: "推荐零食" }
    ], //类别
    goodsList: [{
      id: 10,
      name: '初夏专区',
      goods_url: 'https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg',
      goods: [{
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/c957d6a5729702620e21a864f11d2cfc.png",
        id: '1101'
      },
      {
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/c957d6a5729702620e21a864f11d2cfc.png",
        id: '1102'
      }
      ]
    },
    {
      id: 14,
      name: '爆款专区',
      goods_url: 'https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg',
      goods: [{
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg",
        id: '1111'
      },
      {
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg",
        id: '1112'
      }, {
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg",
        id: '1112'
      }, {
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg",
        id: '1112'
      }, {
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg",
        id: '1112'
      }, {
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg",
        id: '1112'
      }, {
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg",
        id: '1112'
      }
      ]
    },
    {
      id: 15,
      name: '爆款专区',
      goods_url: 'https://cdn.it120.cc/apifactory/2017/12/27/dbad940953c793e6122979d98b7f6fbd.jpg_m',
      goods: [{
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg",
        id: '1111'
      },
      {
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg",
        id: '1112'
      }, {
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg",
        id: '1112'
      }, {
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/c957d6a5729702620e21a864f11d2cfc.png",
        id: '1101'
      }, {
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg",
        id: '1112'
      }, {
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg",
        id: '1112'
      }, {
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg",
        id: '1112'
      }, {
        name: '冰淇凌',
        pic: "https://cdn.it120.cc/apifactory/2018/01/01/678707df7459d61a05dff8517692d027.jpg",
        id: '1112'
      }
      ]
    },
    ]
  },
  tapClassify: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    var id = e.target.dataset.id;
    that.setData({
      classifyViewId: index,
      toView: id
    });
  },
  getCatalog: function () {
    let that = this;
    // wx.showLoading({
    //   title: '加载中...',
    // });
    util.request(api.GoodsClassify).then(function (res) {
      that.setData({
        categories: res.data.cateinfo,
        goodsList: res.data.goodslist
      });
      // wx.hideLoading();
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCatalog();
    var that = this
    that.setData({
      classifyViewId: 10,
    })
  },
})