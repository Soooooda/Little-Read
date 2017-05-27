// myreader.js
//获取应用实例
var Bmob = require('../../utils/bmob.js');
var Book = Bmob.Object.extend("BookInf");
var query = new Bmob.Query(Book);
var test = "正在加载中";
var that = this;



Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileName: '',
    text: 'Hello world',
    userInfo: {},
    ttest: test,
  },



  myfunction: function () {
    var that = this;
    console.log('myfunction'),
      query.get("IEgeLLLB", {
        success: function (result) {
          // The object was retrieved successfully.
          that.setData({
            ttest: (result.get("Chapter"))[0]
          })
        },
        error: function (result, error) {
          console.log("查询失败");
        }
      });
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
    var that = this;
    query.get("IEgeLLLB", {
      success: function (result) {
        // The object was retrieved successfully.
        console.log((result.get("Chapter"))[0])
        that.setData({
          ttest: (result.get("Chapter"))[0]
        })
      },
      error: function (result, error) {
        console.log("查询失败");
      }
    });
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