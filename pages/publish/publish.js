// pages/index/index.js
Page({
  data: {
    scrollTop: 0,
    types0: false,
    checks:false,
    types1:false,
    types2:false,
    types3:false,
    industry: [
      '游戏设计', '机械设计', '工业设计', '互联网', '影视行业', '人工智能', '大数据'
    ],
    xinzhi: [  '上市公司',
      '国企',
     '外企',
       '私企',
     ],
     years:[2024,2025,2026],
     months:[1,2,3,4,5,6,7,8,9,10,11,12],
     days:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
     logoImageUrl:'',
     zixunImageUrl:'',
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
  queren1: function () {
    this.setData({
      types1: !this.data.types1
    })
    console.log(this.data.hangs)
  },
  queren2: function () {
    this.setData({
      types2: !this.data.types2
    })
    console.log(this.data.xin)
  },
  queren3: function () {
    this.setData({
      types3: !this.data.types3
    })
  },
  hideview() {
    this.setData({
      types1: false,
      types2: false,
      types3: false
    })
    //隐藏tabber
    this.getTabBar().setData({
      chans: false
    })
  },
  changetypest1(e) {
    let ce = true
    if (this.data[e.currentTarget.id]) ce = !ce
    let ts = e.currentTarget.id
    this.setData({
      types1: true,
      types2: false,
      types3: false
    })
    if (ce)
      this.setData({
        [e.currentTarget.id]: !this.data[e.currentTarget.id]
      })
    //隐藏tabber
    this.getTabBar().setData({
      chans: !this.getTabBar().data.chans
    })
    console.log(1234)
  },
  changetypest2(e) {
    let ce = true
    if (this.data[e.currentTarget.id]) ce = !ce
    let ts = e.currentTarget.id
    this.setData({
      types1: false,
      types2: true,
      types3: false
    })
    if (ce)
      this.setData({
        [e.currentTarget.id]: !this.data[e.currentTarget.id]
      })
    //隐藏tabber
    this.getTabBar().setData({
      chans: !this.getTabBar().data.chans
    })
  },
  changetypest3(e) {
    let ce = true
    if (this.data[e.currentTarget.id]) ce = !ce
    let ts = e.currentTarget.id
    this.setData({
      types1: false,
      types2: false,
      types3: true
    })
    if (ce)
      this.setData({
        [e.currentTarget.id]: !this.data[e.currentTarget.id]
      })
    //隐藏tabber
    this.getTabBar().setData({
      chans: !this.getTabBar().data.chans
    })
    console.log(1234)
  },
  bindChange1: function (e) {
    let cc = e.detail.value
    console.log(cc)
    this.setData({
      hangs: this.data.industry[cc[0]]
    })
  },
  bindChange2: function (e) {
    let cc = e.detail.value
    console.log(cc)
    this.setData({
      xin: this.data.xinzhi[cc[0]]
    })
  },
  bindChange3: function (e) {
    let cc = e.detail.value
    console.log(cc)
    this.setData({
      
    })
  },
  chooseImagelogo: function(e) {
    let that=this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          logoImageUrl: tempFilePaths[0]
        });
      },
      fail: function(err) {
        console.error('选择图片失败：', err);
      }
    });
  },
  chooseImagezixun: function(e) {
    let that=this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          zixunImageUrl: tempFilePaths[0]
        });
      },
      fail: function(err) {
        console.error('选择图片失败：', err);
      }
    });
  },
  removeLogo: function()
  {
    this.setData({
      logoImageUrl: ''
    });
  },
  removeZixun: function()
  {
    this.setData({
      zixunImageUrl: ''
    });
  },
});