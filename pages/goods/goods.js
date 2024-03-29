var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var t = require("../../lib/wxParse/wxParse.js")
var user = require('../../services/user.js');

Page({

  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '商品详情', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,   
    ImageUrl: api.ImageUrl,

    userInfo: {
      username: app.globalData.userInfo.username,
      photo: app.globalData.userInfo.photo
    },
    id: 0,
    goods: {},
    gallery: [],
    cartCount: 0,
    number: 1,
    openAttr: !1,
    checkedSpecText: "请选择规格数量",
    noCollectImage: "/images/icon_collect.png",
    hasCollectImage: "/images/icon_collect_checked.png",
  },

  getGoodsInfo: function (e) {
    var that = this
    util.request(api.GoodsDetails, {
      id: that.data.id
    }, "POST").then(function (res) {
     var goods=res
      goods.goods_img=goods.goods_img.split(',')
      console.log(goods.goods_img)
      that.setData({
        goods: goods
      }), t.wxParse("goodsDetail", "html", res.goods_parameter, that);

    })
  },
  cutNumber: function () {
    this.setData({
      number: this.data.number - 1 > 1 ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    this.setData({
      number: this.data.number + 1
    });
  },
  switchAttrPop: function () {
    0 == this.data.openAttr && this.setData({
      openAttr: !this.data.openAttr
    });
  },
  // 关闭弹框
  closePopupTap: function () {
    var t = this;
    this.setData({
      openAttr: !t.data.openAttr
    });
  },
  // 下单
  subOrder: function () {
    var that = this
    if (0 == that.data.openAttr)
      that.setData({
        openAttr: !that.data.openAttr
      });
    else {
      that.setData({
        openAttr: false
      });
      if (!that.data.id) return app.Tips({
        title: '缺少信息无法购买'
      })
      if (!that.data.number) return app.Tips({
        title: '缺少信息无法购买'
      })
      var option = ''
      option = "id=" + that.data.id + "&uid=" + wx.getStorageSync('uid') + "&number=" + that.data.number
      console.log(option)
      wx.navigateTo({
        url: "/pages/shopping/checkout?" + option
      });
    }
  },
  // 跳转购物车
  openCartPage: function () {
    wx.navigateTo({
      url: "/pages/cart/cart"
    });
  },
  getCartLength: function () {
    var that=this
   
    util.request(api.Cart, { uid: wx.getStorageSync('uid'), page: 1 }, 'POST').then(function          (res) {
      that.setData({
        cartCount: 0
      });
      if (!res.data) return
        that.setData({
          cartCount: res.data.length||0
        });
    })
  },
  // 加入购物车
  addToCart: function () {
    var that = this;
    if (0 == that.data.openAttr)
      that.setData({
        openAttr: !that.data.openAttr
      });
    else {
      that.setData({
        openAttr: false
      });
      var saveData = {}
      saveData.uid = wx.getStorageSync('uid')
      saveData.number = that.data.number
      saveData.gid = that.data.id
      console.log(saveData)
      util.request(api.CartAdd, saveData, "POST").then(function (res) {
        if(res.code==200){
          app.Tips({
            title: '添加购物车成功',
            icon: 'success'
          });
          that.getCartLength()
        }else{
          app.Tips({
            title: res.msg,
            icon: 'none'
          });
        }
       

      })
    }
  },
  onLoad: function (option) {
    this.setData({
      id: parseInt(option.id)
    });
    if (!option.id || option.id == '') return app.Tips({
      title: '缺少查询信息无法查看'
    });
    this.getGoodsInfo()
  },
  /**
   * 调用微信登录
   */
  userInfoHandler: function () {
    var that = this
    user.loginByWeixin().then((res) => {
      console.log(res.data)
      if (res.code == 200) {
        that.setData({
          userInfo: res.data
        })
      }
    })
  },
  onShow:function(){
    var that = this
    if (app.globalData.openid) {
      that.setData({
        userInfo: app.globalData.userInfo,
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.employIdCallback = openid => {
        if (openid != '') {
          console.log(1.3)
          that.setData({
            userInfo: app.globalData.userInfo,
          })
        }
      }
    }
    that.getCartLength()
  }, onShareAppMessage: function () { }

});