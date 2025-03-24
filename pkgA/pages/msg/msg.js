const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({
  data: {
    phone: '',
    code: '',
    canGetCode: true, // 是否可以获取验证码标志位
    countdown: 60 // 默认倒计时时长（单位：秒）
  },
  bindPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },
  bindCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    });
  },
  sendCode: function () {
    if (this.data.phone == '') {
      wx.showToast({
        title: '请填写手机号！',
        icon: 'none'
      })
      return;
    }
    const phoneRegex = /^1[3-9]\d{9}$/; // 中国大陆手机号正则表达式
    if (!phoneRegex.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式不正确！',
        icon: 'none'
      });
      return;
    }
    console.log('发送验证码到', this.data.phone);

    wx.request({
      url: `${apiUrl}/user/sendSms?phoneNumber=${this.data.phone}`, // 拼接完整的 URL
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data)
          if(res.data.code == 0){
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
          }
          else
            this.startCountDown();
        } else {
          console.error('请求失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
      complete: () => {
        console.log('请求完成');
        this.setData({
          lolo: false
        })
      }
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
        } else {
          console.error('请求失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
    });
  },
  // 启动倒计时
  startCountDown() {
    let count = this.data.countdown;
    this.setData({
      canGetCode: false
    }); // 设置不可点击状态

    const timer = setInterval(() => {
      if (count <= 0) {
        clearInterval(timer);
        this.setData({
          canGetCode: true,
          countdown: this.data.countdown // 重置倒计时
        });
      } else {
        this.setData({
          countdown: count--
        });
      }
    }, 1000);
  },
  login: function () {
let that = this
    console.log('登录', this.data.phone, '验证码', this.data.code);
    wx.request({
      url: `${apiUrl}/user/smsLogin`, // 拼接完整的 URL
      method: 'POST',
      data: {
        "phoneNumber": this.data.phone,
        "smsCode": this.data.code
      },
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data)
          wx.showToast({
            title: '登录成功！',
          })
          wx.setStorageSync('loginStatus', true)
          wx.setStorageSync('v_token', res.data.data);
          that.getUserInfo()
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/person/person',
            })
          }, 1500)
        } else {
          console.error('请求失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
      complete: () => {
        console.log('请求完成');
        this.setData({
          lolo: false
        })
      }
    });
  }
});