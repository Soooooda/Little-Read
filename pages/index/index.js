//index.js
//获取应用实例
var Bmob = require('../../utils/bmob.js');
var Book = Bmob.Object.extend("BookInf");
var query = new Bmob.Query(Book);
var test = "1234";
var that;

wx.openSetting({success:(res)=>{console.log(res);}});

wx.login({
  success: function (res) {
    if (res.code) {
      Bmob.User.requestOpenId(res.code, {//获取userData(根据个人的需要，如果需要获取userData的需要在应用密钥中配置你的微信小程序AppId和AppSecret，且在你的项目中要填写你的appId)
        success: function (userData) {
          wx.getUserInfo({
            success: function (result) {
              var userInfo = result.userInfo
              var nickName = userInfo.nickName

              var user = new Bmob.User();//开始注册用户
              user.set("username", nickName);
              user.set("password", userData.openid);//因为密码必须提供，但是微信直接登录小程序是没有密码的，所以用openId作为唯一密码
              user.set("userData", userData);
              user.signUp(null, {
                success: function (res) {
                  console.log("注册成功!");
                },
                error: function (userData, error) {
                  console.log(error)
                }
              });
            }
          })
        },
        error: function (error) {
          // Show the error message somewhere
          console.log("Error: " + error.code + " " + error.message);
        }
      });

    } else {
      console.log('获取用户登录态失败！' + res.errMsg)
    }
  }
});

/*
wx.downloadFile({
  url: 'http://bmob-cdn-11436.b0.upaiyun.com/2017/05/21/2954afad4059bc1280c6cb14b6089dc4.docx',
  success: function (res) {
    console.log('111')
    var filePath = res.tempFilePath
    wx.openDocument({
      filePath: filePath,
      success: function (res) {
        console.log('打开文档成功')
      }
    })
  },
  fail: function (err) {
    console.log(err)
  }
})
*/

var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    fileName:'',
    text:'Hello world',
    userInfo: {},
    ttest:test,
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  myfunction:function(){
    const id = "kQNzZZZh";//e.currentTarget.dataset.id;
    const title = "傲慢与偏见";//e.currentTarget.dataset.title;
    try {
      var readInfo = wx.getStorageSync("1")//(id + constant.READER_INFO_KEY)
      if (!readInfo) {
        readInfo = new Object();
        readInfo.contentsIndex = 0;
        readInfo.scrollTop = 0;
      }
      console.log(readInfo);
      const top = readInfo.scrollTop;
      wx.navigateTo({
        url: "../his_reader/his_reader?contentsIndex=" + readInfo.contentsIndex + "&top=" + top + "&bookId=" + id + "&title=" + title
      })
    } catch (e) {
      // Do something when catch error,异常处理
    }
   /* var that = this;
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
    });*/

  },


///国豪的代码
  /*getTxt(){
    console.log(this.data.fileName);
    wx.request({
      url: 'https://roycent.cn/test.txt',
      header:{
        "Content-Type":"application/json"
      },
      method:'Get',
      success:(res)=>{
        var dataa = res.data;
        //console.log(dataa);
        this.setData({text:dataa});
        //console.log(text);
      }
    });
  },

  bindChange(e){
    console.log(e);
    console.log('hei');
    this.setData({fileName:e.detail.value});
  },*/


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../reader/reader'
    })
  },

})
