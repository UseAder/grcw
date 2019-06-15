/**
 * 用户相关服务
 */
const util = require('../utils/util.js');
const api = require('../config/api.js');

/**
 * 调用微信登录
 */
function loginByWeixin() {

}

/**
 * 判断用户是否登录
 */
/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {

      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });

    } else {
      reject(false);
    }
  });
}

module.exports = {
  loginByWeixin,
  checkLogin,
};
