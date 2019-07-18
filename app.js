var util = require('./utils/util.js');
var api = require('./config/api.js');
const wxh = require('./utils/wxh.js');

App({
  onLaunch: function () {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    this.globalData.zymConfirm = wx.getStorageSync('zymConfirm');
    var dataTime = wx.getStorageSync('dataTime')
    if (dataTime && Number(dataTime) >= 0){
      wxh.time(null, dataTime)
    }
    util.checkLogin().then(res => {
      console.log('app login');
      this.globalData.uid = wx.getStorageSync('uid');
      this.globalData.openid = wx.getStorageSync('openid');
      this.globalData.userInfo = wx.getStorageSync('userInfo');
    }).catch(() => {
    });
  },

  globalData: {
    userInfo: {
      username: 'Hi,游客',
      photo: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    openid:'',//1后端
    uid:'',
    zymConfirm:false,//验证码成功或失效
    pieLoad:false,//ec-canvas 数据问题需要
    pieCanvasHeight:null,
    lbkzList: [{
      name: '资产', data: [{
        value: 10,
        name: '流动资产合计'
      }, {
        value: 10,
        name: '非流动资产合计'
      }]
    },
    { name: '负债和所有者权益(或股东权益)', data: [{ value: 10, name: '负债合计' }, { value: 10, name: '所有者权益(或股东权益)' }] },
    { name: '纳税', data: [{ value: 10 }, { value: 7 }] }]
  },
   /*
 * 信息提示 + 跳转
 * @param object opt {title:'提示语',icon:''} | url
 * @param object to_url 跳转url 有5种跳转方式 {tab:1-5,url:跳转地址}
 */
  Tips: function (opt, to_url) {
    return util.Tips(opt, to_url);
  },
})