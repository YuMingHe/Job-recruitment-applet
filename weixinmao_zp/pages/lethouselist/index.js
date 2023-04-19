var app = getApp();

Page({
    data: {
        city: wx.getStorageSync("companyinfo").city,
        isCars: !0,
        isSort: !0,
        isPrice: !0,
        isType: !0,
        isSelect: !0,
        loadMore: "",
        list: [],
        house_list: [],
        housetypelist: [],
        houseareaid: 0,
        housepriceid: 0,
        housetype: 0,
        letway: 0,
        page: 1,
        title: ""
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            housetypelist: [ {
                name: "1室",
                id: 1
            }, {
                name: "2室",
                id: 2
            }, {
                name: "3室",
                id: 3
            }, {
                name: "4室",
                id: 4
            }, {
                name: "5室",
                id: 5
            }, {
                name: "5室以上",
                id: 6
            } ],
            carid: 0,
            priceid: 0,
            typeid: 0,
            selectid: 0,
            housewaylist: [ {
                name: "整租",
                id: 1
            }, {
                name: "合租",
                id: 2
            } ]
        }), wx.setNavigationBarTitle({
            title: "房屋出租-" + wx.getStorageSync("companyinfo").name
        }), app.util.request({
            url: "entry/wxapp/getinitletinfo",
            success: function(t) {
                t.data.message.errno || e.setData({
                    city: wx.getStorageSync("companyinfo").city,
                    arealist: t.data.data.arealist,
                    housepricelist: t.data.data.housepricelist,
                    title: "",
                    price: "",
                    typetitle: "",
                    selecttitle: ""
                });
            },
            complete: function() {}
        }), app.util.request({
            url: "entry/wxapp/getlethouselist",
            data: {
                houseareaid: e.data.houseareaid,
                housepriceid: e.data.housepriceid,
                housetype: e.data.housetype,
                letway: e.data.letway
            },
            success: function(t) {
                t.data.message.errno || (console.log(t.data.data), e.setData({
                    houselist: t.data.data
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh(), e.setData({
                    loadMore: ""
                });
            }
        });
    },
    toHouseDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/lethousedetail/index?id=" + e
        });
    },
    toSearch: function(t) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/search/index"
        });
    },
    gethouselist: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/getlethouselist",
            data: {
                page: e.data.page,
                houseareaid: e.data.houseareaid,
                housepriceid: e.data.housepriceid,
                housetype: e.data.housetype,
                letway: e.data.letway
            },
            success: function(t) {
                t.data.message.errno || (console.log(t.data.data), e.setData({
                    houselist: t.data.data
                }));
            },
            complete: function() {
                e.setData({
                    loadMore: ""
                });
            }
        });
    },
    selectcarsitem: function(t) {
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        this.setData({
            carid: e,
            isCars: !0,
            title: a
        }), this.data.houseareaid = e, this.gethouselist();
    },
    selectpriceitem: function(t) {
        console.log(t.currentTarget.id);
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        this.setData({
            priceid: e,
            isPrice: !0,
            price: a
        }), this.data.housepriceid = e, this.gethouselist();
    },
    selecttypeitem: function(t) {
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        console.log(t.currentTarget), this.setData({
            typeid: e,
            isType: !0,
            typetitle: a
        }), this.data.housetype = e, this.gethouselist();
    },
    selectwayitem: function(t) {
        console.log(t.currentTarget.id);
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        console.log(t.currentTarget), this.setData({
            selectid: e,
            isSelect: !0,
            selecttitle: a
        }), this.data.letway = e, this.gethouselist();
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
            isSelect: !0,
            isCars: !this.data.isCars
        });
    },
    selectPrice: function() {
        console.log("aaa"), this.setData({
            isSort: !0,
            isCars: !0,
            isType: !0,
            isSelect: !0,
            isPrice: !this.data.isPrice
        });
    },
    selectType: function() {
        this.setData({
            isSort: !0,
            isCars: !0,
            isPrice: !0,
            isSelect: !0,
            isType: !this.data.isType
        });
    },
    selectWay: function() {
        this.setData({
            isSort: !0,
            isCars: !0,
            isPrice: !0,
            isType: !0,
            isSelect: !this.data.isSelect
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
            title: "房屋出租-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_zp/pages/lethouselist/index"
        };
    }
});