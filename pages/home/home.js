Page({
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://img.js.design/assets/img/6690dfbf1af97b1f8ea999cc.jpg#295565f169a0eb19e9101bc83d69b509'
    }, {
      id: 1,
        type: 'image',
        url: 'https://img.js.design/assets/img/6690dfbf1af97b1f8ea999cc.jpg#295565f169a0eb19e9101bc83d69b509',
    }, {
      id: 2,
      type: 'image',
      url: 'https://img.js.design/assets/img/6690dfbf1af97b1f8ea999cc.jpg#295565f169a0eb19e9101bc83d69b509'
    }, {
      id: 3,
      type: 'image',
      url: 'https://img.js.design/assets/img/6690dfbf1af97b1f8ea999cc.jpg#295565f169a0eb19e9101bc83d69b509'
    }, {
      id: 4,
      type: 'image',
      url: 'https://img.js.design/assets/img/6690dfbf1af97b1f8ea999cc.jpg#295565f169a0eb19e9101bc83d69b509'
    }, {
      id: 5,
      type: 'image',
      url: 'https://img.js.design/assets/img/6690dfbf1af97b1f8ea999cc.jpg#295565f169a0eb19e9101bc83d69b509'
    }, {
      id: 6,
      type: 'image',
      url: 'https://img.js.design/assets/img/6690dfbf1af97b1f8ea999cc.jpg#295565f169a0eb19e9101bc83d69b509'
    }],
    types1:false,
    types2:false,
    types3:false,
    toppx:0,
    coitem: [{
      icon:'https://img.js.design/assets/img/6557681b09dc6027548deca3.png#e04933f171c303ed86198233ba372fb9',
      name:'振石控股集团有限公司——社媒运营',
      time:'2024-12-31',
      iszhao:true,
      sum:5000,
      tags:[{title:'上市公司'},{title:'线下实习'},{title:'深圳'}]
    },{
      icon:'https://img.js.design/assets/img/6557681b09dc6027548deca3.png#e04933f171c303ed86198233ba372fb9',
      name:'振石控股集团有限公司——社媒运营',
      time:'2024-12-31',
      iszhao:true,
      sum:5000,
      tags:[{title:'上市公司'},{title:'线下实习'},{title:'深圳'}]
    },{
      icon:'https://img.js.design/assets/img/6557681b09dc6027548deca3.png#e04933f171c303ed86198233ba372fb9',
      name:'振石控股集团有限公司——社媒运营',
      time:'2024-12-31',
      iszhao:true,
      sum:5000,
      tags:[{title:'上市公司'},{title:'线下实习'},{title:'深圳'}]
    },{
      icon:'https://img.js.design/assets/img/6557681b09dc6027548deca3.png#e04933f171c303ed86198233ba372fb9',
      name:'振石控股集团有限公司——社媒运营',
      time:'2024-12-31',
      iszhao:true,
      sum:5000,
      tags:[{title:'上市公司'},{title:'线下实习'},{title:'深圳'}]
    },{
      icon:'https://img.js.design/assets/img/6557681b09dc6027548deca3.png#e04933f171c303ed86198233ba372fb9',
      name:'振石控股集团有限公司——社媒运营',
      time:'2024-12-31',
      iszhao:true,
      sum:5000,
      tags:[{title:'上市公司'},{title:'线下实习'},{title:'深圳'}]
    },{
      icon:'https://img.js.design/assets/img/6557681b09dc6027548deca3.png#e04933f171c303ed86198233ba372fb9',
      name:'振石控股集团有限公司——社媒运营',
      time:'2024-12-31',
      iszhao:true,
      sum:5000,
      tags:[{title:'上市公司'},{title:'线下实习'},{title:'深圳'}]
    },{
      icon:'https://img.js.design/assets/img/6557681b09dc6027548deca3.png#e04933f171c303ed86198233ba372fb9',
      name:'振石控股集团有限公司——社媒运营',
      time:'2024-12-31',
      iszhao:true,
      sum:5000,
      tags:[{title:'上市公司'},{title:'线下实习'},{title:'深圳'}]
    },{
      icon:'https://img.js.design/assets/img/6557681b09dc6027548deca3.png#e04933f171c303ed86198233ba372fb9',
      name:'振石控股集团有限公司——社媒运营',
      time:'2024-12-31',
      iszhao:true,
      sum:5000,
      tags:[{title:'上市公司'},{title:'线下实习'},{title:'深圳'}]
    }
    ,{
      icon:'https://img.js.design/assets/img/6557681b09dc6027548deca3.png#e04933f171c303ed86198233ba372fb9',
      name:'振石控股集团有限公司——社媒运营',
      time:'2024-12-31',
      iszhao:true,
      sum:5000,
      tags:[{title:'上市公司'},{title:'线下实习'},{title:'深圳'}]
    },
    {
      icon:'https://img.js.design/assets/img/6557681b09dc6027548deca3.png#e04933f171c303ed86198233ba372fb9',
      name:'振石控股集团有限公司——社媒运营',
      time:'2024-12-31',
      iszhao:true,
      sum:5000,
    }]
  },
  onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
    
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
    if (typeof this.getTabBar === 'function' ) {
      this.getTabBar().setData({
        selected:0
      })
    }
    this.getweizhi()
  },
  changetypes(e){
console.log(e.currentTarget.id)
this.setData({
  [e.currentTarget.id]:!this.data[e.currentTarget.id]
})
console.log(this.data.types1)
  },
  hideview(){
    this.setData({
      types1:false,
      types2:false,
      types3:false
    })
  },
  getweizhi(){
    const qq = wx.createSelectorQuery();
    qq.select('.divider').boundingClientRect();
    qq.exec((res)=>{
      console.log(res[0].top)
      this.setData({
        toppx: res[0].top   })
    })
    
  }
})