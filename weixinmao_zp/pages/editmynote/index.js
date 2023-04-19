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
        areaindexid: 0,
        jobcate: [],
        jobcateid: 0,
        toplist: [],
        areaid: 0,
        toplistid: 0,
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
        birthday: [ "1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000" ],
        birthdayindex: -1,
        birthdayname: "",
        education: [ "初中", "高中", "中技", "中专", "大专", "本科", "硕士", "博士", "博后" ],
        educationindex: -1,
        educationname: "",
        express: [ "无经验", "1年以下", "1-3年", "3-5年", "5-10年", "10年以上" ],
        expressindex: -1,
        expressname: "",
        currentstatus: [ "我目前已离职,可快速到岗", "我目前在职，但考虑换个新环境", "观望有好的机会再考虑", "目前暂无跳槽打算", "应届毕业生" ],
        currentstatusindex: -1,
        currentstatusname: "",
        worktype: [ "全职", "兼职", "实习" ],
        worktypeindex: -1,
        worktypename: "",
        money: [ "1千~2千/月", "1千~2千/月", "2千~3千/月", "3千~4千/月", "4千~5千/月", "5千~1万/月", "1万以上/月" ],
        moneyindex: -1,
        moneyname: "",
        id: 0
    },
    onLoad: function(e) {
        var a = this;
        a.data.id = e.id, wx.setNavigationBarTitle({
            title: "简历编辑-" + wx.getStorageSync("companyinfo").name
        }), a.checkuser({
            doServices: function() {
                a.oldhouseinit();
            },
            doElseServices: function() {
                a.oldhouseinit();
            }
        });
    },
    oldhouseinit: function(e) {
        var t = this, a = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/Getpubinit",
            data: {
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(e) {
                if (!e.data.message.errno && 1 == e.data.data.isbind) {
                    t.data.arealist = e.data.data.arealist;
                    var a = e.data.data.noteinfo;
                    console.log(a), a && (t.data.jobtitle = a.jobtitle, t.data.birthdayindex = isHasElementOne(t.data.birthday, a.birthday), 
                    t.data.birthdayname = a.birthday, t.data.currentstatusindex = isHasElementOne(t.data.currentstatus, a.currentstatus), 
                    t.data.currentstatusname = a.currentstatus, t.data.jobcateindex = isHasElementTwo(e.data.data.jobcate, a.jobcateid), 
                    t.data.jobcateid = a.jobcateid, t.data.areaindexid = a.areaid, t.data.educationindex = isHasElementOne(t.data.education, a.education), 
                    t.data.educationname = a.education, t.data.expressindex = isHasElementOne(t.data.express, a.express), 
                    t.data.expressname = a.express, t.data.worktypeindex = isHasElementOne(t.data.worktype, a.worktype), 
                    t.data.worktypename = a.worktype, t.data.moneyindex = isHasElementOne(t.data.money, a.money), 
                    t.data.moneyname = a.money, t.data.sex = a.sex, t.data.special = a.special), t.setData({
                        jobcate: e.data.data.jobcate,
                        arealist: e.data.data.arealist,
                        noteinfo: a,
                        birthdayindex: t.data.birthdayindex,
                        currentstatusindex: t.data.currentstatusindex,
                        jobcateindex: t.data.jobcateindex,
                        educationindex: t.data.educationindex,
                        expressindex: t.data.expressindex,
                        worktypeindex: t.data.worktypeindex,
                        moneyindex: t.data.moneyindex,
                        areaindexid: t.data.areaindexid
                    });
                }
            }
        });
    },
    checkboxChange: function(e) {
        var a = e.detail.value;
        this.data.special = a.join(",");
    },
    bindAreaChange: function(e) {
        var a = this.data.arealist;
        a && (this.data.areaid = a[e.detail.value].id, this.data.areaindexid = e.detail.value), 
        this.setData({
            arealist: a,
            areaindexid: e.detail.value
        });
    },
    bindJobcateChange: function(e) {
        var a = this.data.jobcate;
        a && (this.data.jobcateindex = e.detail.value, this.data.jobcateid = a[e.detail.value].id), 
        this.setData({
            jobcate: a,
            jobcateindex: e.detail.value
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
    bindBirthdayChange: function(e) {
        var a = this.data.birthday;
        a && (this.data.birthdayindex = e.detail.value, this.data.birthdayname = a[e.detail.value]), 
        this.setData({
            birthday: a,
            birthdayindex: e.detail.value
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
    bindMoneyChange: function(e) {
        var a = this.data.money;
        a && (this.data.moneyindex = e.detail.value, this.data.moneyname = a[e.detail.value]), 
        console.log(this.data.moneyname), this.setData({
            money: a,
            moneyindex: e.detail.value
        });
    },
    bindCurrentstatusChange: function(e) {
        var a = this.data.currentstatus;
        a && (this.data.currentstatusindex = e.detail.value, this.data.currentstatusname = a[e.detail.value]), 
        console.log(this.data.currentstatusname), this.setData({
            currentstatus: a,
            currentstatusindex: e.detail.value
        });
    },
    bindToplistChange: function(e) {
        var a = this.data.toplist;
        a && (this.data.toplistid = a[e.detail.value].id), this.setData({
            toplist: a,
            toplistidindex: e.detail.value
        });
    },
    savepubinfo: function(e) {
        var a, t = this, i = wx.getStorageSync("userInfo"), n = e.detail.value.jobtitle, s = e.detail.value.name, d = t.data.sex, o = this.data.birthdayname, r = t.data.educationname, l = t.data.expressname, u = e.detail.value.address, c = e.detail.value.email, h = e.detail.value.tel, p = t.data.currentstatusname, m = t.data.worktypename, x = this.data.jobcateid, f = this.data.moneyname, w = this.data.areaindexid, y = e.detail.value.content;
        if ("" != n) if (0 != s) if ("" != o) if ("" != r) if ("" != l) if ("" != u) if ("" != c) if ("" != h) if ("" != p) if ("" != m) if (0 != x) if ("" != f) if (0 != w) if ("" != y) {
            var g = this.data.uploadimagelist;
            if (g.length < 2) wx.showModal({
                title: "提示",
                content: "上传图片不少于2张",
                showCancel: !1
            }); else {
                var b = g[0], v = (_defineProperty(a = {
                    sessionid: i.sessionid,
                    uid: i.memberInfo.uid,
                    jobtitle: n,
                    name: s,
                    sex: d,
                    tel: h,
                    birthday: o,
                    education: r,
                    express: l,
                    address: u,
                    email: c
                }, "tel", h), _defineProperty(a, "currentstatus", p), _defineProperty(a, "worktype", m), 
                _defineProperty(a, "jobcateid", x), _defineProperty(a, "money", f), _defineProperty(a, "areaid", w), 
                _defineProperty(a, "content", y), _defineProperty(a, "uploadimagelist_str", b), 
                a);
                app.util.request({
                    url: "entry/wxapp/Savenote",
                    data: v,
                    success: function(e) {
                        if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                            title: "失败",
                            content: e.data.data.msg,
                            showCancel: !1
                        });
                        wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 2e3,
                            success: function(e) {
                                console.log(e);
                            }
                        });
                    }
                });
            }
        } else wx.showModal({
            title: "提示",
            content: "请输入自我介绍及工作经历",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择工作地区",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择期望薪资",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择期望行业",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择工作性质",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择目前状态",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请填写手机号",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请填写邮箱",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请填写现居住地",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择工作经验",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择最高学历",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择出生年份",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入姓名",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入意向职位",
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
    uploadimg: function(e, n) {
        var a = app.util.geturl({
            url: "entry/wxapp/upload"
        });
        n = n;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var s = this;
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
                if (200 == e.statusCode) for (var t = a.data.path, i = 0; i < s.data.uploadimagelist.length; i++) {
                    i + 1 == n && (s.data.uploadimagelist[i] = t);
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
    upload: function(e) {
        var a = this;
        e = e;
        a.checkuser({
            doServices: function() {
                a.doupload(e);
            },
            doElseServices: function() {
                a.doupload(e);
            }
        });
    },
    doupload: function(e) {
        var t, i, n, s, d, o, r = this, l = parseInt(e.currentTarget.dataset.id);
        switch (l) {
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
                switch (l) {
                  case 1:
                    if (t = a, console.log(r.data.true1), 0 == r.data.true1) return;
                    r.data.true1 = !1;
                    break;

                  case 2:
                    i = a, r.data.true2 = !1;
                    break;

                  case 3:
                    n = a, r.data.true3 = !1;
                    break;

                  case 4:
                    s = a, r.data.true4 = !1;
                    break;

                  case 5:
                    d = a, r.data.true5 = !1;
                    break;

                  case 6:
                    o = a, r.data.true6 = !1;
                }
                r.setData({
                    imgurl1: t,
                    imgurl2: i,
                    imgurl3: n,
                    imgurl4: s,
                    imgurl5: d,
                    imgurl6: o,
                    true1: r.data.true1,
                    true2: r.data.true2,
                    true3: r.data.true3,
                    true4: r.data.true4,
                    true5: r.data.true5,
                    true6: r.data.true6
                }), r.data.imagelist.push(a), r.uploadimg(a, l);
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
        for (var i = 0; i < this.data.uploadimagelist.length; i++) {
            i + 1 == t && (this.data.uploadimagelist[i] = "");
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
        t.getlethousedetail();
    }), !1);
}), _Page));