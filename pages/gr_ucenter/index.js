var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');


Page({
  data: {
    userInfo: {},
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
   loginByWeixin: function() {
    let code = null;
    return new Promise(function (resolve, reject) {
      return util.login().then((res) => {
        code = res.code;
        return util.getUserInfo();
      }).then((userInfo) => {
        //登录远程服务器
        util.request('http://192.168.124.15/Really/public/index.php/api/Login/', {
          code: code
        }, 'POST').then(res => {
            var user={}
          user.openid = res.openid
          user.username = userInfo.userInfo.nickName
          user.photo = userInfo.userInfo.avatarUrl
          //微信用户登录
          util.request('http://192.168.124.15/Really/public/index.php/api/Login/login', user, 'POST').then(res => {

            

          })

          // if (res.errno === 0) {
            //存储用户信息
            // wx.setStorageSync('userInfo', res.data.userInfo);
            // wx.setStorageSync('token', res.data.token);
            // wx.setStorageSync('userId', res.data.userId);
            // resolve(res);
          // } else {
          //   reject(res);
          // }
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      })
    });
  }
,
  onReady: function () { },
  onShow: function () {
    // var a = wx.getStorageSync("userInfo"), t = wx.getStorageSync("token"), o = wx.getStorageSync("name");
    // a && t && (n.globalData.userInfo = a, n.globalData.token = t), this.setData({
    //   userInfo: n.globalData.userInfo,
    //   name: a.nickName
    // }), null != o & "" != o && void 0 != o && this.setData({
    //   name: o
    // });
  },
  onHide: function () { },
  onUnload: function () { },
  userInfoHandler: function () {
    // var a = this;
    // o.loginByWeixin().then(function (t) {
    //   a.setData({
    //     userInfo: t.data.userInfo,
    //     name: t.data.userInfo.nickName
    //   }), n.globalData.userInfo = t.data.userInfo, n.globalData.token = t.data.token;
    // }).catch(function (a) {
    //   console.log(a);
    // });
  },
  myorder: function (a) {
    // null != n.globalData.userInfo && "" != n.globalData.token ? wx.navigateTo({
    //   url: "/pages/ucenter/order/order"
    // }) : e.showToast({
    //   title: "你还没有登录",
    //   mask: !1
    // });
  },
  returnGoods: function (a) {
    // null != n.globalData.userInfo && "" != n.globalData.token ? wx.navigateTo({
    //   url: "/pages/ucenter/order/order"
    // }) : e.showToast({
    //   title: "你还没有登录",
    //   mask: !1
    // });
  },
  addressmanager: function (a) {
    // null != n.globalData.userInfo && "" != n.globalData.token ? wx.navigateTo({
    //   url: "../address/address"
    // }) : e.showToast({
    //   title: "你还没有登录",
    //   mask: !1
    // });
  },
  closePopupTap: function () {
    // var a = this;
    // this.setData({
    //   openAttr: !a.data.openAttr
    // });
  },
  tax: function (a) {
    // var t = this;
    // if (t.setData({
    //   type: 0
    // }), null != n.globalData.userInfo && "" != n.globalData.token) {
    //   var o = wx.getStorageSync("companyid");
    //   null == o || "" == o || void 0 == o ? t.setData({
    //     logindialog: !0
    //   }) : wx.navigateTo({
    //     url: "../../tax/tax?id=" + o
    //   });
    // } else e.showToast({
    //   title: "点击头像授权之后才可以使用",
    //   mask: !1
    // });
  },
  trademark: function (a) {
    // var t = this;
    // if (t.setData({
    //   type: 1
    // }), null != n.globalData.userInfo && "" != n.globalData.token) {
    //   var o = wx.getStorageSync("companyid");
    //   null == o || "" == o || void 0 == o ? t.setData({
    //     logindialog: !0
    //   }) : wx.navigateTo({
    //     url: "../../trademark/trademark?id=" + o
    //   });
    // } else e.showToast({
    //   title: "点击头像授权之后才可以使用",
    //   mask: !1
    // });
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
    // var o = this;
    // wx.showLoading({
    //   title: "加载中..."
    // }), a.request(t.VerfiyCompany, {
    //   account: o.data.account,
    //   password: o.data.password
    // }).then(function (a) {
    //   if (0 === a.code) if (null != a.list && a.list.length > 0) {
    //     var t = a.list[0].id;
    //     o.setData({
    //       name: a.list[0].name
    //     }), 0 == o.data.type ? wx.navigateTo({
    //       url: "../../tax/tax?id=" + t
    //     }) : wx.navigateTo({
    //       url: "../../trademark/trademark?id=" + t
    //     }), wx.setStorageSync("companyid", t), wx.setStorageSync("name", o.data.name);
    //   } else wx.showModal({
    //     content: "账号或密码不正确"
    //   });
    //   o.setData({
    //     logindialog: !1
    //   }), wx.hideLoading();
    // });
  },
  call: function () {
    // wx.navigateTo({
    //   url: "../../../pages/brand/brand"
    // });
  },
  
});