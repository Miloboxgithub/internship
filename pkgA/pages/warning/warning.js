// pkgA/pages/warning/warning.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      items:[{text:'扣押求职者证件',isAc:false},{text:'收取求职者财务',isAc:false},{text:'强迫求职者集资或入股',isAc:false},{text:'诱导求职者异地入职',isAc:false},{text:'发布虚假招聘信息',isAc:false},{text:'其他损害求职者权益行文',isAc:false}],
      charCount:0,
      inputText: '',
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  toggleButtonStyle: function(event) {
        // 获取被点击按钮的索引
        const index = event.currentTarget.dataset.index;
        const buttons = this.data.items;
    // console.log(buttons,event)
        // 切换按钮的状态
        buttons[index].isAc = !buttons[index].isAc;
    
        // 更新数据
        this.setData({
          items: buttons
        });
      },
      handleInput: function(e) {
          const value = e.detail.value;
          const charCount = value.length;
  
           this.setData({
             inputText: value,
             charCount: charCount
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