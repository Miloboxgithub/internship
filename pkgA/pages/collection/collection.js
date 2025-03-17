const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
let coco = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quanxuan: false,
    numbs: 0,
    lei: '类型',
    zhuang: '状态',
    types1: false,
    types2: false,
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
    zhuangtai: [{
      op: '全部',
      ch: true
    }, {
      op: '招募中',
      ch: false
    }, {
      op: '筹备中',
      ch: false
    }],
    toppx: 0,
    coitem: [],
  },
  fetchList() {
    let that = this
    coco = []
    wx.request({
      url: `${apiUrl}/api/favorites/list`, // 拼接完整的 URL
      method: 'GET',
      data: {
        userId: 5
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          let arr = res.data.data
          // arr.forEach((item, index) => {
          //   that.fetchData(item.internshipID)
          // })
          // 使用 Promise.all 等待所有 fetchData 完成
          Promise.all(arr.map(item => that.fetchData(item.internshipID))).then(() => {
              console.log('All fetchData calls are completed.');
              // 在这里调用完成后的函数
              that.setData({
                coitem: coco
              })
            })
            .catch(error => {
              console.error('Error in fetching data:', error);
            });

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
  quanxuans() {
    this.setData({
      quanxuan: !this.data.quanxuan
    })
    let co = this.data.coitem
    co.forEach(item => {
      item.isdian = this.data.quanxuan
    })
    this.setData({
      coitem: co
    })
    co = this.data.coitem
    let sum = 0
    co.forEach(item => {
      if (item.isdian) {
        sum++
      }
    })
    this.setData({
      numbs: sum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
  changetypes(e) {
    let ce = true
    if (this.data[e.currentTarget.id]) ce = !ce
    let ts = e.currentTarget.id
    this.setData({
      types1: false,
      types2: false
    })
    if (ce)
      this.setData({
        [e.currentTarget.id]: !this.data[e.currentTarget.id]
      })
  },
  chooseop(e) {
    let cc = e.currentTarget.id
    let leixin = this.data.leixin.slice()
    leixin.forEach(item => {
      item.ch = false;
    })
    let aa = leixin[cc].op
    if (cc >= 0 && cc < leixin.length) {
      leixin[cc].ch = true
      this.setData({
        lei: aa
      })
    }
    this.setData({
      leixin: leixin
    })
  },
  choosetai(e) {
    let cc = e.currentTarget.id
    let zhuangtai = this.data.zhuangtai.slice()
    zhuangtai.forEach(item => {
      item.ch = false;
    })
    let aa = zhuangtai[cc].op
    if (cc >= 0 && cc < zhuangtai.length) {
      zhuangtai[cc].ch = true
      this.setData({
        zhuang: aa
      })
    }
    this.setData({
      zhuangtai: zhuangtai
    })
  },
  dianji(e) {
    let cc = e.currentTarget.dataset.id
    let di = this.data.coitem.slice()
    if (cc >= 0 && cc < di.length) {
      di[cc].isdian = !di[cc].isdian
    }
    this.setData({
      coitem: di
    })
    let co = this.data.coitem
    let sum = 0
    co.forEach(item => {
      if (item.isdian) {
        sum++
      }
    })
    let cha = false
    if (sum == co.length) cha = true

    this.setData({
      numbs: sum,
      quanxuan: cha
    })
  },
  //带参跳转
  navigates: function (e) {
    let ww = e.currentTarget.dataset.id
    let ans = this.data.coitem[ww]
    let url = `/pkgA/pages/detail/detail?coitem=${ans}`
    console.log(url)
    wx.navigateTo({
      url: url
    });
  },
  fetchData: function (id) {
    let that = this
    wx.request({
      url: `${apiUrl}/internship/getMyCollection`, // 拼接完整的 URL
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
  //   return new Promise((resolve, reject) => {
  //   wx.request({
  //     url: `${apiUrl}/api/internship/getInternshipDetails/${id}`, // 拼接完整的 URL
  //     method: 'GET',
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: (res) => {
  //       if (res.statusCode === 200) {
  //         let item = res.data.data
  //         let t = {
  //           // icon:item.companyLogo,
  //           id: item.id,
  //           // icon:`https://picsum.photos/30${Math.floor(Math.random() * 10)}/30${Math.floor(Math.random() * 10)}`,
  //           icon: item.companyLogo,
  //           name: item.companyName,
  //           time: that.extractDate(item.applicationDeadLine),
  //           iszhao: true,
  //           sum: item.salary,
  //           tags: [{
  //             title: item.companyType
  //           }, {
  //             title: item.positionType
  //           }, {
  //             title: item.location
  //           }]
  //         }
  //         coco.push(t)
  //       } else {
  //         console.error('请求失败:', res);
  //       }
  //       resolve(res);
  //     },
  //     fail: (err) => {
  //       console.error('请求失败:', err);
  //       reject(err);
  //     },
  //     complete: () => {
  //       console.log('请求完成');
  //     }
  //   });
  // })
  },
  deletes:function(){
    wx.request({
      url: `${apiUrl}/internship/cancelCollection/6`, // 拼接完整的 URL
      method: 'DELETE',
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
  extractDate(dateTimeString) {
    // 使用字符串分割方法提取日期部分
    return dateTimeString.split('T')[0];
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getweizhi()
    this.fetchList()
  },
  getweizhi() {
    const qq = wx.createSelectorQuery();
    qq.select('.nav').boundingClientRect();
    qq.exec((res) => {
      //console.log(res[0],'hhh')
      this.setData({
        toppx: res[0].bottom
      })
    })
  },
  hideview() {
    this.setData({
      types1: false,
      types2: false,
    })
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