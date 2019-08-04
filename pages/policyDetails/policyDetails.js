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
    catg: '',
    fileType: ''
  },

  handleDownloadFile: function(e){
    let self = this;
    let url = e.currentTarget.dataset.url;
    let type = this.data.fileType;
    let support = ['doc','xls','ppt','pdf','docx','xlsx','pptx']
    wx.showLoading({
      title: '加载中',
    })
    wx.downloadFile({
      url: url, 
      success(res) {
        console.log(res)
        if (res.statusCode === 200) {
          var filePath = res.tempFilePath;
          console.log(filePath);
          if(support.includes(type)){
            wx.openDocument({
              fileType: type,
              filePath: filePath,
              success: function (res) {
                wx.hideLoading();
                console.log('打开成功')
              },
              fail: function (res) {
                console.log(res);
                wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '文件打开失败！',
                  confirmColor: '#C80405',
                  showCancel: false
                });
              }
            })
          }else{
            wx.saveFile({
              tempFilePath: filePath,
              success: res => {
                wx.hideLoading();
                const savedFilePath = res.savedFilePath
                wx.showModal({
                  title: '提示',
                  content: '文件已保存至：'+savedFilePath,
                  showCancel: false,
                  confirmColor: '#C80405'
                })
              },
              fail: err => {
                wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '文件保存失败!',
                  showCancel: false,
                  confirmColor: '#C80405'
                })
              }
            })
            
          }
          
        }
      }
    })
  },

  formatContent: function(str){
    let regex = /\s+/g;
    str = ' '.concat(str);
    console.log(str.replace(regex, '\n'))
    return str.replace(regex, '\n') 
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
          content: self.formatContent(data.policyContent),
          id: data.policyId,
          time: data.publishTime,
          level: data.level
        })
        if(data.fileUrl){
          let index = data.fileUrl.lastIndexOf('.') + 1;
          let type = data.fileUrl.substring(index)
          self.setData({
            fileType: type
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