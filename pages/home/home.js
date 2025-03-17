const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({
  data: {
    hua: true,
    lei: '类型',
    xing: '性质',
    hang: '行业',
    hangs: '',
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://img.js.design/assets/img/6690dfbf1af97b1f8ea999cc.jpg#295565f169a0eb19e9101bc83d69b509'
    }, {
      id: 1,
      type: 'image',
      url: 'https://picsum.photos/700/301',
    }, {
      id: 2,
      type: 'image',
      url: 'https://picsum.photos/700/300'
    }, {
      id: 3,
      type: 'image',
      url: 'https://picsum.photos/700/302'
    }, {
      id: 4,
      type: 'image',
      url: 'https://picsum.photos/700/303'
    }, {
      id: 5,
      type: 'image',
      url: 'https://picsum.photos/700/304'
    }, {
      id: 6,
      type: 'image',
      url: 'https://picsum.photos/700/305'
    }],
    industry: [
      {op:'全部',id:0},
    ],
    types1: false,
    types2: false,
    types3: false,
    toppx: 0,
    coitem: [{
        id: 1,
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
        }]
      }, {
        id: 11,
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
        }]
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
        }]
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
        }]
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
        }]
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
        }]
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
        }]
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
        }]
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
        }]
      },
      {
        icon: 'https://img.js.design/assets/img/6557681b09dc6027548deca3.png#e04933f171c303ed86198233ba372fb9',
        name: '振石控股集团有限公司——社媒运营',
        time: '2024-12-31',
        iszhao: true,
        sum: 5000,
      }
    ],
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
    xinzhi: [{
      op: '全部',
      ch: true,
      id:0,
    }],
    lolo: false
  },
  onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
    this.getType()
  wx.request({
    url: `${apiUrl}/admin/login`, // 拼接完整的 URL
    method: 'POST',
    data:{
      account: "123",
    password: "123"
    },
    header: {
      'content-type': 'application/json'
    },
    success: (res) => {
     console.log(res)
     if(res.statusCode==200){
      wx.setStorageSync('v_token',res.data.data);
      //console.log(wx.getStorageSync('v_token'),'123321')
     this.fetchData()
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
  fetchData: function () {
    let that = this
    this.setData({
      coitem: [],
      lolo: false
    })
    wx.request({
      url: `${apiUrl}/internship/getByPage`, // 拼接完整的 URL
      method: 'POST',
      data:{
        "page": 1,
        "pageSize": 30
      },
      header: {
        'content-type': 'application/json',
        //'token': wx.getStorageSync('v_token') // 传递 token
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res)
          let op = res.data.data.records
          let tt = []
          op.forEach((item, k) => {
            let t = {
              id: item.id,
              // icon:`https://picsum.photos/30${Math.floor(Math.random() * 10)}/30${Math.floor(Math.random() * 10)}`,
              icon: item.companyLogo,
              name: item.companyName,
              time: that.extractDate(item.deadline),
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
            if(!t.sum)t.sum = 0
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
  getType(){
    wx.request({
      url: `${apiUrl}/businessNature/getBusinessNatureList`, // 拼接完整的 URL
      method: 'GET',
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data.data)
          let ttt = this.data.xinzhi
          res.data.data.forEach((i,k)=>{
            ttt.push({
              op:i.businessNature,
              id:i.id,
              ch:false
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
          console.log(res.data.data)
          let ttt = this.data.industry
          res.data.data.forEach((i,k)=>{
            ttt.push({
              op:i.industryType,
              id:i.id
            })
          })
          this.setData({
            industry:ttt
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
  extractDate(dateTimeString) {
    // 使用字符串分割方法提取日期部分
    return dateTimeString.split('T')[0];
  },
  handleOuterTouchMove: function (e) {
    e.preventDefault(); // 阻止外层默认滑动行为
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  onShow() {
    if (typeof this.getTabBar === 'function') {
      this.getTabBar().setData({
        selected: 0
      })
    }
    this.getweizhi()
    if(app.globalData.sharecoitem.length==0){}
    //this.fetchData()
    else{
      let that =this
      that.setData({
        coitem:[],
        lolo:true,
      })
      let op = app.globalData.sharecoitem
          let tt = []
          op.forEach((item, k) => {
            let t = {
              // icon:item.companyLogo,
              id: item.id,
              // icon:`https://picsum.photos/30${Math.floor(Math.random() * 10)}/30${Math.floor(Math.random() * 10)}`,
              icon: item.companyLogo,
              name: item.companyName,
              time: that.extractDate(item.applicationDeadLine),
              iszhao: true,
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
          app.globalData.sharecoitem=[]
    }
  },
  changetypes(e) {
    let ce = true
    if (this.data[e.currentTarget.id]) ce = !ce
    let ts = e.currentTarget.id
    this.setData({
      types1: false,
      types2: false,
      types3: false
    })
    if (ce)
      this.setData({
        [e.currentTarget.id]: !this.data[e.currentTarget.id]
      })
    // let as=this.data
    // if(as.types1||as.types2||as.types3){
    //   this.setData({
    //     hua:false
    //   })
       //console.log(123)
    // }
  },
  // 关闭遮罩层
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
  // 获取选框位置
  getweizhi() {
    const qq = wx.createSelectorQuery();
    qq.select('.divider').boundingClientRect();
    qq.exec((res) => {
      //console.log(res[0].top)
      this.setData({
        toppx: res[0].top
      })
    })

  },
  //选择类型
  chooseop(e) {
    let cc = e.currentTarget.id
    let leixin = this.data.leixin.slice()
    leixin.forEach(item => {
      item.ch = false;
    })
    let aa = leixin[cc].op
    console.log(aa)
    if (cc >= 0 && cc < leixin.length) {
      leixin[cc].ch = true
      this.setData({
        lei: aa
      })
    }
    this.setData({
      leixin: leixin
    })
    wx.request({
      url: `${apiUrl}/internship/selectByContent`, // 拼接完整的 URL
      method: 'GET',
      data:{
        companyName: "",
        businessNature : ctype
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data.data)
          let op = res.data.data
          let tt = []
          op.forEach((item, k) => {
            let t = {
              // icon:item.companyLogo,
              id: item.id,
              // icon:`https://picsum.photos/30${Math.floor(Math.random() * 10)}/30${Math.floor(Math.random() * 10)}`,
              icon: item.companyLogo,
              name: item.companyName,
              time: that.extractDate(item.applicationDeadLine),
              iszhao: true,
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
  //选择性质
  chooseopp(e) {
    let cc = e.currentTarget.id
    let xinzhi = this.data.xinzhi.slice()
    xinzhi.forEach(item => {
      item.ch = false;
    })
    let aa = xinzhi[cc].op
    if (cc >= 0 && cc < xinzhi.length) {
      xinzhi[cc].ch = true
      this.setData({
        xing: aa
      })
    }
    this.setData({
      xinzhi: xinzhi
    })
    console.log(this.data.xinzhi[cc].op,'op')
    let ctype = this.data.xinzhi[cc].op
    
    let that = this
    this.setData({
      coitem: [],
      lolo: false
    })
    if(ctype!='全部')
    wx.request({
      url: `${apiUrl}/internship/selectByContent`, // 拼接完整的 URL
      method: 'GET',
      data:{
        companyName: "",
        businessNature : ctype
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data.data)
          let op = res.data.data
          let tt = []
          op.forEach((item, k) => {
            let t = {
              // icon:item.companyLogo,
              id: item.id,
              // icon:`https://picsum.photos/30${Math.floor(Math.random() * 10)}/30${Math.floor(Math.random() * 10)}`,
              icon: item.companyLogo,
              name: item.companyName,
              time: that.extractDate(item.applicationDeadLine),
              iszhao: true,
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
    else that.fetchData()
    that.hideview()
  },
  //选择器变化
  bindChange: function (e) {
    let cc = e.detail.value
    console.log(cc)
    this.setData({
      hangs: this.data.industry[cc[0]]
    })
  },
  queren: function () {
    this.setData({
      hang: this.data.hangs
    })
    wx.request({
      url: `${apiUrl}/internship/selectByContent`, // 拼接完整的 URL
      method: 'GET',
      data:{
        companyName: "",
        businessNature : ctype
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data.data)
          let op = res.data.data
          let tt = []
          op.forEach((item, k) => {
            let t = {
              // icon:item.companyLogo,
              id: item.id,
              // icon:`https://picsum.photos/30${Math.floor(Math.random() * 10)}/30${Math.floor(Math.random() * 10)}`,
              icon: item.companyLogo,
              name: item.companyName,
              time: that.extractDate(item.applicationDeadLine),
              iszhao: true,
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
    this.hideview()
  },
  //跳转页面
  navigate: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
  },
  //带参跳转
  navigates: function (e) {
    let ww = e.currentTarget.dataset.id
    let ans = this.data.coitem[ww].id
    let url = `/pkgA/pages/detail/detail?id=${ans}`
    console.log(url)
    wx.navigateTo({
      url: url
    });
  },
  changetypest(e) {
    let ce = true
    if (this.data[e.currentTarget.id]) ce = !ce
    let ts = e.currentTarget.id
    this.setData({
      types1: false,
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
})