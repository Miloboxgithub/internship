// pkgA/pages/us/us.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLongPress(event) {
    const imageUrl = '/pkgA/img/校园大使汇公众号二维码.jpg.png'; // 获取图片的路径
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
  copyText(event) {
    //console.log(event)
    const textToCopy =event.currentTarget.dataset.text;// 获取需要复制的文本
    wx.setClipboardData({
      data: textToCopy, // 要复制的内容
      success: function(res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function(err) {
        console.error('复制失败', err);
        wx.showToast({
          title: '复制失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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