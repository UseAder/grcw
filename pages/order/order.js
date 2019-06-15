// var t = require("../../../utils/util.js"), e = require("../../../config/api.js"), r = require("../../../template/showToast");

Page({
    data: {
        orderList: [],
        pageNum: 1,
        pageSize: 10,
        totalPage: 0,
        bottomTip: "正在加载中……",
        menuActive: 1,
        unpayList: [],
        unPost: [],
        hasPost: [],
        unComment: [],
        current: 1
    },
    onLoad: function() {
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
        wx.showLoading({
            title: "加载中...",
            success: function() {}
        }), this.getOrderList(-1);
    },
    menuChange: function(t) {
        var e = t.currentTarget.dataset.index;
        e != this.data.menuActive && (this.setData({
            menuActive: e,
            current: e,
            pageNum: 1,
            unpayList: [],
            unPost: [],
            hasPost: [],
            unComment: [],
            orderList: [],
            bottomTip: "正在加载中……"
        }), 1 == e ? this.getOrderList(-1) : 2 == e ? this.getOrderList(0) : 3 == e ? this.getOrderList(201) : 4 == e ? this.getOrderList(300) : 5 == e && this.getOrderList(301));
    },
    getOrderList: function(r) {
        var a = this;
        t.request(e.OrderList, {
            page: a.data.pageNum,
            size: a.data.pageSize,
            order_status: r
        }).then(function(t) {
            0 === t.errno && (console.log(t.data), a.setData({
                orderList: a.data.orderList.concat(t.data.data),
                totalPage: t.data.totalPages
            }), wx.hideLoading(), a.data.pageNum >= a.data.totalPage ? a.setData({
                bottomTip: "没有更多结果了"
            }) : a.setData({
                bottomTip: "正在加载中…"
            }));
        });
    },
    payOrder: function(t) {
        var e = this, r = t.currentTarget.dataset.orderindex, a = e.data.orderList[r].actual_price, o = e.data.orderList[r].order_sn, s = e.data.orderList[r].id;
        wx.redirectTo({
            url: "/pages/pay/pay?actual_price=" + a + "&order_sn=" + o + "&orderid=" + s
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        5 == this.data.current && (t.setData({
            pageNum: 1,
            orderList: [],
            bottomTip: "正在加载中……"
        }), this.getOrderList(301));
    },
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        this.data.pageNum >= this.data.totalPage || (this.setData({
            pageNum: this.data.pageNum + 1
        }), 1 == this.data.current ? this.getOrderList(-1) : 2 == this.data.current ? this.getOrderList(0) : 3 == this.data.current ? this.getOrderList(201) : 4 == this.data.current ? this.getOrderList(300) : 5 == this.data.current && this.getOrderList(301));
    },
    cancelOrder: function(r) {
        var a = this, o = r.currentTarget.dataset.orderindex, s = a.data.orderList[o].order_status, i = a.data.orderList[o].order_sn, n = "";
        switch (s) {
          case 300:
            console.log("已发货，不能取消"), n = "订单已发货";
            break;

          case 301:
            console.log("已收货，不能取消"), n = "订单已收货";
            break;

          case 101:
            console.log("已经取消"), n = "订单已取消";
            break;

          case 102:
            console.log("已经删除"), n = "订单已删除";
            break;

          case 401:
            console.log("已经退款"), n = "订单已退款";
            break;

          case 402:
            console.log("已经退款退货"), n = "订单已退货";
        }
        if ("" != n) return console.log(n), t.showErrorToast(n), !1;
        console.log("可以取消订单的情况"), wx.showModal({
            title: "",
            content: "确定要取消此订单？",
            success: function(r) {
                r.confirm && (console.log("用户点击确定"), t.request(e.OrderCancel, {
                    order_sn: i
                }).then(function(t) {
                    console.log(t.errno), 0 === t.errno && (console.log(t.data), wx.showToast({
                        title: "已取消订单",
                        icon: "success",
                        duration: 2e3
                    }), a.setData({
                        pageNum: 1,
                        orderList: []
                    }), 1 == a.data.current ? a.getOrderList(-1) : a.getOrderList(0));
                }));
            }
        });
    },
    tip: function(t) {
        r.showToast({
            title: "已通知对方尽快发货",
            mask: !1
        });
    },
    besure: function(r) {
        var a = this, o = r.currentTarget.dataset.orderIndex, s = a.data.orderList[o].order_sn;
        t.request(e.SureOrder, {
            order_sn: s
        }).then(function(t) {
            console.log(t.errno), 0 === t.errno && (console.log(t.data), wx.showToast({
                title: "已确认收货",
                icon: "success",
                duration: 2e3
            }), a.setData({
                pageNum: 1,
                orderList: []
            }), 1 == a.data.current ? a.getOrderList(-1) : a.getOrderList(300));
        });
    },
    toComment: function(t) {
        var e = this, r = t.currentTarget.dataset.orderIndex, a = e.data.orderList[r].goodList[0].goods_id, o = e.data.orderList[r].order_sn;
        wx.navigateTo({
            url: "../../commentPost/commentPost?typeId=0&valueId=" + a + "&order_sn=" + o
        });
    },
    catchtransport: function(t) {
        var e = this, r = t.currentTarget.dataset.orderIndex, a = e.data.orderList[r].shipping_no, o = e.data.orderList[r].code;
        wx.navigateTo({
            url: "../logistic/logistic?code=" + o + "&logisticCode=" + a
        });
    }
});