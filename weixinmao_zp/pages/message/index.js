var _Page;

function _defineProperty(e, a, n) {
    return a in e ? Object.defineProperty(e, a, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = n, e;
}

var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page((_defineProperty(_Page = {
    data: {},
    onShow: function(e) {
        wx.setNavigationBarTitle({
            title: "企业登录"
        });
        var a = this;
        0 < wx.getStorageSync("companyid") && wx.navigateTo({
            url: "/weixinmao_zp/pages/companylogin/index"
        }), app.util.request({
            url: "entry/wxapp/getbanner",
            success: function(e) {
                e.data.message.errno || a.setData({
                    banners: e.data.data
                });
            }
        });
    },
    goregister: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/companyregister/index"
        });
    },
    goMap: function(e) {
        wx.openLocation({
            latitude: parseFloat(wx.getStorageSync("companyinfo").lat),
            longitude: parseFloat(wx.getStorageSync("companyinfo").lng),
            scale: 18,
            name: wx.getStorageSync("companyinfo").name,
            address: wx.getStorageSync("companyinfo").address
        });
    },
    onReady: function() {},
    onLoad: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bindSave: function(e) {
        console.log(e.detail.formId);
        var a = e.detail.value.name, n = e.detail.value.password;
        "" != a ? "" != n ? app.util.request({
            url: "entry/wxapp/companylogin",
            data: {
                name: a,
                password: n
            },
            success: function(e) {
                if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                    title: "失败",
                    content: e.data.data.msg,
                    showCancel: !1
                });
                1 == e.data.data.error ? wx.showModal({
                    title: "登录提示",
                    content: e.data.data.msg,
                    showCancel: !1
                }) : wx.showToast({
                    title: "登录成功",
                    icon: "success",
                    duration: 2e3,
                    success: function() {
                        console.log(e.data.data.companyid), wx.setStorageSync("companyid", e.data.data.companyid), 
                        wx.redirectTo({
                            url: "/weixinmao_zp/pages/companylogin/index"
                        });
                    }
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "请填写企业登录密码",
            showCancel: !1
        }) : wx.showModal({
            title: "提示",
            content: "请填写企业登录账号",
            showCancel: !1
        });
    }
}, "onShareAppMessage", function() {
    return {
        title: "申请入驻" + wx.getStorageSync("companyname").name,
        path: "/weixinmao_zp/pages/message/index"
    };
}), _defineProperty(_Page, "checkuser", function(a) {
    var n = this, e = (a = a, wx.getStorageSync("userInfo"));
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
        n.setData({
            userinfo: e
        });
    }), !1) : (console.log("tmddddssssss222222"), app.util.getUserInfo(function(e) {
        a.doServices(), n.setData({
            userinfo: e
        });
    }), !1);
}), _Page));