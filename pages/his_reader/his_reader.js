// his_reader.js
//获取应用实例
var Bmob = require('../../utils/bmob.js');
var Book = Bmob.Object.extend("BookInf");
var query = new Bmob.Query(Book);
var test = "";
var that = this;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileName: '',
    userInfo: {},
    ttest: test,
    text: '',
    ChapterNum:0,
    hiddenn: true,
    showBottom: true,

    loading: true,
    loadingContact: false,
    chapter: {},
    selection: [], //段
    contentsIndex: 0,
    scrollHeight: 100,
    scrollTop: 0,
    recordScrollTop: 0,
    bookId: "",
    showBottom: false,

  },
  scroll: function (e) {
    var that = this;
    that.setData({
      recordScrollTop: e.detail.scrollTop
    });
    console.log(e.detail.scrollTop)
  },

  showMenu: function (e) {
    if (this.data.loadingContact) {
      return;
    }
    const showBottom = !this.data.showBottom;
    this.setData({
      showBottom: showBottom
    })
  },

  slider4change: function (e) {
    this.setData({
      fontSize: e.detail.value
    })
    //util.saveData("fontSize", e.detail.value);
  },


  LastPage: function () {
    var that = this;
    var num = that.data.ChapterNum
    if(that.data.ChapterNum>0)
    {that.setData({
      ChapterNum: num - 1
    })}
    console.log('next' + that.data.ChapterNum);
    this.myfunction();

  },

  NextPage:function(){

    var that = this;
    var num = parseInt(that.data.ChapterNum)
    that.setData({
      ChapterNum: num + 1,
      scrollTop: 0,
    })
    console.log('next' + that.data.ChapterNum);
    this.myfunction();

  },

  myfunction: function () {
    var that = this;
    that.setData({
      hiddenn: !this.data.hiddenn
    });
    
    console.log('myfunction'),
      query.get("kQNzZZZh", {
        success: function (result) {
          // The object was retrieved successfully.
          //console.log((result.get("Chapter"))[that.data.ChapterNum])
          that.setData({
            ttest: (result.get("Chapter"))[that.data.ChapterNum]
          })
          that.setData({
            hiddenn: !that.data.hiddenn
          });
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
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          ChapterNum: options.contentsIndex,
          scrollHeight: res.windowHeight,
          scrollTop: options.top,
          recordScrollTop: options.top,
        })
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
    wx.setNavigationBarTitle({ title: '傲慢与偏见' })
    var that = this;
    query.get("IEgeLLLB", {
      success: function (result) {
        // The object was retrieved successfully.
       // console.log((result.get("Chapter"))[that.data.ChapterNum])
        that.setData({
          ttest: (result.get("Chapter"))[that.data.ChapterNum]
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
    var saveObj = new Object();
    saveObj.contentsIndex = this.data.ChapterNum;
    saveObj.scrollTop = this.data.recordScrollTop;
    //const key = this.data.bookId + constant.READER_INFO_KEY;
    wx.setStorage({
      key: "1",
      data: saveObj
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var saveObj = new Object();
    saveObj.contentsIndex = this.data.ChapterNum;
    saveObj.scrollTop = this.data.recordScrollTop;
    //const key = this.data.bookId + constant.READER_INFO_KEY;
    wx.setStorage({
      key: "1",
      data: saveObj
    })
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