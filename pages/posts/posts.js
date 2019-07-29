// pages/posts/posts.js
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList: [],
    isAdmin: false,
    pageNum: 1,
    reachBottom: false
  },

  onPostTap: function(e) {
    var postId = e.currentTarget.dataset.postId;
    console.log(postId);
    wx.navigateTo({
      url: "../postDetails/postDetails?id=" + postId
    })
  },

  handleCreate: function(e) {
    util.checkSessionid();
    wx.navigateTo({
      url: '../create/create',
    })
  },

  handleLoadMore: function(){
    let self = this;
    let page = this.data.pageNum;
    let postList = this.data.postList;
    page += 1;
    wx.request({
      url: 'https://cxa.wizzstudio.com/activity/page/' + page,
      method: 'GET',
      success: res => {
        console.log(res);
        if (res.data.data) {
          self.setData({
            postList: postList.concat(res.data.data),
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    wx.request({
      url: 'https://cxa.wizzstudio.com/activity/page/1',
      method: 'GET',
      success: res => {
        console.log(res);
        if(res.data.data){
          self.setData({
            postList: res.data.data
          })
        }else{
          
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
    let self = this;
    let session = wx.getStorageSync('session');
    if (session) {
      wx.request({
        url: 'https://cxa.wizzstudio.com/login/check/' + session,
        method: 'GET',
        success: res => {
          console.log(res);
          if (res.data.msg === "Unexpired") {
            self.setData({
              isAdmin: true
            })
          } else {
            self.setData({
              isAdmin: false
            })
          }
        }
      });
    }
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