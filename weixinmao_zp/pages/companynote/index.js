var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        id: 0
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "求职简历"
        });
        var n = this;
        this.checkuser({
            doServices: function() {
                var e = wx.getStorageSync("userInfo"), t = wx.getStorageSync("companyid");
                app.util.request({
                    url: "entry/wxapp/Mycompanynotelist",
                    data: {
                        companyid: t,
                        sessionid: e.sessionid,
                        uid: e.memberInfo.uid
                    },
                    success: function(e) {
                        e.data.message.errno || n.setData({
                            list: e.data.data
                        });
                    }
                });
            }
        });
    },
    editCompanyjob: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/editCompanyjob/index?id=" + t
        });
    },
    addcompanyjob: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/addCompanyjob/index"
        });
    },
    onReady: function() {},
    tabClick: function(n) {
        var a = this;
        this.checkuser({
            doServices: function() {
                var t = n.currentTarget.id, e = wx.getStorageSync("userInfo");
                app.util.request({
                    url: "entry/wxapp/myorderlist",
                    data: {
                        ordertype: t,
                        sessionid: e.sessionid,
                        uid: e.memberInfo.uid
                    },
                    success: function(e) {
                        e.data.message.errno || a.setData({
                            list: e.data.data,
                            ordertype: t
                        });
                    }
                });
            }
        });
    },
    toNote: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/workerdetail/index?id=" + t
        });
    },
    JobNotice: function(e) {
        var t = e.currentTarget.dataset.id, n = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "邀请面试",
            content: "确认邀请面试？",
            success: function(e) {
                e.confirm && app.util.request({
                    url: "entry/wxapp/invatejob",
                    data: {
                        id: t,
                        sessionid: n.sessionid,
                        uid: n.memberInfo.uid
                    },
                    success: function(e) {
                        e.data.message.errno;
                    }
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    checkuser: function(t) {
        t = t;
        var e = wx.getStorageSync("userInfo");
        return e && e.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                0 == e.data.data.error ? (console.log(t), t.doServices()) : 2 == e.data.data.error && t.doServices();
            }
        }) : (app.util.getUserInfo(), !1);
    }
});