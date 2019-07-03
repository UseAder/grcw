var util = require('./utils/util.js');
var api = require('./config/api.js');

App({
  onLaunch: function () {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    })
  },

  globalData: {
    userInfo: {
      nickName: 'Hi,游客',
      userName: '点击去登录',
      avatarUrl: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    uid:null,
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