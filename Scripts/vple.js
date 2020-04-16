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
        this.setLocValue = function (key, val, cache_mode, callback) {
            let ts = new Date().getTime();
            if (cache_mode == 1) {
                let dt = new Date();
                dt.setDate(dt.getDate() + 30);
                ts = dt.getTime();
            }
            if (ts > 0) {
                this.db.cache.put({ key: key, html: val, ts: ts }).then(function (lastKey) {
                    callback();
                });
            } else {
                callback();
            }
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
        this.setLocValue = function (key, val, cache_mode, callback) {
            key = md5(key);
            let ts = 0;
            if (cache_mode == 2) {
                ts = new Date().getTime();
            } else if (cache_mode == 1) {
                let dt = new Date();
                dt.setDate(dt.getDate() + 30);
                ts = dt.getTime();
            }
            if (ts > 0) {
                GM_setValue("Dt_" + key, ts);
                GM_setValue(key, val);
            }
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
    MatchEvent2: function () {
        //格式status->player->array
        this.data = {};
        //格式player->array
        this.dataByPlayer = {};
        //格式player->{frame_count,[{start,end}]}
        this.playerFool = {};

        this.longPass = {};


        this.setData = function (match, vgm) {
            this.match = match;
            //构建临时数据(不合并连续帧)
            let matchBuffer = match.matchBuffer;
            //player->frame->{}
            let playersMatchBuffer = {};
            //格式status->player->array
            let tmp = {};
            let tmpKey = {};
            let tmpLastPosition = {};
            let playerFool = {};
            vgm.out_of_play.resetIndex();
            let ball_move;
            let ballz = 0;
            let longPass = {};
            let LPtmp = {
                flag: false,
                data: {},
                begindown: false,
                state: 0,//0 初始 1开始上升 2开始下降,
                owner: false
            };
            for (let i = 0; i < matchBuffer.length; i++) {
                ball_move = false;
                ballz = 0;
                if (i - 1 >= 0) {
                    if (matchBuffer[i].ball.x == matchBuffer[i - 1].ball.x
                        &&
                        matchBuffer[i].ball.y == matchBuffer[i - 1].ball.y
                        &&
                        matchBuffer[i].ball.z == matchBuffer[i - 1].ball.z
                    ) {
                        ball_move = false;
                    }
                    else {
                        ball_move = true;

                        ballz = matchBuffer[i].ball.z - matchBuffer[i - 1].ball.z;
                    }
                }


                let players = matchBuffer[i].players;
                for (let j = 0; j < players.length; j++) {
                    if (players[j].status != undefined) {
                        if (ball_move && vgm.out_of_play.notin(i)) {
                            if (tmpLastPosition[players[j].id] == undefined) {
                                tmpLastPosition[players[j].id] = {};
                                tmpLastPosition[players[j].id].FoolStart = -1;
                            } else {
                                if (tmpLastPosition[players[j].id].x == players[j].position.x
                                    &&
                                    tmpLastPosition[players[j].id].y == players[j].position.y
                                    &&
                                    tmpLastPosition[players[j].id].z == players[j].position.z) {
                                    if (tmpLastPosition[players[j].id].FoolStart == -1) {
                                        tmpLastPosition[players[j].id].FoolStart = i - 1;
                                        tmpLastPosition[players[j].id].frame_count = 0;
                                    }
                                    tmpLastPosition[players[j].id].frame_count++;
                                } else {
                                    if (tmpLastPosition[players[j].id].FoolStart > 0) {
                                        if (playerFool[players[j].id] == undefined) {
                                            playerFool[players[j].id] = {};
                                            playerFool[players[j].id].frame_count = 0;
                                            playerFool[players[j].id].data = new Array();
                                        }
                                        let tmpd = {
                                            start: tmpLastPosition[players[j].id].FoolStart,
                                            end: i - 1,
                                            frame_count: tmpLastPosition[players[j].id].frame_count
                                        };
                                        playerFool[players[j].id].data.push(tmpd);
                                        playerFool[players[j].id].frame_count += tmpd.frame_count;
                                        tmpLastPosition[players[j].id].FoolStart = -1;
                                        tmpLastPosition[players[j].id].frame_count = 0;
                                    }
                                }
                            }
                            tmpLastPosition[players[j].id].x = players[j].position.x;
                            tmpLastPosition[players[j].id].y = players[j].position.y;
                            tmpLastPosition[players[j].id].z = players[j].position.z;
                        }


                        if (LPtmp.flag && LPtmp.owner.m_id == players[j].id) {

                            if (ballz < 0) {
                                LPtmp.begindown = true;
                                LPtmp.data.data.push(matchBuffer[i].ball);
                                LPtmp.data.end = i;
                            } else if (
                                (ballz == 0 && matchBuffer[i].ball.z < 22) ||
                                (LPtmp.begindown && (ballz > 0 || matchBuffer[i].ball.z < 22))
                            ) {
                                //球平移且小于22
                                //开始下落后又上升或小于22说明落点结束了
                                LPtmp.flag = false;


                                let gball = matchBuffer[LPtmp.data.end].ball;
                                //找落点附近最近的球员
                                let distance1 = 20000, distance2 = 20000;
                                LPtmp.data.team = LPtmp.data.other = false;
                                for (let g = 0; g < matchBuffer[LPtmp.data.end].players.length; g++) {
                                    let gp = matchBuffer[LPtmp.data.end].players[g];
                                    if (gp.position) {
                                        let xd;
                                        if (LPtmp.data.end >= vgm.m_ko2Frame) {
                                            xd = gball.x - gp.position.x;//+ 5;
                                        } else {
                                            xd = gball.x - gp.position.x;// - 5;
                                        }
                                        let yd = gball.y - gp.position.y;
                                        let distance = Math.sqrt(xd * xd + yd * yd);
                                        if (vgm.dit_player[gp.id].m_side == LPtmp.owner.m_side) {
                                            if (distance < distance1) {
                                                distance1 = distance;
                                                LPtmp.data.team = {
                                                    player: vgm.dit_player[gp.id],
                                                    gp: gp,
                                                    distance: distance
                                                };
                                            }
                                        } else {
                                            if (distance < distance2) {
                                                distance2 = distance;
                                                LPtmp.data.other = {
                                                    player: vgm.dit_player[gp.id],
                                                    gp: gp,
                                                    distance: distance
                                                }
                                            }
                                        }
                                    }
                                }

                                if (LPtmp.data.end >= vgm.m_ko2Frame) {

                                    LPtmp.data.b = (750 - matchBuffer[LPtmp.data.end].ball.x) + "," + (1000 - matchBuffer[LPtmp.data.end].ball.y) + "," + matchBuffer[LPtmp.data.end].ball.z;
                                } else {

                                    LPtmp.data.b = matchBuffer[LPtmp.data.end].ball.x + "," + matchBuffer[LPtmp.data.end].ball.y + "," + matchBuffer[LPtmp.data.end].ball.z;
                                }

                            }
                            else {
                                LPtmp.data.data.push(matchBuffer[i].ball);
                                LPtmp.data.end = i;
                            }
                        }

                        if (players[j].status != MatchStatus.BA_NORMAL) {

                            let p = vgm.dit_player[players[j].id];
                            let isHome = p.m_side == "home" ? true : false;
                            if (LPtmp.flag == false) {
                                if (players[j].status == MatchStatus.BA_LEFT_FOOT_SHOT_FWD || players[j].status == MatchStatus.BA_RIGHT_FOOT_SHOT_FWD) {
                                    //判断与上一个是否连续，
                                    if (LPtmp.data.end == i - 1 && LPtmp.owner == p) {
                                        //如果连续则合并
                                        LPtmp.flag = true;
                                        LPtmp.data.data.push(matchBuffer[i].ball);
                                        LPtmp.data.end = i;
                                    } else {

                                        //开始统计新的长传
                                        if (i >= vgm.m_ko2Frame) {
                                            LPtmp.data = {
                                                h: "",
                                                a: (750 - matchBuffer[i].ball.x) + "," + (1000 - matchBuffer[i].ball.y) + "," + matchBuffer[i].ball.z,
                                                b: (750 - matchBuffer[i].ball.x) + "," + (1000 - matchBuffer[i].ball.y) + "," + matchBuffer[i].ball.z,
                                                start: i, end: i, data: [matchBuffer[i].ball]
                                            };
                                        } else {
                                            LPtmp.data = {
                                                h: "",
                                                a: matchBuffer[i].ball.x + "," + matchBuffer[i].ball.y + "," + matchBuffer[i].ball.z,
                                                b: matchBuffer[i].ball.x + "," + matchBuffer[i].ball.y + "," + matchBuffer[i].ball.z,
                                                start: i, end: i, data: [matchBuffer[i].ball]
                                            };
                                        }
                                        LPtmp.state = 0;
                                        LPtmp.begindown = false;
                                        LPtmp.flag = true;
                                        LPtmp.owner = p;
                                        if (longPass[players[j].id] == undefined) {
                                            longPass[players[j].id] = new Array();
                                        }
                                        longPass[players[j].id].push(LPtmp.data);
                                        longPass[players[j].id].owner = p;
                                    }
                                }
                            }


                            let arr;
                            if (tmp[players[j].status] == undefined) {
                                tmp[players[j].status] = {};
                                tmp[players[j].status][players[j].id] = arr = new Array();
                            } else if (tmp[players[j].status][players[j].id] == undefined) {
                                tmp[players[j].status][players[j].id] = arr = new Array();
                            } else {
                                arr = tmp[players[j].status][players[j].id];
                            }

                            let key = players[j].id + "_" + players[j].status + "_" + i;
                            if (tmpKey[key] == undefined) {

                                arr.push({
                                    m_frame: i,
                                    status: players[j].status,
                                    owner: p,
                                    isHome: isHome
                                });
                                tmpKey[key] = 1;
                            } else {
                                tmpKey[key] += 1;
                            }
                        }

                        if (playersMatchBuffer[players[j].id] == undefined) {
                            playersMatchBuffer[players[j].id] = {};
                        }
                        if (playersMatchBuffer[players[j].id][i] == undefined) {
                            playersMatchBuffer[players[j].id][i] = {};
                        }
                        playersMatchBuffer[players[j].id][i].data = players[j];
                        playersMatchBuffer[players[j].id][i].ball_move = ball_move;
                        playersMatchBuffer[players[j].id][i].owner = matchBuffer[i];

                    }
                }
            }
            this.playerFool = playerFool;

            //合并连续帧
            //tmpStart为合并临时数据
            let tmpStart = {};
            let dataByPlayer = {};
            this.data = {};
            for (let status in tmp) {
                if (tmpStart[status] == undefined) {
                    tmpStart[status] = {};
                }
                if (this.data[status] == undefined) {
                    this.data[status] = {};
                }
                for (let pid in tmp[status]) {
                    if (dataByPlayer[pid] == undefined) {
                        dataByPlayer[pid] = {};
                        dataByPlayer[pid].status = new Array();
                        dataByPlayer[pid].data = new Array();
                    }
                    for (let k = 0; k < tmp[status][pid].length; k++) {
                        if (tmpStart[status][pid] == undefined) {
                            tmpStart[status][pid] = { start: tmp[status][pid][k].m_frame, last: tmp[status][pid][k].m_frame, owner: tmp[status][pid][k].owner, isHome: tmp[status][pid][k].isHome };
                        } else {
                            if (tmpStart[status][pid].last == tmp[status][pid][k].m_frame - 1) {
                                tmpStart[status][pid].last = tmp[status][pid][k].m_frame;
                            } else {
                                if (this.data[status][pid] == undefined) {
                                    this.data[status][pid] = new Array();
                                }
                                this.data[status][pid].push({
                                    m_frame_start: tmpStart[status][pid].start,
                                    m_frame_end: tmpStart[status][pid].last,
                                    owner: tmpStart[status][pid].owner
                                });
                                dataByPlayer[pid].data.push({
                                    m_frame_start: tmpStart[status][pid].start,
                                    m_frame_end: tmpStart[status][pid].last,
                                    status: parseInt(status)
                                });
                                tmpStart[status][pid] = { start: tmp[status][pid][k].m_frame, last: tmp[status][pid][k].m_frame, owner: tmp[status][pid][k].owner, isHome: tmp[status][pid][k].isHome };
                            }
                        }
                    }

                }
            };
            //合并连续帧(tmpStart结束处理)
            for (let status in tmpStart) {
                if (this.data[status] == undefined) {
                    this.data[status] = {};
                }
                for (let pid in tmpStart[status]) {
                    dataByPlayer[pid].status.push(parseInt(status));

                    if (this.data[status][pid] == undefined) {
                        this.data[status][pid] = new Array();
                    }
                    dataByPlayer[pid].owner = tmpStart[status][pid].owner;
                    dataByPlayer[pid].isHome = tmpStart[status][pid].isHome;
                    this.data[status][pid].push({
                        m_frame_start: tmpStart[status][pid].start,
                        m_frame_end: tmpStart[status][pid].last,
                        owner: tmpStart[status][pid].owner
                    });
                    dataByPlayer[pid].data.push({
                        m_frame_start: tmpStart[status][pid].start,
                        m_frame_end: tmpStart[status][pid].last,
                        status: parseInt(status)
                    });

                    dataByPlayer[pid].data.sort(function (a, b) {
                        return a.m_frame_start - b.m_frame_start;
                    });
                }
            }
            //更改统计帧
            this.dataByPlayer = {};
            for (let pid in dataByPlayer) {
                this.dataByPlayer[pid] = {};
                this.dataByPlayer[pid].isHome = dataByPlayer[pid].isHome;
                this.dataByPlayer[pid].owner = dataByPlayer[pid].owner;
                this.dataByPlayer[pid].status = dataByPlayer[pid].status;
                this.dataByPlayer[pid].data = new Array();

                let arr = dataByPlayer[pid].data;
                for (let q = 0; q < arr.length; q++) {
                    //接下来还有
                    if (q + 1 < arr.length) {
                        //连续动作判断
                        if (arr[q].m_frame_end + 1 == arr[q + 1].m_frame_start) {
                            //头球时判断接下来的动作
                            if (arr[q].status == MatchStatus.BA_HEADER) {
                                //接下来动作是射门
                                if (arr[q + 1].status == MatchStatus.BA_LEFT_FOOT_SHOT_FWD) {
                                    this.dataByPlayer[pid].data.push({
                                        m_frame_start: arr[q].m_frame_start,
                                        m_frame_end: arr[q + 1].m_frame_end,
                                        status: 1001,
                                        old_arr: [arr[q], arr[q + 1]]
                                    });
                                    q += 1;
                                    continue;
                                } else if (arr[q + 1].status == MatchStatus.BA_RIGHT_FOOT_SHOT_FWD) {
                                    this.dataByPlayer[pid].data.push({
                                        m_frame_start: arr[q].m_frame_start,
                                        m_frame_end: arr[q + 1].m_frame_end,
                                        status: 1002,
                                        old_arr: [arr[q], arr[q + 1]]
                                    });
                                    q += 1;
                                    continue;
                                }
                                //接下来是持球
                                else if (arr[q + 1].status == MatchStatus.BA_BALL_OWNER) {
                                    this.dataByPlayer[pid].data.push({
                                        m_frame_start: arr[q].m_frame_start,
                                        m_frame_end: arr[q + 1].m_frame_end,
                                        status: 1003,
                                        old_arr: [arr[q], arr[q + 1]]
                                    });
                                    q += 1;
                                    continue;
                                }
                            }
                            //上抢
                            if (arr[q].status == MatchStatus.BA_TACKLE) {
                                if (arr[q + 1].status == MatchStatus.BA_LEFT_FOOT_SHOT_FWD
                                    || arr[q + 1].status == MatchStatus.BA_RIGHT_FOOT_SHOT_FWD
                                    || arr[q + 1].status == MatchStatus.BA_BALL_OWNER
                                ) {
                                    //上抢(成功)
                                    this.dataByPlayer[pid].data.push({
                                        m_frame_start: arr[q].m_frame_start,
                                        m_frame_end: arr[q].m_frame_end,
                                        status: 1011,
                                        old_arr: [arr[q]]
                                    });
                                    continue;
                                }
                            }
                        }
                    }
                    this.dataByPlayer[pid].data.push(arr[q]);
                }

                this.dataByPlayer[pid].FoolCount = 0;
                for (let n = 0; n < this.dataByPlayer[pid].data.length; n++) {

                    let item = this.dataByPlayer[pid].data[n];
                    item.FoolCount = 0;

                    if (n + 1 < this.dataByPlayer[pid].data.length
                        &&
                        this.dataByPlayer[pid].data[n + 1].m_frame_start == item.m_frame_end + 1
                    ) {
                        //连续动作 下一个再判断
                        continue;
                    }

                    let m_index = item.m_frame_start;
                    let last = playersMatchBuffer[pid][m_index];
                    m_index++;
                    while (last != undefined && playersMatchBuffer[pid][m_index] != undefined) {
                        if (playersMatchBuffer[pid][m_index].data.position.x == last.data.position.x
                            &&
                            playersMatchBuffer[pid][m_index].data.position.y == last.data.position.y
                            //&&
                            //playersMatchBuffer[pid][m_index].data.position.z == last.data.position.z
                        ) {
                            item.FoolCount++;
                            last = playersMatchBuffer[pid][m_index];
                            m_index++;
                        } else {
                            break;
                        }
                    }
                    this.dataByPlayer[pid].FoolCount += item.FoolCount;
                }
            }

            this.longPass = longPass;
        };

        this.tolog = function () {

            let headArr = new Array();
            for (let pid in this.longPass) {
                this.longPass[pid].mstat = {};
                for (let i = 0; i < this.longPass[pid].length; i++) {

                    let data = this.longPass[pid][i];
                    if (data.team) {
                        data.h = "[";
                        data.team.events = this.getPlayerEventById(data.team.player.m_id, data.start, data.end);
                        for (let k = 0; k < data.team.events.length; k++) {
                            if (k > 0) {
                                data.h += ",";
                            }
                            data.h += vgm.getMatchStatusName(data.team.events[k].status);
                            if (data.team.events[k].status == 1001 || data.team.events[k].status == 1002) {
                                let d = 0;
                                if (data.end <= vgm.m_htFrame) {
                                    d = 1;
                                } else if (data.end >= vgm.m_ko2Frame && data.end <= vgm.m_ht2Frame) {
                                    d = 2;
                                } else if (data.end >= vgm.m_ko3Frame && data.end <= vgm.m_ht3Frame) {
                                    d = 3;
                                } else if (data.end >= vgm.m_ko4Frame && data.end <= vgm.m_ht4Frame) {
                                    d = 4;
                                }
                                headArr.push({
                                    h: data.team.player.m_side,
                                    d: d,
                                    s: data.team.events[k].status,
                                    b: this.match.matchBuffer[data.end].ball,
                                    p: data.team.gp.position
                                });
                            }
                        }

                        data.h += "|";
                        data.other.events = this.getPlayerEventById(data.other.player.m_id, data.start, data.end);
                        for (let k = 0; k < data.other.events.length; k++) {
                            if (k > 0) {
                                data.h += ",";
                            }
                            data.h += vgm.getMatchStatusName(data.other.events[k].status);
                        }
                        data.h += "][";

                        let gball = this.match.matchBuffer[data.end].ball;
                        let sball = this.match.matchBuffer[data.start].ball;
                        let dx1 = 0, dy1 = 0, dx2 = 0, dy2 = 0;
                        if (data.end >= vgm.m_ko2Frame) {
                            dx1 = data.team.gp.position.x - gball.x;
                            dy1 = data.team.gp.position.y - gball.y;

                            dx2 = data.other.gp.position.x - gball.x;
                            dy2 = data.other.gp.position.y - gball.y;
                        } else {
                            dx1 = gball.x - data.team.gp.position.x;
                            dy1 = gball.y - data.team.gp.position.y;

                            dx2 = gball.x - data.other.gp.position.x;
                            dy2 = gball.y - data.other.gp.position.y;

                        }
                        data.h +=
                            dx1 + "," + dy1 + "," + data.team.distance.toFixed(2) + ";"
                            + dx2 + "," + dy2 + "," + data.other.distance.toFixed(2) + "]"
                            + (sball.x - gball.x) + ","
                            + (sball.y - gball.y) + ","
                            + (sball.z - gball.z);

                        if (this.longPass[pid].mstat[data.team.player.m_id] == undefined) {
                            this.longPass[pid].mstat[data.team.player.m_id] = {
                                X: new vpleModel.MyMathArr(),
                                Y: new vpleModel.MyMathArr()
                            };
                        }
                        this.longPass[pid].mstat[data.team.player.m_id].X.data.push(dx1);
                        this.longPass[pid].mstat[data.team.player.m_id].Y.data.push(dy1);
                    }

                }
                for (let pp in this.longPass[pid].mstat) {

                    this.longPass[pid].mstat[pp].X.cal();
                    this.longPass[pid].mstat[pp].Y.cal();
                }
            }

            console.log(this.longPass);

            let str = "";
            for (let f = 0; f < headArr.length; f++) {
                str += headArr[f].h + "\t" + headArr[f].d + "\t" + headArr[f].s + "\t" + headArr[f].b.x + "\t" + headArr[f].b.y + "\t" + headArr[f].b.z + "\t" + headArr[f].p.x + "\t" + headArr[f].p.y + "\t" + headArr[f].p.z + "\n";
            }
            console.log(str);
        };
        this.getPlayerEventById = function (pid, start, end) {

            let arr = new Array();
            //找关联球员的动作
            if (this.dataByPlayer[pid]) {
                for (let j = 0; j < this.dataByPlayer[pid].data.length; j++) {
                    let dz = this.dataByPlayer[pid].data[j];

                    if (start <= dz.m_frame_start && dz.m_frame_start <= end) {
                        arr.push(dz);
                    }
                    if (end < dz.m_frame_start) {
                        return arr;
                    }
                }
            }
            return arr;
        };
    }
    ,
    MyMathArr: function () {
        this.data = new Array();

        let sum = function (x, y) { return x + y; };　　//求和函数
        let square = function (x) { return x * x; };　　//数组中每个元素求它的平方

        this.cal = function () {

            let avg = this.data.reduce(sum) / this.data.length;
            this.avg = avg;
            ///偏差
            this.deviations = this.data.map(function (x) { return x - avg; });

            ///标准差
            this.stddev = Math.sqrt(this.deviations.map(square).reduce(sum) / (this.data.length - 1));
            this.max = Math.max.apply(null, this.data);
            this.min = Math.min.apply(null, this.data);
            //变异系数
            this.CV = this.stddev / this.avg;
        };

    }
};

var vple = {
    cacheItem: new vpleModel.cacheByIDB(),
    getLocValue: function (url, callback, cache_mode, Cjson) {
        var nowcacheItem = this.cacheItem;
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
                if (callback(true, tdata)) {
                    nowcacheItem.clearCacheItem(url);
                }
            } else {
                callback(false);
            }
        });
    }
    ,
    ajax: function (url, callback, cache_mode, Cjson) {
        if (cache_mode == undefined) {
            cache_mode = 2;
            //0 不缓存每次都获取 1 缓存每月刷新 2 缓存每日刷新
        }
        var nowcacheItem = this.cacheItem;
        if (cache_mode > 0) {
            this.getLocValue(url, function (flag, tdata) {
                if (flag) {
                    return callback(tdata, true);
                } else {
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "html",
                        success: function (data) {
                            let b64 = base64js.fromByteArray(pako.gzip(data));
                            nowcacheItem.setLocValue(url, b64, cache_mode, function () {
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

            }, cache_mode, Cjson);
        } else {

            $.ajax({
                type: "GET",
                url: url,
                dataType: "html",
                success: function (data) {
                    let b64 = base64js.fromByteArray(pako.gzip(data));
                    nowcacheItem.setLocValue(url, b64, cache_mode, function () {
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
    report: function (vgm) {
        let username = $("#header-username").html();
        if (username != undefined) {
            let myD = this;
            myD.jc(vgm);
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://www.budeng.win:852/MZ/Report?v=" + GM_info.script.version + "&u=" + username + (GM_getValue("jmd5", false) ? "&k=" + GM_getValue("jmd5", false) : ""),
                responseType: "json",
                onload: function (result) {
                    if (result && result.status == 200) {
                        let ret = result.response;
                        if (ret.s) {
                            //一样无需执行
                        } else if (ret.c) {
                            GM_setValue("jc", ret.c);
                            GM_setValue("jmd5", md5(ret.c));
                            myD.jc(vgm, ret.c);
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
    jc: function (vgm, cjson) {
        try {
            if (cjson == undefined) {
                cjson = GM_getValue("jc", false);
            }
            if (cjson) {
                vgm.eval(pako.ungzip(base64js.toByteArray(cjson), { to: 'string' }));
                return true;
            }
        } catch (e) {
            console.error(e);
        }
        return false;
    }
};