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
            title: "我要认证"
        }), app.util.request({
            url: "entry/wxapp/GetSysInit",
            data: {},
            success: function(e) {
                e.data.message.errno || (e.data.data.intro.maincolor || (e.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    binduser: function(e) {
        var a = wx.getStorageSync("userInfo"), t = e.detail.value.telephone, o = e.detail.value.code;
        11 != t.length || isNaN(t) ? wx.showModal({
            title: "提示",
            content: "请输入有效的手机号码",
            showCancel: !1
        }) : "" != o ? app.util.request({
            url: "entry/wxapp/register",
            data: {
                phone: t,
                code: o,
                uid: a.memberInfo.uid
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
    getPhoneNumber: function(e) {
        console.log(e.detail);
        if ("getPhoneNumber:fail user deny" == e.detail.errMsg) wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "未授权",
            success: function(e) {}
        }); else {
            var a = wx.getStorageSync("userInfo");
            app.util.request({
                url: "entry/wxapp/Getphone",
                data: {
                    iv: e.detail.iv,
                    encryptedData: e.detail.encryptedData,
                    uid: a.memberInfo.uid
                },
                success: function(e) {
                    e.data.message.errno || wx.navigateBack({
                        changed: !0
                    });
                }
            });
        }
    },
    bindGetUserInfo: function(e) {
        var n = this;
        app.util.getUserInfo(function(a) {
            console.log(a), n.data.isuser = !0;
            var e = a.memberInfo.uid, t = a.wxInfo.nickName, o = a.wxInfo.avatarUrl;
            0 < (n.data.uid = e) && (n.setData({
                userinfo: a,
                isphone: !1,
                isuser: n.data.isuser
            }), app.util.request({
                url: "entry/wxapp/Updateuserinfo",
                data: {
                    uid: e,
                    nickname: t,
                    avatarUrl: o
                },
                success: function(e) {
                    e.data.message.errno || (app.globalData.isuser = !0, n.setData({
                        userinfo: a,
                        isphone: !1,
                        isuser: n.data.isuser
                    }));
                }
            }));
        }, e.detail);
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
                    var a = setInterval(function() {
                        var e = t.data.phoneCode;
                        e--, t.setData({
                            phoneCode: e
                        }), 0 == e && (clearInterval(a), t.setData({
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
        var a = e.detail.value;
        console.log(a), this.setData({
            telephone: a
        });
    },
    codeinput: function(e) {
        var a = e.detail.value;
        console.log(a), this.setData({
            codePhone: a
        });
    },
    onShow: function() {
        var a = this;
        this.checkuser({
            doServices: function() {
                var e = wx.getStorageSync("userInfo");
                console.log(e.wxInfo), a.setData({
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
    checkuser: function(a) {
        var t = this, e = (a = a, wx.getStorageSync("userInfo"));
        return e ? e.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                0 == e.data.data.error ? (console.log(a), a.doServices()) : 2 == e.data.data.error && a.doServices();
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