// pages/login/login.js
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account_value: '',
    password_value: '',
    alreadyIn: false
  },

  Request_Login: function (e) {
    let acc = e.detail.value.account;      //账号
    let pas = e.detail.value.password;     //密码
    acc = util.replaceChar(acc)
    pas = util.replaceChar(pas)
    let self = this;
    wx.request({
      url: 'https://cxa.wizzstudio.com/login/manager?managerName=' + acc + '&managerPassword=' + pas,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res);
        if (res.data.errCode === 0) {
          self.setData({
            alreadyIn: true
          });
          console.log(res.data.session_key);
          wx.setStorageSync('session', res.data.session_key);
        } else {
          wx.showModal({
            title: '登录失败',
            content: '用户名或密码有误',
            showCancel: false,
            confirmColor: '#C80405'
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    console.log(session);
    if(session) {
      wx.request({
        url: 'https://cxa.wizzstudio.com/login/check/' + session,
        method: 'GET',
        success: res => {
          console.log(res);
          if(res.data.msg!=="Unexpired") {
            self.setData({
              alreadyIn: false
            })
          }else{
            self.setData({
              alreadyIn: true
            })
          }
        }
      })
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