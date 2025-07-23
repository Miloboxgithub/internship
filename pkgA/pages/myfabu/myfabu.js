const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coitem: [],
    lolo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  //带参跳转
  navigates: function (e) {
    let ww = e.currentTarget.dataset.id
    let ans = this.data.coitem[ww].id
    let url = `/pkgA/pages/fabudetail/fabudetail?id=${ans}`
    //console.log(url)
    wx.navigateTo({
      url: url
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  onPullDownRefresh() {
    this.setData({
      coitem: []
    })
    this.getItems();
    // 下拉刷新完成后，需要调用 wx.stopPullDownRefresh 停止刷新动画
    wx.stopPullDownRefresh();
  },
  getItems() {
    let that = this
    this.setData({
      lolo: true
    })
    wx.request({
      url: `${apiUrl}/internship/getMyPublish`, // 拼接完整的 URL
      method: 'GET',
      header: {
        token: wx.getStorageSync('v_token') // 传递 token
      },
      success: (res) => {
        //console.log(res)
        if (res.statusCode === 200&&res.data.code==1) {
          //console.log(res.data.data)
          let op = res.data.data
          let tt = []
          op.forEach((item, k) => {
            let t = {
              id: item.id,
              icon: item.companyLogo,
              name: item.companyName,
              time: app.timeSub(item.deadline),
              jobPosition:item.jobPosition,
              
              sum: item.pageview,
              tags: [{
                title: item.businessNature
              }, {
                title: item.internshipType
              }, {
                title: app.getSubstringAfterDash(item.location)
              }]
            }
            if(item.overTime==0){
              t.iszhao = 'gg'
              t.st = '招募中'
            }
            else if(item.overTime==1){
              t.iszhao = 'rr'
              t.st = '已结束'
            }
            else if(item.overTime==2){
              t.iszhao = 'yy'
              t.st = '审核中'
            }
            else if(item.overTime==3){
              t.iszhao = 'bb'
              t.st = '未通过'
            }
            if (item.internshipType == '远程') {
              t.tags.pop()
            }
            if (!t.sum) t.sum = 0
            tt.push(t)
          })
          that.setData({
            coitem: tt
          })

        } else {
          console.error('请求失败:', res);
          wx.setStorageSync('loginStatus', false)
          wx.showModal({
            title: '未登录！',
            content: '请先去个人页面进行登录',
            complete: (res) => {
              if (res.cancel) {

              }
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/person/person',
                })
              }
            }
          })
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
      complete: () => {
        //console.log('请求完成');
        this.setData({
          lolo: false
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getItems()
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