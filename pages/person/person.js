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