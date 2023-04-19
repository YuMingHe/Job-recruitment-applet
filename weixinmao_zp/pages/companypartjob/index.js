var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        id: 0
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "兼职管理"
        });
        var n = this;
        this.checkuser({
            doServices: function() {
                var e = wx.getStorageSync("userInfo"), t = wx.getStorageSync("companyid");
                app.util.request({
                    url: "entry/wxapp/mycompanypartjoblist",
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
            url: "/weixinmao_zp/pages/editpartjob/index?id=" + t
        });
    },
    addcompanypartjob: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/addpartjob/index"
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
    cancleJob: function(e) {
        var a = this;
        this.checkuser({
            doServices: function() {
                var t = e.currentTarget.dataset.id, n = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "下架职位",
                    content: "确认下架职位？",
                    success: function(e) {
                        e.confirm && app.util.request({
                            url: "entry/wxapp/cancleJob",
                            data: {
                                id: t,
                                sessionid: n.sessionid,
                                uid: n.memberInfo.uid
                            },
                            success: function(e) {
                                console.log(e), a.onLoad();
                            },
                            fail: function(e) {
                                console.log(e);
                            }
                        });
                    }
                });
            }
        });
    },
    upJob: function(e) {
        var a = this;
        this.checkuser({
            doServices: function() {
                var t = e.currentTarget.dataset.id, n = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "上架职位",
                    content: "确认上架职位？",
                    success: function(e) {
                        e.confirm && app.util.request({
                            url: "entry/wxapp/upJob",
                            data: {
                                id: t,
                                sessionid: n.sessionid,
                                uid: n.memberInfo.uid
                            },
                            success: function(e) {
                                console.log(e), a.onLoad();
                            },
                            fail: function(e) {
                                console.log(e);
                            }
                        });
                    }
                });
            }
        });
    },
    RepayOrder: function(e) {
        var a = this;
        this.checkuser({
            doServices: function() {
                var t = e.currentTarget.dataset.id, n = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "订单支付",
                    content: "是否确认订单？",
                    success: function(e) {
                        e.confirm && app.util.request({
                            url: "entry/wxapp/repay",
                            data: {
                                id: t,
                                sessionid: n.sessionid,
                                uid: n.memberInfo.uid
                            },
                            success: function(e) {
                                e.data && e.data.data && wx.requestPayment({
                                    timeStamp: e.data.data.timeStamp,
                                    nonceStr: e.data.data.nonceStr,
                                    package: e.data.data.package,
                                    signType: "MD5",
                                    paySign: e.data.data.paySign,
                                    success: function(e) {
                                        a.onLoad();
                                    },
                                    fail: function(e) {}
                                });
                            },
                            fail: function(e) {
                                console.log(e);
                            }
                        });
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
                0 == e.data.data.error ? (console.log("kkkkkk"), t.doServices()) : 2 == e.data.data.error && t.doServices();
            }
        }) : (app.util.getUserInfo(), !1);
    }
});