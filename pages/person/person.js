Page({

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
 
})