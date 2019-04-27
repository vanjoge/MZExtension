// ==UserScript==
// @name         van.mz.playerAdvanced
// @namespace    van
// @version      2.15
// @description  Player display optimization 球员着色插件
// @author       van
// @match        https://www.managerzone.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_setClipboard
// @require      https://cdn.bootcss.com/pako/1.0.5/pako.min.js
// @require      https://cdn.jsdelivr.net/gh/vanjoge/MZExtension/Scripts/base64js.min.js
// ==/UserScript==

var gm_mzlanguage = {
    zh: {
        Name: "中文",
        Save: "保存",
        Setting: "设置",
        SettingTitle: "点击可对语言进行设置",
        Language: "语言",
        NotSureEx: "挂牌后属性可能有变动，不确定转会市场显示是否是真实属性，请自行甄别。<br/>属性变动时间",
        NotSure: "属性不确定",
        ManualColorTitle: "点击可手动着色 快捷键:ALT + A",
        ManualColor: "手动着色",
        Jijing: "比赛集锦",
        dongzuo: "球员动作",
        Copyxml1: "复制主队战术",
        Copyxml2: "复制客队战术",
        CopyXmlMsg: "战术已复制到剪切板",
        CopyXmlMsgError: "战术复制失败",
        BA_NORMAL: "BA_NORMAL",
        BA_WALL: "站人墙",
        BA_HOLD: "抱着球",
        BA_DOWN: "倒地",
        BA_HOLD_THROWIN: "界外球准备",
        BA_THROWIN: "界外球",
        BA_LEFT_FOOT_SHOT_FWD: "射门/长传(L)",
        BA_LEFT_FOOT_SHOT_BACK: "BA_LEFT_FOOT_SHOT_BACK",
        BA_LEFT_FOOT_SHOT_RIGHT: "BA_LEFT_FOOT_SHOT_RIGHT",
        BA_LEFT_FOOT_SHOT_LEFT: "BA_LEFT_FOOT_SHOT_LEFT",
        BA_RIGHT_FOOT_SHOT_FWD: "射门/长传(R)",
        BA_RIGHT_FOOT_SHOT_BACK: "BA_RIGHT_FOOT_SHOT_BACK",
        BA_RIGHT_FOOT_SHOT_RIGHT: "BA_RIGHT_FOOT_SHOT_RIGHT",
        BA_RIGHT_FOOT_SHOT_LEFT: "BA_RIGHT_FOOT_SHOT_LEFT",
        BA_LEFT_FOOT_PASS_FWD: "短传(L)",
        BA_LEFT_FOOT_PASS_BACK: "BA_LEFT_FOOT_PASS_BACK",
        BA_LEFT_FOOT_PASS_RIGHT: "BA_LEFT_FOOT_PASS_RIGHT",
        BA_LEFT_FOOT_PASS_LEFT: "BA_LEFT_FOOT_PASS_LEFT",
        BA_RIGHT_FOOT_PASS_FWD: "短传(R)",
        BA_RIGHT_FOOT_PASS_BACK: "BA_RIGHT_FOOT_PASS_BACK",
        BA_RIGHT_FOOT_PASS_RIGHT: "BA_RIGHT_FOOT_PASS_RIGHT",
        BA_RIGHT_FOOT_PASS_LEFT: "BA_RIGHT_FOOT_PASS_LEFT",
        BA_PICK_UP_BALL: "捡起球",
        BA_DROP_BALL: "放下球",
        BA_HEADER: "争顶",
        BA_TRIP: "失误/被抢断?",
        BA_CELEBRATE: "庆祝进球",
        BA_GK_READY: "准备扑救?",
        BA_GK_ACRO_LEFT: "ACRO(L)",
        BA_GK_ACRO_LEFT_HOLD: "ACRO_HOLD(L)",
        BA_GK_ACRO_RIGHT: "ACRO(R)",
        BA_GK_ACRO_RIGHT_HOLD: "ACRO_HOLD(R)",
        BA_GK_SIDESTEP_LEFT: "移动(L)",
        BA_GK_SIDESTEP_RIGHT: "移动(R)",
        BA_GK_KICK: "BA_GK_KICK",
        BA_GK_THROW_BALL: "BA_GK_THROW_BALL",
        BA_GK_STRETCH_LEFT: "BA_GK_STRETCH_LEFT",
        BA_GK_STRETCH_LEFT_HOLD: "BA_GK_STRETCH_LEFT_HOLD",
        BA_GK_STRETCH_RIGHT: "BA_GK_STRETCH_RIGHT",
        BA_GK_STRETCH_RIGHT_HOLD: "BA_GK_STRETCH_RIGHT_HOLD",
        BA_BALL_OWNER: "持球/带球?",
        BA_TACKLE: "上抢(失败?)",
        BA_SLIDING_TACKLE: "BA_SLIDING_TACKLE",
        BA_SLIDING_TACKLE_STAND: "BA_SLIDING_TACKLE_STAND",
        BA_MAX: "BA_MAX",
        BA_MY_1001: "头球攻门(L)",
        BA_MY_1002: "头球攻门(R)",
        BA_MY_1003: "胸部/头部停球",
        BA_MY_1011: "上抢(成功)",
        BA_MY_1012: "上抢(失败)",
        Unknown: "未知"


    }
    ,

    en: {
        Name: "English",
        Save: "Save",
        Setting: "Setting",
        SettingTitle: "Click setting language",
        Language: "Language",
        NotSureEx: "Skills may change after entering the transfer market.<br/>Change time ",
        NotSure: "Uncertain skill",
        ManualColorTitle: "Click the Colorable Skill. Shortcut key : ALT + A",
        ManualColor: "Colorable Skill",
        Jijing: "Events",
        dongzuo: "PlayerStatus",
        Copyxml1: "CopyXML(home)",
        Copyxml2: "CopyXML(away)",
        CopyXmlMsg: "The tactic was copied to the Clipboard!",
        CopyXmlMsgError: "Copy error!",
        BA_NORMAL: "Normal",
        BA_WALL: "Wall",
        BA_HOLD: "Hold",
        BA_DOWN: "Down",
        BA_HOLD_THROWIN: "HoldThrowin",
        BA_THROWIN: "Throwin",
        BA_LEFT_FOOT_SHOT_FWD: "FootShot(L)",
        BA_LEFT_FOOT_SHOT_BACK: "FootShotBack(L)",
        BA_LEFT_FOOT_SHOT_RIGHT: "FootShotRight(L)",
        BA_LEFT_FOOT_SHOT_LEFT: "FootShotLeft(L)",
        BA_RIGHT_FOOT_SHOT_FWD: "FootShot(R)",
        BA_RIGHT_FOOT_SHOT_BACK: "FootShotBack(R)",
        BA_RIGHT_FOOT_SHOT_RIGHT: "FootShotRight(R)",
        BA_RIGHT_FOOT_SHOT_LEFT: "FootShotLeft(R)",
        BA_LEFT_FOOT_PASS_FWD: "FootPass(L)",
        BA_LEFT_FOOT_PASS_BACK: "FootPassBack(L)",
        BA_LEFT_FOOT_PASS_RIGHT: "FootPassRight(L)",
        BA_LEFT_FOOT_PASS_LEFT: "FootPassLeft(L)",
        BA_RIGHT_FOOT_PASS_FWD: "FootPass(R)",
        BA_RIGHT_FOOT_PASS_BACK: "FootPassBack(R)",
        BA_RIGHT_FOOT_PASS_RIGHT: "FootPassRight(R)",
        BA_RIGHT_FOOT_PASS_LEFT: "FootPassLeft(R)",
        BA_PICK_UP_BALL: "PickUpBall",
        BA_DROP_BALL: "DropBall",
        BA_HEADER: "Header",
        BA_TRIP: "Trip",
        BA_CELEBRATE: "Celebrate",
        BA_GK_READY: "GkReady",
        BA_GK_ACRO_LEFT: "GkAcroLeft",
        BA_GK_ACRO_LEFT_HOLD: "GkAcroLeftHold",
        BA_GK_ACRO_RIGHT: "GkAcroRight",
        BA_GK_ACRO_RIGHT_HOLD: "GkAcroRightHold",
        BA_GK_SIDESTEP_LEFT: "GkSidestepLeft",
        BA_GK_SIDESTEP_RIGHT: "GkSidestepRight",
        BA_GK_KICK: "GkKick",
        BA_GK_THROW_BALL: "GkThrowBall",
        BA_GK_STRETCH_LEFT: "GkStretchLeft",
        BA_GK_STRETCH_LEFT_HOLD: "GkStretchLeftHold",
        BA_GK_STRETCH_RIGHT: "GkStretchRight",
        BA_GK_STRETCH_RIGHT_HOLD: "GkStretchRightHold",
        BA_BALL_OWNER: "BallOwner",
        BA_TACKLE: "Tackle",
        BA_SLIDING_TACKLE: "SlidingTackle",
        BA_SLIDING_TACKLE_STAND: "SlidingTackleStand",
        BA_MAX: "Max",
        BA_MY_1001: "HeadGoal(L)",
        BA_MY_1002: "HeadGoal(R)",
        BA_MY_1003: "StopTheBall",
        BA_MY_1011: "Tackle(Success)",
        BA_MY_1012: "Tackle(Fail)",
        Unknown: "Unknown"


    }

    ,
    es: {
        Name: "Español",
        Save: "Grabar",
        Setting: "Ajustes",
        SettingTitle: "Haga clic en configuración Idioma",
        Language: "Idioma",
        NotSureEx: "Las skills pueden cambiar después de ingresar al mercado. <br/> Cambiar hora ",
        NotSure: "Skill incierta",
        ManualColorTitle: "Haga clic en la skill para colorear. Acceso directo: ALT + A",
        ManualColor: "Color de la skill",
        Jijing: "Eventos",
        dongzuo: "PlayerStatus",
        Copyxml1: "CopiarXML(local)",
        Copyxml2: "CopiarXML(visi)",
        CopyXmlMsg: "La táctica fue copiada al portapapeles",
        CopyXmlMsgError: "¡Error al copiar!",
        BA_NORMAL: "Normal",
        BA_WALL: "Wall",
        BA_HOLD: "Hold",
        BA_DOWN: "Down",
        BA_HOLD_THROWIN: "HoldThrowin",
        BA_THROWIN: "Throwin",
        BA_LEFT_FOOT_SHOT_FWD: "FootShot(L)",
        BA_LEFT_FOOT_SHOT_BACK: "FootShotBack(L)",
        BA_LEFT_FOOT_SHOT_RIGHT: "FootShotRight(L)",
        BA_LEFT_FOOT_SHOT_LEFT: "FootShotLeft(L)",
        BA_RIGHT_FOOT_SHOT_FWD: "FootShot(R)",
        BA_RIGHT_FOOT_SHOT_BACK: "FootShotBack(R)",
        BA_RIGHT_FOOT_SHOT_RIGHT: "FootShotRight(R)",
        BA_RIGHT_FOOT_SHOT_LEFT: "FootShotLeft(R)",
        BA_LEFT_FOOT_PASS_FWD: "FootPass(L)",
        BA_LEFT_FOOT_PASS_BACK: "FootPassBack(L)",
        BA_LEFT_FOOT_PASS_RIGHT: "FootPassRight(L)",
        BA_LEFT_FOOT_PASS_LEFT: "FootPassLeft(L)",
        BA_RIGHT_FOOT_PASS_FWD: "FootPass(R)",
        BA_RIGHT_FOOT_PASS_BACK: "FootPassBack(R)",
        BA_RIGHT_FOOT_PASS_RIGHT: "FootPassRight(R)",
        BA_RIGHT_FOOT_PASS_LEFT: "FootPassLeft(R)",
        BA_PICK_UP_BALL: "PickUpBall",
        BA_DROP_BALL: "DropBall",
        BA_HEADER: "Header",
        BA_TRIP: "Trip",
        BA_CELEBRATE: "Celebrate",
        BA_GK_READY: "GkReady",
        BA_GK_ACRO_LEFT: "GkAcroLeft",
        BA_GK_ACRO_LEFT_HOLD: "GkAcroLeftHold",
        BA_GK_ACRO_RIGHT: "GkAcroRight",
        BA_GK_ACRO_RIGHT_HOLD: "GkAcroRightHold",
        BA_GK_SIDESTEP_LEFT: "GkSidestepLeft",
        BA_GK_SIDESTEP_RIGHT: "GkSidestepRight",
        BA_GK_KICK: "GkKick",
        BA_GK_THROW_BALL: "GkThrowBall",
        BA_GK_STRETCH_LEFT: "GkStretchLeft",
        BA_GK_STRETCH_LEFT_HOLD: "GkStretchLeftHold",
        BA_GK_STRETCH_RIGHT: "GkStretchRight",
        BA_GK_STRETCH_RIGHT_HOLD: "GkStretchRightHold",
        BA_BALL_OWNER: "BallOwner",
        BA_TACKLE: "Tackle",
        BA_SLIDING_TACKLE: "SlidingTackle",
        BA_SLIDING_TACKLE_STAND: "SlidingTackleStand",
        BA_MAX: "Max",
        BA_MY_1001: "HeadGoal(L)",
        BA_MY_1002: "HeadGoal(R)",
        BA_MY_1003: "StopTheBall",
        BA_MY_1011: "Tackle(Success)",
        BA_MY_1012: "Tackle(Fail)",
        Unknown: "Desconocido"
    }
};
var now_language = gm_mzlanguage.en;
function mzcamp() {
    this.data = {};
    this.name = null;
    this.keys = new Array();
    this.index = 0;
    this.add = function (begin, end) {
        if (end > begin + 2937600000) {
            end = begin + 2937600000;
        }
        if (this.data[begin] == undefined) {
            this.keys.push(begin);
            this.keys.sort(function (a, b) {
                return a - b;
            });
        }
        this.data[begin] = {
            begin: begin,
            end: end
        };
    };
    this.getItem = function (begin) {
        return this.data[begin];
    };
    this.resetIndex = function () {
        this.index = 0;
    };
    this.inYTC = function (x) {
        while (this.index < this.keys.length) {
            let item = this.data[this.keys[this.index]];
            if (x < item.begin) {
                return false;
            } else if (x <= item.end) {
                if (/\d/.test(item.name)) {
                    return false;
                }
                return true;
            }
            if (x > item.end) {
                this.index++;
            }
        }
        return false;
    };
};
var mzreg = {
    playerMax: /trainingField.players\s*=\s*({.+})/,
    playerId: /player_id_(\d+)/,
    data2d_url: /matchviewer\/media/
};
var mzImg = {
    red_skill:
        [
            "",
            "",
            "",
            "",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVFhH7ZhBDoAgDAS94uP5kd/x4M0XaNZQUxshUg72sCRGrduE7giI01TakvOxz/PjQEye23M0fa2fjDccEOCAKU2DtanR9ITrcEADvqmXCw34bWaIoHeUzBQ4ALiAL6NdXgR7L25F05Oi0wGA1E2v8xJHTIOPpHeWzTQL3o54QG6B/1tPgk4H7NRt120BW5vq/9Y7y2YawK4pXaO69lWvt3XR9CQ44MBW9u9ft3PR9AOlMzXaD5ne/pBgnwMnVGDpfjrKHa4AAAAASUVORK5CYII=",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACySURBVFhH7ZhBDoAgDAS5wuP5kd/x4M0XaGpaszbW4HFDSYhQ96CdbLGWomPp/dhbe0yJ2X1/ZddH7zVV3IALTBsI1ieDXT8V3BHn3tR1gYDfKgOjPqFrBgSuuNvcbk73e0sYuz7BA3h0Lp7zFpcYgmfWJ/gAvHe8QP4Cz6ZP8EGp9+e2gY1KPZs+wUMbt9Z6uTr6qse2TtbM+gQPGdi0fx9t59j1CR8ywP5D5u/zzw7/BIZH4+GYZs1CAAAAAElFTkSuQmCC",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACtSURBVFhH5ZhBDoAgDAS5wuP5kd/x4M0XaNZQUxsxeGSXhKh1L2WyhZJSG0utx17KYyJm/+NTTd9bh6njBhwwbXiwMTk1/dRwR5x7U28vHvBbZVDQU0JHUoALd5vbzenx2xZATU8N3jvX7/MWR8yDV9LLgI+OB+Qv8Ox6avC+1Md928D2Sj27nhY8wK45X67unep9W6empwWPxLbWv4+2c2p6avhqFzJ/82WDfwLFrd5EQmi8RgAAAABJRU5ErkJggg==",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADbSURBVFhH7VjRCoMwDPTVfrx/5O/sYW/7gkqWnkuDlQiDuHEFUeOByV2TtJ2mNtZlqa9Sukts+O7vxJd6xs+It1vZIbgEgmGF9c4SX9+ig4dbiRl1xgawq94erMBHlYF4rZA/mflwHNmOieDfITzxmukjfqIJl46TIOywfR52sVnhiddMP+InXdCoA154n/ES3JnwxPf8RHlPx/nS7fs2hB2VeuK19KcLedUBEfYxz13fEjHtos8uXojXqT7i5yr/qfhn279Ht3PE/8F2jgc4n0Orbx5YpWZy4OcbEqHYp2q4IyoAAAAASUVORK5CYII=",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADfSURBVFhH7ZjBDoMgEES9ysf7R/2dHnrrF9BsYZpxUw3GtdvDmBgVJwHmsSwwTf26LUt9lrK6rQz//VP6UiP92fL50nIAt47gYrC+cunrGzp8OOvPpXBHIvdDvb8w4G8zg/RthuTI5wEx4k8KdKsUDUe0o+H+Gw2UvkV6lD+p4Hlkcp5HuZUxeOlbpEf48zfgfcRb5/bAS3/On1TwBo8XdhzRALs11fs8Jn1LA6N+poG3Bt7neZW3DCYvUvziRfo4f9LAW8WPvn8f3c5Jv7+dO+pPKnwdyMQeyBz189fwX20F0wr7zmFhAAAAAElFTkSuQmCC",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADeSURBVFhH7ZhLDoQgEETdyuG9kdeZxezmBJgeKFN2RiOZRjZFYlSsINSj+U1TTeuy5E9Kh8vy8N3fpU95pD9nXJryAdwagsRgfWHS5y90+PC0P01w70TuTr0+MOBfI4P0ZYTkyOcO0cOfEOhWCCqOaEfF/Tt+KH2J9FH+hILnnsnzPPItj8FLXyJ9hD/dwPuIt8ZdgZf+WX9CwRs8XthxRAPs2VDv5zHpyzTQy88w8FbB1zwf5i2DyYsUv3iRfpw/YeCtoHfdv9/dzkl/vZ3r7U8ofB3IjD2QafX/X/gb1OjNbdNi8SQAAAAASUVORK5CYII=",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADQSURBVFhH7ZhNDoQgDIXZyuG50VzHhTtPwKQDz9QGCLNrk0diVHgaeF9aflLq5VNKvXN+XVKHdnunPtdI/gw5ArgMBEWDtR9RX3/Q4YN3f4bQ9QAe6v1BAx5lBupbhtSR783PWcZO6DiiHR237/gB9S3So/izBK8jV8/zqJc6DZ76FukR/NkGbyNeBrcCT71vf7ZTvZ23AXaW6qlvqd+rP1PwAvY8jte8JTD1IsUuXqiP488UvDRcff++u52jfr2d8+bPEj4PZGIdyPzLy8L/AkpZx9CM/6kBAAAAAElFTkSuQmCC"
        ],
    red_skill_blevel:
        [
            "",
            "",
            "",
            "",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAN1JREFUeNpiYICCvX19/z9ycaFgkBgDDjDQ6v///w/Hy5cvB4mDMYiNLDeKsWMwQA5YGEAOePRIGQzq0SN9/tNaMB6NfCIjHjlA0QG2nDZY1COlXHCE1x+N/W/TJAWP/NHIJRDxsICE5S5YwKPzkXPjYFCPHvGwyB+NeBIiHluuQhZHj5jBoB65qGdkZBwt6imNePQcRihiBkr9aOOOykU9OiBUFA+U+tHIo0Lj7hknJ95WNHrjazCoH408yjCTc1ERIwsjIwM+AFKDzB5M6kcBhWAoD+CMYtIxQIABAD/G6io9wgMiAAAAAElFTkSuQmCC",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANZJREFUeNrsWLENwkAMtBFNMgKz0DEHS6RHSAyQFVL+FCkzCvRMYPQvHPmtkC+oLPukk/6dq+5iy3qAL+ZxpHffV8w1+AFreiJamVLK9cJ8lt+8sEAaxZBGapMt6nXo0/NW6DX8qlM0tjrHql786SXw+3Kl8+O0hu8ueDaGu4WN1HfZXRb1OngO33XwW10i69poi3o56hExRr02TndMy2gr+ljuGqNeozVareg9httc7l5dt7sV62XKoj7Crnm4DAMeEWEPWSPPlvUB4w8y/zzgBAk+AgwATrKOZ9SrHu0AAAAASUVORK5CYII=",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANVJREFUeNpiYICCvX19/z9ycaFgkBgDDjDc1f///x+Oly9fDhIHYxAbWW6oYjBA9jgMIAcMeqCNBPXokT7/aS0YD5fIR0n56ABbThgp6pFyBjjC64/G/rdpkoJH/pCPeJhHYakfFjDofOTcMhLUo0c8LPKHVcRjS/XI4ugBNxLUIxf1jIyMw6+oRw8I9BxAKOCGq/ph37hDL/rQAaGicriqHw6RS7Bx94yTE28rF71xNBLUD/eIZ3IuKmJkYWRkwAdAapDZI0n9sAejAzi4B3CGIwYIMACTLTKkLYTX2wAAAABJRU5ErkJggg==",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAONJREFUeNrsmDEOwjAMRWPE0h6Bs7BxDi7RHSFxgFyBMadg5Ciwc4KgRKRyvtN2YXAkf8lSmr6hznctK8799PA+fsaxirTnFmR8zccY5wghpP0cac3faYksnkgRTxQPwXjJo+n31yWHVvOrSka1Ktv4Ns/+pGz49XmOx9thNl+d8eXDSzWXRPGZV7/xkkfji/mqjW9VMd/HgzBe8rzVE5H+Vo+JYUVvHYTxtfHdDHfYylBbrc94L4zvIfLw8h6G1akVhx3jJd+b8bvTNNGeyK0pMXxt/DLfnexC5n8XOD3EV4ABAA1G1tKnDW+dAAAAAElFTkSuQmCC",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAONJREFUeNpiYICCvX19/z9ycaFgkBgDDjCqnjL1////h+Ply5eDxMEYxEaWoxUGA2SHwQCyw9E9NaqecvXokT7/aS0Y0yvyUVImOsCWUkfVU0c9Us4DR3j90dj/Nk1S8MinecTDHAJLnTCHo/ORU/OoesrVo0c8LPLpGvHYUiWyOLrHRtVTrh65qGdkZKR/UY/uUPQUSshjo+rJUz/gjTv0ogkdECrKRtWTp54ekUuwcfeMkxNvKxS98TKqnnL1Ax3xTM5FRYwsjIwM+ABIDTJ7VD311A84GB1gGbgBnIHAAAEGALzfew8s0IRiAAAAAElFTkSuQmCC",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOJJREFUeNpiYICCvX19/z9ycaFgkBgDDjCqnr7q////D8fLly8HiYMxiI0sRywGA2SLYADZIeiOHFVPf/XokT7/aS0Ykxv5KCkNHWBLeaPqB0Y9Uk4FR3j90dj/Nk1S8MgnOeJhBsNSG8wh6Hzk1Dmqnv7q0SMeFvkURTy2VIYsju7QUfX0V49c1DMyMlJe1KNbjJ7iCDl0VD191FO9cYde1KADQkXTqHr6qCcncgk27p5xcuJtVaI3RkbV0189tSOeybmoiJGFkZEBHwCpQWaPqh849VQHowMmQ2cAhxoYIMAAohYfTLMKd8QAAAAASUVORK5CYII=",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO9JREFUeNrsmDEOwjAMReOKpT0CXIWNS2Rh4ArdERJ07hXY2lMwsnEN2DlBaCJcOW5oVhf5S1ZT6zUZvuVaKcxXt7Z176qKwufMDykvm3fOjdH3vc+H8GufC6IfoujG/FDl5fPc9OvzGALNjyqHK1VJyi+DR+PR9NN977bn9Wi+QRCrBzfm77TalJfPc+PR/Mj4VNXQPD9Yefk8bfUAMGn1Bf9/PJomeuakvGzeWgtd15nD5hJiMD3kJq2DK9dqlJfJ06k+FWFYeJXl7JTIhwvl5fM544tdXcMKYLadeIaulV8On5VegPzvBU4qPgIMABoVn4y9nkDEAAAAAElFTkSuQmCC"
        ],
    green_skill:
        [
            "",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACPSURBVFhH7ZgxCoAwFEO79f5ncejVdFICjcQPQuc0H0T9uiQvta2tzRrHdfd+fg70+DxnQwcIHKBZGgRDyZGkgF/q80IDEafMHABcwOdoZxDqvZnsyAF4LZ3n2UcvTpk5UMHXEQ/4AW8GHXLqp77O8wyCofS9Jeni7m9Vn22daUaynTMFuyIrP3BWXPJ55wH1ZAeNPHeqYQAAAABJRU5ErkJggg==",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC3SURBVFhH7VhBCoAwDNtt/3+LB7+mJ6WwSC3OmdMKZiBqDZomtNsspY112Y9at9thMTyPZxbfe4/iExWA4WYmhjc2UmPxE1PTp79U7uV6u/AGP3WGL3gpn1QBM9eqG9WOSo/3oM/ik6YtWmakH36eR9xi3ngGL4WTKhCNjxVvJr8ZP8InTVu0YuuO8zaM7bX6EV4KJ1XAr957q3q/rWPxSdMWLVOA3Z6xeKmcWAH2hwyLT5z6L6mdbM4PGe5TPwoAAAAASUVORK5CYII=",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC6SURBVFhH7ZhLCoAwDES76/3P4sKr6UoZ6EgMViw02TgFscahMXmkH0tpbV32o9btdsHG9/4ere/5lX1iBggcMNksWO8qWj8xNA31pXIv6q1jAT/NDBF6kUrKAOCiulntrHT/zM+J1ieFLTcAaZtd52mHzYKP1ItIUgY8eF/xgPwGfrY+KWy58VO3X7cJtjfVz9aLSFIG7O69t6u3x7pofVLYcoMMRB/PRscXlcQMRP+QGR0/MfRfujoBedoWpRqlwWYAAAAASUVORK5CYII=",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC3SURBVFhH7ZhLCoAwDETd9f5nceHVdKUEOhKDLTRddBZTEDVOoJmn/bhttR37dZdyfg6L4Xk8s+lb/VS84wCAG0w0DzamsukFN+GAB/xSrxce8N/IwKBPlKwUc8DgGnx87XgR4j3cYtOLYtIBA+mbn+cRt5gHz6RPlq20CD5+8Qa5B361XgSTDsShO87bANsa6lfrk2UrzS/uWqt6v61j04vghANs27PR/kyUrlS2HzKj/RHBMQceHJceMQCHNbYAAAAASUVORK5CYII=",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACqSURBVFhH7ZjBCoAwDEN32/9/iwd/TU9KoZFYVnHHsA5ErTnMPtKta83Hvp1X78frshi+x7u6PvuvpeIAbjAxGGxMhrp+Kbh/nPtQ9wcGPKoMivqC7hkwuOZuuB1Oj+9ImLq+wBN4di6v84hbjMEr6wt8Aj463iB/gVfTF/ik1Md1G2CzUq+mL/CDNi7b1XNbx7t9RX2Bpwyot2ez8y/4lAH1A5nZ+a8O/wZU9iW93UtuGAAAAABJRU5ErkJggg==",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACqSURBVFhH7ZjBDoAgDEO58f/f4sFf05NmCZW6OOKVDhKjzl7g2TFWShv7dl61Hq/LYvju79n00TpMHQdwg4nBYP3ksumnhvvHuQ/19sCAvzJDBr0kdJuUwTV3w+1wun/HAmTTS4Nn5/I+j7jFGHwmfRrw3vEGeQReXS8NnlO937cBNkr16npZ8Fy9R1U9H+uy6WXBo8BD0baOc72ekYa+Gji9aTVqWKn9BDcjBi1Jkz7/KwAAAABJRU5ErkJggg==",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADPSURBVFhH7VhBDoAwCPPm/9/iwa/paQaxhhG3sBMz6RKjYg/QDgYuy7P27SzrelSX2PDd34k/So+fFm9T2SG4BIJlhfXOEl9u0cHDVGJGnbEBvKo/D1bgr8pAvFbIX2Y+HEe2YyP4dwhPvGZ6i59owqXjJAi77DkPu9is8MRrpn/xky5o1AEvvM94Ca4nPPE1P1He03G+dPtzG8K2Sj3xWvrThRx1wDZ3ra7eNi/E61b3PIzyPgWe41l/PBvlZwpRo07wh0x/LBvlJ8p7Fu4Chrg01UrUXzQAAAAASUVORK5CYII=",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADZSURBVFhH7ZjBDoQgDES9+f/f4mF/zT1hujhmbISwsW73MCZGxSbAPAYK07Rfr+Vd5nk93VaG//6p+LVE6tPS+dFyALeO4GKwvnLFlw906HBXn0fhjjj3oL6/MOCrmUHxdYZk5/OAGNEnBbpViobD7Wi4/0YDFV+dHqVPKngembzOo9zKGLziq9Mj9Pkb8N7x1rkeeMXf0ycVvMHjxI4dDbCtqd6vY4qvy8ConmngORlpZfWt5EXx/eRuRJ808EjwOGExF0duV7T96+uZCl8HMrEHMt/q+Wv4G4AbPGGz4g/QAAAAAElFTkSuQmCC",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADZSURBVFhH7ZjBDoQgDES9+f/fsof9NT1hujibsVnIEou9DIlRa4Mwj0JhWc7yfu1lXbfLZTZ893f5byVTnxaXITuAW0dQGKyvTP7lAx06PK3PENx/IvdL/XxgwL9mBvnXGZIjnwfEDH1CoFslaDiiHQ337/ih/GukZ+kTCp5HJq/zsJuNwcu/RnqGPtPA+4i3zvXAy/9ZfULBGzxO7DiiAbY11ft1TP51GZilZxh4TkZaWX0reZF/P7mboU8YeCR4nLBYFGduV7Rd7OsfCl8HMrkHMqP634V/AA8vQ+1df+9kAAAAAElFTkSuQmCC",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADESURBVFhH7ZhLDoAgDETZcf+zuPBqusJUHFMbSmTXJkNiVBgNzEvLp5Sn7NvZaj0+l9Sh3d6pP1omf4YcAVwGgqLB2o+obzd0+BDdnyF0PYCX+vOgAY8yA/U9Q+rIj+anl7ELOo5oR8ftO35AfY/0LP5MwevI1fM86qVOg6e+R3oGf36DtxEvg5uBpz62P79TvZ23AdZL9dT31B/VHxe8Xox4q3pv8UL9fHEXwR8XvDRwe5Zre7bKawqfBzK5DmRWeVn4FzPlS3kjdc0LAAAAAElFTkSuQmCC"
        ],
    green_skill_blevel:
        [
            "",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOdJREFUeNrslzEKAjEQRWdEzB2s9iB2aRQULGw9ighexHIbC0FBL+BRvEPWJpLgxL8R0TZhHnzYnWyVP/mZJXpxOXXeGNdTqMm69z6pbdtQjwrPuKYqQxE0WsBGQOPF9P19E6XmF2o8GpyTNYR0SjR8e1v7yW6czNfNLEvD5crT8cCS6HQ9P0hqzpn07hz1aJqGrLWkFEp+0vGOxxpGPTNr1Jce9bnxEv1436PxOtzVIQ6mStRP56OPRHhHvWHNx4rA4e7bVI/DnaoODWaL3yf5n2+UsmA8+SHSkXAFiOnpp1+pgqcAAwA2YdI0uYtBawAAAABJRU5ErkJggg==",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAP1JREFUeNrsWEEKwjAQzIpY3+CpD/HWi4KCB68+RQQ/4rEXD4KCfsCn+IfUSzTBDdto2hQEV9iBgXY7p05nslSpF87HymSZrtHOVARtemOMZ1mWdu5or+kz4W/oQI1DUGND01P0oem729pRzGdiPDUsxKckp+rJl+UM31xXZrwdefPl5f+W/cXSqMMefJovp7vCmdaZv0ek6rWut0Se56ooCiVggjC59Myms656WvUAIFXPrepDI7HK6fndZHxML8sdb4I1Cat7Mhu8NQJWd1UNAY1P0T9rH6RPGYMua7EtPbbcNeklVbzZm87bk0k1XfWCP0r+t3/gCPnxIcAAqgwADpJouaIAAAAASUVORK5CYII=",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO5JREFUeNrsmDEKAjEQRSci5A5WOYhdKgvBwtajiOBFLNNYCAp6AY/iHaLNSIIJs2GjTWbXYj582J393ctMhgX46Hp+ota+41CDilrnETHbORfq0eGZfhO3cRQFkURBlRA58iX0w2MbLfCZwFMApfo6kytPTmIEvrtvcL6fZfgCq62nqzXC6ahyd94uL0g173V+T+LKe9+dEsYYsNaCiEllJ9I7mNa483TUK6Vk1HOP+hJMGs30Pv4GslVelrsRwAcIFEQfKAqSIy8wRlzualt3bVlrmRcYw3qyWGr1aw+gGe68aGD90w8cMb/fAgwAkWYpnU/mV8wAAAAASUVORK5CYII=",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANVJREFUeNpiYICC7Zt//mdn/4GCQWIMOMBAq////z8cL1++HCQOxiA2stwoxo7BADlgYQA54NEjZTCoR4/0+U9rwXg08omMeOQARQfYctpgUY+UcsERXn809r9NkxQ88kcjl0DEwwISlrtgAY/OR86Ng0E9esTDIn804kmIeGy5ClkcPWIGg3rkop6RkXG0qKc04tFzGKGIGSj1o407Khf16IBQUTxQ6kcjj4qNO1ytaFyNr4FUPxp5lGEmT192RgYCAFnNYFM/CigEQ3kAZxSTjgECDABGFRX5kmgsvgAAAABJRU5ErkJggg==",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAM9JREFUeNrsWMEJAjEQ3PhJD9ZiAz4swVJEsBGfKcCHFViKPehrJcE9NsuFCL6G3YGBu9y8Zm6WJURf3G9vzvnVsZ7RAGh6Zl5YSqnnjfVZf/PCBm2UQBtpTUbU29Cvz1Oj1/C7plisNQdVr/70Fvj5ceTdZbuE7y54MUbaIkbad90uRL0NXsJ3HfxaS/S5NRpRr0d9SilGvTXONmZmNIo+lrvJqLeYjVYUvcdwf17uRlvxaJlC0kfYPTf7Q040gdag6wPgFzL/XOAEmT4CDAB1xsUXGbRqMwAAAABJRU5ErkJggg==",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAM5JREFUeNpiYICC7Zt//mdn/4GCQWIMOMBwV////384Xr58OUgcjEFsZLmhisEA2eMwgBww6IE2EtSjR/r8p7VgPFwiHyXlowNsOWGkqEfKGeAIrz8a+9+mSQoe+UM+4mEehaV+WMCg85Fzy0hQjx7xsMgfVhGPLdUji6MH3EhQj1zUMzIyDr+iHj0g0HMAoYAbruqHfeMOvehDB4SKyuGqfjhELtGNO1ytXFyNo+GsfrhHPJOnLzsjAwGArGakqR/2YHQAB/cAznDEAAEGAM3odEQYHimLAAAAAElFTkSuQmCC",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANxJREFUeNpiYICC7Zt//mdn/4GCQWIMOMCoelT1////h+Ply5eDxMEYxEaWGywYDJA9AgPIHkUPhFH1mOrRI33+01owHqyRj5KS0QG2lD2qHrt6pJwEjvD6o7H/bZqk4JE/6CIe5nBYaoZ5FJ2PnPpH1WOqR494WOQP6ojHloqRxdEDYlQ9pnrkop6RkXHwF/XoHkNP0YQCYlQ9asQPmcYdelGGDggVfaPqf2JE/FDAKI0XXK1WXI2dUfWYjbuhgpk8fdkZGQgAZDWj6vGrH3JgdECGegM4QwEDBBgAToojce1k6CoAAAAASUVORK5CYII=",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANtJREFUeNpiYICC7Zt//mdn/4GCQWIMOMCoesrU////H46XL18OEgdjEBtZjlYYDJAdBgPIDkf31Kh6ytWjR/r8p7VgTK/IR0mZ6ABbSh1VTx31SDkPHOH1R2P/2zRJwSOf5hEPcwgsdcIcjs5HTs2j6ilXjx7xsMina8RjS5XI4ugeG1VPuXrkop6RkZH+RT26Q9FTKCGPjaonT/2AN+7QiyZ0QKgoG1VPnnp6RC7RjTtcrVBcjZdR9eSrH+iIZ/L0ZWdkIACQ1Yyqp676AQejAywDN4AzEBggwAD3jtKPndMGXwAAAABJRU5ErkJggg==",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANtJREFUeNpiYICC7Zt//mdn/4GCQWIMOMCoevqq////PxwvX74cJA7GIDayHLEYDJAtggFkh6A7clQ9/dWjR/r8p7VgTG7ko6Q0dIAt5Y2qHxj1SDkVHOH1R2P/2zRJwSOf5IiHGQxLbTCHoPORU+eoevqrR494WORTFPHYUhmyOLpDR9XTXz1yUc/IyEh5UY9uMXqKI+TQUfX0UU/1xh16UYMOCBVNo+rpo56cyCW6cYerVYmrMTKqnn7qqR3xTJ6+7IwMBACymlH1A6ue6mB0wGToDOBQAwMEGADJEoG8ooBn0wAAAABJRU5ErkJggg==",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAKCAYAAABykOpfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANNJREFUeNrsmMEJQjEMhlMv3cFZXMCDIziKCC7isQN4cAJHcQc9RVrMI/1tyTVP8kPgNXwvPfwhhBJ9db+9OedXFzVHEwXvm2fmJUopNd+iftdck/5RpAvjpcH759H06/PUQszvOgc16qTg18GL8WL6+XHk3WW7mE8CSvdIYTzrbgveP4/Gi/md8aOu0Xm8OHj/vB71KaXfUY+FsIOsi4P3yZvLHY4OlDVqgvfJa+NH0S0Lsy1xtlwE75e3jN/sDzmRIc0Evy7eVDyA/O8Dzig+AgwAwwcw6YPFEjsAAAAASUVORK5CYII="
        ]
};
var pmax = {};
var isAjaxing = false;

