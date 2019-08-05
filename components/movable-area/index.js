const app = getApp()
Component({
  data: {
    height: app.globalData.height * 2 + 20, 
    windowHeight: app.globalData.windowHeight
  }
}) 