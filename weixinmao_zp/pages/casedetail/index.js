function _defineProperty(n, o, e) {
    return o in n ? Object.defineProperty(n, o, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : n[o] = e, n;
}

var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), app = getApp();

Page(_defineProperty({
    data: {},
    onLoad: function(n) {
        wx.setNavigationBarTitle({
            title: wx.getStorageSync("companyinfo").name
        });
        var o = n.id;
        console.log(o);
        var e = this;
        app.util.request({
            url: "entry/wxapp/getcasedetail",
            data: {
                id: o
            },
            success: function(n) {
                var o;
                n.data.message.errno || (o = R_htmlToWxml.html2json(n.data.data.content), e.setData({
                    data: n.data.data,
                    content: o
                }));
            },
            complete: function() {
                console.log("ok"), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        console.log("pull"), wx.showNavigationBarLoading(), this.onLoad();
    },
    onReachBottom: function() {
        console.log("pull"), wx.showNavigationBarLoading(), this.onLoad();
    },
    onShareAppMessage: function() {}
}, "onShareAppMessage", function() {
    return {
        title: wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_zp/pages/index/index"
    };
}));