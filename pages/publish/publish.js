const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({
  data: {
    scrollTop: 0,
    types0: false,
    checks: false,
    types1: false,
    types2: false,
    types3: false,
    industryes: [
      {
        op:'无',
        id:0
      }
    ],
    xinzhi: [{
      op:'无',
      id:0
    }
    ],
    years: [2024, 2025, 2026],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    logoImageUrl: '',
    zixunImageUrl: '',
    //  postmsg
    companyName: '',
    companyType: '',
    industry: '',
    position: '',
    location: '',
    description: '',
    requirements: '',
    contactInfo: '',
    contactInfo: '',
    internshipType:'线下',
  },
  PostMsg() {
    let pmsg = {
      companyName: this.data.companyName,
      industryType: this.data.hangs.op,
      businessNature: this.data.xin.op,
      jobPosition: this.data.position,
      internshipType:this.data.internshipType,
      location: this.data.location,
      responsibility: this.data.description,
      requirement: this.data.requirements,
      harvest: this.data.acquisitions,
      deliveryMethod: this.data.contactInfo,
      deadline: this.translateTime(this.data.applicationDeadLine),
      companyLogo: this.data.logoImageUrl,
      consultPhoto: this.data.zixunImageUrl,
      pageview : 0,//浏览量
      weights : 1,//权重
      remark: this.data.memo,
      industryTypeId:this.data.hangs.id ,
      businessNatureId:this.data.xin.id,
    }
    console.log(pmsg,wx.getStorageSync('v_token'))
    wx.request({
      url: `${apiUrl}/internship/addInternship`, // 拼接完整的 URL
      method: 'POST',
      data: pmsg,
      header: {
        token:wx.getStorageSync('v_token')
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res)
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
        });
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/home/home',
          })
        },1500)
        app.globalData.pub = true
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
  onLoad() {
    this.getType()
  },
  getType(){
    wx.request({
      url: `${apiUrl}/businessNature/getBusinessNatureList`, // 拼接完整的 URL
      method: 'GET',
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        if (res.statusCode === 200) {
          let ttt = this.data.xinzhi
          res.data.data.forEach((i,k)=>{
            ttt.push({
              op:i.businessNature,
              id:i.id
            })
          })
          this.setData({
            xinzhi:ttt
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
    wx.request({
      url: `${apiUrl}/industryType/getIndustryTypeList`, // 拼接完整的 URL
      method: 'GET',
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        if (res.statusCode === 200) {
          let ttt = this.data.industryes
          res.data.data.forEach((i,k)=>{
            ttt.push({
              op:i.industryType,
              id:i.id
            })
          })
          this.setData({
            industryes:ttt
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
  translateTime(dateString) {
    // 解析日期字符串
    const date = new Date(dateString);
  
    // 提取年、月、日、时、分、秒
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // 组合成目标格式
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return formattedDate;
  },
  inputed(e) {
    console.log(e.detail.value)
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  onScrollToLower: function (e) {
    this.setData({
      scrollTop: e.detail.scrollTop
    });

    // 当页面滚动时，调整导航栏的位置
    if (e.detail.scrollTop > 44) { // 导航栏高度
      wx.createSelectorQuery().select('#navBar').boundingClientRect((rect) => {
        this.setData({
          navTop: rect.top
        });
      }).exec();
    } else {
      this.setData({
        navTop: 0
      });
    }
  },
  changetypes: function () {
    this.setData({
      types0: !this.data.types0
    })
    if(this.data.types0){
      this.setData({
        internshipType:'远程'
      })
    }
    else{
      this.setData({
        internshipType:'线下'
      })
    }
  },
  changecheck: function () {
    this.setData({
      checks: !this.data.checks
    })
  },
  navigate: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
  },
  queren1: function () {
    this.setData({
      types1: !this.data.types1
    })
    console.log(this.data.hangs)
    this.getTabBar().setData({
      chans: false
    })
  },
  queren2: function () {
    this.setData({
      types2: !this.data.types2
    })
    console.log(this.data.xin)
    this.getTabBar().setData({
      chans: false
    })
  },
  queren3: function () {
    this.setData({
      types3: !this.data.types3
    })
    this.getTabBar().setData({
      chans: false
    })
  },
  hideview() {
    this.setData({
      types1: false,
      types2: false,
      types3: false
    })
    //隐藏tabber
    this.getTabBar().setData({
      chans: false
    })
  },
  changetypest1(e) {
    let ce = true
    if (this.data[e.currentTarget.id]) ce = !ce
    let ts = e.currentTarget.id
    this.setData({
      types1: true,
      types2: false,
      types3: false
    })
    if (ce)
      this.setData({
        [e.currentTarget.id]: !this.data[e.currentTarget.id]
      })
    //隐藏tabber
    this.getTabBar().setData({
      chans: !this.getTabBar().data.chans
    })
    console.log(1234)
  },
  changetypest2(e) {
    let ce = true
    if (this.data[e.currentTarget.id]) ce = !ce
    let ts = e.currentTarget.id
    this.setData({
      types1: false,
      types2: true,
      types3: false
    })
    if (ce)
      this.setData({
        [e.currentTarget.id]: !this.data[e.currentTarget.id]
      })
    //隐藏tabber
    this.getTabBar().setData({
      chans: !this.getTabBar().data.chans
    })
  },
  changetypest3(e) {
    let ce = true
    if (this.data[e.currentTarget.id]) ce = !ce
    let ts = e.currentTarget.id
    this.setData({
      types1: false,
      types2: false,
      types3: true
    })
    if (ce)
      this.setData({
        [e.currentTarget.id]: !this.data[e.currentTarget.id]
      })
    //隐藏tabber
    this.getTabBar().setData({
      chans: !this.getTabBar().data.chans
    })
    console.log(1234)
  },
  bindChange1: function (e) {
    let cc = e.detail.value
    // console.log(cc,e)
    this.setData({
      hangs: this.data.industryes[cc[0]]
    })
  },
  bindChange2: function (e) {
    let cc = e.detail.value
    console.log(cc)
    this.setData({
      xin: this.data.xinzhi[cc[0]]
    })
  },
  bindChange3: function (e) {
    let cc = e.detail.value
    //console.log(cc,'cc')
    let y = this.data.years[cc[0]]
    let m = this.data.months[cc[1]]
    let d = this.data.days[cc[2]]
    console.log(y + '-' + m + '-' + d, this.translateTime(y + '-' + m + '-' + d))

    this.setData({
      applicationDeadLine: y + '-' + m + '-' + d
    })
  },
  chooseImagelogo: function (e) {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          logoImageUrl: tempFilePaths[0]
        });
      },
      fail: function (err) {
        console.error('选择图片失败：', err);
      }
    });
  },
  chooseImagezixun: function (e) {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          zixunImageUrl: tempFilePaths[0]
        });
      },
      fail: function (err) {
        console.error('选择图片失败：', err);
      }
    });
  },
  removeLogo: function () {
    this.setData({
      logoImageUrl: ''
    });
  },
  removeZixun: function () {
    this.setData({
      zixunImageUrl: ''
    });
  },
});