/**
 * 用户相关服务
 */

var app = getApp();
const api = require('../config/api.js');
const util = require('../utils/util.js');

/**
 * 第一步 调用微信登录
 */
function loginByWeixin() {
  let code = null;
  return new Promise(function (resolve, reject) {
    return login().then((res) => {
      code = res.code;
      return getUserInfo();
    }).then((userInfo) => {
      //登录远程服务器
      if (userInfo.errMsg=="getUserInfo:ok"){
        util.request(api.WxLogin, { code: code }, 'POST').then(res => {
          var user = {}
          user.openid = res.openid
          user.username = userInfo.userInfo.nickName
          user.photo = userInfo.userInfo.avatarUrl
          //微信用户登录
          util.request(api.WxLoginlogin, user, 'POST').then(res => {
            if (res.code === 200) {
              //存储用户信息
              wx.setStorageSync('openid', res.data.openid);
              wx.setStorageSync('userInfo', res.data);
              wx.setStorageSync('uid', res.data.uid);
              app.globalData.userInfo = wx.getStorageSync('userInfo');
              app.globalData.openid = wx.getStorageSync('openid');
              app.globalData.uid = wx.getStorageSync('uid');
              resolve(res);
            } else {
              reject(res);
            }
          })
        }).catch((err) => {
          reject(err);
        });
      }
    }).catch((err) => {
      reject(err);
    })
  })
}
/**
 * 第二步 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //登录远程服务器
          console.log(res)
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

/**
 * 第三步 调用微信登录
 */
function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        console.log(res)
        resolve(res);
      },
      fail: function (err) {
        wx.showModal({
          title: '授权提示',
          content: '小程序需要您的授权才能正常使用,请在个人中心点击登录授权',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              //去到设置中心界面
              // wx.navigateTo({
              //   url: '/pages/gr_ucenter/index',
              // })
            } else if (res.cancel) {
              console.log('用户点击取消')
              reject(err);
            }
          }
        })
      }
    })
  });
}


module.exports = {
  loginByWeixin,
  getUserInfo,
  login
  }