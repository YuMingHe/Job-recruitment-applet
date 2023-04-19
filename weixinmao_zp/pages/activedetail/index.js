var app = getApp();

Page({
    data: {
        city: wx.getStorageSync("companyinfo").city,
        isCars: !0,
        isSort: !0,
        isPrice: !0,
        isType: !0,
        loadMore: "",
        list: [],
        house_list: [],
        housetypelist: [],
        houseareaid: 0,
        housepriceid: 0,
        housetype: 0,
        page: 1
    },
    onLoad: function(t) {
        var a = this, e = t.id;
        this.setData({
            housetypelist: [ {
                name: "按最新发布时间",
                id: 1
            } ],
            typeid: 0,
            carid: 0,
            priceid: 0
        }), wx.setNavigationBarTitle({
            title: "企业招聘-" + wx.getStorageSync("companyinfo").name
        }), app.util.request({
            url: "entry/wxapp/getinitinfo",
            success: function(t) {
                t.data.message.errno || a.setData({
                    city: wx.getStorageSync("companyinfo").city,
                    arealist: t.data.data.arealist,
                    housepricelist: t.data.data.housepricelist,
                    title: "",
                    price: "",
                    typetitle: ""
                });
            }
        }), app.util.request({
            url: "entry/wxapp/getactivedetail",
            data: {
                id: e
            },
            success: function(t) {
                t.data.message.errno || a.setData({
                    list: t.data.data.list,
                    total: t.data.data.total
                });
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    gethouselist: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/getjoblist",
            data: {
                page: a.data.page,
                houseareaid: a.data.houseareaid,
                housepriceid: a.data.housepriceid,
                housetype: a.data.housetype
            },
            success: function(t) {
                t.data.message.errno || a.setData({
                    joblist: t.data.data.joblist,
                    jobcatelist: t.data.data.jobcatelist
                });
            },
            complete: function() {
                a.setData({
                    loadMore: ""
                });
            }
        });
    },
    doSendjob: function(t) {
        var a = this, e = t.currentTarget.dataset.id, i = wx.getStorageSync("userInfo");
        console.log(i);
        var s = t.currentTarget.dataset.companyid;
        console.log(s), console.log(e), app.util.request({
            url: "entry/wxapp/sendjob",
            data: {
                jobid: e,
                companyid: s,
                sessionid: i.sessionid,
                uid: i.memberInfo.uid
            },
            success: function(t) {
                if (!t.data.message.errno) {
                    if (0 != t.data.data.error) return 2 == t.data.data.error ? void wx.showModal({
                        title: "提示",
                        content: t.data.data.msg,
                        showCancel: !1
                    }) : 3 == t.data.data.error ? void wx.showModal({
                        title: "提示",
                        content: t.data.data.msg,
                        showCancel: !1,
                        success: function(t) {
                            wx.navigateTo({
                                url: "/weixinmao_zp/pages/mynote/index"
                            });
                        }
                    }) : void wx.showModal({
                        title: "提示",
                        content: t.data.data.msg,
                        showCancel: !1
                    });
                    wx.showToast({
                        title: "投递简历成功!",
                        icon: "success",
                        duration: 2e3
                    }), a.setData({
                        data: t.data.data.jobdetail
                    });
                }
            }
        });
    },
    toNewHouseDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/jobdetail/index?id=" + a
        });
    },
    toSearch: function(t) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/search/index"
        });
    },
    selectcarsitem: function(t) {
        var a = t.currentTarget.id, e = t.currentTarget.dataset.title;
        this.setData({
            carid: a,
            isCars: !0,
            title: e
        }), this.data.houseareaid = a, this.gethouselist();
    },
    selectpriceitem: function(t) {
        var a = t.currentTarget.id, e = t.currentTarget.dataset.title;
        this.setData({
            priceid: a,
            isPrice: !0,
            price: e
        }), this.data.housepriceid = a, this.gethouselist();
    },
    selecttypeitem: function(t) {
        var a = t.currentTarget.id, e = t.currentTarget.dataset.title;
        this.setData({
            typeid: a,
            isType: !0,
            typetitle: e
        }), this.data.housetype = a, this.gethouselist();
    },
    onReachBottom: function(t) {
        this.setData({
            loadMore: "正在加载中..."
        }), this.data.page = this.data.page + 1, this.gethouselist();
    },
    clickSearch: function(t) {
        wx.switchTab({
            url: "/pages/search/search"
        });
    },
    clickList: function() {
        wx.navigateTo({
            url: "../cars/cars"
        });
    },
    selectCars: function(t) {
        this.setData({
            isSort: !0,
            isPrice: !0,
            isType: !0,
            isCars: !this.data.isCars
        });
    },
    selectPrice: function() {
        this.setData({
            isSort: !0,
            isCars: !0,
            isType: !0,
            isPrice: !this.data.isPrice
        });
    },
    selectType: function() {
        this.setData({
            isSort: !0,
            isCars: !0,
            isPrice: !0,
            isType: !this.data.isType
        });
    },
    selectSort: function() {
        this.setData({
            isCars: !0,
            isPrice: !0,
            isType: !0,
            isSort: !this.data.isSort
        });
    },
    selectBrand: function() {
        wx.navigateTo({
            url: "../brand/brand"
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onShareAppMessage: function() {
        return {
            title: "找工作-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_zp/pages/findjob/index"
        };
    }
});