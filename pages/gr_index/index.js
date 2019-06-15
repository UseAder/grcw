var app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    channel: [],// 首页menu
    newsRecommendList: [],// 首页news
    copenCompany: [],// 首页 小切换
  },
  /*
  **首页menu
  */
  getIndexData: function () {
    var that = this;
    util.request(api.IndexUrl).then(function (res){ 
      console.log(res)
        that.setData({
          banner: res.chart,
          channel: res.function,
          copenCompany: res.type

        })
      // that.setData({
      //   // height:
      //   banner: cs_banner,
      //   channel: cs_channel,
      //   copenCompany: cs_copenCompany
      // });
    })
    // var cs_banner = [{ id: 13, image_url: "/images/home/home_bg.png" }]
    // var cs_channel = [
    //   { "cs_channel_id": 14, "cs_channel_name": "公司注册", "cs_channel_url": "1036036", "cs_channel_icon_url": "/images/home/h_type1.png" },
    //   { "cs_channel_id": 15, "cs_channel_name": "代理记账", "cs_channel_url": "1036037", "cs_channel_icon_url": "/images/home/h_type2.png" },
    //   { "cs_channel_id": 16, "cs_channel_name": "商标专利", "cs_channel_url": "1036038", "cs_channel_icon_url": "/images/home/h_type3.png" },
    //   { "cs_channel_id": 17, "cs_channel_name": "公司转让", "cs_channel_url": "1036039", "cs_channel_icon_url": "/images/home/h_type4.png" },
    //   { "cs_channel_id": 18, "cs_channel_name": "资质许可", "cs_channel_url": "1036040", "cs_channel_icon_url": "/images/home/h_type5.png" },
    //   { "cs_channel_id": 23, "cs_channel_name": "广告制作", "cs_channel_url": "1036066", "cs_channel_icon_url": "/images/home/h_type6.png" }]
    // var cs_copenCompany=[{
    //     cs_copenCompany_tab_name: "创业法宝", id: 1,
    //     cs_copenCompany_tab_list1: [{
    //       name: "免费企业核名", description: "同步工商系统;3秒出结果", picUrl: "https://caishui.zbjimg.com/caishui%2Fcaishui%2F%E5%85%8D%E8%B4%B9%E6%A0%B8%E5%90%8D.png%2Forigine%2F2e8d486d-16fb-4d97-bce4-cf106576ad06"
    //     }, { name: "工商注册资料包", description: "同步工商系统;免费领", picUrl: "https://caishui.zbjimg.com/caishui%2Fcaishui%2F%E5%85%8D%E8%B4%B9%E6%A0%B8%E5%90%8D.png%2Forigine%2F2e8d486d-16fb-4d97-bce4-cf106576ad06" }],
    //     cs_copenCompany_tab_list2: [{
    //       name: "热门商标", description: "25类热销标", picUrl: "https://caishui.zbjimg.com/caishui%2Fcaishui%2F%E5%85%8D%E8%B4%B9%E6%A0%B8%E5%90%8D.png%2Forigine%2F2e8d486d-16fb-4d97-bce4-cf106576ad06"
    //     }, { name: "热门商标", description: "35类热销标", picUrl: "https://caishui.zbjimg.com/caishui%2Fcaishui%2F%E5%85%8D%E8%B4%B9%E6%A0%B8%E5%90%8D.png%2Forigine%2F2e8d486d-16fb-4d97-bce4-cf106576ad06" }, { name: "热门商标", description: "35类热销标", picUrl: "https://caishui.zbjimg.com/caishui%2Fcaishui%2F%E5%85%8D%E8%B4%B9%E6%A0%B8%E5%90%8D.png%2Forigine%2F2e8d486d-16fb-4d97-bce4-cf106576ad06" }, { name: "热门商标", description: "35类热销标", picUrl: "https://caishui.zbjimg.com/caishui%2Fcaishui%2F%E5%85%8D%E8%B4%B9%E6%A0%B8%E5%90%8D.png%2Forigine%2F2e8d486d-16fb-4d97-bce4-cf106576ad06" }]}, 
    //     { cs_copenCompany_tab_name: "开创公司", id: 2 },
    //     { cs_copenCompany_tab_name: "企业管理", id: 3 },
    //     { cs_copenCompany_tab_name: "热门服务", id:4}]
    // if (cs_copenCompany.cs_copenCompany_tab_list1.lenght)
    
  },
  /*
  **首页news
  */
  getCmsContent: function () {
    var that = this;
    // util.request(e.IndexUrl).then(function (res) })
    var cs_news = [{
      "id": 9, "cs_news_tag": "代理记账", "cs_news_title": "警惕！企业不做账最高罚一万！"
    }, {
        "id": 8, "cs_news_tag": "商标注册", "cs_news_title": "这些商标价值千万，你想象不到！"
      },{
        "id": 7, "cs_news_tag": "快报", "cs_news_title": "两部门重磅出台企业改制重组有关土地增值税政策"
      }]
    that.setData({
      newsRecommendList: cs_news
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (a) {
    this.getIndexData(), this.getCmsContent()
    }
})