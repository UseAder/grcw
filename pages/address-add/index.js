var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({
  data: {
    parameter: {
      'title': '新增地址'
    },
    region: ['省', '市', '区'],
    id: '',
    userAddress: {
      name: "", //姓名
      phone: "", //手机号码
      province: ["北京市", "北京市", "东城区"], //省份
      address: '', //详细地址
      is_default: "" //默认选择地址
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addressDefault = {}
    console.log(options)
    if (options.addressDefault) {
      addressDefault = JSON.parse(options.addressDefault);
      if (!addressDefault.ad_id) return app.Tips({
        title: '缺少地址信息，无法修改'
      });
    }
    if (addressDefault.ad_id) {
    this.setData({
      id: addressDefault.ad_id || '',
      'userAddress.name': addressDefault.ad_name,
      'userAddress.phone': addressDefault.ad_phone,
      'userAddress.is_default': addressDefault.is_default,
      'userAddress.address': addressDefault.ad_address,
      region: addressDefault.ad_city ? addressDefault.ad_city : [],
      'parameter.title': '修改地址' 
    });
    }
  },
  // 地址变化
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 提交用户添加地址
   * 
   */
  formSubmit: function (e) {
    var that = this,
      value = e.detail.value;
    console.log(value)
    if (!value.name) return app.Tips({
      title: '请填写收货人姓名'
    });
    if (!value.phone) return app.Tips({
      title: '请填写联系电话'
    });
    if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(value.phone)) return app.Tips({
      title: '请输入正确的手机号码'
    });

    if (that.data.region[0] == '省') return app.Tips({
      title: '请选择所在地区'
    });
    if (!value.address) return app.Tips({
      title: '请填写详细地址'
    });
    value.uid = wx.getStorageSync('uid');
    value.aid = that.data.id;
    value.city = that.data.region.join('&');
    value.is_default = that.data.userAddress.is_default ? 1 : 0
    console.log(value)
    if (value.uid)
      util.request(api.AddressPut, value, "POST").then(function (res) {
        app.Tips({ title: '修改成功', icon: 'success' });
        wx.navigateBack({ delta: 1 });
      })
    else
      util.request(api.AddressPut, value, "POST"
      ).then(function (res) {
        app.Tips({ title: '添加成功', icon: 'success' });
        wx.navigateBack({ delta: 1 });
      })
  },
  ChangeIsDefault: function (e) {
    this.setData({
      'userAddress.is_default': !this.data.userAddress.is_default
    });
  },
  goBack: function () {
    let pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack({})
    }
  },
})