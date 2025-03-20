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
    value: [0, 0, 0], // 默认选择的年月日索引
    years: [],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    days: [],
    currentDate:'', // 当前日期
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
     idd:0,
     memo:'',
  },
  onLoad(options) {
    this.getType()
    if(options.id){
      console.log(options.id,'------------')
    }
    this.GetData(options.id)
    this.setData({
      idd:options.id
    })
    this.initDatePicker()
},
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  GetData(id){
    let that = this
    this.setData({
      coitem:[],
      lolo:true
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
          let ans= res.data.data
          console.log(ans,'ans')
          that.setData({
            companyName : ans.companyName,
            hangs:{op:ans.industryType,id:ans.industryTypeId},
            xin:{op:ans.businessNature,id:ans.businessNatureId},
            position:ans.jobPosition,
            internshipType:ans.internshipType,
            location:ans.location,
            description:ans.responsibility,
            requirements:ans.requirement,
            acquisitions:ans.harvest,
            contactInfo:ans.deliveryMethod,
            applicationDeadLine:ans.deadline,
            logoImageUrl:ans.companyLogo,
            zixunImageUrl:ans.consultPhoto,
            memo:ans.remark,
          })
          if(ans.internshipType != "线下")this.setData({
            types0:true
          })
          console.log(this.data.memo,'---------')
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

  },
  queren2: function () {
    this.setData({
      types2: !this.data.types2
    })
    console.log(this.data.xin)

  },
  queren3: function () {
    this.setData({
      types3: !this.data.types3
    })

  },
  hideview() {
    this.setData({
      types1: false,
      types2: false,
      types3: false
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
    console.log(1234)
  },
  inputed(e) {
    console.log(e.detail.value)
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
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
    this.updateDaysOfMonth(y, m);
    this.setData({
      applicationDeadLine: y + '-' + m + '-' + d
    })
  },
  shanchu: function(){
    var that = this;
    wx.showModal({
      title: '删除后无法恢复！',
      // content: '删除后无法恢复！',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击了确定');
          let id = that.data.idd
          wx.request({
            url: `${apiUrl}/internship/deleteById/${id}`, // 拼接完整的 URL
            method: 'DELETE',
            header: {
              'content-type': 'application/json',
              token: wx.getStorageSync('v_token')
            },
            success: (res) => {
              if (res.statusCode === 200) {
                console.log(res.data)
                wx.showToast({
                  title: '删除成功！',
                })
                setTimeout(()=>{
                  wx.navigateBack()
                },1000)
                
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
        } else if (res.cancel) {
          console.log('用户点击了取消');
          // 用户点击了取消，不需要做任何事情
        }
      },
      fail: function(err) {
        console.error('调用showModal失败：', err);
      }
    });
  },
  xiugai: function(){
    const {companyName, hangs, xin, position, internshipType, location, description, requirements, acquisitions, contactInfo, applicationDeadLine, logoImageUrl } = this.data;

    // 检查每个字段是否为空
    if (!companyName) {
      wx.showToast({
        title: '请填写公司名称',
        icon: 'none'
      });
      return;
    }
    if (!hangs.op) {
      wx.showToast({
        title: '请填写行业类型',
        icon: 'none'
      });
      return;
    }
    if (!xin.op) {
      wx.showToast({
        title: '请填写公司性质',
        icon: 'none'
      });
      return;
    }
    if (!position) {
      wx.showToast({
        title: '请填写招聘岗位',
        icon: 'none'
      });
      return;
    }
    if (!internshipType) {
      wx.showToast({
        title: '请填写实习类型',
        icon: 'none'
      });
      return;
    }
    if (!this.data.types0&&!location) {
      wx.showToast({
        title: '请填写实习地点',
        icon: 'none'
      });
      return;
    }
    if (!description) {
      wx.showToast({
        title: '请填写岗位职责',
        icon: 'none'
      });
      return;
    }
    if (!requirements) {
      wx.showToast({
        title: '请填写岗位要求',
        icon: 'none'
      });
      return;
    }
    if (!acquisitions) {
      wx.showToast({
        title: '请填写实习收获',
        icon: 'none'
      });
      return;
    }
    if (!contactInfo) {
      wx.showToast({
        title: '请填写投递方式',
        icon: 'none'
      });
      return;
    }
    if (!applicationDeadLine) {
      wx.showToast({
        title: '请填写截止时间',
        icon: 'none'
      });
      return;
    }
    if (!logoImageUrl) {
      wx.showToast({
        title: '请填写公司Logo',
        icon: 'none'
      });
      return;
    }

    // 如果所有字段都已填写，提交表单
    console.log('提交表单', this.data);
    // 这里可以添加提交表单的代码，例如使用 wx.request 发送数据到服务器
    if(!this.data.checks){
      wx.showToast({
        title: '请阅读并勾选隐私协议!',
        icon:'none'
      })
      return;
    }
    if(internshipType == '远程')
    {
      this.setData({
        location:''
      })
    }
    let pmsg = {
      id:this.data.idd,
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
      deadline: this.data.applicationDeadLine,
      companyLogo: this.data.logoImageUrl,
      consultPhoto: this.data.zixunImageUrl,
      pageview : 0,//浏览量
      weights : 1,//权重
      remark: this.data.memo,
      industryTypeId:this.data.hangs.id ,
      businessNatureId:this.data.xin.id,
      overTime: 1,
    }
    console.log(pmsg,'xiugai')
    wx.request({
      url: `${apiUrl}/internship/modifyById`, // 拼接完整的 URL
      method: 'PUT',
      data: pmsg,
      header: {
        token:wx.getStorageSync('v_token')
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res)
          wx.showToast({
            title: '修改成功！',
            icon: 'success',
            duration: 2000
          });
        setTimeout(()=>{
          wx.navigateBack()
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
  initDatePicker() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    // 获取年份数组
    const years = [];
    for (let i = 0; i < 3; i++) {
      years.push(year + i);
    }
    this.setData({ years: years });
    // 获取日期数组
    this.updateDaysOfMonth(year, month + 1);
    // 设置picker-view的value
    const yearIndex = this.data.years.indexOf(year);
    const monthIndex = month;
    const dayIndex = day - 1; // days数组索引从0开始
    this.setData({
      value: [yearIndex, monthIndex, dayIndex]
    });
    // 更新当前日期字符串
    this.setData({
      currentDate: `${year}-${month + 1}-${day}`
    });
  },
  getDaysOfMonth(year) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    let daysInMonth = [31, 28 + isLeapYear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth;
  },
  updateDaysOfMonth(year, month) {
    console.log(year,month)
    const daysInMonth = this.getDaysOfMonth(year)[month - 1];
    this.setData({
      days: Array.from({ length: daysInMonth }, (_, i) => i + 1)
    });
  },
  chooseImagelogo: function(e) {
    let that=this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          logoImageUrl: tempFilePaths[0]
        });
      },
      fail: function(err) {
        console.error('选择图片失败：', err);
      }
    });
  },
  chooseImagezixun: function(e) {
    let that=this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          zixunImageUrl: tempFilePaths[0]
        });
      },
      fail: function(err) {
        console.error('选择图片失败：', err);
      }
    });
  },
  removeLogo: function()
  {
    this.setData({
      logoImageUrl: ''
    });
  },
  removeZixun: function()
  {
    this.setData({
      zixunImageUrl: ''
    });
  },
  back(){
    wx.navigateBack({
      delta: 1 // 返回的页面数，如果需要返回多级页面，可以调整 delta 的值
    });
  },
});