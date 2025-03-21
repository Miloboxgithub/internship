const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents:'超威电源集团有限公司',
    items:[
      // '小红书','超威电源集团有限公司','慧眼数据分析有限公司','云端信息科技','星辰网络服务有限公司'
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
    let record = Array.isArray(this.data.items) ? this.data.items : []; // 确保 record 是数组
    record.push(msg)
    this.setData({
      items:record
    })
    wx.setStorageSync('srecord', record)
    wx.request({
      url: `${apiUrl}/internship/esSearch?content=${msg}`, // 拼接完整的 URL
      method: 'POST',
      // data:{
      //   content:msg
      // },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('v_token') // 传递 token
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data,'search')
          app.globalData.sharecoitem = res.data.data
          if(res.data.data.length!=0){
            wx.switchTab({
              url: '/pages/home/home?op=1',
            })
          }
          else{
            wx.showToast({
              title: '没有这个数据',
              icon:'error'
            },1000)
          }
        } else {
          console.error('请求失败:', res);
          wx.showToast({
            title: '搜索失败',
            icon:'error'
          },1000)
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '搜索失败',
          icon:'error'
        },1000)
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      items : wx.getStorageSync('srecord')
    })
  },

})