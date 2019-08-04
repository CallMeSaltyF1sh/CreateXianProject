const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const checkSessionid = () => {
  let session = wx.getStorageSync('session');
  if (session) {
    wx.request({
      url: 'https://cxa.wizzstudio.com/login/check/' + session,
      method: 'GET',
      success: res => {
        console.log(res);
        if (res.data.msg !== "Unexpired") {
          wx.showModal({
            title: '提示',
            content: '登录已过期，请重新登录！',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                wx.switchTab({
                  url: '../login/login',
                });
              }
            }
          })
        }
      }
    })
  }
}

const replaceChar = str => {
  return str.replace(/\\+|\^+|\*+|\%+|\(+|\)+|\'+|\"+|`+|\/+/g, '');
}

module.exports = {
  formatTime: formatTime,
  checkSessionid: checkSessionid,
  replaceChar: replaceChar
}