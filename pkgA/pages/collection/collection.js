// pkgA/pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quanxuan:false,
    numbs:0,
    lei:'类型',
    zhuang:'状态',
    types1:false,
    types2:false,
    leixin: [{
      op: '全部',
      ch: true
    }, {
      op: '线下实习',
      ch: false
    }, {
      op: '远程实习',
      ch: false
    }],
    zhuangtai: [{
      op: '全部',
      ch: true
    }, {
      op: '招募中',
      ch: false
    }, {
      op: '筹备中',
      ch: false
    }],
    toppx: 0,
    coitem: [{
      icon: 'https://img.js.design/assets/img/6557681b09dc6027548deca3.png#e04933f171c303ed86198233ba372fb9',
      name: '振石控股集团有限公司——社媒运营',
      time: '2024-12-31',
      iszhao: true,
      sum: 5000,
      tags: [{
        title: '上市公司'
      }, {
        title: '线下实习'
      }, {
        title: '深圳'
      }],
      isdian:false
    }, {
      icon: 'https://img.js.design/assets/img/6557681b09dc6027548deca3.png#e04933f171c303ed86198233ba372fb9',
      name: '振石控股集团有限公司——社媒运营',
      time: '2024-12-31',
      iszhao: true,
      sum: 5000,
      tags: [{
        title: '上市公司'
      }, {
        title: '线下实习'
      }, {
        title: '深圳'
      }],
      isdian:false
    }, 
  ],
  },
  quanxuans(){
    this.setData({
      quanxuan:!this.data.quanxuan
    })
    let co = this.data.coitem
    co.forEach(item=>{
      item.isdian=this.data.quanxuan
    })
    this.setData({
      coitem:co
    })
     co = this.data.coitem
    let sum=0
    co.forEach(item=>{
      if(item.isdian){
        sum++
      }
    })
    this.setData({
      numbs:sum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  changetypes(e) {
    let ce = true
    if (this.data[e.currentTarget.id]) ce = !ce
    let ts = e.currentTarget.id
    this.setData({
      types1: false,
      types2: false
    })
    if (ce)
      this.setData({
        [e.currentTarget.id]: !this.data[e.currentTarget.id]
      })
  },
  chooseop(e) {
    let cc = e.currentTarget.id
    let leixin = this.data.leixin.slice()
    leixin.forEach(item => {
      item.ch = false;
    })
    let aa = leixin[cc].op
    if (cc >= 0 && cc < leixin.length) {
      leixin[cc].ch = true
      this.setData({
        lei:aa
      })
    }
    this.setData({
      leixin: leixin
    })
  },
  choosetai(e) {
    let cc = e.currentTarget.id
    let zhuangtai = this.data.zhuangtai.slice()
    zhuangtai.forEach(item => {
      item.ch = false;
    })
    let aa = zhuangtai[cc].op
    if (cc >= 0 && cc < zhuangtai.length) {
      zhuangtai[cc].ch = true
      this.setData({
        zhuang:aa
      })
    }
    this.setData({
      zhuangtai:zhuangtai
    })
  },
  dianji(e){
    let cc = e.currentTarget.dataset.id
    let di = this.data.coitem.slice()
    if (cc >= 0 && cc < di.length) {
      di[cc].isdian = !di[cc].isdian
    }
    this.setData({
      coitem:di
    })
    let co = this.data.coitem
    let sum=0
    co.forEach(item=>{
      if(item.isdian){
        sum++
      }
    })
    let cha=false
    if(sum==co.length)cha=true

    this.setData({
      numbs:sum,
      quanxuan:cha
    })
  },
    //带参跳转
    navigates: function(e){
      let ww = e.currentTarget.dataset.id
      let ans=this.data.coitem[ww]
      let url=`/pkgA/pages/detail/detail?coitem=${ans}`
      console.log(url)
      wx.navigateTo({url: url});
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
    this.getweizhi()
    
  },
  getweizhi() {
    const qq = wx.createSelectorQuery();
    qq.select('.nav').boundingClientRect();
    qq.exec((res) => {
      //console.log(res[0],'hhh')
      this.setData({
        toppx: res[0].bottom
      })
    })
  },
  hideview() {
    this.setData({
      types1: false,
      types2: false,
    })
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