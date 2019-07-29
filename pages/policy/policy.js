// pages/policy/policy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: '',
    levels: [],
    catgs: [],
    policyList: [],
    pageNum: 1,
    levelId: 0,
    catgId: 0,
    reachBottom: false,
    loadUrl: 'policy/',
  },

  handleSearchInput: function(e) {
    console.log(e.detail.value)
    this.setData({
      input: e.detail.value
    })
  },

  handleSearchConfirm: function(e) {
    let self = this;
    let keyword = this.data.input;
    console.log(keyword)
    wx.request({
      url: encodeURI('https://cxa.wizzstudio.com/policy/search/'+keyword+'/1'),
      method: 'GET',
      success: res => {
        console.log(res)
        if(res.data.data){
          self.setData({
            policyList: res.data.data,
            loadUrl: 'policy/search/'+keyword+'/',
          })
          if(res.data.data.length<7){
            self.setData({
              reachBottom: true
            })
          }else{
            self.setData({
              reachBottom: false
            })
          }
        }else{
          self.setData({
            policyList: []
          })
        }
      }
    })
  },

  handleChangeLevel: function(e) {
    let self = this;
    let data = this.data;
    let levelId = e.currentTarget.dataset.id;
    let catgId = data.catgId;
    this.setData({
      levelId: levelId,
      reachBottom: false
    });
    if ( levelId == 0) {
      if (catgId == 0) {
        this.setData({
          loadUrl: 'policy/',
          pageNum: 1
        });
        wx.request({
          url: 'https://cxa.wizzstudio.com/policy/1',
          method: 'GET',
          success: res => {
            console.log(res);
            if(res.data.data){
              self.setData({
                policyList: res.data.data
              });
            }else{
              self.setData({
                policyList: []
              });
            }
            
          }
        });
      } else {
        let catgName = this.labelIdToName(catgId, data.catgs);
        console.log(catgName);
        this.setData({
          loadUrl: 'policy/classify/' + catgName + '/',
          pageNum: 1
        });
        wx.request({
          url: encodeURI('https://cxa.wizzstudio.com/policy/classify/' + catgName + '/1'),
          method: 'GET',
          success: res => {
            console.log(res);
            if(res.data.data){
              self.setData({
                policyList: res.data.data
              });
            }else{
              self.setData({
                policyList: []
              })
            }
            
          }
        });
      }
    } else {
      if (catgId == 0) {
        let levelName = self.labelIdToName(levelId, data.levels);
        console.log(levelName);
        this.setData({
          loadUrl: 'policy/level/' + levelName + '/',
          pageNum: 1
        });
        wx.request({
          url: encodeURI('https://cxa.wizzstudio.com/policy/level/' + levelName + '/1'),
          method: 'GET',
          success: res => {
            console.log(res);
            if(res.data.data){
              self.setData({
                policyList: res.data.data
              });
            }else{
              self.setData({
                policyList: []
              })
            }
            
          }
        });
      } else {
        let levelName = this.labelIdToName(levelId, data.levels);
        let catgName = this.labelIdToName(catgId, data.catgs);
        console.log(levelName, catgName);
        this.setData({
          loadUrl: 'policy/both/' + levelName + '/' + catgName + '/',
          pageNum: 1
        });
        wx.request({
          url: encodeURI('https://cxa.wizzstudio.com/policy/both/' + levelName + '/' + catgName + '/1'),
          method: 'GET',
          success: res => {
            console.log(res);
            if(res.data.data){
              self.setData({
                policyList: res.data.data
              });
            }else{
              self.setData({
                policyList: []
              });
            }
            
          }
        });
      }
    }
  },

  handleChangeCatg: function(e) {
    let self = this;
    let data = this.data;
    let catgId = e.currentTarget.dataset.id;
    let levelId = data.levelId;
    this.setData({
      catgId: catgId,
      reachBottom: false
    });
    if(catgId==0) {
      if(levelId==0){
        this.setData({
          loadUrl: 'policy/',
          pageNum: 1
        });
        wx.request({
          url: 'https://cxa.wizzstudio.com/policy/1',
          method: 'GET',
          success: res => {
            console.log(res);
            if(res.data.data){
              self.setData({
                policyList: res.data.data
              });
            }else {
              self.setData({
                policyList: []
              });
            }
            
          }
        });
      }else{
        let levelName = this.labelIdToName(levelId, data.levels);
        console.log(levelName);
        this.setData({
          loadUrl: 'policy/level/'+levelName+'/',
          pageNum: 1
        });
        wx.request({
          url: encodeURI('https://cxa.wizzstudio.com/policy/level/'+levelName+'/1'),
          method: 'GET',
          success: res => {
            console.log(res);
            if(res.data.data){
              self.setData({
                policyList: res.data.data
              });
            }else{
              self.setData({
                policyList: []
              });
            }
          }
        });
      }
    }else{
      if(levelId==0){
        let catgName = self.labelIdToName(catgId,data.catgs);
        console.log(catgName);
        this.setData({
          loadUrl: 'policy/classify/' + catgName + '/',
          pageNum: 1
        });
        wx.request({
          url: encodeURI('https://cxa.wizzstudio.com/policy/classify/' + catgName + '/1'),
          method: 'GET',
          success: res => {
            console.log(res);
            if(res.data.data){
              self.setData({
                policyList: res.data.data
              });
            }else{
              self.setData({
                policyList: []
              });
            }
          }
        });
      }else{
        let levelName = this.labelIdToName(levelId, data.levels);
        let catgName = this.labelIdToName(catgId, data.catgs);
        console.log(levelName,catgName);
        this.setData({
          loadUrl: 'policy/both/' + levelName + '/'+catgName+'/',
          pageNum: 1
        });
        wx.request({
          url: encodeURI('https://cxa.wizzstudio.com/policy/both/' + levelName + '/'+catgName+'/1'),
          method: 'GET',
          success: res => {
            console.log(res);
            if(res.data.data){
              self.setData({
                policyList: res.data.data
              });
            }else{
              self.setData({
                policyList: []
              });
            }
          }
        });
      }
    }
    
    
  },

  labelIdToName: function(id,list){
    for (let i in list) {
      if(list[i].policyId == id) {
        if(list[i].level) return list[i].level;
        else if(list[i].classify) return list[i].classify;
      }
    }
    return '';
  },

  handleSeeDetails: function(e){
    const id = e.currentTarget.dataset.pid;
    console.log(id);
    wx.navigateTo({
      url: '../policyDetails/policyDetails?id='+id,
    });
  },

  handleLoadMore: function(e){
    let self = this;
    let levelId = this.data.levelId;
    let catgId = this.data.catgId;
    let page = this.data.pageNum;
    let url = this.data.loadUrl;
    let policyList = this.data.policyList;
    page+=1; 
    wx.request({
      url: encodeURI('https://cxa.wizzstudio.com/' + url + page),
      method: 'GET',
      success: res => {
        console.log(res);
        if(res.data.data){
          self.setData({
            policyList: policyList.concat(res.data.data),
            pageNum: page
          });
          if(res.data.data.length<7){
            self.setData({
              reachBottom: true
            })
          }
        }else{
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
    let policyList = this.data.policyList;
    let levels = [{ policyId: 0, level: '全部' }];
    let catgs = [{ policyId: 0, classify: '全部' }];
    wx.request({
      url: 'https://cxa.wizzstudio.com/level',
      method: 'GET',
      success: res => {
        self.setData({
          levels: levels.concat(res.data.data)
        })
      }
    });
    wx.request({
      url: 'https://cxa.wizzstudio.com/classify',
      method: 'GET',
      success: res => {
        self.setData({
          catgs: catgs.concat(res.data.data.reverse())
        })
      }
    });
    wx.request({
      url: 'https://cxa.wizzstudio.com/policy/1',
      method: 'GET',
      success: res => {
        console.log(res);
        if(res.data.data){
          self.setData({
            policyList: res.data.data
          });
        }else{
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