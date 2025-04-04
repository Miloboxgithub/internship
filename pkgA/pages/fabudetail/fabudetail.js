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
    types4:false,
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
    hangs: '',
    hangss: '', //待定
    xin: '',
    xins: '', //待定
    value: [0, 0, 0], // 默认选择的年月日索引
    years: [],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    days: [],
    currentDate:'', // 当前日期
    logoImageUrl: '',
    zixunImageUrl1: '',
    zixunImageUrl2: '',
    zixunImageUrl3: '',
    zixunImageUrl4: '',
    zixunImageUrl5: '',
    zixunImageUrl6: '',
    zixunImageUrl7: '',
    zixunImageUrl8: '',
    zixunImageUrl9: '',
    //  postmsg
    companyName: '',
    companyType: '',
    industry: '',
    position: '',
    description: '',
    requirements: '',
    contactInfo: '',
    contactInfo: '',
    internshipType:'线下',
     idd:0,
     memo:'',
     currentDate: '', // 当前日期
     logoImageUrl: '',
     zixunImageUrl: '',
     //  postmsg

     location: '',
     locations: '', //待定

     applicationDeadLine: '',
     applicationDeadLines: '', //待定
     sheng: [],
     shi: [],
  },
  onLoad(options) {
    this.getType()
    this.getWeizhi()
    if(options.id){
      console.log(options.id,'------------')
    }
    this.GetData(options.id)
    console.log(options.id,'------------')
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
        'token': wx.getStorageSync('v_token') // 传递 token
      },
      success: (res) => {
        console.log(res,'get')
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
            applicationDeadLine:app.timeSub(ans.deadline),
            logoImageUrl:ans.companyLogo,
            // zixunImageUrl:ans.consultPhoto,
            memo:ans.remark,
          })
          let qq = app.splits(ans.consultPhoto)
          for(let i=1;i<=qq.length;i++){
            this.setData({
              [`zixunImageUrl${i}`]: qq[i - 1]
            });
          }
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
          let ttt = []
          res.data.data.forEach((i,k)=>{
            ttt.push({
              op:i.businessNature,
              id:i.id
            })
          })
          this.setData({
            xinzhi:ttt
          })
          this.setData({
            xins: this.data.xinzhi[0]
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
          let ttt = []
          res.data.data.forEach((i,k)=>{
            ttt.push({
              op:i.industryType,
              id:i.id
            })
          })
          this.setData({
            industryes:ttt
          })
          this.setData({
            hangss: this.data.industryes[0]
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
  getWeizhi() {
    let that = this
    wx.request({
      url: `${apiUrl}/getProvinceList`, // 拼接完整的 URL
      method: 'GET',
      header: {
        token: wx.getStorageSync('v_token')
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data)
          let abc = [],
            cba = []
          res.data.data.forEach((i, k) => {
            abc.push(i.province)
            cba.push(i.id)
          })
          that.setData({
            sheng: abc,
            sid: cba
          })
          wx.request({
            url: `${apiUrl}/getCityByProvinceId/${this.data.sid[0]}`, // 拼接完整的 URL
            method: 'POST',
            header: {
              'Accept': '*/*',
              'Cache-Control': 'no-cache',
              token: wx.getStorageSync('v_token')
            },
            success: (res) => {
              if (res.statusCode === 200) {
                console.log(res.data)
                let abc = []
                res.data.data.forEach((i, k) => {
                  abc.push(i.name)
                })
                that.setData({
                  shi: abc,
                })
                that.setData({
                  locations: this.data.sheng[0] + '-' + this.data.shi[0]
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
      types1: !this.data.types1,
      hangs: this.data.hangss
    })
    console.log(this.data.hangs)
    
  },
  queren2: function () {
    this.setData({
      types2: !this.data.types2,
      xin: this.data.xins
    })
    console.log(this.data.xin)
    
  },
  queren3: function () {
    this.setData({
      types3: !this.data.types3,
      applicationDeadLine: this.data.applicationDeadLines
    })
    
  },
  queren4: function () {
    this.setData({
      types4: !this.data.types4,
      location: this.data.locations
    })
    
  },
  hideview() {
    this.setData({
      types1: false,
      types2: false,
      types3: false,
      types4: false
    })
    //隐藏tabber
    
  },
  changetypest1(e) {
    let ce = true
    if (this.data[e.currentTarget.id]) ce = !ce
    let ts = e.currentTarget.id
    this.setData({
      types1: true,
      types2: false,
      types3: false,
      types4: false,
    })
    if (ce)
      this.setData({
        [e.currentTarget.id]: !this.data[e.currentTarget.id]
      })
    //隐藏tabber
    
  },
  changetypest2(e) {
    let ce = true
    if (this.data[e.currentTarget.id]) ce = !ce
    let ts = e.currentTarget.id
    this.setData({
      types1: false,
      types2: true,
      types3: false,
      types4: false,
    })
    if (ce)
      this.setData({
        [e.currentTarget.id]: !this.data[e.currentTarget.id]
      })
    //隐藏tabber
    
  },
  changetypest3(e) {
    let ce = true
    if (this.data[e.currentTarget.id]) ce = !ce
    let ts = e.currentTarget.id
    this.setData({
      types1: false,
      types2: false,
      types3: true,
      types4: false,
    })
    if (ce)
      this.setData({
        [e.currentTarget.id]: !this.data[e.currentTarget.id]
      })
    //隐藏tabber
    
    console.log(1234)
  },
  changetypest4(e) {
    let ce = true
    if (this.data[e.currentTarget.id]) ce = !ce
    let ts = e.currentTarget.id
    this.setData({
      types1: false,
      types2: false,
      types3: false,
      types4: true,
    })
    if (ce)
      this.setData({
        [e.currentTarget.id]: !this.data[e.currentTarget.id]
      })
    //隐藏tabber
    
    console.log(1234)
  },
  bindChange1: function (e) {
    let cc = e.detail.value
    // console.log(cc,e)
    this.setData({
      hangss: this.data.industryes[cc[0]]
    })
  },
  bindChange2: function (e) {
    let cc = e.detail.value
    console.log(cc)
    this.setData({
      xins: this.data.xinzhi[cc[0]]
    })
  },
  bindChange3: function (e) {
    let cc = e.detail.value
    let y = this.data.years[cc[0]]
    let m = this.data.months[cc[1]]
    let d = this.data.days[cc[2]]
    console.log(y + '-' + m + '-' + d)
    this.updateDaysOfMonth(y, m);
    this.setData({
      applicationDeadLines: y + '-' + m + '-' + d
    })
  },
  bindChange4: function (e) {
    let that = this
    let cc = e.detail.value
    console.log(cc, this.data.sid[cc[0]])
    wx.request({
      url: `${apiUrl}/getCityByProvinceId/${this.data.sid[cc[0]]}`, // 拼接完整的 URL
      method: 'POST',
      header: {
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
        token: wx.getStorageSync('v_token')
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data)
          let abc = []
          res.data.data.forEach((i, k) => {
            abc.push(i.name)
          })
          that.setData({
            shi: abc
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
    setTimeout(() => {
      this.setData({
        locations: this.data.sheng[cc[0]] + '-' + this.data.shi[cc[1]]
      })
      console.log(this.data.locations)
    }, 500)

  },
  inputed(e) {
    console.log(e.detail.value)
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
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
        title: '请阅读并勾选服务协议!',
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
    if(!this.data.memo)this.setData({
      memo:'无'
    })
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
      deadline: this.translateTime(this.data.applicationDeadLine),
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
          if(res.data.msg=="发布内容违规！"){
            wx.showToast({
              title: '发布内容违规！',
              icon: 'error',
              duration: 2000
            });
            return ; 
          }
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
    this.setData({
      applicationDeadLines: `${year}-${month + 1}-${day}`
    })
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
  chooseImagezixun(e) {
    console.log(e.currentTarget.dataset.index)
    let op = e.currentTarget.dataset.index
    let that = this
    wx.chooseMedia({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.uploadFile({
          url: `${apiUrl}/internship/consultPhotoUpload`, // 你的上传接口地址
          filePath: res.tempFiles[0].tempFilePath, // 选择的图片路径
          name: 'file', // 与后端约定的文件参数名
          header: {
            'Content-Type': 'multipart/form-data', // 设置请求头
            'token': wx.getStorageSync('v_token') // 传递 token
          },
          success: (res) => {
            console.log(res)
            if (res.statusCode == 200) {
             
                that.setData({
                  [`zixunImageUrl${op}`]: JSON.parse(res.data).data
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
  removeZixun(e) {
      let op  = e.currentTarget.dataset.index
      //console.log(op,this.data[`zixunImageUrl${op}`])
      this.setData({
        [`zixunImageUrl${op}`]: ''
      });
      for (let i = parseInt(op); i < 9; i++) {
        //console.log(this.data[`zixunImageUrl${i + 1}`],`zixunImageUrl${i + 1}`)
        this.setData({
          [`zixunImageUrl${i}`]: this.data[`zixunImageUrl${i + 1}`]
        });
      }
  },
  back(){
    wx.navigateBack({
      delta: 1 // 返回的页面数，如果需要返回多级页面，可以调整 delta 的值
    });
  },
  translateTime(dateString) {
    // 解析日期字符串
    const date = new Date(dateString);
  
    // 提取年、月、日
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
    const day = String(date.getDate()).padStart(2, '0');
  
    // 组合成目标格式
    const formattedDate = `${year}-${month}-${day} 23:59:59`;
  
    return formattedDate;
  },
});