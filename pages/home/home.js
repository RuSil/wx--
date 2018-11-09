var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["WOW", "精选推荐", "时尚穿搭","新奇文创"
          // "送给他","送给她","食品饮料","个护健康","箱包配饰"
          ],
    broadcast: [],
    teamBuy: [],
    recommend: [],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    // 请求轮播图
    wx.request({
      url: 'https://coolbuy.com/api/v1.4/campaign_banner/?limit=10&offset=0&banner_type=banner&img_size=medium&platform=mobile&order_by=-priority',
      method:'GET',
      success:function(res){
        that.setData({
          broadcast: res.data.objects
        })
      }
    })
    // 请求好物拼团
    wx.request({
      url: 'https://coolbuy.com/api/v1.4/activity-product/?offset=0&limit=2&activity_type=group_buying',
      success: function (res) {
        that.setData({
          teamBuy: res.data.objects
        })
      }
    })
    // 请求活动推荐
    wx.request({
      url: 'https://coolbuy.com/api/v1.4/shelf/?img_size=medium&shelf_type=activity&limit=10',
      success: function (res) {
        that.setData({
          recommend: res.data.objects
        })
      }
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});