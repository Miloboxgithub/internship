// pages/index/index.js
Page({
  data: {
    scrollTop: 0,
    types0: false,
    checks:false
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  onScrollToLower: function (e) {
    this.setData({
      scrollTop: e.detail.scrollTop
    });

    // 当页面滚动时，调整导航栏的位置
    if (e.detail.scrollTop > 44) { // 导航栏高度
      wx.createSelectorQuery().select('#navBar').boundingClientRect((rect) => {
        this.setData({
          navTop: rect.top
        });
      }).exec();
    } else {
      this.setData({
        navTop: 0
      });
    }
  },
  changetypes: function () {
    this.setData({
      types0: !this.data.types0
    })
  },
  changecheck: function(){
    this.setData({
      checks:!this.data.checks
    })
  }
});