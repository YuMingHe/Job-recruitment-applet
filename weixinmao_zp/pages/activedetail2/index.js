function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var WxParse = require("../../resource/wxParse/wxParse.js"), app = getApp();

Page(_defineProperty({
    data: {
        id: 0,
        title: ""
    },
    onLoad: function(t) {
        if (wx.setNavigationBarTitle({
            title: wx.getStorageSync("companyinfo").name
        }), 0 < this.data.id) var a = this.data.id; else {
            a = t.id;
            this.data.id = t.id;
        }
        console.log(a);
        var e = this;
        app.util.request({
            url: "entry/wxapp/getactivedetail2",
            data: {
                id: a
            },
            success: function(t) {
                t.data.message.errno || (e.data.title = t.data.data.activeinfo.title, wx.setNavigationBarTitle({
                    title: e.data.title
                }), e.setData({
                    data: t.data.data.activeinfo,
                    content: WxParse.wxParse("article", "html", t.data.data.activeinfo.content, e, 5)
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
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
    onReachBottom: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onShareAppMessage: function() {}
}, "onShareAppMessage", function() {
    return {
        title: this.data.title + "-" + wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_zp/pages/acitvedetail/index?id=" + this.data.id
    };
}));