function clearCache(maxcount) {
    let lists = GM_listValues();
    let max = lists.length;
    if (maxcount) {
        max = maxcount;
    } else if (lists.length > 100) {
        max = 100;
    }
    for (var i = 0; i < lists.length; i++) {
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
}
function autoclearCache() {
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
}
function myAjax(url, callback, noCache, Cjson) {
    if (!noCache) {
        let b64 = getLocValue(url);
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
            callback(tdata, true);
            return;
        }
    }
    $.ajax({
        type: "GET",
        url: url,
        dataType: "html",
        success: function (data) {
            let b64 = base64js.fromByteArray(pako.gzip(data));
            setLocValue(url, b64);
            if (Cjson) {
                callback("9" + b64, false);
            } else {
                callback(data, false);
            }
            isAjaxing = false;
        }
    });

}
function getLocValue(key) {
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
                return false;
            }
        } else {
            return false;
        }
        let b64 = GM_getValue(key, false);
        if (b64) {
            return b64;
        }
        return false;

    } else {
        return false;
    }
}
function setLocValue(key, val) {
    GM_setValue("Dt_" + key, new Date().getTime());
    GM_setValue(key, val);
}
function getMax(callback) {
    myAjax(
        "/?p=training",
        function (data) {
            var result = data.match(mzreg.playerMax);
            pmax = JSON.parse(result[1]);
            callback(pmax);
        });
    return false;
}
function setSrc(img, skill, maxed, skillBallDay, pid, k) {
    if (skill > 0) {
        let flag_exit = false;
        if (skillBallDay) {
            if (new Date().getTime() - skillBallDay < 345600000) {

                getTrainingGraphsBySkill_id(pid, k, function (data) {
                    let result = data.match(new RegExp('{"x":' + skillBallDay + ',"y":(\\d+),[^}]*"marker"'));
                    if (result && result.length) {
                        $(img).parent().parent().find("td.skillval").html("(" + result[1] + ")");
                        setSrc(img, result[1], maxed, false, pid, k);
                        flag_exit = true;
                    }
                });

                //$(img).parent().find("span").remove();
                //$(img).parent().append("<span class=\"help_button_placeholder\"><a class=\"help_button\" href=\"#\" onclick=\"showHelpLayer('" + now_language.NotSureEx + new Date(skillBallDay).toLocaleString() + "', '" + now_language.NotSure + "', true); return false\"><span class=\"help_button_wrapper\"><span class=\"help_button_text\">?</span></span></a></span>");
            }
        }
        if (flag_exit) {
            return;
        }
        if (maxed === "red") {
            if (/blevel_/.test(img.src) || img.blevel == 1) {
                img.blevel = 1;
                img.src = mzImg.red_skill_blevel[skill];
            } else {
                img.src = mzImg.red_skill[skill];
            }
        }
        else if (maxed === "green") {
            if (/blevel_/.test(img.src) || img.blevel == 1) {
                img.blevel = 1;
                img.src = mzImg.green_skill_blevel[skill];
            } else {
                img.src = mzImg.green_skill[skill];
            }
        }
        if (img.isYtc) {
            $(img).parent().parent().children()[0].className = "gm_ytc";
        }
    }
}
function showMax() {
    let players = $(".playerContainer");
    for (var i = 0; i < players.length; i++) {
        let pdom = players.eq(i);
        let pid = pdom.html().match(mzreg.playerId)[1];
        let player = pmax[pid];
        let imgs = pdom.find("img.skill");
        if (player) {
            setSrc(imgs[0], player.skills.speed, player.maxed.speed);
            setSrc(imgs[1], player.skills.stamina, player.maxed.stamina);
            setSrc(imgs[2], player.skills.gameintelligence, player.maxed.gameintelligence);
            setSrc(imgs[3], player.skills.passing, player.maxed.passing);
            setSrc(imgs[4], player.skills.shooting, player.maxed.shooting);
            setSrc(imgs[5], player.skills.heading, player.maxed.heading);
            setSrc(imgs[6], player.skills.goalkeeping, player.maxed.goalkeeping);
            setSrc(imgs[7], player.skills.technique, player.maxed.technique);
            setSrc(imgs[8], player.skills.tackling, player.maxed.tackling);
            setSrc(imgs[9], player.skills.highpassing, player.maxed.highpassing);
            setSrc(imgs[10], player.skills.situations, player.maxed.situations);
        } else if (pdom.find(".training_graphs").length > 0 && imgs.length > 0) {
            let skills = pdom.find(".skillval");
            getTrainingGraphs(pid, imgs, skills);
        }
    }
    return false;
}
function drawPlayerByTrainingGraphs(pid, data, imgs, skills) {
    eval(data);
    let maxeds = ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green"];
    let skillBallDays = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let camp = new mzcamp();
    for (var i = 0; i < series.length; i++) {
        if ((series[i].type == "line" && series[i].color == "rgba(255,0,0,0.7)")) {
            if (series[i].data.length > 0) {
                let g = series[i].data[0];
                let index = g.y - 1;
                if (index >= 0 && g.y <= 11) {
                    maxeds[index] = "red";
                }
            }
        } else if ((series[i].type == "line" && series[i].color == "rgba(255,88,0,0.6)")) {
            //训练营线
            if (series[i].data && series[i].data.length == 2) {
                camp.add(series[i].data[0].x, series[i].data[1].x);
            }
        }

        else {
            for (var j = 0; j < series[i].data.length; j++) {
                let g = series[i].data[j];

                if (g.y == "-3") {
                    let itemcamp = camp.getItem(g.x);
                    if (itemcamp) {
                        itemcamp.name = g.name;
                    }
                }

                let index = g.y - 1;
                if (index >= 0 && g.y <= 11) {
                    if (g.name == "Maxed") {
                        maxeds[index] = "red";
                    }
                    if (g.marker && g.marker.symbol) {

                        if (/training_camp/.test(g.marker.symbol)) {
                            //训练营 判断是否是ytc
                            if (camp.inYTC(g.x)) {
                                imgs[index].isYtc = true;
                            }

                        }
                        if (/_ball/.test(g.marker.symbol)) {
                            if (skillBallDays[index] < g.x) {
                                skillBallDays[index] = g.x;
                            }
                        }
                    }
                }
            }
        }
    }
    for (var k = 0; k < maxeds.length; k++) {
        setSrc(imgs[k], skills.eq(k).html().replace("(", "").replace(")", ""), maxeds[k], skillBallDays[k], pid, k);
    }
}
function getTrainingGraphs(pid, imgs, skills) {
    myAjax(
        "/ajax.php?p=trainingGraph&sub=getJsonTrainingHistory&sport=soccer&player_id=" + pid,
        function (data) {
            drawPlayerByTrainingGraphs(pid, data, imgs, skills);
        });
}
function getTrainingGraphsBySkill_id(pid, skill_id, callback) {
    myAjax(
        "/ajax.php?p=trainingGraph&sub=getJsonTrainingHistory&sport=soccer&player_id=" + pid + "&skill_id=" + (skill_id + 2),
        function (data) {
            callback(data);
        });
}
function setLanguage(language) {
    if (language) {
        let new_language = gm_mzlanguage[language];
        if (new_language == undefined) {
            new_language = gm_mzlanguage.en;
        }
        if (now_language != new_language) {
            GM_setValue("mylanguage", language);
        }
        now_language = new_language;
    } else {
        if (now_language == gm_mzlanguage.en) {
            now_language = gm_mzlanguage.cn;
            GM_setValue("mylanguage", "cn");
        } else {
            now_language = gm_mzlanguage.en;
            GM_setValue("mylanguage", "en");
        }
    }
}
function initgw() {

    let tmplanguage = GM_getValue("mylanguage", false);
    if (tmplanguage == "cn") {
        tmplanguage = "zh";
        setLanguage(tmplanguage);
    }
    if (gm_mzlanguage[tmplanguage] == undefined) {
        let lang = $("meta[name='language']");
        if (lang.length > 0) {
            setLanguage($("meta[name='language']")[0].content);
        }

    } else {
        now_language = gm_mzlanguage[tmplanguage];
    }



    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = ".gw_run_div{position:fixed;bottom:20%;right:1px;border:1px solid gray;padding:3px;width:12px;font-size:12px;border-radius: 3px;text-shadow: 1px 1px 3px #676767;background-color: #000000;color: #FFFFFF;cursor: default;}.gw_run{cursor:pointer;}.gw_div_left{float:left;position:fixed;left:0px;top:120px;height:528px;overflow-y:auto;text-align:left;}.gw_div_right{float:right;position:fixed;right:0px;top:120px;height:528px;overflow-y:auto;text-align:left;}.shupai{writing-mode:tb-rl;-webkit-writing-mode:vertical-rl;}.gm_ytc{color:blue;}";


    document.getElementsByTagName('head')[0].appendChild(css);

    $(document.body).append("<div class='gw_run_div'>"
        + "<div id='gw_run' class='gw_run shupai' title='" + now_language.ManualColorTitle + "'><b>" + now_language.ManualColor + "</b></div>"
        + "<div>---</div>"
        + "<div id='gw_run2' class='gw_run shupai' title='" + now_language.SettingTitle + "'><b>" + now_language.Setting + "</b></div>"
        + "</div>");
    $('#gw_run')[0].addEventListener('click', function () { gw_start(0); });
    $('#gw_run2')[0].addEventListener('click', function () {
        OpenSetting();
    });
    document.onkeydown = function () {
        if (event.altKey) {
            if (window.event.keyCode == 65) {
                //alt + A
                gw_start();
            }
            else if (window.event.keyCode == 68) {
                //alt + D
                Advanced2D();
            }
        }
    };
}
function gw_start() {
    if ($(".player_share_skills").length > 0) {
        getMax(function () {
            showMax();
        });
    } else if ($(".playerContainer").find(".training_graphs").length > 0) {
        showMax();
    }
}

