const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    types1:false,
    types2:false,
    industry:['未知','男','女'],
    ys:[],
    industrys:[],
    sex:'未知',
    diqu:'未知',
    ID:'未知'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const inputValue = wx.getStorageSync('inputValue') || '微信用户';
    this.setData({
      inputValue: inputValue
    });
    this.getWeizhi()
  },
  inputChange: function(e) {
    this.setData({
      inputValue: e.detail.value // 更新inputValue为输入框的当前值
    });
    wx.setStorageSync('inputValue', e.detail.value); // 同步保存到本地存储
  },
  changetypes1: function(){
    this.setData({
      types1:true
    })
  },
  changetypes2: function(){
    this.setData({
      types2:true
    })
  },
  hideview: function(){
    this.setData({
      types1:false,
      types2:false
    })
  },
  queren1:function(){
    this.setData({
      sex:this.data.sexs
    })
    this.hideview()
  },
  bindChange1: function (e) {
    let cc=e.detail.value
    console.log(cc[0])
    this.setData({
      sexs:this.data.industry[cc[0]]
    })
  },
  queren2:function(){
    console.log(this.data.diqus)
    this.setData({
      diqu:this.data.diqus
    })
    this.hideview()
  },
  bindChange2: function (e) {
    let that = this
    let cc=e.detail.value
    console.log(cc,this.data.ys[cc[0]])
    wx.request({
      url: `${apiUrl}/getCityByProvinceName`, // 拼接完整的 URL
      method: 'POST',
      data:{
        province:this.data.ys[cc[0]]
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        token:wx.getStorageSync('v_token')
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data)
          that.setData({
            industrys:res.data.data
          })
        } else {
          console.error('请求失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
      complete: () => {
        console.log('请求完成');
      }
    });
    setTimeout(()=>{

      this.setData({
        diqus:this.data.ys[cc[0]]+this.data.industrys[cc[1]]
      })

    },500)

  },
  getWeizhi(){
    let that = this
    wx.request({
      url: `${apiUrl}/getProvinceList`, // 拼接完整的 URL
      method: 'GET',
      header: {
        token:wx.getStorageSync('v_token')
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data)
          that.setData({
            ys:res.data.data
          })
          wx.request({
            url: `${apiUrl}/getCityByProvinceName`, // 拼接完整的 URL
            method: 'POST',
            data:{
              province:this.data.ys[0]
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
              token:wx.getStorageSync('v_token')
            },
            success: (res) => {
              if (res.statusCode === 200) {
                console.log(res.data)
                that.setData({
                  industrys:res.data.data
                })
              } else {
                console.error('请求失败:', res);
              }
            },
            fail: (err) => {
              console.error('请求失败:', err);
            },
            complete: () => {
              console.log('请求完成');
            }
          });
        } else {
          console.error('请求失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
      complete: () => {
        console.log('请求完成');
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})