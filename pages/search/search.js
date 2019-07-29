// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    policyList: [],
    postList: [],
    resultList: [],
    reachBottom: false,
    pageNum0: 1,
    pageNum1: 1,
    selectedBar: 0,
    keyword: ''
  },

  handleChangeBar: function(e){
    let id = e.currentTarget.dataset.id;
    console.log(id)
    if(this.data.selectedBar!=id){
      if(id==0){
        console.log('change 0')
        this.setData({
          selectedBar: 0,
          resultList: this.data.policyList,
        })
      }else if(id==1){
        console.log('change 1')
        this.setData({
          selectedBar: 1,
          resultList: this.data.postList,
        })
      }
    }
    
  },

  handleLoadMore: function() {
    let self = this;
    let id = this.data.selectedBar;
    let data = this.data;
    let pageNum0 = data.pageNum0;
    let pageNum1 = data.pageNum1;
    let keyword = data.keyword;
    let policyList = data.policyList;
    let postList = data.postList;
    
    if(id==0){
      pageNum0 += 1;
      wx.request({
        url: encodeURI('https://cxa.wizzstudio.com/policy/search/' + keyword + '/'+pageNum0),
        method: 'GET',
        success: res => {
          console.log(res);
          if (res.data.data) {
            self.setData({
              policyList: policyList.concat(res.data.data),
              resultList: policyList.concat(res.data.data),
              pageNum0: pageNum0
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
    }else if(id==1){
      pageNum1 += 1;
      wx.request({
        url: encodeURI('https://cxa.wizzstudio.com/activity/search/' + keyword + '/' + pageNum1),
        method: 'GET',
        success: res => {
          console.log(res);
          if (res.data.data) {
            self.setData({
              postList: postList.concat(res.data.data),
              resultList: postList.concat(res.data.data),
              pageNum1: pageNum1
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
    }
  },

  handleSeePolicyDetails: function (e) {
    const id = e.currentTarget.dataset.pid;
    console.log(id);
    wx.navigateTo({
      url: '../policyDetails/policyDetails?id=' + id,
    });
  },

  onPostTap: function (e) {
    var postId = e.currentTarget.dataset.postId;
    console.log(postId);
    wx.navigateTo({
      url: "../postDetails/postDetails?id=" + postId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    let keyword = options.keyword;
    this.setData({
      keyword: keyword
    })
    console.log(keyword)
    wx.request({
      url: encodeURI('https://cxa.wizzstudio.com/policy/search/'+keyword+'/1'),
      method: 'GET',
      success: res => {
        console.log(res)
        if(res.data.data){
          self.setData({
            policyList: res.data.data,
            resultList: res.data.data
          })
        }else{
          self.setData({
            policyList: [],
            resultList: []
          })
        }
      }
    });
    wx.request({
      url: encodeURI('https://cxa.wizzstudio.com/activity/search/'+keyword+'/1'),
      method: 'GET',
      success: res => {
        console.log(res)
        if(res.data.data){
          self.setData({
            postList: res.data.data
          })
        }else{
          self.setData({
            postList: []
          })
        }
      }
    })
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