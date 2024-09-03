Page({
  data: {
    tabs: [
      { id: '1', name: '游戏设计' },
      { id: '2', name: '机械设计' },
      { id: '3', name: '工业设计' },
      { id: '4', name: '互联网' },
      { id: '5', name: '影视行业' },
      { id: '6', name: '人工智能' },
      { id: '7', name: '大数据' }
    ],
    activeTabId: '1',
    scrollIntoViewId: 'tab1'
  },
  onTabTap: function(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      activeTabId: id,
      scrollIntoViewId: `tab${id}`
    });
  }
});