// pkgA/pages/Promotion/Promotion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onLongPress1(event) {
    const imageUrl = '/img/20250731160028.png'; // 获取图片的路径
    wx.previewImage({
      current: imageUrl, // 当前要显示的图片url
      urls: [imageUrl], // 需要预览的图片url列表数组
      success: function(res) {
        //console.log('图片预览成功', res);
      },
      fail: function(err) {
        console.error('图片预览失败', err);
      }
    });
  },
  onLongPress2(event) {
    const imageUrl = '/img/20250731160046.png'; // 获取图片的路径
    wx.previewImage({
      current: imageUrl, // 当前要显示的图片url
      urls: [imageUrl], // 需要预览的图片url列表数组
      success: function(res) {
        //console.log('图片预览成功', res);
      },
      fail: function(err) {
        console.error('图片预览失败', err);
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