var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "经纪人-" + wx.getStorageSync("companyinfo").name
        });
        var a = this;
        app.util.request({
            url: "entry/wxapp/getagentlist",
            success: function(t) {
                t.data.message.errno || (console.log(t.data.data), a.setData({
                    list: t.data.data.list
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    toAgentDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/agentdetail/index?id=" + a
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
            title: "经纪人-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_zp/pages/agentlist/index"
        };
    }
});