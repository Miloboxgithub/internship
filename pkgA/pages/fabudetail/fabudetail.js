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
  },
  navigate: function(e){
    wx.navigateTo({url:e.currentTarget.dataset.url});
  },
  shanchu: function(){
    var that = this;
    wx.showModal({
      title: '删除后无法恢复！',
      // content: '删除后无法恢复！',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击了确定');
          // 这里执行实际的删除逻辑
          that.deleteItem(e);
        } else if (res.cancel) {
          console.log('用户点击了取消');
          // 用户点击了取消，不需要做任何事情
        }
      },
      fail: function(err) {
        console.error('调用showModal失败：', err);
      }
    });
  },
  xiugai: function(){
    wx.showToast({
      title: '修改成功！',
      icon: 'success',
      duration: 2000
    });
  }
});