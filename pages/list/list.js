Page({
  data: {
    optionTitles: [],
    currentId:170,
    currentList:[],
    page: 0,
    offset:0,
    total:5
  },
   // 请求选项卡内容
  loadOptions(){
    if(this.data.page === this.data.total){
      return
    }
    wx.request({
      url: "https://coolbuy.com/api/v1.4/category/22/?img_size=medium",
      method: "GET",
      success: (res) => {
        this.setData({
          optionTitles: res.data.shelves
        })
      }
    })
  },
  // 选项卡中跳转
  toLink(e){
    const index = e.currentTarget.dataset.index;
    const currentId = this.data.optionTitles[index].id;
    this.setData({
      currentId: currentId
    })
    // this.loadList()
  },
   // 请求当前列表数据
  loadList(){
    wx.request({
      url: `https://coolbuy.com/api/v1.4/shelf_preview/?id__in=${this.data.currentId}&items_per_shelf=10&order_by=-priority&order_by=-id&img_size=small&limit=10&page=${this.data.page}&offset=${this.data.offset}`,
      method: "GET",
      success: (res) => {
        this.setData({
          currentList: this.data.currentList.concat(res.data['170']),
          page: this.data.page + 1,
          offset: this.data.offset + 10
        })
      }
    })
  },
  // 下拉刷新
  refreshFilms() {
    if (this.data.page === 0) {
      return;
    }
    this.setData({
      page: 0,
      offset: 0,
      sale: []
    }, () => {
      this.loadList()
    })
  },
  // 获取当前点击的id,并传参到详情页
  toDtail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },

  onLoad: function() {
    this.loadOptions();
    this.loadList();
  },
  onShow: function(){

  },
  /* 页面上拉触底事件的处理函数 */
  onReachBottom: function() {
    this.loadList();
  },
  onPullDownRefresh(){
    this.refreshFilms();
  }
})