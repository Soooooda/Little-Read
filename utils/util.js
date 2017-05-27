function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

function readBook(e) {
  const id = e.currentTarget.dataset.id;
  const title = e.currentTarget.dataset.title;
  try {
    var readInfo = wx.getStorageSync(id + constant.READER_INFO_KEY)
    if (!readInfo) {
      readInfo = new Object();
      readInfo.contentsIndex = 0;
      readInfo.scrollTop = 0;
    }
    console.log(readInfo);
    const top = readInfo.scrollTop;
    wx.navigateTo({
      url: "../reader/reader?contentsIndex=" + readInfo.contentsIndex + "&top=" + top + "&bookId=" + id + "&title=" + title
    })
  } catch (e) {
    // Do something when catch error,异常处理
  }
}