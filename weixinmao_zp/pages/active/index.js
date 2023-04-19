var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "招聘会-" + wx.getStorageSync("companyinfo").name
        });
        var t = this;
        app.util.request({
            url: "entry/wxapp/getactivelist",
            success: function(a) {
                a.data.message.errno || (console.log(a.data.data), t.setData({
                    list: a.data.data
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    toActiveDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/activedetail/index?id=" + t
        });
    },
    toActiveDetail2: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/activedetail2/index?id=" + t
        });
    },
    doBaomsg: function(a) {
        var t = wx.getStorageSync("companyid"), e = a.currentTarget.dataset.id;
        if (0 < t) {
            var n = {
                companyid: t,
                aid: e
            };
            app.util.request({
                url: "entry/wxapp/Saveactiverecord",
                data: n,
                success: function(a) {
                    if (0 != a.data.errno) return wx.hideLoading(), void wx.showModal({
                        title: "失败",
                        content: a.data.data.msg,
                        showCancel: !1
                    });
                    0 == a.data.data.error ? wx.showToast({
                        title: a.data.data.msg,
                        icon: "success",
                        duration: 2e3,
                        success: function(a) {
                            console.log(a);
                        }
                    }) : wx.showModal({
                        title: "提示",
                        content: a.data.data.msg,
                        showCancel: !1
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请先企业登录",
            showCancel: !1,
            success: function(a) {
                wx.navigateTo({
                    url: "/weixinmao_zp/pages/message/index"
                });
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
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "招聘会-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_zp/pages/active/index"
        };
    }
});