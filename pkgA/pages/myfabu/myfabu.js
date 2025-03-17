const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  //带参跳转
  navigates: function(e){
    let ww = e.currentTarget.dataset.id
    let ans=this.data.coitem[ww]
    let url=`/pkgA/pages/fabudetail/fabudetail?coitem=${ans}`
    console.log(url)
    wx.navigateTo({url: url});
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  getItems(){
    wx.request({
      url: `${apiUrl}/internship/getMyPublish`, // 拼接完整的 URL
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res)
        if (res.statusCode === 200) {
          console.log(res.data.data)
          let op = res.data.data
          let tt = []
          op.forEach((item, k) => {
            let t = {
              //id: item.id,
              // icon:`https://picsum.photos/30${Math.floor(Math.random() * 10)}/30${Math.floor(Math.random() * 10)}`,
              icon: item.companyLogo,
              name: item.companyName,
              time: that.extractDate(item.applicationDeadLine),
              isdian: false,
              sum: item.salary,
              tags: [{
                title: item.companyType
              }, {
                title: item.positionType
              }, {
                title: item.location
              }]
            }
            tt.push(t)
          })
          that.setData({
            coitem: tt,
            lolo: false
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