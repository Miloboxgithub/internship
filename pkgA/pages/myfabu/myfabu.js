const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coitem: [
  ],
  lolo:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },
  //带参跳转
  navigates: function(e){
    let ww = e.currentTarget.dataset.id
    let ans = this.data.coitem[ww].id
    let url=`/pkgA/pages/fabudetail/fabudetail?id=${ans}`
    console.log(url)
    wx.navigateTo({url: url});
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  getItems(){
    let that = this
    this.setData({
      lolo:true
    })
    wx.request({
      url: `${apiUrl}/internship/getMyPublish`, // 拼接完整的 URL
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('v_token') // 传递 token
      },
      success: (res) => {
        console.log(res)
        if (res.statusCode === 200) {
          console.log(res.data.data)
          let op = res.data.data
          let tt = []
          op.forEach((item, k) => {
            let t = {
              id: item.id,
              icon: item.companyLogo,
              name: item.companyName,
              time: item.deadline,
              iszhao: true,
              sum: item.pageview,
              tags: [{
                title: item.businessNature
              }, {
                title: item.internshipType
              }, {
                title: item.location
              }]
            }
            if(item.internshipType=='远程'){
              t.tags.pop()
            }
            if(!t.sum)t.sum = 0
            tt.push(t)
          })
          that.setData({
            coitem: tt
          })

        } else {
          console.error('请求失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
      complete: () => {
        console.log('请求完成');
        this.setData({
          lolo:false
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