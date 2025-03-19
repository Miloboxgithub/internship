// app.js
App({
  
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(res.code)
    //     wx.setStorageSync('code',res.code)
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    oop:true,
    apiUrl: 'http://119.29.119.100:8082' , // 你的 API 基础 URL
    sharecoitem:[],
    pub:false,
  },
  pickerchange:function(){
      
  }
})