function OpenSetting() {
    let lang = GM_getValue("mylanguage", "en");
    let tmphtml;
    tmphtml = '\
<div><b>'+ now_language.Language + ':</b></div>\
<div><select id="gm_language">\
<option value="en"'+ (lang == "en" ? ' selected="selected" ' : '') + '>' + gm_mzlanguage.en.Name + '</option>\
<option value="zh"'+ (lang == "zh" ? ' selected="selected" ' : '') + '>' + gm_mzlanguage.zh.Name + '</option>\
<option value="es"'+ (lang == "es" ? ' selected="selected" ' : '') + '>' + gm_mzlanguage.es.Name + '</option>\
</select>\
</div>\
<a href="#" class="mzbtn buttondiv button_account" id="gm_setting_save">\
<span class="buttonClassMiddle"><span style="white-space: nowrap">'+ now_language.Save + '</span></span><span class="buttonClassRight">&nbsp;</span>\
</a>\
</div>';
    showHelpLayer(tmphtml, now_language.Setting, true);
    $("#gm_setting_save")[0].addEventListener('click', function () {
        setLanguage($("#gm_language").val());

        $('#gw_run')[0].title = now_language.ManualColorTitle;
        $('#gw_run').html("<b>" + now_language.ManualColor + "</b>");
        $('#gw_run2')[0].title = now_language.SettingTitle;
        $('#gw_run2').html("<b>" + now_language.Setting + "</b>");



        $('#gw_jijing').html(now_language.Jijing);
        $('#gw_dongzuo').html(now_language.dongzuo);
        $('#gw_copyxml1').html(now_language.Copyxml1);
        $('#gw_copyxml2').html(now_language.Copyxml2);
        powerboxCloseAll();
    });
}


