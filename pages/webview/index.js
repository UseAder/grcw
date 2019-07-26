var app = getApp();
const api = require('../../config/api.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickname: '',//联系人
      phone: '', //手机号
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getUserInfo();
  },
  /**
   * 提交修改
   */
  formSubmit: function (e) {
    var that = this,
      value = e.detail.value,
      formId = e.detail.formId;
    if (!value.nickname) return app.Tips({
      title: '请输入您的联系名称'
    });
    if (!value.phone) return app.Tips({
      title: '请输入您的联系电话'
    });
    //   util.request(api.GetMyUserInfo, value, 'POST').then(function (res) {
    //   if (res.code == 200)
        app.Tips({
          title: '提交商机成功',
          icon: 'success'
        });
      
    // })
  },

  onShareAppMessage: function () {
    return {
      title: '果然财务',
      path: '/pages/gr_index/index'
    }
  }

})