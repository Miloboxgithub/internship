// pkgA/pages/setup/setup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'微信用户0237',
    types1:false,
    types2:false,
    industry:['男','女'],
    ys:['湖南','广东','广西'],
    industrys:['广州','长沙','佛山'],
    sex:'男',
    diqu:'广东深圳'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const inputValue = wx.getStorageSync('inputValue') || '微信用户0237';
    this.setData({
      inputValue: inputValue
    });
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
    this.setData({
      diqu:this.data.diqus
    })
    this.hideview()
  },
  bindChange2: function (e) {
    let cc=e.detail.value
    console.log(cc[0])
    this.setData({
      diqus:this.data.industrys[cc[0]]
    })
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