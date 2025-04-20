const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coitem: {
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
    // site:['武汉','深圳'],
    // ott:['1.协助跟进集团全国福利运营，包括优化现行福利项目等工作;','2.积极参与策划集团福利活动，跟进后续项目落地与执行;','3.整理统计处理并分析报表的数据；','4.协助参与品牌新媒体运营工作，包括文案撰写、海报设计及视频剪辑等。'],
    // req:['1.2025年及以后毕业生(本科/硕士)一周需保证至少出勤4天，需至少实习3个月，可实习6个月优先;','2.具备出色的沟通协调能力，逻辑思维能力，应变能等，做事认真谨慎；','3.有宣发思维，具有创意性，能快速提炼出宣发亮点者优先。'],
    // gain:['1.请1.跟随公司运营团队，学习全流程直播运营策略，在实战中掌握运营的具体打法及方法论;。','2.团队里有多位工作四年以上、热情积极的直播运营操盘手，欢迎想获得成长一起快乐工作的同学加入'],
    // links:"https://xiaomi.jobs.f.mioffice.cn/internship/m/position/7394642885997997/detail?spread=6AA3R7B",
    // timee:'2024年12月31日',
    // bei:'无',
    site: [],
    ott: [],
    req: [],
    gain: [],
    links: '',
    timee: '',
    bei: '',
    lolo: false,
    picture: [],
    bei: '',
    idd: 0,
    pid:0,
    cpp: {},
    collected:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id) {
      console.log(options.id, '------------')
    }
    this.GetData(options.id)
    this.setData({
      idd: options.id
    })
    wx.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeline'],// 需要显示的转发按钮名称列表.合法值包含 "shareAppMessage"、"shareTimeline"
      success(res) {
        console.log(res,321);
      },
      fail(e) {
        console.log(e);
      }
    });
  },
  GetData(id) {
    let that = this
    this.setData({
      coitem: [],
      lolo: true
    })
    wx.request({
      url: `${apiUrl}/internship/select/${id}`, // 拼接完整的 URL
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('v_token') // 传递 token
      },
      success: (res) => {
        if (res.statusCode === 200) {
          let ans = res.data.data
          this.setData({
            cpp: ans,
            pid:ans.positionId
          })
          console.log(ans, 'ans')
          let site = [],
            ott = [],
            req = [],
            gain = []
          if (Array.isArray(ans.location)) site = that.getSubstringAfterDash(ans.location)
          else {
            if (!ans.location) site.push('远程')
            else site.push(that.getSubstringAfterDash(ans.location))
          }
          ott.push(ans.responsibility)
          req.push(ans.requirement)
          gain.push(ans.harvest)
          let tags = [{
            title: ans.businessNature
          }, {
            title: ans.internshipType
          }, {
            title: this.getSubstringAfterDash(ans.location)
          }]
          if (ans.internshipType != '线下') {
            tags = [{
              title: ans.businessNature
            }, {
              title: ans.internshipType
            }]
          }
          that.setData({
            coitem: {
              icon: ans.companyLogo,
              name: ans.companyName,
              time: app.timeSub(ans.deadline),
              jobPosition:ans.jobPosition,
              iszhao: app.cmpToday(ans.deadline) ? true : false,
              sum: ans.pageview,
              tags: tags
            },
            site,
            ott,
            req,
            gain,
            links: ans.deliveryMethod,
            timee:  app.timeSub(ans.deadline),
            picture: app.splits(ans.consultPhoto),
            bei: ans.remark,
            collected:ans.collected
          })

          that.setData({
            lolo: false,
            collected:ans.collected
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
      url: `${apiUrl}/internship/addPageView/${id}`, // 拼接完整的 URL
      method: 'PUT',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('v_token') // 传递 token
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data, 'addview')
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
  getSubstringAfterDash(str) {
  // 使用 split 方法分割字符串
  const parts = str.split('-');
  // 如果有 '-'，返回 '-' 后面的部分；如果没有，返回原字符串
  return parts.length > 1 ? parts[1] : str;
  },
  extractDate(dateTimeString) {
    // 使用字符串分割方法提取日期部分
    return dateTimeString.split('T')[0];
  },
  extractDates(dateTimeString) {
    // 使用字符串分割方法提取日期部分
    var datePart = dateTimeString.split('T')[0];
    // 将日期部分分割为年、月、日
    var dateParts = datePart.split('-');
    // 将月份和日期部分转换为两位数格式（如果需要）
    var month = dateParts[1].length === 1 ? '0' + dateParts[1] : dateParts[1];
    var day = dateParts[2].length === 1 ? '0' + dateParts[2] : dateParts[2];
    // 返回格式化的日期字符串
    return dateParts[0] + "年" + month + "月" + day + "日";
  },
  goBack: function () {
    const pages = getCurrentPages();

    const currentPage = pages[pages.length - 1]; // 当前页面
    const prevPage = pages[pages.length - 2]; // 上一级页面
    console.log(prevPage,prevPage)
  // 检查是否有上一级页面
  if (prevPage) {
    // 有上一级页面，返回上一级
    wx.navigateBack({
      delta: 1 // 返回上一级页面
    });
  } else {
    // 没有上一级页面，重定向到指定页面
    console.log(123)
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
  },
  fuzhi: function () {
    wx.setClipboardData({
      data: this.data.links,
      success: function (res) {
        // 成功复制后的回调
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function (err) {
        // 复制失败后的回调
        wx.showToast({
          title: '复制失败',
          icon: 'error',
          duration: 2000
        });
      }
    });
  },
  shouchang() {
    let id = this.data.idd
    wx.request({
      url: `${apiUrl}/internship/addCollection/${id}`, // 拼接完整的 URL
      method: 'POST',
      header: {
        'content-type': 'application/json',
        token: wx.getStorageSync('v_token')
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res)
          // 成功复制后的回调
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          });
          this.setData({
            collected:true
          })
        } else {
          console.error('请求失败:', res);
          wx.setStorageSync('loginStatus', false)
          wx.showModal({
            title: '未登录！',
            content: '请先去个人页面进行登录',
            complete: (res) => {
              if (res.cancel) {

              }
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/person/person',
                })
              }
            }
          })
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '收藏失败',
          icon: 'error',
          duration: 2000
        });
      },
      complete: () => {
        console.log('请求完成');
      }
    });

  },
  deletes: function () {
    let that = this
    let ids = []
    ids.push(this.data.idd)
    console.log(ids)
    wx.request({
      url: `${apiUrl}/internship/cancelCollectionByList`, // 拼接完整的 URL
      method: 'POST',
      data: ids,
      header: {
        'content-type': 'application/json',
        token: wx.getStorageSync('v_token')
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res)
          this.setData({
            collected:false
          })
          wx.showToast({
            title: '取消成功',
            icon: 'success'
          })
        } else {
          console.error('请求失败:', res);
          wx.setStorageSync('loginStatus', false)
          wx.showModal({
            title: '未登录！',
            content: '请先去个人页面进行登录',
            complete: (res) => {
              if (res.cancel) {

              }
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/person/person',
                })
              }
            }
          })
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
  copyText: function (event) {
    // 定义要复制的文本，包含换行符
    let c = this.data.cpp
    console.log(c)
    // const textToCopy = `
    // 公司名称：${c.companyName}
    // 公司类型：${c.businessNature}
    // 招聘岗位：${c.jobPosition}
    // 实习类型：${c.internshipType}
    // 实习地点：${c.location}
    // 岗位职责：${c.responsibility}
    // 岗位要求：${c.requirement}
    // 实习收获：${c.harvest}
    // 投递方式：${c.deliveryMethod}
    // 截止时间：${c.deadline}
    // `;
    const textToCopy = c.deliveryMethod
    wx.setClipboardData({
      data: textToCopy,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function (err) {
        console.error('复制失败', err);
        wx.showToast({
          title: '复制失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  onLongPress(event) {
    //console.log(event.currentTarget.dataset.url)
    const imageUrl = event.currentTarget.dataset.url; // 获取图片的路径
    wx.previewImage({
      current: imageUrl, // 当前要显示的图片url
      urls: [imageUrl], // 需要预览的图片url列表数组
      success: function (res) {
        console.log('图片预览成功', res);
      },
      fail: function (err) {
        console.error('图片预览失败', err);
      }
    });
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    console.log(666,this.data.coitem.icon)
    return {
      title: this.data.coitem.name,
      path: `/pkgA/pages/detail/detail?id=${this.data.idd}` // 设置分享的页面路径
    };
  },
  // onShareAppMessage(res) {
  //   //  if (res.from === 'button') {
  //   //    // 来自页面内 share-button
  //   //  }
  //   console.log(encodeURI(this.data.coitem.icon),123456789)
  //   return {
  //     title: this.data.coitem.name,
  //     path: `/pkgA/pages/detail/detail?id=${this.data.idd}`, // 分享的页面路径
  //     // imageUrl: 'https://shixi.xydsh.cn:80/images/companyLogo/f0cc8795-b8d7-42a7-b44d-3dd8ded9b7f6.jpg', // 分享图片的 URL
  //   };
  // },
  // sharee: function () {
  //   wx.showShareMenu({
  //     withShareTicket: true,
  //     menus: ['shareAppMessage', 'shareTimeline']
  //   })

  //   // 触发分享
  //   this.onShareAppMessage();
  // },
  navigate: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
  },
})