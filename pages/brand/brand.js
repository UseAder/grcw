var app = getApp();

Page({
    data: {
      nvabarData: {
        showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
        title: '优狐科技小程序', //导航栏 中间的标题
        color:"#0090FF"
        
      },
      height: app.globalData.height * 2 + 20,   

        logs: [],
        root: "https://www.poempz.com/ams/api",
        desc: {},
        examplelist: [],
        categorylist: [],
        contacts: [],
        hotGoods: [ {
            a: "ad",
            b: "asd"
        }, {
            a: "123",
            b: "asd"
        }, {
            a: "99",
            b: "34"
        } ]
    },
    onLoad: function() {
       
    },
  phoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: '17600402407',
      success: function () {
        console.log("成功拨打电话")
      },
    })
  },
    getDesc: function() {
        var t = this;
        
    },
    examplelist: function() {
        var t = this;
       
    },
    getContact: function() {
        var t = this;
       
    },
    getProductCategory: function() {
        var t = this;
        
    }
});