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
    oop: true,
    apiUrl: 'https://shixi.xydsh.cn', // 你的 API 基础 URL
    sharecoitem: [],
    pub: false,

  },
  timeSub(timestamp) {
    let date = new Date(timestamp);
    let formattedDate = date.toISOString().split('T')[0]; // 将日期时间字符串转换为 ISO 格式，然后分割并取日期部分
    return formattedDate; // 输出: 2052-03-17
  },
  getSubstringAfterDash(str) {
    // 使用 split 方法分割字符串
    const parts = str.split('-');
    // 如果有 '-'，返回 '-' 后面的部分；如果没有，返回原字符串
    return parts.length > 1 ? parts[1] : str;
  },
  cmpToday(givenDateTimeString) {
    // 将给定的日期时间字符串转换为 Date 对象
    let givenDateTime = new Date(givenDateTimeString);
    // 获取当前日期时间
    let now = new Date();
    // 比较两个日期时间
    if (givenDateTime > now) {
      return true
    } else if (givenDateTime < now) {
      return false
    } else {
      return true
    }
  },
  splits(allUrls) {
    // 使用 split 方法分割字符串
    const urlsArray = allUrls.split('|');
    console.log(urlsArray)
    return urlsArray
  },
  pickerchange: function () {

  },
})