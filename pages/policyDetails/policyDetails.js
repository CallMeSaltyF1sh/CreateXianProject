// pages/policyDetails/policyDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileUrl: '',
    level: '',
    institution: '',
    originalUrl: '',
    title: '',
    content: '',
    id: '',
    time: '',
    catg: ''
  },

  handleDownloadFile: function(e){
    let self = this;
    let url = e.currentTarget.dataset.url;
    wx.downloadFile({
      url: url, 
      success(res) {
        console.log(res)
        if (res.statusCode === 200) {
          var filePath = res.tempFilePath;
          console.log(filePath);
          wx.openDocument({
            fileType: 'doc',
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            },
            fail: function (res) {
              console.log(res);
            }
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
    let id = options.id;
    wx.request({
      url: 'https://cxa.wizzstudio.com/policy/detail/'+id,
      method: 'GET',
      success: res => {
        console.log(res);
        let data = res.data.data;
        self.setData({
          fileUrl: data.fileUrl,
          originalUrl: data.originalUrl,
          institution: data.publishInstitution,
          catg: data.classify,
          title: data.poicyTitle,
          content: data.policyContent,
          id: data.policyId,
          time: data.publishTime,
          level: data.level
        })
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