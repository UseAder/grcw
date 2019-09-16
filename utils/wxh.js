

//倒计时；
var time = function (timeStamp, that) {
  var interval = null, totalSecond = timeStamp
  interval = setInterval(function () {
    totalSecond--;

    let newTime = new Date().getTime()
    let out_time = wx.getStorageSync('out_time')
    wx.setStorageSync('dataTime', totalSecond);
    if (newTime / 1000 > out_time) {
      totalSecond = 0
    }
    if (totalSecond <= 0) {
      clearInterval(interval);
      wx.showToast({
        title: '数据服务已到期，请重新验证',
        icon: 'none',
        duration: 2000,
        mask: true,
        success: function () {
          getApp().globalData.zymConfirm = false
          wx.setStorageSync('zymConfirm', false);
          wx.setStorageSync('dataTime', 0);
          var pages = getCurrentPages() //获取加载的页面

          var currentPage = pages[pages.length - 1] //获取当前页面的对象

          var url = currentPage.route //当前页面url

          var options = currentPage.options
          if (url == 'pages/gr_data/index' || url == "pages/invoiceList/index" || url == "pages/invoiceDetaile/index" || url == "pages/dataAnalysis/index" || url == "pages/mxzlist/index" || url == "pages/gr_data/index") {
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/gr_data/index',
              })
            }, 2000) //延迟时间 
        
          }
        },
      })
    }
  }.bind(that), 1000);
  if (that.setData){
    that.setData({
      interval: interval
    });
  }
 
}

//倒计时2；
var time2 = function (timeStamp, that) {
  var totalSecond = timeStamp - Date.parse(new Date()) / 1000;
  var interval = setInterval(function () {
    // 秒数  
    var second = totalSecond;
    // // 天数位  
    var day = Math.floor(second / 3600 / 24);
    var dayStr = day.toString();
    if (dayStr.length == 1) dayStr = '0' + dayStr;
    // 小时位  
    var hr = Math.floor((second - day * 3600 * 24) / (60 * 60));
    var hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;

    // 分钟位  
    // var min = Math.floor((second - hr * 3600) / 60);
    var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
    var minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;

    // 秒位  
    // var sec = second - hrNew * 3600 - min * 60;
    var sec = Math.floor(second - day * 3600 * 24 - hr * 3600 - min * 60);
    var secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;

    that.setData({
      countDownDay: dayStr,
      countDownHour: hrStr,
      countDownMinute: minStr,
      countDownSecond: secStr,
    });
    totalSecond--;
    if (totalSecond <= 0) {
      clearInterval(interval);
      wx.showToast({
        title: '活动已结束',
      });
      that.setData({
        countDownDay: '00',
        countDownHour: '00',
        countDownMinute: '00',
        countDownSecond: '00',
      });
    }
  }.bind(that), 1000);
  that.setData({ interval: interval });
}

module.exports = {
  time: time,
  time2: time2
}