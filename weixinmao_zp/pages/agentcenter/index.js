var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        id: 0,
        ordertype: 1
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "经纪人中心"
        });
        var t = this, a = wx.getStorageSync("userInfo");
        if (0 < t.data.id) var n = t.data.id; else {
            n = e.id;
            t.data.id = e.id;
        }
        n = t.data.ordertype;
        app.util.request({
            url: "entry/wxapp/mycustomer",
            data: {
                ordertype: n,
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(e) {
                e.data.message.errno || t.setData({
                    list: e.data.data.list,
                    ordertype: n
                });
            }
        });
    },
    onReady: function() {},
    tabClick: function(a) {
        var n = this;
        this.checkuser({
            doServices: function() {
                var t = a.currentTarget.id, e = wx.getStorageSync("userInfo");
                app.util.request({
                    url: "entry/wxapp/mycustomer",
                    data: {
                        ordertype: t,
                        sessionid: e.sessionid,
                        uid: e.memberInfo.uid
                    },
                    success: function(e) {
                        e.data.message.errno || n.setData({
                            list: e.data.data.list,
                            ordertype: t
                        });
                    }
                });
            }
        });
    },
    delOrder: function(e) {
        var n = this;
        this.checkuser({
            doServices: function() {
                var t = e.currentTarget.dataset.id, a = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "订单取消",
                    content: "确认取消订单？",
                    success: function(e) {
                        e.confirm && app.util.request({
                            url: "entry/wxapp/delOrder",
                            data: {
                                id: t,
                                sessionid: a.sessionid,
                                uid: a.memberInfo.uid
                            },
                            success: function(e) {
                                console.log(e), n.onLoad();
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
        var n = this;
        this.checkuser({
            doServices: function() {
                var t = e.currentTarget.dataset.id, a = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "订单支付",
                    content: "是否确认订单？",
                    success: function(e) {
                        e.confirm && app.util.request({
                            url: "entry/wxapp/repay",
                            data: {
                                id: t,
                                sessionid: a.sessionid,
                                uid: a.memberInfo.uid
                            },
                            success: function(e) {
                                e.data && e.data.data && wx.requestPayment({
                                    timeStamp: e.data.data.timeStamp,
                                    nonceStr: e.data.data.nonceStr,
                                    package: e.data.data.package,
                                    signType: "MD5",
                                    paySign: e.data.data.paySign,
                                    success: function(e) {
                                        n.onLoad();
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
                0 == e.data.data.error ? (console.log(t), t.doServices()) : 2 == e.data.data.error && t.doServices();
            }
        }) : (app.util.getUserInfo(), !1);
    }
});