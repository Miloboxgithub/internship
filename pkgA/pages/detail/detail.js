const app = getApp(); // 获取全局 App 实例
const apiUrl = app.globalData.apiUrl; // 获取全局 API 前缀
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coitem:{ icon: 'https://img.js.design/assets/img/6557681b09dc6027548deca3.png#e04933f171c303ed86198233ba372fb9',
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
    }]},
    // site:['武汉','深圳'],
    // ott:['1.协助跟进集团全国福利运营，包括优化现行福利项目等工作;','2.积极参与策划集团福利活动，跟进后续项目落地与执行;','3.整理统计处理并分析报表的数据；','4.协助参与品牌新媒体运营工作，包括文案撰写、海报设计及视频剪辑等。'],
    // req:['1.2025年及以后毕业生(本科/硕士)一周需保证至少出勤4天，需至少实习3个月，可实习6个月优先;','2.具备出色的沟通协调能力，逻辑思维能力，应变能等，做事认真谨慎；','3.有宣发思维，具有创意性，能快速提炼出宣发亮点者优先。'],
    // gain:['1.请1.跟随公司运营团队，学习全流程直播运营策略，在实战中掌握运营的具体打法及方法论;。','2.团队里有多位工作四年以上、热情积极的直播运营操盘手，欢迎想获得成长一起快乐工作的同学加入'],
    // links:"https://xiaomi.jobs.f.mioffice.cn/internship/m/position/7394642885997997/detail?spread=6AA3R7B",
    // timee:'2024年12月31日',
    // bei:'无',
    site:[],
    ott:[],
    req:[],
    gain:[],
    links:'',
    timee:'',
    bei:'',
    lolo:false,
    picture:'',
    bei:'',
    idd:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      if(options.coitem){
        console.log(options.coitem,'------------')
      }
      this.GetData(options.coitem)
      this.setData({
        idd:options.coitem
      })
  },
  GetData(id){
    let that = this
    this.setData({
      coitem:[],
      lolo:true
    })
    wx.request({
      url: `${apiUrl}/api/internship/getInternshipDetails/${id}`, // 拼接完整的 URL
      method: 'GET',
      
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          let ans= res.data.data
          console.log(ans)
          let site = [] ,ott = [] , req=[] , gain=[]
          if(Array.isArray(ans.location))site=ans.location
          else site.push(ans.location)
          ott.push(ans.description)
          req.push(ans.requirement)
          gain.push(ans.acquisitions)
          that.setData({
            coitem:{
              icon:ans.companyLogo,
              name:ans.companyName,
              time:that.extractDate(ans.applicationDeadLine),
            iszhao:true,
            sum:ans.salary,
            tags: [{
              title: ans.companyType
            }, {
              title: ans.positionType
            }, {
              title: ans.location
            }]
            },
            site,
            ott,
            req,
            gain,
            links:ans.contactInfo,
            timee:that.extractDates(ans.applicationDeadLine),
            picture:ans.picture,
            bei:ans.memo
          })
          that.setData({
            lolo:false
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
  goBack: function() {
          wx.navigateBack({
           delta: 1 // 返回上一级页面
          });
        },
  fuzhi: function(){
    wx.setClipboardData({
            data: this.data.links,
           success: function(res) {
              // 成功复制后的回调
              wx.showToast({
                title: '复制成功',
                icon: 'success',
                duration: 2000
              });
            },
            fail: function(err) {
              // 复制失败后的回调
              wx.showToast({
                title: '复制失败',
                icon: 'error',
                duration: 2000
              });
            }
          });
  },
  shouchang(){
    
    wx.request({
      url: `${apiUrl}/api/favorites/add`, // 拼接完整的 URL
      method: 'GET',
      data:{
        userId:5,
        internshipId:parseInt(this.data.idd)
      },
      header: {
        'content-type': 'application/json'
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
        } else {
          console.error('请求失败:', res);
          wx.showToast({
            title: '收藏失败',
            icon: 'error',
            duration: 2000
          });
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
  fuzhimsg(){
    wx.setClipboardData({
      data: '12345',
      success: function(res) {
        wx.showToast({
          title: '复制成功',
        });
      },
      fail: function(err) {
        console.error('复制失败：', err);
        wx.showToast({
          title: '复制失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  onShareAppMessage: function (res) {
      //  if (res.from === 'button') {
      //    // 来自页面内 share-button
      //  }
       return {
          title: '分享标题hhhhh',
          path: '/pkgA/pages/detail/detail', // 分享的页面路径
          imageUrl: '', // 分享图片的 URL
          query: '' // 分享链接的查询参数
        };
      },
      sharee: function(){
        wx.showShareMenu({
               withShareTicket: true,
               menus: ['shareAppMessage']
              });
          
              // 触发分享
              this.onShareAppMessage();
      },
      navigate: function (e) {
        wx.navigateTo({url: e.currentTarget.dataset.url});
      },
})