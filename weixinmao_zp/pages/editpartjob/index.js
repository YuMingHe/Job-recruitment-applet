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
        toplistid: 0,
        date: "",
        date2: "",
        datetime: "",
        datetime2: "",
        sex: 1,
        speciallist: [ {
            name: "交通补贴",
            checked: !1
        }, {
            name: "餐饮补贴",
            checked: !1
        }, {
            name: "包接送",
            checked: !1
        }, {
            name: "包盒饭",
            checked: !1
        }, {
            name: "包食宿",
            checked: !1
        } ],
        birthday: [ "1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990" ],
        birthdayindex: -1,
        birthdayname: "",
        education: [ "初中以上", "高中以上", "中技以上", "中专以上", "大专以上", "本科以上", "硕士以上", "博士以上", "博后" ],
        educationindex: -1,
        educationname: "",
        express: [ "无经验", "1年以下", "1-3年", "3-5年", "5-10年", "10年以上" ],
        expressindex: -1,
        expressname: "",
        currentstatus: [ "我目前已离职,可快速到岗", "我目前在职，但考虑换个新环境", "观望有好的机会再考虑", "目前暂无跳槽打算", "应届毕业生" ],
        currentstatusindex: -1,
        currentstatusname: "",
        worktype: [ "日结", "周结", "月结" ],
        worktypeindex: -1,
        worktypename: "",
        money: [ "1千~2千/月", "1千~2千/月", "2千~3千/月", "3千~4千/月", "4千~5千/月", "5千~1万/月", "1万以上/月" ],
        moneyindex: -1,
        moneyname: "",
        id: 0
    },
    onLoad: function(e) {
        this.data.id = e.id, wx.setNavigationBarTitle({
            title: "职位编辑-" + wx.getStorageSync("companyinfo").name
        }), this.oldhouseinit();
    },
    oldhouseinit: function(e) {
        var i = this, a = i.data.id, t = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/Editpartjobinit",
            data: {
                id: a,
                sessionid: t.sessionid,
                uid: t.memberInfo.uid
            },
            success: function(e) {
                if (!e.data.message.errno) if (1 == e.data.data.isbind) {
                    i.data.arealist = e.data.data.arealist;
                    var a = e.data.data.jobinfo;
                    a && (i.data.jobtitle = a.jobtitle, i.data.jobcateindex = isHasElementTwo(e.data.data.jobcate, a.worktype), 
                    i.data.jobcateid = a.worktype, i.data.educationindex = isHasElementOne(i.data.education, a.education), 
                    i.data.educationname = a.education, i.data.expressindex = isHasElementOne(i.data.express, a.express), 
                    i.data.expressname = a.express, i.data.worktypeindex = isHasElementOne(i.data.worktype, a.jobtype), 
                    i.data.worktypename = a.jobtype, i.data.sex = a.sex, i.data.special = a.special);
                    for (var t = 0; t < i.data.speciallist.length; t++) 0 <= a.special.indexOf(i.data.speciallist[t].name) && (i.data.speciallist[t].checked = !0);
                    console.log(i.data.speciallist), i.setData({
                        jobcate: e.data.data.jobcate,
                        jobinfo: a,
                        jobcateindex: i.data.jobcateindex,
                        special: a.special,
                        speciallist: i.data.speciallist,
                        educationindex: i.data.educationindex,
                        expressindex: i.data.expressindex,
                        worktypeindex: i.data.worktypeindex,
                        dates: a.beginjobdate,
                        dates2: a.endjobdate,
                        datetime: a.beginjobtime,
                        datetime2: a.endjobtime
                    });
                } else wx.redirectTo({
                    url: "/weixinmao_zp/pages/binduser/index"
                });
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
    bindDateChange: function(e) {
        this.data.date = e.detail.value, console.log(e.detail.value), this.setData({
            dates: e.detail.value
        });
    },
    bindDateChange2: function(e) {
        this.data.date2 = e.detail.value, console.log(e.detail.value), this.setData({
            dates2: e.detail.value
        });
    },
    bindTimeChange: function(e) {
        this.data.datetime = e.detail.value, console.log(e.detail.value), this.setData({
            datetime: e.detail.value
        });
    },
    bindTimeChange2: function(e) {
        this.data.datetime2 = e.detail.value, console.log(e.detail.value), this.setData({
            datetime2: e.detail.value
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
        var a = this, t = wx.getStorageSync("userInfo"), i = e.detail.value.jobtitle, n = this.data.jobcateid, d = e.detail.value.money, s = e.detail.value.num, o = a.data.educationname, l = a.data.expressname, r = a.data.worktypename, c = e.detail.value.age, u = a.data.sex, h = e.detail.value.address, p = e.detail.value.workaddress, x = e.detail.value.content, f = (wx.getStorageSync("companyid"), 
        a.data.date), w = a.data.date2, m = a.data.datetime, v = a.data.datetime2, g = a.data.id;
        if ("" != i) if (0 != n) if ("" != d) if ("" != s) if ("" != o) if ("" != l) if ("" != c) if ("" != p) if ("" != h) if ("" != x) {
            var b = {
                sessionid: t.sessionid,
                uid: t.memberInfo.uid,
                id: g,
                jobtitle: i,
                jobcateid: n,
                money: d,
                num: s,
                education: o,
                express: l,
                jobtype: r,
                age: c,
                sex: u,
                special: a.data.special,
                workaddress: p,
                address: h,
                content: x,
                beginjobdate: f,
                endjobdate: w,
                beginjobtime: m,
                endjobtime: v
            };
            app.util.request({
                url: "entry/wxapp/Savecompanypartjob",
                data: b,
                success: function(e) {
                    if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                        title: "失败",
                        content: e.data.data.msg,
                        showCancel: !1
                    });
                    wx.showToast({
                        title: "提交成功",
                        icon: "success",
                        duration: 2e3,
                        success: function(e) {
                            console.log(e);
                        }
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请输入职位描述",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入集合地点",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输工作地点",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入年龄要求",
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
            content: "请输入兼职日薪",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择兼职类型",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入兼职名称",
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
        var d = this;
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
                if (200 == e.statusCode) for (var t = a.data.path, i = 0; i < d.data.uploadimagelist.length; i++) {
                    i + 1 == n && (d.data.uploadimagelist[i] = t);
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