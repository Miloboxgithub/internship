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
    },],
    industry: [{
      op: '全部',
      id: 0
    }, ],
    types1: false,
    types2: false,
    types3: false,
    toppx: 0,
    coitem: [],
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
      id: 0,
    }],
    lolo: false,
    page: 1,
    gun: true, //是否下滑刷新
    sharecoitem:[],
    isFixed : false, // 是否固定顶部
    stickyTop: 210, // 滚动多少px后开始固定
  },
  onLoad() {
    this.getSwiper()
    this.getweizhi()
    // 初始化towerSwiper 传已有的数组名即可
    this.getType()
    wx.showShareMenu({
 
      withShareTicket:true,
       
      menus:['shareAppMessage','shareTimeline']
       
      })
   
  },
  fetchData: function () {
    //console.log('t', this.data.hang, this.data.lei, this.data.xing)
    let r1 = this.data.lei
    let r3 = this.data.xinzhi.find(item => item.op === this.data.xing);
    let r2 = this.data.industry.find(item => item.op === this.data.hang)
    if(r2){
      r2 = r2.id
    }
    if(r3){
      r3 = r3.id
    }
    if(r1=='类型'||r1=='全部')r1 = ''
    //console.log(r1,r2,r3)
    let that = this
    this.setData({
      lolo: true
    })
    wx.request({
      url: `${apiUrl}/internship/selectByContent`, // 拼接完整的 URL
      method: 'POST',
      data: {
        "businessNatureId" :r3,
        "industryTypeId" : r2,
        "internshipType": r1,
        "page": this.data.page,
        "pageSize": 20
      },
      header: {
        'content-type': 'application/json',
        //'token': wx.getStorageSync('v_token') // 传递 token
      },
      success: (res) => {
        if (res.statusCode === 200&&res.data.code==1) {
          //console.log(res)
          let op = res.data.data.records
          let tt = that.data.coitem
          op.forEach((item, k) => {
            let t = {
              id: item.id,
              icon: item.companyLogo,
              name: item.companyName,
              time: app.timeSub(item.deadline),
              jobPosition:item.jobPosition,
              iszhao: item.overTime ? false : true,
              sum: item.pageview,
              industryType: item.industryType,
              tags: [{
                title: item.businessNature
              }, {
                title: item.internshipType
              }, {
                title: this.getSubstringAfterDash(item.location)
              }]
            }
            if (item.internshipType == '远程') {
              t.tags.pop()
              //console.log(t.tags)
            }
            if (!t.sum) t.sum = 0
            tt.push(t)
          })
          
          // if (this.data.hang != '行业' && this.data.hang != '全部') {
          //   tt = tt.filter(item => item.industryType == this.data.hang);
          // }
          // if (this.data.lei != '类型' && this.data.lei != '全部') {
          //   tt = tt.filter(item => item.tags[1].title == this.data.lei);
          // }
          // if (this.data.xing != '性质' && this.data.xing != '全部') {
          //   tt = tt.filter(item => item.tags[0].title == this.data.xing);
          // }
          that.setData({
            coitem: tt
          })
          //console.log(this.data.coitem)
        } else {
          console.error('请求失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
      complete: () => {
        //console.log('请求完成');
        that.setData({
          lolo: false
        })
      }
    });
  },
  onReachBottom() {
    if (this.data.lolo) return
    if (!this.data.gun) return
    this.setData({
      page: this.data.page + 1
    })
    this.fetchData()
  },
  getType() {
    wx.request({
      url: `${apiUrl}/businessNature/getBusinessNatureList`, // 拼接完整的 URL
      method: 'GET',
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        if (res.statusCode === 200&&res.data.code==1) {
          //console.log(res.data.data)
          let ttt = this.data.xinzhi
          res.data.data.forEach((i, k) => {
            ttt.push({
              op: i.businessNature,
              id: i.id,
              ch: false
            })
          })
          this.setData({
            xinzhi: ttt
          })
          wx.request({
            url: `${apiUrl}/industryType/getIndustryTypeList`, // 拼接完整的 URL
            method: 'GET',
            header: {
              'content-type': 'application/json',
            },
            success: (res) => {
              if (res.statusCode === 200&&res.data.code==1) {
                //console.log(res.data.data,'ty')
                let ttt = this.data.industry
                res.data.data.forEach((i, k) => {
                  ttt.push({
                    op: i.industryType,
                    id: i.id
                  })
                })
                this.setData({
                  industry: ttt
                })
                this.setData({
                  hangs: '全部'
                })
                this.fetchData()
              } else {
                console.error('请求失败:', res);
              }
            },
            fail: (err) => {
              console.error('请求失败:', err);
            },
            complete: () => {
              //console.log('请求完成');
            }
          });
        } else {
          console.error('请求失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
      complete: () => {
        //console.log('请求完成');
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
  getSwiper(){
    let that = this
    wx.request({
      url: `${apiUrl}/carousel/getAllCarousel`, // 拼接完整的 URL
      method: 'GET',
      header: {
      },
      success: (res) => {
       //console.log(res,'getAllCarousel')
       if(res.statusCode==200){
        let op = []
        res.data.data.forEach((i,k)=>{
          op.push({
            id:k,
            type:'image',
            url:i.image,
            link:i.link
          })
        })
        that.setData({
          swiperList:op
        })
        this.towerSwiper('swiperList');
       }

      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
      complete: () => {
        //console.log('请求完成');
      }
    });
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
    
    if (app.globalData.sharecoitem.length == 0) {}
    //this.fetchData()
    else {
      wx.showToast({
        title: '搜索成功',
        icon: 'success'
      }, 1000)
      let that = this
      that.setData({
        coitem: [],
        lolo: true,
        gun: false
      })
      let op = app.globalData.sharecoitem
      let tt = []
      console.log(op)
      op.forEach((item, k) => {
        let t = {
          id: item.id,
          icon: item.companyLogo,
          name: item.companyName,
          time: app.timeSub(item.deadline),
          jobPosition:item.jobPosition,
          iszhao: item.overTime ? false : true,
          industryType:item.industryType,
          sum: item.pageview,
          tags: [{
            title: item.businessNature
          }, {
            title: item.internshipType
          }, {
            title: this.getSubstringAfterDash(item.location)
          }]
        }
        if (item.internshipType == '远程') {
          t.tags.pop()
          //console.log(t.tags)
        }
        if (!t.sum) t.sum = 0
        tt.push(t)
      })
      that.setData({
        coitem: tt,
        sharecoitem:tt,
        lolo: false
      })
      app.globalData.sharecoitem = []
    }
    if (app.globalData.pub) {
      this.setData({
        page: 1,
        coitem: []
      })
      this.fetchData();
    }
  },
  getSubstringAfterDash(str) {
  // 使用 split 方法分割字符串
  const parts = str.split('-');
  // 如果有 '-'，返回 '-' 后面的部分；如果没有，返回原字符串
  return parts.length > 1 ? parts[1] : str;
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
  onPullDownRefresh() {
    this.setData({
      page: 1,
      coitem: [],
      gun: true
    })
    this.fetchData();
    // 下拉刷新完成后，需要调用 wx.stopPullDownRefresh 停止刷新动画
    wx.stopPullDownRefresh();
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
    let that = this
    let cc = e.currentTarget.id
    let leixin = this.data.leixin.slice()
    leixin.forEach(item => {
      item.ch = false;
    })
    let aa = leixin[cc].op.substring(0, 2);
    //console.log(aa)
    if (cc >= 0 && cc < leixin.length) {
      leixin[cc].ch = true
      this.setData({
        lei: aa
      })
    }
    this.setData({
      leixin: leixin,
      page: 1,
      coitem: []
    })
    if(this.data.gun)
    this.fetchData()
    else{
      let tt = this.data.sharecoitem
      if (this.data.hang != '行业' && this.data.hang != '全部') {
        tt = tt.filter(item => item.industryType == this.data.hang);
      }
      if (this.data.lei != '类型' && this.data.lei != '全部') {
        tt = tt.filter(item => item.tags[1].title == this.data.lei);
      }
      if (this.data.xing != '性质' && this.data.xing != '全部') {
        tt = tt.filter(item => item.tags[0].title == this.data.xing);
      }
      this.setData({
        coitem:tt
      })
    }
    that.hideview()
  },
  //选择性质
  chooseopp(e) {
    let cc = e.currentTarget.id
    let xinzhi = this.data.xinzhi.slice()
    xinzhi.forEach(item => {
      item.ch = false;
    })
    let aa = xinzhi[cc].op
    //console.log(aa)
    if (cc >= 0 && cc < xinzhi.length) {
      xinzhi[cc].ch = true
      this.setData({
        xing: aa
      })
    }
    this.setData({
      xinzhi: xinzhi,
      page: 1,
      coitem: []
    })
    if(this.data.gun)
    this.fetchData()
    else{
      let tt = this.data.sharecoitem
      if (this.data.hang != '行业' && this.data.hang != '全部') {
        tt = tt.filter(item => item.industryType == this.data.hang);
      }
      if (this.data.lei != '类型' && this.data.lei != '全部') {
        tt = tt.filter(item => item.tags[1].title == this.data.lei);
      }
      if (this.data.xing != '性质' && this.data.xing != '全部') {
        tt = tt.filter(item => item.tags[0].title == this.data.xing);
      }
      this.setData({
        coitem:tt
      })
    }
    this.hideview()
  },
  //选择器变化
  bindChange: function (e) {
    let cc = e.detail.value
    //console.log(cc)
    this.setData({
      hangs: this.data.industry[cc[0]].op
    })
  },
  queren: function () {
    this.setData({
      hang: this.data.hangs,
      page: 1,
      coitem: []
    })
    if(this.data.gun)
    this.fetchData()
    else{
      let tt = this.data.sharecoitem
      //console.log(tt)
      if (this.data.hang != '行业' && this.data.hang != '全部') {
        tt = tt.filter(item => item.industryType == this.data.hang);
      }
      if (this.data.lei != '类型' && this.data.lei != '全部') {
        tt = tt.filter(item => item.tags[1].title == this.data.lei);
      }
      if (this.data.xing != '性质' && this.data.xing != '全部') {
        tt = tt.filter(item => item.tags[0].title == this.data.xing);
      }
      this.setData({
        coitem:tt
      })
    }
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
    //console.log(url)
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
    //console.log(1234)
  },
  onShareAppMessage: function () {

    return {
      title: '更多机会，更优选择！',
      path: '/pages/home/home',
    }
  },
  onShareTimeline: function(){

    return {
      title: '更多机会，更优选择！',

    }
  },
  goTowebView(e){
    let url = e.currentTarget.dataset.link
    //if(!url)return
    url = encodeURIComponent(url)
    wx.navigateTo({
      url: `/pages/webView/webView?url=${url}`,
    })
  },
  onScroll(e) {
    const scrollTop = e.detail.scrollTop;
    this.setData({
      isFixed: scrollTop >= this.data.stickyTop,
    });
    if(scrollTop >= this.data.stickyTop){
      this.setData({
        toppx:48
      })
    }
    else{
      this.getweizhi();
    }
  }
})
