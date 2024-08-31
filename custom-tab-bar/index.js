Component({
  data: {
    selected: 0,
    color: "#808080",
    selectedColor: "#388BFF",
    list: [{
      pagePath: "pages/index/index",
      iconPath: "/asset/1.png",
      selectedIconPath: "/asset/11.png",
      text: "实习咨讯"
    }, {
      pagePath: "pages/publish/publish",
      iconPath: "/asset/2.png",
      selectedIconPath: "/asset/22.png",
      text: "实习发布"
    }
    , {
      pagePath: "pages/person/person",
      iconPath: "/asset/3.png",
      selectedIconPath: "/asset/33.png",
      text: "个人中心"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})