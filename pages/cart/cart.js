const app=getApp();
Page({
  data:{
    cart:app.cart,
    totalPrice:0,
    allSelected:true,
    selectedCart: []
  },
  onLoad:function(){
    this.Price();
  },
  onShow:function(){
    this.setData({
      cart: app.cart
    })
    this.Price();
  },
  // 选择事件
  selectList(e){
    const index = e.currentTarget.dataset.index;
    let cart = this.data.cart;
    const selected = cart[index].selected;
    app.cart[index].selected = !selected;
    this.setData({
      cart : app.cart
    });
    this.Price();
  },
  // 全选事件
  selectAll(e){
    let allSelected = this.data.allSelected;
    allSelected = !allSelected;
    let cart = this.data.cart;
    for (let i=0 ;i< cart.length; i++){
      app.cart[i].selected = allSelected;
    }
    this.setData({
      allSelected: allSelected,
      cart: app.cart
    })
    this.Price();
  },
  // 计算总价
  Price(){
    var totalPrice = app.cart.filter(item => item.selected === true).reduce((result, item) => {
        result += item.price * item.count;
        return result;
    }, 0)
    this.setData({
      totalPrice: totalPrice
    })
  },
  // 数量变化
  reduce(e) {
    const index = e.currentTarget.dataset.index;
    let count = app.cart[index].count;
    if (count > 1) {
      app.cart[index].count -= 1;
      this.setData({
        cart : app.cart
      })
    } 
    this.Price();
    wx.setStorageSync('cart', app.cart)
  },
  increase(e) {
    const index = e.currentTarget.dataset.index;
    let count = app.cart[index].count;
    if (count > 1) {
      app.cart[index].count += 1;
      this.setData({
        cart: app.cart
      })
    }
    this.Price();
    wx.setStorageSync('cart', app.cart)
  },
  // 删除商品
  delete(e){
    let index = e.currentTarget.dataset.index;
    app.cart.splice(index,1);
    this.setData({
      cart: app.cart
    })
    this.Price();
    wx.setStorageSync('cart', app.cart)
  }
})