//以下为2D比赛辅助
function MatchEvent() {
    this.data = new Array();
    this.setAllPlayerEvent = function (team) {
        for (var i = 0; i < team.m_players.length; i++) {
            let len = team.m_players[i].m_events.getLength();
            for (var j = 0; j < len; j++) {
                this.data.push(team.m_players[i].m_events.at(j));
            }
        }
    };
    this.Sort = function () {
        this.data.sort(function (a, b) {
            return a.m_frame - b.m_frame;
        });
    };
}
function MatchEvent2() {
    //格式status->player->array
    this.data = {};
    //格式player->array
    this.dataByPlayer = {};
    //格式player->{frame_count,[{start,end}]}
    this.playerFool = {};

    this.setData = function (match) {
        //构建临时数据(不合并连续帧)
        let matchBuffer = match.matchBuffer;
        //player->frame->{}
        let playersMatchBuffer = {};
        //格式status->player->array
        let tmp = {};
        let tmpKey = {};
        let tmpLastPosition = {};
        let playerFool = {};
        out_of_play.resetIndex();
        let ball_move;
        for (var i = 0; i < matchBuffer.length; i++) {
            ball_move = false;
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
                }
            }


            let players = matchBuffer[i].players;
            for (var j = 0; j < players.length; j++) {
                if (players[j].status != undefined) {
                    if (ball_move && out_of_play.notin(i)) {
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

                    if (players[j].status != MatchStatus.BA_NORMAL) {

                        let isHome = true;
                        var p = match.getHomeTeam().getPlayerByPlayerId(players[j].id);
                        if (p == null) {
                            p = match.getAwayTeam().getPlayerByPlayerId(players[j].id);
                            isHome = false;

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
                for (var k = 0; k < tmp[status][pid].length; k++) {
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
            for (var q = 0; q < arr.length; q++) {
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
            for (var n = 0; n < this.dataByPlayer[pid].data.length; n++) {

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

    };
}
function OutOfPlay() {
    this.data = new Array();
    this.add = function (begin, end) {
        this.data.push({
            begin: begin,
            end: end
        });
    };
    this.resetIndex = function () {
        this.index = 0;
    };
    this.notin = function (frame) {
        while (this.index < this.data.length) {
            let item = this.data[this.index];
            if (frame < item.begin) {
                return true;
            } else if (frame <= item.end) {
                return false;
            }
            if (frame > item.end) {
                this.index++;
            }
        }
        return true;
    };
    this.Sort = function () {
        this.data.sort(function (a, b) {
            return a.begin - b.begin;
        });
    }
}

let mEvent, mStaticEventHome, mStaticEventAway;
let out_of_play;

function Advanced2D() {

    if (OK_2D) {
        if ($("#canvas").length > 0) {

            let home = MyGame.prototype.mzlive.m_match.getHomeTeam();
            let away = MyGame.prototype.mzlive.m_match.getAwayTeam();

            if (home != null && away != null) {
                let events = matchLoader.matchXml.documentElement.evaluate('Events/*');
                let re, begin, end;
                out_of_play = new OutOfPlay();
                out_of_play.add(0, MyGame.prototype.mzlive.m_match.m_koFrame);
                out_of_play.add(MyGame.prototype.mzlive.m_match.m_htFrame, MyGame.prototype.mzlive.m_match.m_ko2Frame);
                while (re = events.iterateNext()) {
                    begin = re.getAttribute('intervalendframe');
                    end = re.getAttribute('startframe');
                    //re.tagName
                    if (begin != undefined && end != undefined) {
                        out_of_play.add(begin, end);
                    }
                }
                out_of_play.Sort();



                let lstEventHome = new MatchEvent();
                let lstEventAway = new MatchEvent();
                lstEventHome.setAllPlayerEvent(home);
                lstEventAway.setAllPlayerEvent(away);

                lstEventHome.Sort();
                lstEventAway.Sort();

                mStaticEventHome = lstEventHome;
                mStaticEventAway = lstEventAway;

                let lstEvent2 = new MatchEvent2();
                lstEvent2.setData(MyGame.prototype.mzlive.m_match);
                mEvent = lstEvent2;

                if ($('.gw_div_left').length == 0) {
                    $('#canvas').parent().append('<div class="gw_div_left"></div>');
                    $('#canvas').parent().append('<div class="gw_div_right"></div>');
                    $('#canvas').parent().append('<div><b id="gw_jijing" class="gw_run" style="color: red;">' + now_language.Jijing + '</b>    <b id="gw_dongzuo" class="gw_run" style="color: red;">' + now_language.dongzuo + '</b>    <b id="gw_copyxml1" class="gw_run" style="color: red;">' + now_language.Copyxml1 + '</b>    <b id="gw_copyxml2" class="gw_run" style="color: red;">' + now_language.Copyxml2 + '</b></div>');

                    $('#gw_jijing')[0].addEventListener('click', function () {
                        ShowDiv(0);
                    });

                    $('#gw_dongzuo')[0].addEventListener('click', function () {
                        ShowDiv(1);
                    });

                    $('#gw_copyxml1')[0].addEventListener('click', function () {
                        getMax(function () {
                            Stats2XML(MyGame.prototype.mzlive.m_match.getHomeTeam(), true, pmax);
                        });

                    });
                    $('#gw_copyxml2')[0].addEventListener('click', function () {
                        getMax(function () {
                            Stats2XML(MyGame.prototype.mzlive.m_match.getAwayTeam(), false, pmax);
                        });
                    });


                } else {
                    $('.gw_div_left').empty();
                    $('.gw_div_right').empty();
                }
                //MyGame.prototype.mzlive.buttonJiJing = new ig.TouchButton('jijing', {
                //    left: 24,
                //    top: 24
                //}, 48, 48, MyGame.prototype.mzlive.buttonImagesHelp, 0, 1, 'highlight');
                //unsafeWindow.myTouchButtons.buttons.push(MyGame.prototype.mzlive.buttonJiJing);

                //MyGame.prototype.mzlive.buttonDongZuo = new ig.TouchButton('dongzuo', {
                //    left: 88,
                //    top: 24
                //}, 48, 48, MyGame.prototype.mzlive.buttonImagesRestart, 0, 1, 'highlight');
                //unsafeWindow.myTouchButtons.buttons.push(MyGame.prototype.mzlive.buttonDongZuo);
                //unsafeWindow.myTouchButtons.align();
            }
        }
    }
}
function ShowDiv(type) {
    $('.gw_div_left').empty();
    $('.gw_div_right').empty();
    if (type == 0) {
        let lstEventHome = mStaticEventHome;
        let lstEventAway = mStaticEventAway;

        for (var i = 0; i < lstEventHome.data.length; i++) {
            $('.gw_div_left').append('<div><b id="gw_eventH' + i + '" class="gw_run">'
                + MyGame.prototype.mzlive.m_match.frameToMatchMinute(lstEventHome.data[i].m_frame) + "′ "
                + lstEventHome.data[i].m_owner.m_name + "(" + lstEventHome.data[i].m_owner.m_shirtNo + ") "
                + lstEventHome.data[i].m_description + '</b></div>');
            let dom = $('#gw_eventH' + i)[0];
            dom.m_frame = lstEventHome.data[i].m_frame;
            dom.m_frame -= 45;
            if (dom.m_frame < 0) {
                dom.m_frame = 0;
            }
            dom.addEventListener('click', function () { MyGame.prototype.mzlive.m_match.setCurrentFrame(this.m_frame); });
        }

        for (var ii = 0; ii < lstEventAway.data.length; ii++) {
            $('.gw_div_right').append('<div><b id="gw_eventA' + ii + '" class="gw_run">'
                + MyGame.prototype.mzlive.m_match.frameToMatchMinute(lstEventAway.data[ii].m_frame) + "′ "
                + " " + lstEventAway.data[ii].m_owner.m_name + "(" + lstEventAway.data[ii].m_owner.m_shirtNo + ") "
                + lstEventAway.data[ii].m_description + '</b></div>');
            let dom = $('#gw_eventA' + ii)[0];
            dom.m_frame = lstEventAway.data[ii].m_frame;
            dom.m_frame -= 45;
            if (dom.m_frame < 0) {
                dom.m_frame = 0;
            }
            dom.addEventListener('click', function () { MyGame.prototype.mzlive.m_match.setCurrentFrame(this.m_frame); });
        }
    } else {

        for (let pid in mEvent.dataByPlayer) {
            let divname;
            if (mEvent.dataByPlayer[pid].isHome) {
                divname = '.gw_div_left';
            } else {
                divname = '.gw_div_right';
            }
            let frame_count = 0;
            //if (mEvent.playerFool[pid]) {
            //    frame_count = mEvent.playerFool[pid].frame_count;
            //}
            frame_count = mEvent.dataByPlayer[pid].FoolCount;
            $(divname).append('<div><b id="gw_player_' + pid + '" class="gw_run">'
                + mEvent.dataByPlayer[pid].owner.m_name + "(" + mEvent.dataByPlayer[pid].owner.m_shirtNo + ")"
                + "[" + frame_count + "]</b></div>");
            let dom = $("#gw_player_" + pid)[0];
            dom.pid = pid;
            dom.divname = divname;
            dom.addEventListener('click', function () {
                $(this.divname).empty();

                $(divname).append('<div><b>'
                    + mEvent.dataByPlayer[pid].owner.m_name + "(" + mEvent.dataByPlayer[pid].owner.m_shirtNo + ")</b></div>");
                let arr = mEvent.dataByPlayer[this.pid].data;
                for (var k = 0; k < arr.length; k++) {
                    let key = 'gw_player_' + pid + "_s_" + k;
                    $(this.divname).append('<div><b id="' + key + '" class="gw_run">'
                        + MyGame.prototype.mzlive.m_match.frameToMatchMinute(arr[k].m_frame_start) + "′["
                        + arr[k].m_frame_start + "+" + (arr[k].m_frame_end - arr[k].m_frame_start + 1)
                        + "]" + (arr[k].FoolCount == 0 ? "" : ("+" + arr[k].FoolCount)) + " "
                        + getMatchStatusName(arr[k].status)
                        + "</b></div>");

                    let dom = $("#" + key)[0];
                    dom.m_frame = arr[k].m_frame_start;
                    dom.addEventListener('click', function () { MyGame.prototype.mzlive.m_match.setCurrentFrame(this.m_frame); });
                }
            });





        }
    }
}


function getMatchStatusName(status) {
    switch (status) {
        case MatchStatus.BA_NORMAL:
            return now_language.BA_NORMAL;
        case MatchStatus.BA_WALL:
            return now_language.BA_WALL;
        case MatchStatus.BA_HOLD:
            return now_language.BA_HOLD;
        case MatchStatus.BA_DOWN:
            return now_language.BA_DOWN;
        case MatchStatus.BA_HOLD_THROWIN:
            return now_language.BA_HOLD_THROWIN;
        case MatchStatus.BA_THROWIN:
            return now_language.BA_THROWIN;
        case MatchStatus.BA_LEFT_FOOT_SHOT_FWD:
            return now_language.BA_LEFT_FOOT_SHOT_FWD;
        case MatchStatus.BA_LEFT_FOOT_SHOT_BACK:
            return now_language.BA_LEFT_FOOT_SHOT_BACK;
        case MatchStatus.BA_LEFT_FOOT_SHOT_RIGHT:
            return now_language.BA_LEFT_FOOT_SHOT_RIGHT;
        case MatchStatus.BA_LEFT_FOOT_SHOT_LEFT:
            return now_language.BA_LEFT_FOOT_SHOT_LEFT;
        case MatchStatus.BA_RIGHT_FOOT_SHOT_FWD:
            return now_language.BA_RIGHT_FOOT_SHOT_FWD;
        case MatchStatus.BA_RIGHT_FOOT_SHOT_BACK:
            return now_language.BA_RIGHT_FOOT_SHOT_BACK;
        case MatchStatus.BA_RIGHT_FOOT_SHOT_RIGHT:
            return now_language.BA_RIGHT_FOOT_SHOT_RIGHT;
        case MatchStatus.BA_RIGHT_FOOT_SHOT_LEFT:
            return now_language.BA_RIGHT_FOOT_SHOT_LEFT;
        case MatchStatus.BA_LEFT_FOOT_PASS_FWD:
            return now_language.BA_LEFT_FOOT_PASS_FWD;
        case MatchStatus.BA_LEFT_FOOT_PASS_BACK:
            return now_language.BA_LEFT_FOOT_PASS_BACK;
        case MatchStatus.BA_LEFT_FOOT_PASS_RIGHT:
            return now_language.BA_LEFT_FOOT_PASS_RIGHT;
        case MatchStatus.BA_LEFT_FOOT_PASS_LEFT:
            return now_language.BA_LEFT_FOOT_PASS_LEFT;
        case MatchStatus.BA_RIGHT_FOOT_PASS_FWD:
            return now_language.BA_RIGHT_FOOT_PASS_FWD;
        case MatchStatus.BA_RIGHT_FOOT_PASS_BACK:
            return now_language.BA_RIGHT_FOOT_PASS_BACK;
        case MatchStatus.BA_RIGHT_FOOT_PASS_RIGHT:
            return now_language.BA_RIGHT_FOOT_PASS_RIGHT;
        case MatchStatus.BA_RIGHT_FOOT_PASS_LEFT:
            return now_language.BA_RIGHT_FOOT_PASS_LEFT;
        case MatchStatus.BA_PICK_UP_BALL:
            return now_language.BA_PICK_UP_BALL;
        case MatchStatus.BA_DROP_BALL:
            return now_language.BA_DROP_BALL;
        case MatchStatus.BA_HEADER:
            return now_language.BA_HEADER;
        case MatchStatus.BA_TRIP:
            return now_language.BA_TRIP;
        case MatchStatus.BA_CELEBRATE:
            return now_language.BA_CELEBRATE;
        case MatchStatus.BA_GK_READY:
            return now_language.BA_GK_READY;
        case MatchStatus.BA_GK_ACRO_LEFT:
            return now_language.BA_GK_ACRO_LEFT;
        case MatchStatus.BA_GK_ACRO_LEFT_HOLD:
            return now_language.BA_GK_ACRO_LEFT_HOLD;
        case MatchStatus.BA_GK_ACRO_RIGHT:
            return now_language.BA_GK_ACRO_RIGHT;
        case MatchStatus.BA_GK_ACRO_RIGHT_HOLD:
            return now_language.BA_GK_ACRO_RIGHT_HOLD;
        case MatchStatus.BA_GK_SIDESTEP_LEFT:
            return now_language.BA_GK_SIDESTEP_LEFT;
        case MatchStatus.BA_GK_SIDESTEP_RIGHT:
            return now_language.BA_GK_SIDESTEP_RIGHT;
        case MatchStatus.BA_GK_KICK:
            return now_language.BA_GK_KICK;
        case MatchStatus.BA_GK_THROW_BALL:
            return now_language.BA_GK_THROW_BALL;
        case MatchStatus.BA_GK_STRETCH_LEFT:
            return now_language.BA_GK_STRETCH_LEFT;
        case MatchStatus.BA_GK_STRETCH_LEFT_HOLD:
            return now_language.BA_GK_STRETCH_LEFT_HOLD;
        case MatchStatus.BA_GK_STRETCH_RIGHT:
            return now_language.BA_GK_STRETCH_RIGHT;
        case MatchStatus.BA_GK_STRETCH_RIGHT_HOLD:
            return now_language.BA_GK_STRETCH_RIGHT_HOLD;
        case MatchStatus.BA_BALL_OWNER:
            return now_language.BA_BALL_OWNER;
        case MatchStatus.BA_TACKLE:
            return now_language.BA_TACKLE;
        case MatchStatus.BA_SLIDING_TACKLE:
            return now_language.BA_SLIDING_TACKLE;
        case MatchStatus.BA_SLIDING_TACKLE_STAND:
            return now_language.BA_SLIDING_TACKLE_STAND;
        case MatchStatus.BA_MAX:
            return now_language.BA_MAX;
        case 1001:
            return now_language.BA_MY_1001;
        case 1002:
            return now_language.BA_MY_1002;
        case 1003:
            return now_language.BA_MY_1003;
        case 1011:
            return now_language.BA_MY_1011;
        case 1012:
            return now_language.BA_MY_1012;
        default:
            return now_language.Unknown;
    }
}

function StatsToPos_X(i, IsLocal) {
    var ret = IsLocal ? Math.round(-.255800462 * i + 199.8228530689) : Math.round(.2555000556 * i + 8.3741302936);
    return ret;
}
function StatsToPos_Y(i, IsLocal) {
    var ret = IsLocal ? Math.round(-.3073207154 * i + 315.9278777381) : Math.round(.3070644902 * i + 9.2794889414);
    return ret;
}
function Stats2XML(team, ishome, players) {


    let pidArr = new Array();
    for (let pid in players) {
        pidArr.push(pid);
    }

    let pl;
    let nl = matchLoader.matchXml.documentElement.evaluate('Player');
    let tmpXML = "<?xml version=\"1.0\" ?>" + "\r\n<SoccerTactics>\r\n\t<Team tactics=" + "\"" + team.getTactics() + "\" playstyle=\"" + team.getPlayStyle() + "\" aggression=\"" + team.getAggression() + "\" />\r\n"
        + "\t<Pos pos=\"goalie\" pid=\"" + pidArr.shift() + "\" x=\"103\" y=\"315\" x1=\"103\" y1=\"315\" x2=\"103\" y2=\"315\" pt=\"15\" fk=\"15\" />\r\n";


    while (pl = nl.iterateNext()) {
        let origin = pl.getAttribute('origin');
        let teamId = pl.getAttribute("teamId");
        if (origin != "" && origin != "375,0" && origin != "375,1000") {
            let arr = origin.split(",");
            if (team.getId() == teamId) {
                let x = StatsToPos_X(arr[0], ishome);
                let y = StatsToPos_Y(arr[1], ishome);
                tmpXML += "\t<Pos pos=\"normal\" pid=\"" + pidArr.shift() + "\" x=\"" + x + "\" y=\"" + y + "\" x1=\"" + x + "\" y1=\"" + y + "\" x2=\"" + x + "\" y2=\"" + y + "\" pt=\"1\" fk=\"1\" />\r\n";
            }

        }
    }
    tmpXML += "</SoccerTactics>\r\n";
    GM_setClipboard(tmpXML);
    alert(now_language.CopyXmlMsg);
    return tmpXML;
}


let _open;
let finalInitAfterLoading, processButtonPresses, Load010SetupMainSceneInstance;
let OK_2D = false;
(function () {
    'use strict';

    initgw();

    _open = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function () {
        if (mzreg.data2d_url.test(arguments[1])) {
            OK_2D = false;
            if (MyGame.prototype.mzlive.R_GW == undefined) {
                MyGame.prototype.mzlive.R_GW = true;

                finalInitAfterLoading = MyGame.prototype.mzlive.finalInitAfterLoading;
                MyGame.prototype.mzlive.finalInitAfterLoading = function () {
                    finalInitAfterLoading.apply(this);
                    OK_2D = true;
                    Advanced2D();
                };
                Load010SetupMainSceneInstance = MyGame.prototype.Load010SetupMainSceneInstance;
                MyGame.prototype.Load010SetupMainSceneInstance = function () {
                    window.matchLoader = arguments[0];
                    Load010SetupMainSceneInstance.apply(this, arguments);
                };
                //processButtonPresses = MyGame.prototype.mzlive.processButtonPresses;
                //MyGame.prototype.mzlive.processButtonPresses = function () {
                //    processButtonPresses.apply(this);
                //    if (this.m_state < 2) {
                //        return;
                //    }
                //    if (ig.input.pressed('jijing')) {
                //        ShowDiv(0);
                //    } else if (ig.input.pressed('dongzuo')) {
                //        ShowDiv(1);
                //    }
                //};


            }
        }
        return _open.apply(this, arguments);
    };

    gw_start(0);

    autoclearCache();
})();