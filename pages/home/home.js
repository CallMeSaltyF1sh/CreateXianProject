// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 3500,
    duration: 600,
    circular: true,
    imgUrls: ['../../images/home/1.jpg','../../images/home/2.jpg'],
    
    input: '',
    policyList: [],
    pageNum: 1,
    reachBottom: false,
    searchInput: ''
  },

  handleSearchInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      input: e.detail.value
    })
  },

  handleSearchConfirm: function (e) {
    let self = this;
    let keyword = this.data.input;
    console.log(keyword)
    wx.request({
      url: encodeURI('https://cxa.wizzstudio.com/policy/search/' + keyword + '/1'),
      method: 'GET',
      success: res => {
        console.log(res)
        if (res.data.data) {
          self.setData({
            policyList: res.data.data,
            loadUrl: 'policy/search/' + keyword + '/',
          })
          if (res.data.data.length < 7) {
            self.setData({
              reachBottom: true
            })
          } else {
            self.setData({
              reachBottom: false
            })
          }
        } else {
          self.setData({
            policyList: []
          })
        }
      }
    })
  },

  handleSeeDetails: function (e) {
    const id = e.currentTarget.dataset.pid;
    console.log(id);
    wx.navigateTo({
      url: '../policyDetails/policyDetails?id=' + id,
    });
  },

  handleLoadMore: function (e) {
    let self = this;
    let page = this.data.pageNum;
    let url = this.data.loadUrl;
    let policyList = this.data.policyList;
    page += 1;
    wx.request({
      url: encodeURI('https://cxa.wizzstudio.com/policy/time/' + page),
      method: 'GET',
      success: res => {
        console.log(res);
        if (res.data.data) {
          self.setData({
            policyList: policyList.concat(res.data.data),
            pageNum: page
          });
          if (res.data.data.length < 7) {
            self.setData({
              reachBottom: true
            })
          }
        } else {
          self.setData({
            reachBottom: true
          })
        }
      }
    })
  },

  handleJumpToPolicy: function(){
    wx.navigateTo({
      url: '../policy/policy',
    })
  },
  
  handleJumpToPost: function() {
    wx.navigateTo({
      url: '../posts/posts',
    })
  },

  handleSearchInput: function(e){
    this.setData({
      searchInput: e.detail.value
    })
  },

  handleSearchConfirm: function(e){
    let self = this;
    let keyword = this.data.searchInput;
    wx.navigateTo({
      url: '../search/search?keyword='+keyword,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    wx.request({
      url: 'https://cxa.wizzstudio.com/policy/time/1',
      method: 'GET',
      success: res => {
        console.log(res);
        if (res.data.data) {
          self.setData({
            policyList: res.data.data
          });
        } else {
          self.setData({
            policyList: []
          });
        }

      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})