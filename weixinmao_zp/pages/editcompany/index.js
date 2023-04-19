var _Page;

function _defineProperty(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

var app = getApp();

function isHasElementOne(a, e) {
    for (var t = 0, i = a.length; t < i; t++) if (a[t] == e) return t;
    return -1;
}

function isHasElementTwo(a, e) {
    for (var t = 0, i = a.length; t < i; t++) if (a[t].id == e) return t;
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
        areaidindex: 0,
        areaid: 0
    },
    onLoad: function(a) {
        this.data.id = a.id, wx.setNavigationBarTitle({
            title: "企业信息编辑-" + wx.getStorageSync("companyinfo").name
        }), 0 < wx.getStorageSync("companyid") ? this.oldhouseinit() : wx.redirectTo({
            url: "/weixinmao_zp/pages/message/index"
        });
    },
    oldhouseinit: function(a) {
        var t = this, e = wx.getStorageSync("companyid");
        wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/Editcompanyinit",
            data: {
                companyid: e
            },
            success: function(a) {
                if (!a.data.message.errno) {
                    t.data.arealist = a.data.data.arealist;
                    var e = a.data.data.companyinfo;
                    e.thumb && (t.data.true1 = !1), t.data.areaidindex = isHasElementTwo(a.data.data.arealist, e.areaid), 
                    console.log(t.data.areaidindex), t.data.areaid = e.areaid, t.setData({
                        companyinfo: e,
                        areaidindex: t.data.areaidindex,
                        imgurl1: e.thumb,
                        true1: t.data.true1,
                        arealist: t.data.arealist
                    });
                }
            }
        });
    },
    checkboxChange: function(a) {
        var e = a.detail.value;
        this.data.special = e.join(",");
    },
    bindAreaChange: function(a) {
        var e = this.data.arealist;
        e && (this.data.areaid = e[a.detail.value].id, this.data.areaidindex = a.detail.value), 
        this.setData({
            arealist: e,
            areaidindex: a.detail.value
        });
    },
    savepubinfo: function(a) {
        var e = wx.getStorageSync("userInfo"), t = wx.getStorageSync("companyid"), i = a.detail.value.companyname, n = a.detail.value.companycate, o = a.detail.value.companytype, r = a.detail.value.companyworker, s = a.detail.value.mastername, d = a.detail.value.tel, l = a.detail.value.address, u = a.detail.value.content, c = (this.data.id, 
        this.data.areaid);
        if (0 != c) if ("" != i) if (0 != n) if ("" != o) if ("" != r) if ("" != s) if ("" != d) if ("" != l) if ("" != u) {
            var p = this.data.uploadimagelist, f = {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid,
                areaid: c,
                companyid: t,
                companyname: i,
                companycate: n,
                companytype: o,
                companyworker: r,
                mastername: s,
                tel: d,
                address: l,
                content: u,
                logo: p[0]
            };
            app.util.request({
                url: "entry/wxapp/Savecompanyinfo",
                data: f,
                success: function(a) {
                    if (0 != a.data.errno) return wx.hideLoading(), void wx.showModal({
                        title: "失败",
                        content: a.data.data.msg,
                        showCancel: !1
                    });
                    wx.showToast({
                        title: "提交成功",
                        icon: "success",
                        duration: 2e3,
                        success: function(a) {
                            console.log(a), wx.navigateTo({
                                url: "/weixinmao_house/pages/mysalepub/index?id=1"
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
            content: "请输入地址",
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
    radioChange: function(a) {
        this.data.sex = a.detail.value;
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    upload: function(a) {
        a = a;
        this.doupload(a);
    },
    doupload: function(a) {
        var t, i, n, o, r, s, d = this, l = parseInt(a.currentTarget.dataset.id);
        switch (l) {
          case 1:
            if (0 == d.data.true1) return;
            break;

          case 2:
            if (0 == d.data.true2) return;
            break;

          case 3:
            if (0 == d.data.true3) return;
            break;

          case 4:
            if (0 == d.data.true4) return;
            break;

          case 5:
            if (0 == d.data.true5) return;
            break;

          case 6:
            if (0 == d.data.true6) return;
        }
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths;
                switch (l) {
                  case 1:
                    if (t = e, console.log(d.data.true1), 0 == d.data.true1) return;
                    d.data.true1 = !1;
                    break;

                  case 2:
                    i = e, d.data.true2 = !1;
                    break;

                  case 3:
                    n = e, d.data.true3 = !1;
                    break;

                  case 4:
                    o = e, d.data.true4 = !1;
                    break;

                  case 5:
                    r = e, d.data.true5 = !1;
                    break;

                  case 6:
                    s = e, d.data.true6 = !1;
                }
                d.setData({
                    imgurl1: t,
                    imgurl2: i,
                    imgurl3: n,
                    imgurl4: o,
                    imgurl5: r,
                    imgurl6: s,
                    true1: d.data.true1,
                    true2: d.data.true2,
                    true3: d.data.true3,
                    true4: d.data.true4,
                    true5: d.data.true5,
                    true6: d.data.true6
                }), d.data.imagelist.push(e), d.uploadimg(e, l);
            }
        });
    },
    uploadimg: function(a, n) {
        var e = app.util.geturl({
            url: "entry/wxapp/upload"
        });
        n = n;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var o = this;
        wx.uploadFile({
            url: e,
            filePath: a[0],
            name: "file",
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                session_token: wx.getStorageSync("session_token")
            },
            success: function(a) {
                var e = JSON.parse(a.data);
                if (200 == a.statusCode) for (var t = e.data.path, i = 0; i < o.data.uploadimagelist.length; i++) {
                    i + 1 == n && (o.data.uploadimagelist[i] = t);
                } else wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            fail: function(a) {
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
    delupload: function(a) {
        var e = this, t = parseInt(a.currentTarget.dataset.id);
        switch (t) {
          case 1:
            e.setData({
                imgurl1: "",
                true1: !0
            });
            break;

          case 2:
            e.setData({
                imgurl2: "",
                true2: !0
            });
            break;

          case 3:
            e.setData({
                imgurl3: "",
                true3: !0
            });
            break;

          case 4:
            e.setData({
                imgurl4: "",
                true4: !0
            });
            break;

          case 5:
            e.setData({
                imgurl5: "",
                true5: !0
            });
            break;

          case 6:
            e.setData({
                imgurl6: "",
                true6: !0
            });
        }
        for (var i = 0; i < this.data.uploadimagelist.length; i++) {
            i + 1 == t && (this.data.uploadimagelist[i] = "");
        }
        console.log(this.data.uploadimagelist);
    }
}, "checkboxChange", function(a) {
    var e = a.detail.value;
    this.data.special = e.join(",");
}), _defineProperty(_Page, "checkuser", function(e) {
    var t = this, a = (e = e, wx.getStorageSync("userInfo"));
    return console.log(a), a ? a.memberInfo.uid ? void app.util.request({
        url: "entry/wxapp/checkuserinfo",
        data: {
            sessionid: a.sessionid,
            uid: a.memberInfo.uid
        },
        success: function(a) {
            console.log("payyyy"), 0 == a.data.data.error ? e.doServices() : 2 == a.data.data.error && e.doElseServices();
        }
    }) : (app.util.getUserInfo(), !1) : (app.util.getUserInfo(function(a) {
        t.getlethousedetail();
    }), !1);
}), _Page));