var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var user = require('../../services/user.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    saveDisplay:true,
    logindialog: false,
    userInfo: {
      username: app.globalData.userInfo.username,
      photo: app.globalData.userInfo.photo
    },
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '果然财税', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    ImageUrl: api.ImageUrl,
    currentTab: 0,
    swiper_height: 0, //swper自适应高度
    swiper_length: 0, //swper自适应条数
    banner: [],
    brand: [], // 商标
    channel: [], // 首页menu
    news: [], // 首页news
    poster_banner: [], //
    copenCompany: [], // 首页 小切换
  },
  // 打开登录弹框

  open_login: function () {
    this.setData({
      logindialog: true
    });
  },
  // 关闭登录弹框
  close_login: function () {
    this.setData({
      logindialog: false
    });
  },
  /*
   **首页menu
   */
  getIndexData: function() {
    var that = this;
    util.request(api.IndexUrl).then(function(res) {
      that.setData({
        banner: res.chart,
        channel: res.function,
        copenCompany: res.type,
        news: res.news,
        goods: res.goods,
        poster_banner: res.poster_banner
      })
      that.heightReady()
    })
  },
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.heightReady()
  },
  swithNav: function(e) {
    var a = e.target.dataset.current;
    if (this.data.currentTab == a) return !1;
    this.setData({
      currentTab: a
    });
    this.heightReady()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(a) {
    var that = this;
    // 判断是否已经授权
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
    var that = this
    const query = wx.createSelectorQuery()
    query.select('#publish').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      console.log(res[0])
      that.setData({
        publishHeight: res[0].top // #the-id节点的上边界坐标
      })
    })
    this.getIndexData()
  },
  inputKeyword: function() {
    this.setData({
      logindialog: true
    })
  },
  // 获取输入框公司名称 
  getCorporateName: function(e) {
    var that = this

    that.setData({
      corporateName: e.detail.value
    })
    if (that.data.corporateName) {
      if (/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.data.corporatePhone)) {
        that.setData({
          saveDisplay: false
        })
      
      }
    } else {
      that.setData({
        saveDisplay: true
      })
    }
  },

  getCorporatePhone: function(e) {
    var that=this
    that.setData({
      corporatePhone: e.detail.value
    })
    if (/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.data.corporatePhone)){
    
      if (that.data.corporateName) {
        that.setData({
          saveDisplay: false
        })
      }
    } else {
      that.setData({
        saveDisplay: true
      })
    }
  },
  save: function() {
    var that = this;
    if (!that.data.corporateName) return app.Tips({
      title: '请输入您要查询的公司'
    });
    if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.data.corporatePhone)) 
    return app.Tips({
      title: '请输入正确的手机号码'
    });
  },
  // goLink: function(a) {
  //   app.Tips('/pages/webview/index');
  // },
  heightReady: function() {
    var that = this
    let copenCompany = that.data.copenCompany[that.data.currentTab].list
    let currentTab = that.data.currentTab
    that.setData({
      swiper_length: Math.ceil(copenCompany.length / 2)
    })
    util.get_wxml(`.column-list${currentTab}`, (rects) => {
      let sum_heigth = 0
      that.setData({
        swiper_height: rects[0].height
      })
      // 就是循环相加每个列表的高度，然后赋值给swiper_height,便可以求出当前tab栏的高度，赋值给swiper 便可以swiper高度自适应
    })
  },
  onShareAppMessage: function() {},
  onPageScroll: function(e) { //监听页面滚动
    this.setData({
      scrollTop: e.scrollTop
    })
    if (this.data.scrollTop > this.data.publishHeight - this.data.height){
      this.setData({
        'nvabarData.color':"#FD821A"
      })
    }else{
      this.setData({
        'nvabarData.color': ""
      })
    }
  },
  onHide:function(){
    this.setData({
      logindialog: false
    })
  },
  // 提交公司数据消息，打开客服
  handleContact() {
    var that = this;
    var save={}
    save.uid=app.globalData.uid
    save.company = that.data.corporateName
    save.phone = that.data.corporatePhone

    util.request(api.MessageAdd,save,'POST').then(function (res) {
     if(res.code==200){
       app.Tips({
         title: '商机提交成功'
       });
     }
    })
  },
  /**
   * 调用微信登录
   */
  userInfoHandler: function () {
    var that = this
    user.loginByWeixin().then((res) => {
      console.log(res.data)
      if (res.code == 200) {
        that.setData({
          userInfo: res.data
        })
      }
    })
  },
  onShow: function () {
    var that = this
    if (app.globalData.openid) {
      that.setData({
        userInfo: app.globalData.userInfo,
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.employIdCallback = openid => {
        if (openid != '') {
          that.setData({
            userInfo: app.globalData.userInfo,
          })
        }
      }
    }
  },
})
