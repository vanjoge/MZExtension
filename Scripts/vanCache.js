var vanCache = {
    ajax: function (url, callback, cache_mode, Cjson) {
        if (cache_mode == undefined) {
            cache_mode = 2;
            //0 不缓存每次都获取 1 缓存永不刷新 2 缓存每日刷新
        }
        if (cache_mode > 0) {
            cacheItem.getLocValue(url, cache_mode, function (b64) {
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
                        clearCacheItem(url);
                    }
                } else {
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "html",
                        success: function (data) {
                            let b64 = base64js.fromByteArray(pako.gzip(data));
                            cacheItem.setLocValue(url, b64, function () {
                                let ret = false;
                                if (Cjson) {
                                    ret = callback("9" + b64, false);
                                } else {
                                    ret = callback(data, false);
                                }
                                if (ret) {
                                    clearCacheItem(url);
                                }
                                isAjaxing = false;
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
                    cacheItem.setLocValue(url, b64, function () {
                        let ret = false;
                        if (Cjson) {
                            ret = callback("9" + b64, false);
                        } else {
                            ret = callback(data, false);
                        }
                        if (ret) {
                            clearCacheItem(url);
                        }
                        isAjaxing = false;
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
            cacheItem.clearExpired();
            //clearCache(100);
            GM_setValue("last_autoclear", now.getTime());
            return true;
        }
    },
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
            let oneDayAgo = new Date(Date.now() - 3600 * 1000 * 24);
            this.db.cache.where('timestamp').below(oneDayAgo)
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
    ,
    cacheItem: new vanCache.cacheByIDB()
};

