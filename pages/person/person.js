Page({
  data: {
    display:''
  },
  showview: function() { 
    this.setData({
      display: "block"
    })
  },
  hideview: function() {
    this.setData({
      display: "none"
    })
  }
})