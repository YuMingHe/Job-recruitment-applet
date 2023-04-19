var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        showmsg: !0,
        isuser: !0
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "企业中心"
        });
    },
    onReady: function() {},
    toOrderlist: function(e) {
        var a = e.currentTarget.dataset.id;
        console.log(a), wx.navigateTo({
            url: "/weixinmao_house/pages/orderlist/index?id=" + a
        });
    },
    toShopmsg: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/shopmsg/index"
        });
    },
    toCompanyrole: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/companyrole/index"
        });
    },
    toMyjoblist: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/companyjob/index"
        });
    },
    toMypartjoblist: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/companypartjob/index"
        });
    },
    toMynote: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/companynote/index"
        });
    },
    toEditcompany: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/editcompany/index"
        });
    },
    toMyPayMoney: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/paymoney/index"
        });
    },
    loginout: function(e) {
        wx.clearStorageSync("companyid"), wx.redirectTo({
            url: "/weixinmao_zp/pages/message/index"
        });
    },
    onShow: function() {
        var e = this, a = wx.getStorageSync("userInfo");
        console.log(a), a && a.hasOwnProperty("wxInfo") ? (e.data.isuser = !0, e.initpage()) : e.data.isuser = !1, 
        e.setData({
            isuser: e.data.isuser
        });
    },
    initpage: function() {
        var a = this, e = wx.getStorageSync("userInfo"), o = wx.getStorageSync("companyid");
        0 < o && app.util.request({
            url: "entry/wxapp/GetCompanyinfo",
            data: {
                companyid: o,
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                e.data.message.errno || (1 == e.data.data.error ? (wx.clearStorageSync("companyid"), 
                wx.navigateTo({
                    url: "/weixinmao_zp/pages/message/index"
                })) : a.setData({
                    companyinfo: e.data.data.companyinfo
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        }), a.setData({
            userinfo: e
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    bindGetUserInfo: function(e) {
        var t = this;
        app.util.getUserInfo(function(a) {
            console.log(a), t.data.isuser = !0;
            var e = a.memberInfo.uid, o = a.wxInfo.nickName, n = a.wxInfo.avatarUrl;
            0 < (t.data.uid = e) && (t.setData({
                userinfo: a,
                isphone: !1,
                isuser: t.data.isuser
            }), app.util.request({
                url: "entry/wxapp/Updateuserinfo",
                data: {
                    uid: e,
                    nickname: o,
                    avatarUrl: n
                },
                success: function(e) {
                    e.data.message.errno || (t.initpage(), t.setData({
                        userinfo: a,
                        isphone: !1,
                        isuser: t.data.isuser
                    }));
                }
            }));
        }, e.detail);
    },
    binduserinfo: function(e) {
        var a = this;
        a.data.showmsg = !1;
        var o = wx.getStorageSync("userInfo"), n = wx.getStorageSync("companyid");
        app.util.request({
            url: "entry/wxapp/getuserinfo",
            data: {
                companyid: n,
                sessionid: o.sessionid,
                uid: o.memberInfo.uid
            },
            success: function(e) {
                a.setData({
                    user: e.data.data,
                    showmsg: a.data.showmsg
                });
            }
        });
    },
    saveuserinfo: function(e) {
        var a = this, o = e.detail.value.name, n = e.detail.value.tel;
        a.data.showmsg = !0;
        var t = wx.getStorageSync("userInfo"), s = wx.getStorageSync("companyid");
        "" != o ? "" != n ? app.util.request({
            url: "entry/wxapp/saveuserinfo",
            data: {
                companyid: s,
                sessionid: t.sessionid,
                uid: t.memberInfo.uid,
                name: o,
                tel: n
            },
            success: function(e) {
                if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                    title: "失败",
                    content: e.data.msg,
                    showCancel: !1
                });
                wx.showToast({
                    title: "操作成功",
                    icon: "success",
                    duration: 2e3
                }), a.setData({
                    showmsg: a.data.showmsg
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "请填写您的手机号",
            showCancel: !1
        }) : wx.showModal({
            title: "提示",
            content: "请填写您的姓名",
            showCancel: !1
        });
    },
    closemsg: function(e) {
        this.data.showmsg = !0, this.setData({
            showmsg: this.data.showmsg
        });
    },
    onReachBottom: function() {},
    toMycouponlist: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/couponlist/index"
        });
    },
    Puboldhouse: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/pub/index"
        });
    },
    onShareAppMessage: function() {},
    checkuser: function(a) {
        var o = this, e = (a = a, wx.getStorageSync("userInfo"));
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
            o.setData({
                userinfo: e
            });
        }), !1) : (console.log("tmddddssssss222222"), app.util.getUserInfo(function(e) {
            app.util.request({
                url: "entry/wxapp/checkuserinfo",
                data: {
                    sessionid: e.sessionid,
                    uid: e.memberInfo.uid
                },
                success: function(e) {
                    0 == e.data.data.error ? (console.log(a), a.doServices()) : 2 == e.data.data.error && a.doServices();
                }
            }), o.setData({
                userinfo: e
            });
        }), !1);
    }
});