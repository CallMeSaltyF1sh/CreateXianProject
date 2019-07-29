// pages/create/create.js
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pname: '',
    paddr: '',
    phost: '',
    pdesc: '',
    input: '',
    imgFilePath: '',
    areaEditing: true,
    startTime: '请选择',
    startDate: '请选择',
    endTime: '请选择',
    endDate: '请选择'
  },

  handleUploadImg: function(e){
    let self = this;
    if (this.data.imgFilePath == '') {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          self.setData({
            imgFilePath: res.tempFilePaths[0]
          })
        },
        fail: err => {
          console.log(err);
        }
      })
    }
  },

  handleDelete: function(e) {
    this.setData({
      imgFilePath: ''
    })
  },

  handleName: function(e) {
    this.setData({
      pname: e.detail.value
    })
  },
  handleAddr: function(e) {
    this.setData({
      paddr: e.detail.value
    })
  },
  handleHost: function(e) {
    this.setData({
      phost: e.detail.value
    })
  },
  handleDesc: function(e) {
    this.setData({
      pdesc: e.detail.value
    })
  },

  handleStartTimeChange: function(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  handleStartDateChange: function(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  handleEndTimeChange: function(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  handleEndDateChange: function(e) {
    this.setData({
      endDate: e.detail.value
    })
  },

  handleFocus: function(){
    this.setData({
      areaEditing: true
    })
  },
  handleBlur: function(){
    if(this.data.pdesc){
      this.setData({
        areaEditing: false
      })
    }
  },
  handleEdit: function(){
    this.setData({
      areaEditing: true
    })
  },

  handleView: function(e) {
    util.checkSessionid();

    let data = this.data;
    console.log(data.startDate.concat(' ', data.startTime))
    console.log(data.endDate.concat(' ', data.endTime))
    if(data.pname&&data.paddr&&data.phost&&data.pdesc&&data.startTime&&data.startDate&&data.endTime&&data.endDate&&data.imgFilePath){
      let info = {
        'pname': data.pname,
        'paddr': data.paddr,
        'phost': data.phost,
        'pdesc': data.pdesc,
        'startTime': data.startDate.concat(' ', data.startTime),
        'endTime': data.endDate.concat(' ', data.endTime),
        'imgPath': data.imgFilePath,
      };
      let infoStr = JSON.stringify(info);
      wx.navigateTo({
        url: '../postDetails/postDetails?info='+infoStr+'&isEditing=true',
      });
    }else{
      wx.showModal({
        title: '提示',
        content: '以上内容不能为空',
        showCancel: false,
        confirmColor: '#C80405'
      });
    }
    
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