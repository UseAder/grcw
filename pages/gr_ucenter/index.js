var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var user = require('../../services/user.js');
Page({
  data: {
    userInfo: wx.getStorageSync('userInfo') || {},
    logindialog: !1,
    account: "",
    password: "",
    type: 0,
    name: "Hi,游客"
  },
  onLoad: function (a) {
    // console.log(n.globalData);
  },

  /**
 * 调用微信登录
 */
  userInfoHandler: function () {
    var that = this
    user.loginByWeixin().then((res) => {
      console.log(res)
      if (res.code == 200) {
        that.setData({
          userInfo: res.data
        })
      }
    })
  },
  // 我的订单
  myorder: function () {
    wx.getStorageSync('userInfo') || null ? wx.navigateTo({
      url: "/pages/order/order"
    }) : app.Tips({ title: '请点击授权', icon: 'error' });
  },
  returnGoods: function (a) {

  },
  // 地址管理
  addressmanager: function (a) {
    wx.getStorageSync('userInfo') || null ? wx.navigateTo({
      url: "/pages/address-select/index"
    }) : app.Tips({ title: '请点击授权', icon: 'error' });
  },
  closePopupTap: function () {

  },
  // 购物车
  tax: function (a) {
    wx.getStorageSync('userInfo') || null ? wx.navigateTo({
      url: "/pages/cart/cart"
    }) : app.Tips({ title: '请点击授权', icon: 'error' });
  },
  trademark: function (a) {

  },
  close_login: function (a) {
    // this.setData({
    //   logindialog: !1
    // });
  },
  company_login: function (t) {
    // var o = this;
    // return a.checkEmpty(o.data.account) ? a.checkEmpty(o.data.password) ? void this.verfiy() : wx.showModal({
    //   content: "密码不能为空"
    // }) : wx.showModal({
    //   content: "账号不能为空"
    // });
  },
  inputAccount: function (a) {
    // this.setData({
    //   account: a.detail.value
    // });
  },
  inputPassword: function (a) {
    // this.setData({
    //   password: a.detail.value
    // });
  },
  verfiy: function () {

  },
  call: function () {
    // wx.navigateTo({
    //   url: "../../../pages/brand/brand"
    // });
  },

});

