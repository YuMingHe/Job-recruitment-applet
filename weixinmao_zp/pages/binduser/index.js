var qqmapsdk, QQMapWX = require("../../resource/js/qqmap-wx-jssdk.min.js"), config = require("../../resource/js/config.js"), markersData = [], app = getApp();

Page({
    data: {
        flag: !1,
        codeDis: !1,
        phoneCode: "获取验证码",
        telephone: "",
        codePhone: ""
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "认证"
        });
    },
    binduser: function(e) {
        var o = wx.getStorageSync("userInfo"), t = e.detail.value.telephone, n = e.detail.value.code;
        11 != t.length || isNaN(t) ? wx.showModal({
            title: "提示",
            content: "请输入有效的手机号码",
            showCancel: !1
        }) : "" != n ? app.util.request({
            url: "entry/wxapp/register",
            data: {
                phone: t,
                code: n,
                uid: o.memberInfo.uid
            },
            success: function(e) {
                if (!e.data.message.errno) return 1 == e.data.data.error ? void wx.showModal({
                    title: "提示",
                    content: e.data.data.msg,
                    showCancel: !1
                }) : void wx.showModal({
                    title: "提示",
                    content: e.data.data.msg,
                    showCancel: !1,
                    success: function(e) {
                        wx.navigateTo({
                            url: "/weixinmao_zp/pages/user/index"
                        });
                    }
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "请输入验证码",
            showCancel: !1
        });
    },
    onReady: function() {},
    changeCode: function() {
        var t = this, e = this.data.telephone;
        11 != e.length || isNaN(e) ? wx.showModal({
            title: "提示",
            content: "请输入有效的手机号码",
            showCancel: !1
        }) : (this.setData({
            codeDis: !0
        }), app.util.request({
            url: "entry/wxapp/sendsms",
            data: {
                phone: this.data.telephone
            },
            success: function(e) {
                if (!e.data.message.errno) {
                    t.setData({
                        phoneCode: 60
                    });
                    var o = setInterval(function() {
                        var e = t.data.phoneCode;
                        e--, t.setData({
                            phoneCode: e
                        }), 0 == e && (clearInterval(o), t.setData({
                            phoneCode: "获取验证码",
                            flag: !0,
                            codeDis: !1
                        }));
                    }, 1e3);
                }
            }
        }));
    },
    phoneinput: function(e) {
        console.log(e);
        var o = e.detail.value;
        console.log(o), this.setData({
            telephone: o
        });
    },
    codeinput: function(e) {
        var o = e.detail.value;
        console.log(o), this.setData({
            codePhone: o
        });
    },
    onShow: function() {
        var o = this;
        this.checkuser({
            doServices: function() {
                var e = wx.getStorageSync("userInfo");
                console.log(e.wxInfo), o.setData({
                    userinfo: e
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    checkuser: function(o) {
        var t = this, e = (o = o, wx.getStorageSync("userInfo"));
        return e ? e.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                0 == e.data.data.error ? (console.log(o), o.doServices()) : 2 == e.data.data.error && o.doServices();
            }
        }) : (console.log("tmddddsssssqqqqs1111"), app.util.getUserInfo(function(e) {
            t.setData({
                userinfo: e
            });
        }), !1) : (console.log("tmddddssssss222222"), app.util.getUserInfo(function(e) {
            t.setData({
                userinfo: e
            });
        }), !1);
    }
});