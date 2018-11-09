const app =getApp();
Page({
  data: {
    broadcast: [],
    saleInfo:[],
    modalInfo:{},
    sku_list:[],
    count:1
  },
  // 数量变化
  reduce(){
    if (this.data.count > 1){
      this.setData({
        count: this.data.count - 1
      })
    }
  },
  increase(){
      this.setData({
        count: this.data.count + 1
    })
  },
  // 添加到购物车
  addToCart(e){ 
    var selectedinfo = { ...this.data.saleInfo}
        selectedinfo.count = this.data.count;
        selectedinfo.selected = true;
    app.addToCart(selectedinfo);
  },
  // 分配请求的数据
  onLoad:function(options){
    if(options) {
      wx.request({
        url: `https://coolbuy.com/api/v1.4/product/detail/${options.id}/`,
        method: 'GET',
        success: (res) => {
          this.setData({
            broadcast: res.data.images,
            saleInfo: res.data,
            modalInfo: res.data.in_use_specs,
            sku_list: res.data.sku_list
          })
        }
      })
    } 
  },
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  }
})

