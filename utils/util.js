var api = require('../config/api.js');
// var user = require('../services/user.js');
import * as echarts from '../components/ec-canvas/echarts';

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function initChart(echartsComponnet,data) {
  var that = this
  console.log(echartsComponnet)
  echartsComponnet.init((canvas, width, height) => {
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
        data: data
      }]
    };

    chart.setOption(option);
    return chart;
  })
}
/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
let isRefreshing = true;

function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          console.log(res.data)
          if (res.data.msg == "未登录") {
            console.log(res.data)
            console.log(res.data.msg)
            //需要登录后才可以操作
            let code = null;
            return login().then((res) => {
              code = res.code;
              return getUserInfo();
            }).then((userInfo) => {
              //登录远程服务器
              request(api.WxLogin, { code: code }, 'POST').then(res => {
                console.log(555)
                var user = {}
                user.openid = res.openid
                user.username = userInfo.userInfo.nickName
                user.photo = userInfo.userInfo.avatarUrl
                //微信用户登录
                request(api.WxLoginlogin, user, 'POST').then(res => {
                  if (res.code === 200) {
                    //存储用户信息
                    //存储用户信息
                    // 刷新token的函数,这需要添加一个开关，防止重复请求
                    if (isRefreshing) {
                    wx.setStorageSync('openid', res.data.openid);
                    wx.setStorageSync('userInfo', res.data);
                    wx.setStorageSync('uid', res.data.uid);
                      getApp().globalData.userInfo = wx.getStorageSync('userInfo');
                      getApp().globalData.openid = wx.getStorageSync('openid');
                      getApp().globalData.uid = wx.getStorageSync('uid');
                    resolve(request(url, data, method));
                    }
                    isRefreshing = false;
                  } else {
                    reject(res);
                  }
                })
              }).catch((err) => {
                reject(err);
              });
            }).catch((err) => {
              reject(err);
            })
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }
      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}
/**
 * 封封微信的的request  (果然接口调用此request)
 */
function requestGUOran(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'appCode': '6a537e1f938a4e5d8edbeabb106f40b2'
      },
      success: function (res) {
        if (res.statusCode == 200) {
            resolve(res.data);
        } else {
          reject(res.errMsg);
        }
      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('openid')) {
      checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });

    } else {
      reject(false);
    }
  });
}

function redirect(url) {
  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}
// 获取wxml的节点信息
function get_wxml(className, callback) {
  wx.createSelectorQuery().selectAll(className).boundingClientRect(callback).exec()
} 


/**
   * opt  object | string
   * to_url object | string
   * 例:
   * this.Tips('/pages/test/test'); 跳转不提示
   * this.Tips({title:'提示'},'/pages/test/test'); 提示并跳转
   * this.Tips({title:'提示'},{tab:1,url:'/pages/index/index'}); 提示并跳转值table上
   * tab=1 一定时间后跳转至 table上
   * tab=2 一定时间后跳转至非 table上
   * tab=3 一定时间后返回上页面
   * tab=4 关闭所有页面跳转至非table上
   * tab=5 关闭当前页面跳转至table上
   */
const Tips = function (opt, to_url) {
  if (typeof opt == 'string') {
    to_url = opt;
    opt = {};
  }
  var title = opt.title || '', icon = opt.icon || 'none', endtime = opt.endtime || 2000;
  if (title) wx.showToast({ title: title, icon: icon, duration: endtime })
  if (to_url != undefined) {
    if (typeof to_url == 'object') {
      var tab = to_url.tab || 1, url = to_url.url || '';
      switch (tab) {
        case 1:
          //一定时间后跳转至 table
          setTimeout(function () {
            wx.switchTab({
              url: url
            })
          }, endtime);
          break;
        case 2:
          //跳转至非table页面
          setTimeout(function () {
            wx.navigateTo({
              url: url,
            })
          }, endtime);
          break;
        case 3:
          //返回上页面
          setTimeout(function () {
            wx.navigateBack({
              delta: parseInt(url),
            })
          }, endtime);
          break;
        case 4:
          //关闭当前所有页面跳转至非table页面
          setTimeout(function () {
            wx.reLaunch({
              url: url,
            })
          }, endtime);
          break;
        case 5:
          //关闭当前页面跳转至非table页面
          setTimeout(function () {
            wx.redirectTo({
              url: url,
            })
          }, endtime);
          break;
      }

    } else if (typeof to_url == 'function') {
      setTimeout(function () {
        to_url && to_url();
      }, endtime);
    } else {
      //没有提示时跳转不延迟
      setTimeout(function () {
        wx.navigateTo({
          url: to_url,
        })
      }, title ? endtime : 0);
    }
  }
}
/*
* 合并数组
*/
const SplitArray = function (list, sp) {
  if (typeof list != 'object') return [];
  if (sp === undefined) sp = [];
  for (var i = 0; i < list.length; i++) {
    sp.push(list[i]);
  }
  return sp;
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
              wx.navigateTo({
                url: '/pages/auth/wxlogin/wxlogin',
              })             
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
  formatTime,
  formatTimeTwo,
  request,
  requestGUOran,
  redirect,
  showErrorToast,
  checkSession,
   checkLogin,
  getUserInfo,
  login,
  get_wxml,
  Tips,
  SplitArray, 
  initChart
}


