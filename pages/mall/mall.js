Page({
  data: {
    navLeftItems: [],
    navRightItems: [],
    curNav: 1,
    curIndex: 0
  },
  toList(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/list/list?id=' + id,
    })
  },
  onLoad: function () {
    // 加载的使用进行网络访问，把需要的数据设置到data数据对象
    var that = this
    wx.request({
      url: 'https://coolbuy.com/api/v1.4/category/?order_by=-priority&order_by=-id&limit=100&img_size=medium',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          navLeftItems: res.data.objects,
          navRightItems: res.data.objects
        })
      }
    })
  },
  //事件处理函数
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index
    this.setData({
      curNav: id,
      curIndex: index
    })
  }

})
