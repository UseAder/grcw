var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '购物车', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,   
    ImageUrl: api.ImageUrl,

    cartCount: 0, //已选择
    cartList: [],
    isAllSelect: false, //全选
    selectValue: [], //购物车选中的数据
    selectCountPrice: 0.00,
  },

  goDetails: function (e) {
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + e.currentTarget.dataset.id
    })
  },

  // 删除
  subDel: function (e) {
    var deleteId = e.currentTarget.dataset.id, index = e.currentTarget.dataset.index, that = this
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此商品吗？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.CartDelete, { cart_id: deleteId }, "POST"
          ).then(function (res) {
            if (res.code == 200) {
              that.data.cartList.splice(index, 1);
              that.setData({ cartList: that.data.cartList });
              app.Tips({ title: '删除成功', icon: 'success' });
            } else {
              app.Tips({ title: '删除失败', icon: 'none' });
            }
          })
        } else if (res.cancel) {
          return false;
        }
      }
    })
   
   
  },
  // 下单
  subOrder: function (event) {
    var formId = event.detail.formId, that = this, selectValue = that.data.selectValue;
    if (selectValue.length <= 0) return app.Tips({ title: '请先选择商品', icon: 'none' })
    if (selectValue.length >= 1) {
      wx.navigateTo({
        url: "/pages/shopping/checkout?cid=" + JSON.stringify(that.data.selectValue)
      });
    }
  },
  // 单选
  checkboxChange: function (event) {
    var that = this;
    var value = event.detail.value;
    var valid = this.data.cartList;
    for (var index in valid) {
      if (that.inArray(valid[index].cart_id, value)) valid[index].checked = true;
      else valid[index].checked = false;
    }
    var validData = "cartList";
    this.setData({
      [validData]: valid,
      isAllSelect: value.length == this.data.cartList.length,
      selectValue: value,
    })
    this.switchSelect();
    this.getCartNum();
  },
  // 全选
  checkboxAllChange: function (event) {
    var value = event.detail.value;
    if (value.length > 0) {
      this.setAllSelectValue(1)
    } else {
      this.setAllSelectValue(0)
    }
  },
  //全选。单选切换
  setAllSelectValue: function (status) {
    var that = this;
    var selectValue = [];
    var valid = that.data.cartList;
    if (valid.length > 0) {
      for (var index in valid) {
        if (status == 1) {
          valid[index].checked = true;
          selectValue.push(valid[index].cart_id);
        } else valid[index].checked = false;
      }
      var validData = "cartList";
      that.setData({
        [validData]: valid,
        selectValue: selectValue,
      });
      console.log(selectValue)
      that.switchSelect();
      that.getCartNum();
    }
  },
  // 计算价格
  switchSelect: function () {
    var that = this;
    var validList = that.data.cartList;
    var selectValue = that.data.selectValue;
    var selectCountPrice = 0.00;
    if (selectValue.length < 1) {
      that.setData({
        selectCountPrice: selectCountPrice
      });
    } else {
      for (var index in validList) {
        if (that.inArray(validList[index].cart_id, selectValue)) {
          selectCountPrice = Number(selectCountPrice) + Number(validList[index].cart_num) * Number(validList[index].goods_discount)
        }
      }
      that.setData({
        selectCountPrice: selectCountPrice.toFixed(2)
      });
    }
  },
  // 该项是否计算
  inArray: function (search, array) {
    for (var i in array) {
      if (array[i] == search) {
        return true;
      }
    }
    return false;
  },


  // 减
  subCart: function (event) {
    var that = this;
    var status = false;
    var index = event.currentTarget.dataset.index;
    var item = that.data.cartList[index];
    item.cart_num = item.cart_num - 1;
    if (item.cart_num < 1) status = true;
    if (item.cart_num <= 1) {
      item.cart_num = 1;
      item.numSub = true;
    } else {
      item.numSub = false;
      item.numAdd = false;
    }
    if (false == status) {
      that.setCartNum(item.cart_id, 2, function (data) {
        var itemData = "cartList[" + index + "]";
        that.setData({
          [itemData]: item
        });
        that.switchSelect();
      });
    }
  },
  // 加
  addCart: function (event) {
    var that = this;
    var status = false;
    var index = event.currentTarget.dataset.index;
    var item = that.data.cartList[index];
    item.cart_num = item.cart_num + 1;
    if (false == status) {
      that.setCartNum(item.cart_id, 1, function (data) {
        var itemData = "cartList[" + index + "]";
        that.setData({
          [itemData]: item
        });
        that.switchSelect();
      });
    }
  },
  //回调
  setCartNum(cartId, numAdd, successCallback) {
    var that = this;
    util.request(api.CartNumber, {
      cart_id: cartId,
      number: numAdd
    }, "POST").then(function (res) {
      successCallback && successCallback(res);
    })
  },
  getCartNum: function () {
    this.setData({
      cartCount: this.data.selectValue.length
    });
  },
  getCartList: function () {
    var that = this;
    util.request(api.Cart, { uid: wx.getStorageSync('uid'), page: 1 }, 'POST').then(function (res) {
      if (!res.data) return
      var valid = res.data;
      if (valid.length > 0) {
        for (var index in valid) {
          valid[index].checked = false;
        }
      }
      that.setData({
        'cartList': valid
      });
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCartList();
    this.setData({
      isAllSelect: false, //全选
      selectValue: [], //选中的数据
      cartList: [],
      selectCountPrice: 0.00,
      cartCount: 0,
    });
  },
  onShareAppMessage: function () {
    return {
      title: '杭州注册公司代理',
      desc: '杭州注册公司代理',
      path: '/pages/gr_index/index'
    }
  },
})