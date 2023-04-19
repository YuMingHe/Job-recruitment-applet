var WxParse = require("../../resource/wxParse/wxParse.js"), app = getApp();

Page({
    data: {
        id: 0,
        title: "",
        tel: "",
        pid: 1
    },
    onLoad: function(a) {
        if (wx.setNavigationBarTitle({
            title: wx.getStorageSync("companyinfo").name
        }), 0 < this.data.id) var t = this.data.id; else {
            t = a.id;
            this.data.id = a.id;
        }
        var e = this;
        app.util.request({
            url: "entry/wxapp/getcompanydetail",
            data: {
                id: t
            },
            success: function(a) {
                a.data.message.errno || (wx.setNavigationBarTitle({
                    title: e.data.title
                }), console.log(a.data.data.companydetail), e.setData({
                    data: a.data.data.companydetail,
                    content: WxParse.wxParse("article", "html", a.data.data.companydetail.content, e, 5),
                    joblist: a.data.data.joblist
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    tabClick: function(a) {
        var t = a.currentTarget.id, e = this;
        e.data.pid = t;
        var i = e.data.tel;
        app.util.request({
            url: "entry/wxapp/getagenthouse",
            data: {
                pid: t,
                tel: i
            },
            success: function(a) {
                a.data.message.errno || e.setData({
                    list: a.data.data.houselist,
                    activeCategoryId: t
                });
            }
        });
    },
    toJobDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/jobdetail/index?id=" + t
        });
    },
    doCall: function(a) {
        console.log(a.currentTarget);
        var t = a.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: t,
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.title,
            path: "/weixinmao_zp/pages/companydetail/index?id=" + this.data.id
        };
    }
});