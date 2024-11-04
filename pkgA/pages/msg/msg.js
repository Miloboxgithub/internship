// login.js
Page({
  data: {
    phone: '',
    code: ''
  },
  bindPhoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  bindCodeInput: function(e) {
    this.setData({
      code: e.detail.value
    });
  },
  sendCode: function() {
    // 这里需要调用发送验证码的API
    // 例如：wx.request({
    //   url: 'https://your-server.com/sendCode',
    //   data: {
    //     phone: this.data.phone
    //   },
    //   success: function(res) {
    //     // 处理发送验证码的响应
    //   }
    // });
    console.log('发送验证码到', this.data.phone);
  },
  login: function() {
    // 这里需要调用登录的API
    // 例如：wx.request({
    //   url: 'https://your-server.com/login',
    //   data: {
    //     phone: this.data.phone,
    //     code: this.data.code
    //   },
    //   success: function(res) {
    //     // 处理登录的响应
    //   }
    // });
    console.log('登录', this.data.phone, '验证码', this.data.code);
  }
});