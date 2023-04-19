var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), app = getApp();

Page({
    data: {
        id: 0,
        title: "",
        tel: "",
        pid: 1
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "我的经纪人"
        });
        var a = this, e = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/myagent",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(t) {
                t.data.message.errno || a.setData({
                    data: t.data.data.list,
                    list: t.data.data.oldhouselist,
                    activeCategoryId: 1,
                    city: wx.getStorageSync("companyinfo").city,
                    intro: t.data.data.intro
                });
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    tabClick: function(t) {
        var a = t.currentTarget.id, e = this;
        e.data.pid = a;
        var n = e.data.tel;
        app.util.request({
            url: "entry/wxapp/getagenthouse",
            data: {
                pid: a,
                tel: n
            },
            success: function(t) {
                t.data.message.errno || e.setData({
                    list: t.data.data.houselist,
                    activeCategoryId: a
                });
            }
        });
    },
    toComplain: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/complain/index?id=" + a
        });
    },
    toHouseDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        1 == this.data.pid ? wx.navigateTo({
            url: "/weixinmao_house/pages/oldhousedetail/index?id=" + a
        }) : wx.navigateTo({
            url: "/weixinmao_house/pages/lethousedetail/index?id=" + a
        });
    },
    Changeagent: function() {
        var a = this, t = wx.getStorageSync("userInfo").memberInfo.uid;
        app.util.request({
            url: "entry/wxapp/changeagent",
            data: {
                uid: t
            },
            success: function(t) {
                if (!t.data.message.errno) if (0 == t.data.data.error) a.onLoad(); else if (1 == t.data.data.error) return void wx.showModal({
                    title: "提示",
                    content: t.data.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    doCall: function(t) {
        console.log(t.currentTarget);
        var a = t.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: a,
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
            path: "/weixinmao_house/pages/agentdetail/index?id=" + this.data.id
        };
    }
});