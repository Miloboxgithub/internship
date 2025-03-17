const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({

  /**
   * 页面的初始数据
   */
  data: {
      items:[{text:'扣押求职者证件',isAc:false},{text:'收取求职者财务',isAc:false},{text:'强迫求职者集资或入股',isAc:false},{text:'诱导求职者异地入职',isAc:false},{text:'发布虚假招聘信息',isAc:false},{text:'其他损害求职者权益行文',isAc:false}],
      charCount:0,
      inputText: '',
      ImageUrl1:'',
      ImageUrl2:'',
      ImageUrl3:'',
      contactWay:'',
  },
  onLoad(options) {

  },
  submits(){
    console.log(this.data.contactWay)
    let reason = ''
    this.data.items.forEach((i,k)=>{
      if(i.isAc)reason = i.text
    })
    console.log(reason)
    wx.request({
      url: `${apiUrl}/report/addReport`, // 拼接完整的 URL
      method: 'POST',
      data:{
        "reason": reason,
    "description": this.data.inputText,
    "screenshot": this.data.ImageUrl1,
    "contactWay": this.data.contactWay
      },
      header: {
        'content-type': 'application/json'
      },success: (res) => {
        console.log(res)
        if (res.statusCode === 200) {
          console.log(res.data.data)
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
    })
  },
  toggleButtonStyle: function(event) {
        // 获取被点击按钮的索引
        const index = event.currentTarget.dataset.index;
        const buttons = this.data.items;
    // console.log(buttons,event)
        // 切换按钮的状态
        buttons[index].isAc = !buttons[index].isAc;
    
        // 更新数据
        this.setData({
          items: buttons
        });
      },
      handleInput: function(e) {
          const value = e.detail.value;
          const charCount = value.length;
  
           this.setData({
             inputText: value,
             charCount: charCount
           });
         },
  onShow() {

  },
  chooseImage1(){
    let that=this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          ImageUrl1: tempFilePaths[0]
        });
      },
      fail: function(err) {
        console.error('选择图片失败：', err);
      }
    });
  },
  chooseImage2(){
    let that=this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          ImageUrl2: tempFilePaths[0]
        });
      },
      fail: function(err) {
        console.error('选择图片失败：', err);
      }
    });
  },
  chooseImage3(){
    let that=this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          ImageUrl3: tempFilePaths[0]
        });
      },
      fail: function(err) {
        console.error('选择图片失败：', err);
      }
    });
  },
  remove1(){
    this.setData({
      ImageUrl1:''
    })
  },
  remove2(){
    this.setData({
      ImageUrl2:''
    })
  },
  remove3(){
    this.setData({
      ImageUrl3:''
    })
  },
})