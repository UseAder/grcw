// pages/xiaoximoban/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  appkey: function () {
    var that = this
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      data: {
        grant_type: "client_credential",
        appid: 'wx90e809440abce88f',
        secret: 'f578be167feccf94988658ca78b8bfe5'
      },
      method: 'get',
      success: function (res) {
        that.setData({
          access_token: res.data.access_token
        })
        // console.log(res.data.access_token)
        // console.log(res)
      },
      fail: function (err) {
        console.log('request fail ', err);
      },
      complete: function (res) {
        console.log("request completed!");
      }

    })
  },
  testSubmit: function (e) {
    console.log(e.detail.formId)
    var self = this;
    let _access_token = self.data.access_token;
    let url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + _access_token;
    let _jsonData = {
      form_id: e.detail.formId,
      "touser": wx.getStorageSync('openid'),
      "template_id": "G6vOuE3_QlaoT-XMxQ-cdJLY3ga0BEx0LodAIuKo-Uk",
      // "miniprogram": {
      //   "appid": "xiaochengxuappid12345",
      //   "pagepath": "index?foo=bar"
      // },
      "data": {
        "first": {
          "value": "恭喜你购买成功！",
          "color": "#173177"
        },
        "keyword1": {
          "value": "巧克力",
          "color": "#173177"
        },
        "keyword2": {
          "value": "39.8元",
          "color": "#173177"
        },
        "keyword3": {
          "value": "2014年9月22日",
          "color": "#173177"
        },
        "remark": {
          "value": "欢迎再次购买！",
          "color": "#173177"
        }
      }
    }
    //  {
    //     // access_token: _access_token,
    //     touser: 'oJnDw0JyHhBgrOH0GfMna5PZabO0',
    //     template_id: '_CfGS7SqVyNPg9Op8OXzMp6aOl7X9rCkrRfiMcccms8',
    //     form_id: e.detail.formId,
    //     page: "pages/index/index",
    //     data: {
    //       "keyword1": { "value": "测试数据一", "color": "#173177" },
    //       "keyword2": { "value": "测试数据二", "color": "#173177" },
    //       "keyword3": { "value": "测试数据三", "color": "#173177" },
    //       "keyword4": { "value": "测试数据四", "color": "#173177" },
    //     }
    //   }
    wx.request({
      url: url,
      data: _jsonData,
      method: 'post',
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log('request fail ', err);
      },
      complete: function (res) {
        console.log("request completed!");
      }

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },




  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})