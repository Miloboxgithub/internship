const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({
  data:{
    logins:false,
    gous:false,
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 2
    })
  }
  },
     //跳转页面
  navigate: function (e) {
    wx.navigateTo({url: e.currentTarget.dataset.url});
  },
  getPhoneNumber (e) {
    if(this.gous){
    const { errMsg, encryptedData, iv } = e.detail;

    if (errMsg === 'getPhoneNumber:ok') {
      // 获取成功，处理 encryptedData 和 iv
      this.handlePhoneNumber(encryptedData, iv);
    } else {
      // 获取失败，处理错误
      wx.showToast({
        title: '获取手机号码失败',
        icon: 'none'
      });
    }
  }
  else{
    wx.showToast({
      title: '请勾选',
      icon: 'none'
    });
  }
  },
  handlePhoneNumber(encryptedData, iv){
    console.log(encryptedData, iv)
    wx.request({
      url: `${apiUrl}/wx/login`, // 拼接完整的 URL
      method: 'POST',
      data:{
        js_code:wx.getStorageSync('code')
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res,'login')
        } else {
          console.error('请求失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
    });
  },
  loginMode()
  {
    this.setData({
      logins:true
    })
        //隐藏tabber
        this.getTabBar().setData({
          chans:true
        })
  },
  hideview() {
    this.setData({
      logins:false
    })
    //隐藏tabber
    this.getTabBar().setData({
      chans: false
    })
  },
  gous(){
    this.setData({
      gous:!this.data.gous
    })
  },
})