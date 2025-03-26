const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents: '',
    items: [
      // '小红书','超威电源集团有限公司','慧眼数据分析有限公司','云端信息科技','星辰网络服务有限公司'
    ],
    msg: '',
    flag: true,
  },
  inputed(e) {
    let msg = e.detail.value
    console.log(msg)
    this.setData({
      msg
    })
    this.searchs()
  },
  ggg() {
    console.log(546)
    this.setData({
      msg: '',
      flag:true
    })
  },
  shanchu(){
    this.setData({
      items:[]
    })
    let record = []
    wx.setStorageSync('srecord', record);
    wx.showToast({
      title: '删除成功',
    })
  },
  searchs() {
    let msg = this.data.msg;
    if (!msg) {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      });
      return;
    }
    
    let record = Array.isArray(this.data.items) ? this.data.items : []; // 确保 record 是数组
    
    // 判重并保留最新的相同元素
    if (!record.includes(msg)) {
      record.unshift(msg); // 将 msg 添加到数组前面
    } else {
      // 如果 msg 已经存在，则移除旧的，然后将新的 msg 添加到数组前面
      record = record.filter(item => item !== msg);
      record.unshift(msg);
    }
    
    // 确保数组长度不超过40
    if (record.length > 40) {
      record.pop(); // 删除数组最后一个元素（最旧的元素）
    }
    
    this.setData({
      items: record
    });
    
    wx.setStorageSync('srecord', record);
    wx.request({
      url: `${apiUrl}/internship/esSearch`, // 拼接完整的 URL
      method: 'POST',
      data: {
        "page": 1,
        "pageSize": 1000,
        content: msg
      },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('v_token') // 传递 token
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data, 'search')
          app.globalData.sharecoitem = res.data.data.records
          if (res.data.data.records.length != 0) {
            wx.switchTab({
              url: '/pages/home/home?op=1',
            })
            this.setData({
              flag:true
            })
          } else {
            // wx.showToast({
            //   title: '没有这个数据',
            //   icon: 'error'
            // }, 1000)
            this.setData({
              flag:false
            })
          }
        } else {
          console.error('请求失败:', res);
          wx.showToast({
            title: '搜索失败',
            icon: 'error'
          }, 1000)
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '搜索失败',
          icon: 'error'
        }, 1000)
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.autofocusInput()
    this.setData({
      items: wx.getStorageSync('srecord')
    })
  },
  shang(e) {
    console.log(e.currentTarget.dataset.s)
    this.setData({
      msg: e.currentTarget.dataset.s
    })
    this.searchs()
  },
  autofocusInput: function() {
    // 使用 wx.createSelectorQuery 获取输入框的引用
    const query = wx.createSelectorQuery();
    query.select('.input').fields({ node: true, size: true }, (res) => {
      if (res.node) {
        // 调用输入框的 focus 方法
        res.node.focus();
      }
    }).exec();
  },
})