var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        id: 0
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "职位管理"
        });
        var a = this, t = wx.getStorageSync("userInfo"), n = wx.getStorageSync("companyid");
        app.util.request({
            url: "entry/wxapp/mycompanyjoblist",
            data: {
                companyid: n,
                sessionid: t.sessionid,
                uid: t.memberInfo.uid
            },
            success: function(e) {
                e.data.message.errno || a.setData({
                    list: e.data.data
                });
            }
        });
    },
    editCompanyjob: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/editCompanyjob/index?id=" + a
        });
    },
    addcompanyjob: function(e) {
        var a = wx.getStorageSync("companyid"), t = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/checkaddcompanyjob",
            data: {
                companyid: a,
                sessionid: t.sessionid,
                uid: t.memberInfo.uid
            },
            success: function(e) {
                e.data.message.errno || (e.data.data.companyinfo.jobnum < 1 ? wx.showModal({
                    title: "系统提示",
                    content: "您的发布职位数量达到了上限或是普通会员,发布职位需支付费用！",
                    showCancel: !1,
                    success: function() {
                        wx.navigateTo({
                            url: "/weixinmao_zp/pages/addCompanyjob/index"
                        });
                    }
                }) : wx.navigateTo({
                    url: "/weixinmao_zp/pages/addCompanyjob/index"
                }));
            }
        });
    },
    topPaytopjob: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/paytopjob/index?id=" + a
        });
    },
    onReady: function() {},
    tabClick: function(t) {
        var n = this;
        this.checkuser({
            doServices: function() {
                var a = t.currentTarget.id, e = wx.getStorageSync("userInfo");
                app.util.request({
                    url: "entry/wxapp/myorderlist",
                    data: {
                        ordertype: a,
                        sessionid: e.sessionid,
                        uid: e.memberInfo.uid
                    },
                    success: function(e) {
                        e.data.message.errno || n.setData({
                            list: e.data.data,
                            ordertype: a
                        });
                    }
                });
            }
        });
    },
    cancleJob: function(e) {
        var n = this;
        this.checkuser({
            doServices: function() {
                var a = e.currentTarget.dataset.id, t = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "下架职位",
                    content: "确认下架职位？",
                    success: function(e) {
                        e.confirm && app.util.request({
                            url: "entry/wxapp/cancleJob",
                            data: {
                                id: a,
                                sessionid: t.sessionid,
                                uid: t.memberInfo.uid
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
    upJob: function(e) {
        var n = this;
        this.checkuser({
            doServices: function() {
                var a = e.currentTarget.dataset.id, t = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "上架职位",
                    content: "确认上架职位？",
                    success: function(e) {
                        e.confirm && app.util.request({
                            url: "entry/wxapp/upJob",
                            data: {
                                id: a,
                                sessionid: t.sessionid,
                                uid: t.memberInfo.uid
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
                var a = e.currentTarget.dataset.id, t = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "订单支付",
                    content: "是否确认订单？",
                    success: function(e) {
                        e.confirm && app.util.request({
                            url: "entry/wxapp/repay",
                            data: {
                                id: a,
                                sessionid: t.sessionid,
                                uid: t.memberInfo.uid
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
    checkuser: function(a) {
        a = a;
        var e = wx.getStorageSync("userInfo");
        return e && e.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                0 == e.data.data.error ? (console.log("kkkkkk"), a.doServices()) : 2 == e.data.data.error && a.doServices();
            }
        }) : (app.util.getUserInfo(), !1);
    }
});