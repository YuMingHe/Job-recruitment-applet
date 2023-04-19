var app = getApp();

Page({
    data: {
        scrollHeight: "",
        toView: "#",
        type: 0
    },
    onLoad: function(t) {
        var a = this;
        console.log(t.id), a.data.type = t.id, wx.setNavigationBarTitle({
            title: "切换城市"
        }), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    scrollHeight: t.windowHeight
                });
            }
        }), app.util.request({
            url: "entry/wxapp/getcitylist",
            success: function(t) {
                t.data.message.errno || (console.log(t.data.data.firstnamelist), a.setData({
                    hotlist: t.data.data.hotlist,
                    firstnamelist: t.data.data.firstnamelist
                }));
            }
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    selectcity: function(t) {
        var a = this, e = t.currentTarget.dataset.id, i = t.currentTarget.dataset.name, n = {};
        n.name = i, n.id = e, console.log(n), wx.setStorageSync("cityinfo", n), 1 == a.data.type ? wx.switchTab({
            url: "/weixinmao_zp/pages/findjob/index"
        }) : 2 == a.data.type ? wx.switchTab({
            url: "/weixinmao_zp/pages/findworker/index"
        }) : 0 == a.data.type ? wx.switchTab({
            url: "/weixinmao_zp/pages/index/index"
        }) : 3 == a.data.type && wx.navigateTo({
            url: "/weixinmao_zp/pages/findpartjob/index"
        });
    },
    choiceWordindex: function(t) {
        var a = t.target.dataset.wordindex;
        this.setData({
            toView: a
        });
    }
});