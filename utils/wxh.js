

//倒计时；
var time = function (timeStamp,dataTime) {
  var interval = null, totalSecond = (timeStamp - Date.parse(new Date())) / 1000 ;
  if (dataTime){
    totalSecond = dataTime
  }
  interval = setInterval(function () {
    // 秒数  
    var second = totalSecond;
    // 小时位  
    var hr = Math.floor(second / 3600);
    var hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;

    // 分钟位  
    var min = Math.floor((second - hr * 3600) / 60);
    var minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;

    // 秒位  
    var sec = second - hr * 3600 - min * 60;
    var secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;
    // that.setData({
    //   countDownHour: hrStr,
    //   countDownMinute: minStr,
    //   countDownSecond: secStr,
    // });
    totalSecond--;
    wx.setStorageSync('dataTime', totalSecond);
    // console.log(totalSecond)
    if (totalSecond <= 0) {
      clearInterval(interval);
      wx.showToast({
        title: '数据服务已到期，请重新验证',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
      getApp().globalData.zymConfirm=false
      wx.setStorageSync('zymConfirm', false);
      // wx.switchTab({
    
      //   url: '/pages/gr_data/index',
      // })
      // that.setData({
      //   countDownHour: '00',
      //   countDownMinute: '00',
      //   countDownSecond: '00',
      // });
    }
  }.bind(), 1000);
  // that.setData({ interval: interval});
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
  that.setData({ interval: interval});
}

module.exports = {
  time: time,
  time2: time2
}