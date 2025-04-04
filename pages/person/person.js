const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({
  data: {
    logins: false,
    gous: false,
    islogins: true,
    username:'微信用户',
    avatar:'/img/头像.png'
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    if (wx.getStorageSync('loginStatus')) {
      this.setData({
        islogins: false
      })
      this.getUserInfo()
    }
    else{
      this.setData({
        islogins: true,
        username:'微信用户',
        avatar:'/img/头像.png'
      })
    }
    
    setTimeout(()=>{
      let info = wx.getStorageSync('userInfo')
      if(info){
        console.log(342)
        this.setData({
          username:info.name?info.name:'微信用户',
          avatar:info.avatar?info.avatar:'/img/头像.png'
        })
      }
    },500)
   
  },
  //跳转页面
  navigate: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
    this.hideview()
  },
  onHandleLogin(e) {
    const detail = e.detail;
    console.log('phoneOneClickLogin errCode', detail.errCode)
  },
  meng() {
    wx.showToast({
      title: '请先勾选阅读协议',
      icon: 'none'
    });
  },
  getPhoneNumber(e) {
    let that = this
    const {
      errMsg,
      encryptedData,
      iv
    } = e.detail;
    if (errMsg === 'getPhoneNumber:ok') {
      // 获取登录凭证
      wx.login({
        success: (res) => {
          if (res.code) {
            console.log('loginCode：', res.code)
            console.log('phoneCode：', e.detail.code)
            wx.request({
              url: `${apiUrl}/user/phoneLogin`, // 拼接完整的 URL
              method: 'POST',
              data: {
                loginCode: res.code, // 登录凭证
                phoneCode: e.detail.code, // 电话凭证
                // avatar: null, // 头像
                // nickName: null // 昵称
              },
              header: {
                'content-type': 'application/json'
              },
              success: (res) => {
                if (res.statusCode === 200) {
                  console.log(res, 'login')
                  wx.showToast({
                    title: '登录成功！',
                  })
                  that.hideview()
                  this.setData({
                    islogins: false
                  })
                  wx.setStorageSync('loginStatus', true)
                  wx.setStorageSync('v_token', res.data.data);
                  that.getUserInfo()
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
  handlePhoneNumber(encryptedData, iv) {
    console.log(encryptedData, iv)
    wx.request({
      url: `${apiUrl}/user/phoneLogin`, // 拼接完整的 URL
      method: 'POST',
      data: {
        js_code: wx.getStorageSync('code')
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res, 'login')
        } else {
          console.error('请求失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
    });
  },
  getUserInfo() {
    wx.request({
      url: `${apiUrl}/user/getInfoById`, // 拼接完整的 URL
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('v_token') // 传递 token
      },
      success: (res) => {
        if (res.statusCode === 200) {

          console.log(res.data)
          wx.setStorageSync('userInfo', res.data.data);
          let info = wx.getStorageSync('userInfo')
            this.setData({
              username:info.name?info.name:'微信用户',
              avatar:info.avatar?info.avatar:'/img/头像.png'
            })
        } else {
          console.error('请求失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
    });
  },
  loginMode() {
    if (!wx.getStorageSync('loginStatus')) {
    this.setData({
      logins: true
    })
    //隐藏tabber
    this.getTabBar().setData({
      chans: true
    })
  }
  },
  hideview() {
    this.setData({
      logins: false
    })
    //隐藏tabber
    this.getTabBar().setData({
      chans: false
    })
  },
  gous() {
    this.setData({
      gous: !this.data.gous
    })
    console.log(this.data.gous)
  },
})