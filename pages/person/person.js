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
  onHandleLogin(e) {
    const detail = e.detail;
    console.log('phoneOneClickLogin errCode', detail.errCode)
  },
  meng(){
    wx.showToast({
      title: '请先勾选阅读协议',
      icon: 'none'
    });
  },
  getPhoneNumber (e) {
    const { errMsg, encryptedData, iv } = e.detail;
    if (errMsg === 'getPhoneNumber:ok') {
      // 获取登录凭证
      wx.login({
        success: (res) => {
          if (res.code) {
            console.log('loginCode：',res.code)
            console.log('phoneCode：',e.detail.code)
            wx.request({
              url: `${apiUrl}/user/phoneLogin`, // 拼接完整的 URL
              method: 'POST',
              data:{
                loginCode: res.code, // 登录凭证
                phoneCode: e.detail.code, // 电话凭证
                avatar: null, // 头像
                nickName: null // 昵称
              },
              header: {
                'content-type': 'application/json'
              },
              success: (res) => {
                console.log(res,'login')
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
          } else {
            wx.showToast({
              title: '获取登录凭证失败',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          wx.showToast({
            title: '获取登录凭证失败',
            icon: 'none'
          });
        }
      });
    } else {
      // 获取失败，处理错误
      wx.showToast({
        title: '获取手机号码失败',
        icon: 'none'
      });
    }
  },
  handlePhoneNumber(encryptedData, iv){
    console.log(encryptedData, iv)
    wx.request({
      url: `${apiUrl}/user/phoneLogin`, // 拼接完整的 URL
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
    console.log(this.data.gous)
  },
})