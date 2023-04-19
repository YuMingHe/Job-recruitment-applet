var app = getApp();

Page({
    data: {
        autoplay: !0,
        interval: 3e3,
        duration: 1e3
    },
    onLoad: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/getbanner",
            success: function(a) {
                a.data.message.errno || t.setData({
                    banners: a.data.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/getarticle",
            data: {},
            success: function(a) {
                a.data.message.errno || (1 == a.data.data.intro.ischeck ? wx.setNavigationBarTitle({
                    title: wx.getStorageSync("companyinfo").name
                }) : wx.setNavigationBarTitle({
                    title: "职场资讯-" + wx.getStorageSync("companyinfo").name
                }), t.setData({
                    category: a.data.data.category,
                    article: a.data.data.article,
                    activeCategoryId: a.data.data.activeCategoryId
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    tabClick: function(a) {
        var t = a.currentTarget.id, e = this;
        app.util.request({
            url: "entry/wxapp/getsecondlist",
            data: {
                pid: t
            },
            success: function(a) {
                a.data.message.errno || e.setData({
                    article: a.data.data,
                    activeCategoryId: t
                });
            }
        });
    },
    toNewsDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/newsdetail/index?id=" + t
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
    onShareAppMessage: function() {
        return {
            title: "职场资讯-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_zp/pages/article/index"
        };
    }
});