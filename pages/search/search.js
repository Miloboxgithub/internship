const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents:'超威电源集团有限公司',
    items:[
      '小红书','超威电源集团有限公司','慧眼数据分析有限公司','云端信息科技','星辰网络服务有限公司'
    ],
    msg:'',

  },
  inputed(e){
    let msg=e.detail.value
    console.log(msg)
   this.setData({
     msg
   })
  },
  searchs(){
    let msg = this.data.msg
    wx.request({
      url: `${apiUrl}/api/internship/search`, // 拼接完整的 URL
      method: 'GET',
      data:{
        keyword:msg
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res,res.data.data,'search')
          app.globalData.sharecoitem = res.data.data
          if(res.data.data.length!=0){
            wx.switchTab({
              url: '/pages/home/home',
            })
          }
          else{
            wx.showToast({
              title: '没有这个数据',
            },1000)
          }
        } else {
          console.error('请求失败:', res);
          wx.showToast({
            title: '搜索失败',
          },1000)
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '搜索失败',
        },1000)
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

})