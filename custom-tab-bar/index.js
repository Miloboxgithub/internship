Component({
  data: {
    selected:0,
    color: "#808080",
    selectedColor: "#388BFF",
    list: [{
      "pagePath": "/pages/home/home",
      "iconPath": "/img/1.png",
      "selectedIconPath": "/img/11.png",
      "text": "实习咨讯"
    }, {
      "pagePath": "/pages/publish/publish",
      "iconPath": "/img/2.png",
      "selectedIconPath": "/img/22.png",
      "text": "实习发布"
    }
    , {
      "pagePath": "/pages/person/person",
      "iconPath": "/img/3.png",
      "selectedIconPath": "/img/33.png",
      "text": "个人中心"
    }]
  },
  attached() {
  },
  methods: {
    
    switchTab(e) {
      //console.log(e)
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  },
})