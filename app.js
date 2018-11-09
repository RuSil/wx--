//app.js
App({
  cart: wx.getStorageSync('cart') || [],
  addToCart(selectedinfo) {
    const isInCart = this.cart.some(cartItem => cartItem.id === selectedinfo.id);
    if (isInCart) {
      this.cart = this.cart.map(ci => {
        if (ci.id === selectedinfo.id) {
          ci.count = ci.count + selectedinfo.count;
        }
        return ci;
      })
    } else {
      this.cart.push({
        ...selectedinfo,
        count: selectedinfo.count
      });
    }
    wx.setStorageSync('cart', this.cart)
  }
})