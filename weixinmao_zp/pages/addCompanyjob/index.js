var _Page;

function _defineProperty(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var app = getApp();

function isHasElementOne(e, a) {
    for (var t = 0, i = e.length; t < i; t++) if (e[t] == a) return t;
    return -1;
}

function isHasElementTwo(e, a) {
    for (var t = 0, i = e.length; t < i; t++) if (e[t].id == a) return t;
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
        jobcate: [],
        jobcateid: 0,
        toplist: [],
        areaid: 0,
        toplistid: -1,
        sex: 1,
        speciallist: [ {
            name: "五险一金",
            checked: !1
        }, {
            name: "补充医疗保险",
            checked: !1
        }, {
            name: "员工旅游",
            checked: !1
        }, {
            name: "交通补贴",
            checked: !1
        }, {
            name: "餐饮补贴",
            checked: !1
        }, {
            name: "出国机会",
            checked: !1
        }, {
            name: "年终奖金",
            checked: !1
        }, {
            name: "定期体检",
            checked: !1
        } ],
        education: [ "初中以上", "高中以上", "中技以上", "中专以上", "大专以上", "本科以上", "硕士以上", "博士以上", "博后" ],
        educationindex: -1,
        educationname: "",
        express: [ "无经验", "1年以下", "1-3年", "3-5年", "5-10年", "10年以上" ],
        expressindex: -1,
        expressname: "",
        worktype: [ "全职", "兼职", "实习" ],
        worktypeindex: -1,
        worktypename: "",
        id: 0
    },
    onLoad: function(e) {
        this.data.id = e.id, wx.setNavigationBarTitle({
            title: "职位添加-" + wx.getStorageSync("companyinfo").name
        }), 0 < wx.getStorageSync("companyid") ? this.oldhouseinit() : wx.redirectTo({
            url: "/weixinmao_zp/pages/message/index"
        });
    },
    oldhouseinit: function(e) {
        var a = this, t = wx.getStorageSync("userInfo"), i = wx.getStorageSync("companyid");
        app.util.request({
            url: "entry/wxapp/Addjobinit",
            data: {
                companyid: i,
                sessionid: t.sessionid,
                uid: t.memberInfo.uid
            },
            success: function(e) {
                e.data.message.errno || (1 == e.data.data.isbind ? (a.data.toplist = e.data.data.payjoblist, 
                a.setData({
                    jobcate: e.data.data.jobcate,
                    payjoblist: e.data.data.payjoblist,
                    ispay: e.data.data.ispay
                })) : wx.redirectTo({
                    url: "/weixinmao_zp/pages/binduser/index"
                }));
            }
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
    bindToplistChange: function(e) {
        var a = this.data.toplist;
        a && (this.data.toplistid = a[e.detail.value].id), this.setData({
            toplist: a,
            toplistidindex: e.detail.value
        });
    },
    bindExpressChange: function(e) {
        var a = this.data.express;
        a && (this.data.expressindex = e.detail.value, this.data.expressname = a[e.detail.value]), 
        console.log(this.data.expressname), this.setData({
            express: a,
            expressindex: e.detail.value
        });
    },
    bindEducationChange: function(e) {
        var a = this.data.education;
        a && (this.data.educationindex = e.detail.value, this.data.educationname = a[e.detail.value]), 
        console.log(this.data.educationname), this.setData({
            education: a,
            educationindex: e.detail.value
        });
    },
    bindWorktypeChange: function(e) {
        var a = this.data.worktype;
        a && (this.data.worktypeindex = e.detail.value, this.data.worktypename = a[e.detail.value]), 
        console.log(this.data.worktypename), this.setData({
            worktype: a,
            worktypeindex: e.detail.value
        });
    },
    bindJobcateChange: function(e) {
        var a = this.data.jobcate;
        a && (this.data.jobcateindex = e.detail.value, this.data.jobcateid = a[e.detail.value].id), 
        this.setData({
            jobcate: a,
            jobcateindex: e.detail.value
        });
    }
}, "bindWorktypeChange", function(e) {
    var a = this.data.worktype;
    a && (this.data.worktypeindex = e.detail.value, this.data.worktypename = a[e.detail.value]), 
    console.log(this.data.worktypename), this.setData({
        worktype: a,
        worktypeindex: e.detail.value
    });
}), _defineProperty(_Page, "savepubinfo", function(e) {
    var n = this, a = wx.getStorageSync("userInfo"), t = e.detail.value.jobtitle, i = this.data.jobcateid, o = e.detail.value.money, s = e.detail.value.num, d = n.data.educationname, l = n.data.expressname, r = n.data.worktypename, c = e.detail.value.age, u = n.data.sex, p = e.detail.value.content, h = wx.getStorageSync("companyid"), f = n.data.toplistid;
    if ("" != t) if (0 != i) if ("" != o) if ("" != s) if ("" != d) if ("" != l) if ("" != r) if ("" != c) if ("" != p) {
        var w = {
            sessionid: a.sessionid,
            uid: a.memberInfo.uid,
            companyid: h,
            jobtitle: t,
            jobcateid: i,
            money: o,
            num: s,
            education: d,
            express: l,
            jobtype: r,
            age: c,
            sex: u,
            special: n.data.special,
            content: p,
            toplistid: f
        };
        app.util.request({
            url: "entry/wxapp/Addcompanyjob",
            data: w,
            success: function(e) {
                if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                    title: "失败",
                    content: e.data.data.msg,
                    showCancel: !1
                });
                if (0 == e.data.data.ispay) wx.showToast({
                    title: "提交成功",
                    icon: "success",
                    duration: 2e3,
                    success: function(e) {
                        console.log(e), wx.redirectTo({
                            url: "/weixinmao_zp/pages/companyjob/index"
                        });
                    }
                }); else if (0 < n.data.toplistid) {
                    var a = n.data.toplistid, t = e.data.data.pid, i = wx.getStorageSync("userInfo");
                    wx.showModal({
                        title: "确认支付",
                        content: "确认支付？",
                        success: function(e) {
                            e.confirm && app.util.request({
                                url: "entry/wxapp/pay",
                                data: {
                                    toplistid: a,
                                    ordertype: "paypubjob",
                                    pid: t,
                                    sessionid: i.sessionid,
                                    uid: i.memberInfo.uid
                                },
                                success: function(e) {
                                    console.log(e), e.data && e.data.data && wx.requestPayment({
                                        timeStamp: e.data.data.timeStamp,
                                        nonceStr: e.data.data.nonceStr,
                                        package: e.data.data.package,
                                        signType: "MD5",
                                        paySign: e.data.data.paySign,
                                        success: function(e) {
                                            console.log(e), wx.showToast({
                                                title: "提交成功",
                                                icon: "success",
                                                duration: 2e3,
                                                success: function(e) {
                                                    console.log(e), wx.redirectTo({
                                                        url: "/weixinmao_zp/pages/companyjob/index"
                                                    });
                                                }
                                            });
                                        },
                                        fail: function(e) {}
                                    });
                                },
                                fail: function(e) {
                                    console.log(e);
                                }
                            });
                        }
                    });
                }
            }
        });
    } else wx.showModal({
        title: "提示",
        content: "请输入职位描述",
        showCancel: !1
    }); else wx.showModal({
        title: "提示",
        content: "请输入年龄要求",
        showCancel: !1
    }); else wx.showModal({
        title: "提示",
        content: "请选择工作性质",
        showCancel: !1
    }); else wx.showModal({
        title: "提示",
        content: "请选择工作经验",
        showCancel: !1
    }); else wx.showModal({
        title: "提示",
        content: "请选择学历要求",
        showCancel: !1
    }); else wx.showModal({
        title: "提示",
        content: "请输入招聘人数",
        showCancel: !1
    }); else wx.showModal({
        title: "提示",
        content: "请输入薪资待遇",
        showCancel: !1
    }); else wx.showModal({
        title: "提示",
        content: "请选择期望行业",
        showCancel: !1
    }); else wx.showModal({
        title: "提示",
        content: "请输入工作职位",
        showCancel: !1
    });
}), _defineProperty(_Page, "onReady", function() {}), _defineProperty(_Page, "radioChange", function(e) {
    this.data.sex = e.detail.value;
}), _defineProperty(_Page, "onShow", function() {}), _defineProperty(_Page, "onHide", function() {}), 
_defineProperty(_Page, "onUnload", function() {}), _defineProperty(_Page, "onPullDownRefresh", function() {}), 
_defineProperty(_Page, "onReachBottom", function() {}), _defineProperty(_Page, "onShareAppMessage", function() {}), 
_defineProperty(_Page, "uploadimg", function(e, n) {
    var a = app.util.geturl({
        url: "entry/wxapp/upload"
    });
    n = n;
    wx.showToast({
        icon: "loading",
        title: "正在上传"
    });
    var o = this;
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
            if (200 == e.statusCode) for (var t = a.data.path, i = 0; i < o.data.uploadimagelist.length; i++) {
                i + 1 == n && (o.data.uploadimagelist[i] = t);
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
}), _defineProperty(_Page, "checkboxChange", function(e) {
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
        t.getlethousedetail();
    }), !1);
}), _Page));