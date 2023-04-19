var _Page;

function _defineProperty(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var qqmapsdk, QQMapWX = require("../../resource/js/qqmap-wx-jssdk.min.js"), app = getApp();

function isHasElementOne(e, a) {
    for (var t = 0, o = e.length; t < o; t++) if (e[t] == a) return t;
    return -1;
}

function isHasElementTwo(e, a) {
    for (var t = 0, o = e.length; t < o; t++) if (e[t].id == a) return t;
    return -1;
}

Page((_defineProperty(_Page = {
    data: {
        title: "",
        special: "",
        imagelist: [],
        uploadimagelist: [ "", "", "", "", "", "" ],
        true1: !0,
        true2: !0,
        true3: !0,
        true4: !0,
        true5: !0,
        true6: !0,
        arealist: [],
        areaidindex: -1,
        areaid: 0,
        lat: 0,
        lng: 0
    },
    onLoad: function(e) {
        var o = this;
        o.data.id = e.id, wx.setNavigationBarTitle({
            title: "企业注册"
        });
        wx.getStorageSync("companyid");
        var a = wx.getStorageSync("cityinfo");
        a ? (wx.setStorageSync("city", a.name), o.oldhouseinit()) : (qqmapsdk = new QQMapWX({
            key: "5D3BZ-J55WF-SFPJJ-NI6PG-YN2ZO-M4BHX"
        }), wx.getLocation({
            type: "gcj02",
            success: function(e) {
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: e.latitude,
                        longitude: e.longitude
                    },
                    success: function(e) {
                        var a = e.result.address_component.city, t = a.substr(0, a.length - 1);
                        wx.setStorageSync("city", t), o.oldhouseinit();
                    }
                });
            },
            fail: function() {
                o.oldhouseinit();
            },
            complete: function() {}
        }));
    },
    oldhouseinit: function(e) {
        var o = this, a = wx.getStorageSync("companyid"), t = wx.getStorageSync("city");
        console.log(t), o.setData({}), app.util.request({
            url: "entry/wxapp/Regcompanyinit",
            data: {
                city: t,
                companyid: a
            },
            success: function(e) {
                if (!e.data.message.errno) if (1 == e.data.data.isbind) {
                    o.data.arealist = e.data.data.arealist;
                    var a = e.data.data.companyinfo, t = e.data.data.cityinfo;
                    wx.setStorageSync("cityinfo", t), o.setData({
                        companyinfo: a,
                        arealist: o.data.arealist,
                        city: t.name
                    });
                } else wx.redirectTo({
                    url: "/weixinmao_zp/pages/binduser/index"
                });
            }
        });
    },
    getpostion: function() {
        var a = this;
        wx.chooseLocation({
            success: function(e) {
                console.log(e.name), console.log(e.latitude), console.log(e.longitude), a.data.lat = e.latitude, 
                a.data.lng = e.longitude, a.setData({
                    address: e.name
                });
            },
            fail: function(e) {
                console.log(e);
            },
            complete: function() {}
        });
    },
    checkboxChange: function(e) {
        var a = e.detail.value;
        this.data.special = a.join(",");
    },
    bindAreaChange: function(e) {
        var a = this.data.arealist;
        a && (this.data.areaid = a[e.detail.value].id, this.data.areaidindex = e.detail.value), 
        this.setData({
            arealist: a,
            areaidindex: e.detail.value
        });
    },
    savepubinfo: function(e) {
        var a = this, t = wx.getStorageSync("companyid"), o = e.detail.value.companyname, i = e.detail.value.companycate, n = e.detail.value.companytype, s = e.detail.value.companyworker, l = e.detail.value.mastername, r = e.detail.value.tel, c = e.detail.value.address, d = e.detail.value.account, u = e.detail.value.password, g = e.detail.value.password2, p = e.detail.value.content, f = (a.data.id, 
        a.data.areaid);
        if (0 != f) if ("" != o) if (0 != i) if ("" != n) if ("" != s) if ("" != l) if ("" != r) if ("" != a.data.lat && "" != a.data.lng) if ("" != c) if ("" != d) if ("" != u) if ("" != g) if (u == g) if ("" != p) {
            var w = this.data.uploadimagelist;
            console.log(w);
            var h = {
                areaid: f,
                cityid: wx.getStorageSync("cityinfo").id,
                companyid: t,
                companyname: o,
                companycate: i,
                companytype: n,
                companyworker: s,
                mastername: l,
                tel: r,
                address: c,
                account: d,
                password: u,
                content: p,
                lat: a.data.lat,
                lng: a.data.lng,
                logo: w[0],
                cardimg: w[1]
            };
            app.util.request({
                url: "entry/wxapp/Addcompanyinfo",
                data: h,
                success: function(e) {
                    if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                        title: "失败",
                        content: e.data.data.msg,
                        showCancel: !1
                    });
                    wx.showToast({
                        title: "提交成功,请耐心等待我们的审核！",
                        icon: "success",
                        duration: 2e3,
                        success: function(e) {
                            console.log(e), wx.navigateTo({
                                url: "/weixinmao_zp/pages/message/index"
                            });
                        }
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请输入公司介绍",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "两次密码不一致",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入确认密码",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入登录密码",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入登录账号",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择位置",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择位置",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入手机号",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入负责人",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入人员规模",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入企业性质",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入企业行业",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入企业名称",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择区域",
            showCancel: !1
        });
    },
    onReady: function() {},
    radioChange: function(e) {
        this.data.sex = e.detail.value;
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    upload: function(e) {
        e = e;
        this.doupload(e);
    },
    doupload: function(e) {
        var t, o, i, n, s, l, r = this, c = parseInt(e.currentTarget.dataset.id);
        switch (c) {
          case 1:
            if (0 == r.data.true1) return;
            break;

          case 2:
            if (0 == r.data.true2) return;
            break;

          case 3:
            if (0 == r.data.true3) return;
            break;

          case 4:
            if (0 == r.data.true4) return;
            break;

          case 5:
            if (0 == r.data.true5) return;
            break;

          case 6:
            if (0 == r.data.true6) return;
        }
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var a = e.tempFilePaths;
                switch (c) {
                  case 1:
                    if (t = a, console.log(r.data.true1), 0 == r.data.true1) return;
                    r.data.true1 = !1;
                    break;

                  case 2:
                    o = a, r.data.true2 = !1;
                    break;

                  case 3:
                    i = a, r.data.true3 = !1;
                    break;

                  case 4:
                    n = a, r.data.true4 = !1;
                    break;

                  case 5:
                    s = a, r.data.true5 = !1;
                    break;

                  case 6:
                    l = a, r.data.true6 = !1;
                }
                r.setData({
                    imgurl1: t,
                    imgurl2: o,
                    imgurl3: i,
                    imgurl4: n,
                    imgurl5: s,
                    imgurl6: l,
                    true1: r.data.true1,
                    true2: r.data.true2,
                    true3: r.data.true3,
                    true4: r.data.true4,
                    true5: r.data.true5,
                    true6: r.data.true6
                }), r.data.imagelist.push(a), r.uploadimg(a, c);
            }
        });
    },
    uploadimg: function(e, i) {
        var a = app.util.geturl({
            url: "entry/wxapp/upload"
        });
        i = i;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var n = this;
        wx.uploadFile({
            url: a,
            filePath: e[0],
            name: "file",
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                session_token: wx.getStorageSync("session_token")
            },
            success: function(e) {
                var a = JSON.parse(e.data);
                if (200 == e.statusCode) for (var t = a.data.path, o = 0; o < n.data.uploadimagelist.length; o++) {
                    o + 1 == i && (n.data.uploadimagelist[o] = t);
                } else wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            fail: function(e) {
                wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            complete: function() {
                wx.hideToast();
            }
        });
    },
    delupload: function(e) {
        var a = this, t = parseInt(e.currentTarget.dataset.id);
        switch (t) {
          case 1:
            a.setData({
                imgurl1: "",
                true1: !0
            });
            break;

          case 2:
            a.setData({
                imgurl2: "",
                true2: !0
            });
            break;

          case 3:
            a.setData({
                imgurl3: "",
                true3: !0
            });
            break;

          case 4:
            a.setData({
                imgurl4: "",
                true4: !0
            });
            break;

          case 5:
            a.setData({
                imgurl5: "",
                true5: !0
            });
            break;

          case 6:
            a.setData({
                imgurl6: "",
                true6: !0
            });
        }
        for (var o = 0; o < this.data.uploadimagelist.length; o++) {
            o + 1 == t && (this.data.uploadimagelist[o] = "");
        }
        console.log(this.data.uploadimagelist);
    }
}, "checkboxChange", function(e) {
    var a = e.detail.value;
    this.data.special = a.join(",");
}), _defineProperty(_Page, "checkuser", function(a) {
    var t = this, e = (a = a, wx.getStorageSync("userInfo"));
    return console.log(e), e ? e.memberInfo.uid ? void app.util.request({
        url: "entry/wxapp/checkuserinfo",
        data: {
            sessionid: e.sessionid,
            uid: e.memberInfo.uid
        },
        success: function(e) {
            console.log("payyyy"), 0 == e.data.data.error ? a.doServices() : 2 == e.data.data.error && a.doElseServices();
        }
    }) : (app.util.getUserInfo(), !1) : (app.util.getUserInfo(function(e) {
        t.oldhouseinit();
    }), !1);
}), _Page));