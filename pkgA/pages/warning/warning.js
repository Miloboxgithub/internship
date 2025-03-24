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
      idd:0,
  },
  onLoad(options) {
    console.log(options.op)
    this.setData({
      idd:options.op
    })
  },
  submits(){
    console.log(this.data.contactWay)
    let reason = ''

    this.data.items.forEach((i,k)=>{
      if(i.isAc)reason = i.text
    })
    if(reason==''||this.data.inputText==''){
      wx.showToast({
        title: '请填写举报原因与描述',
        icon:'none'
      })
      return ;
    }
    if(this.data.contactWay == ''){
      wx.showToast({
        title: '请填写联系方式',
        icon:'none'
      })
      return ;
    }
    console.log(reason,this.data.inputText,this.data.contactWay,this.data.idd,this.data.ImageUrl1)
    wx.request({
      url: `${apiUrl}/report/addReport`, // 拼接完整的 URL
      method: 'POST',
      data:{
        reason: reason,
        description:this.data.inputText,
        screenshot: this.data.ImageUrl1+'|'+this.data.ImageUrl2+'|'+this.data.ImageUrl3,
        contactWay: this.data.contactWay,
        internshipId :this.data.idd
      },
      header: {
        'token': wx.getStorageSync('v_token') // 传递 token
      },success: (res) => {
        console.log(res)
        if (res.statusCode === 200) {
          console.log(res.data)
          wx.showToast({
            title: '举报成功！',
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1,
              success: (res) => {},
              fail: (res) => {},
              complete: (res) => {},
            })
          },1500)
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
    wx.chooseMedia({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {

        wx.uploadFile({
          url: `${apiUrl}/report/screenShotUpload`, // 你的上传接口地址
          filePath: res.tempFiles[0].tempFilePath, // 选择的图片路径
          name: 'file', // 与后端约定的文件参数名
          header: {
            'Content-Type': 'multipart/form-data', // 设置请求头
            'token': wx.getStorageSync('v_token') // 传递 token
          },
          success: (res) => {
            if (res.statusCode == 200) {
              that.setData({
                ImageUrl1: JSON.parse(res.data).data
              });
              wx.showToast({
                title: '上传成功',
                icon: 'success'
              });
            } else {
              wx.showToast({
                title: '上传失败',
                icon: 'none'
              });
            }
          },
          fail: (err) => {
            console.error('上传失败:', err);
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            });
          }
        });

      },
      fail: function(err) {
        console.error('选择图片失败：', err);
      }
    });
  },
  chooseImage2(){
    let that=this
    wx.chooseMedia({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {

        wx.uploadFile({
          url: `${apiUrl}/report/screenShotUpload`, // 你的上传接口地址
          filePath: res.tempFiles[0].tempFilePath, // 选择的图片路径
          name: 'file', // 与后端约定的文件参数名
          header: {
            'Content-Type': 'multipart/form-data', // 设置请求头
            'token': wx.getStorageSync('v_token') // 传递 token
          },
          success: (res) => {
            if (res.statusCode == 200) {
              that.setData({
                ImageUrl2: JSON.parse(res.data).data
              });
              wx.showToast({
                title: '上传成功',
                icon: 'success'
              });
            } else {
              wx.showToast({
                title: '上传失败',
                icon: 'none'
              });
            }
          },
          fail: (err) => {
            console.error('上传失败:', err);
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            });
          }
        });

      },
      fail: function(err) {
        console.error('选择图片失败：', err);
      }
    });
  },
  chooseImage3(){
    let that=this
    wx.chooseMedia({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        wx.uploadFile({
          url: `${apiUrl}/report/screenShotUpload`, // 你的上传接口地址
          filePath: res.tempFiles[0].tempFilePath, // 选择的图片路径
          name: 'file', // 与后端约定的文件参数名
          header: {
            'Content-Type': 'multipart/form-data', // 设置请求头
            'token': wx.getStorageSync('v_token') // 传递 token
          },
          success: (res) => {
            if (res.statusCode == 200) {
              that.setData({
                ImageUrl3: JSON.parse(res.data).data
              });
              wx.showToast({
                title: '上传成功',
                icon: 'success'
              });
            } else {
              wx.showToast({
                title: '上传失败',
                icon: 'none'
              });
            }
          },
          fail: (err) => {
            console.error('上传失败:', err);
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            });
          }
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