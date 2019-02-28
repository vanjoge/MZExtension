// ==UserScript==
// @name         van.mz.playerAdvanced.Super
// @namespace    http://www.budeng.win:852/
// @version      2.5
// @description  Player display optimization 球员增强插件
// @author       van
// @match        https://www.managerzone.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_setClipboard
// @require      https://cdn.jsdelivr.net/pako/1.0.5/pako.min.js
// @require      https://greasyfork.org/scripts/376535-base64js/code/base64js.js?version=661147
// ==/UserScript==

function playerTrainingBySkill() {
    //涨球时间
    this.ballDay = 0;
    //训练统计
    this.stat = new trainingStat();
    //当前球数
    this.skill = 0;
}
function trainingStat() {
    //所有 不包含掉球
    this.all = new trainingDay();
    ////普通训练 无教练
    //this.pos = new trainingDay();
    ////强化营
    //this.itc = new trainingDay();
    ////调整营
    //this.ycc = new trainingDay();
    ////掉球
    //this.neg = new trainingDay();
    ////理疗
    //this.physio = new trainingDay();
    ////有教练
    //this.coach = new trainingDay();
    ////训练营
    //this.camp = new trainingDay();
    //对某类型加1
    this.add = function (type, tn) {
        if (!this[type]) {
            this[type] = new trainingDay();
        }
        this[type][tn] += 1;
    };
    this.getSum = function (canOver100) {
        let ret = 0;
        if (this.neg) {
            ret = this.all.getSum() - this.neg.getSum();
        } else {
            ret = this.all.getSum();
        }
        if (!canOver100) {
            if (ret >= 100) {
                ret = 99.99;
            }
        }
        return ret;
    };
    this.getAvg = function () {
        //let ret = this.getSum() / (this.t1 * 1 + this.t2 * 1 + this.t3 * 1 + this.t4 * 1 + this.t5 * 1 + this.t6 * 1 + this.t7 * 1 + this.t8 * 1 + this.t9 * 1 + this.t10 * 1);
        //ret = parseFloat(ret).toFixed(1);
        //return ret;

        return this.all.getAvg();
    };
    this.getTnText = function () {
        let str = "";
        if (this.pos) {
            str += " 无教练" + this.pos.getTnText();
        }
        if (this.camp) {
            str += " 进营" + this.camp.getTnText();
        }
        if (this.coach) {
            str += " 有教练" + this.coach.getTnText();
        }
        if (this.ycc) {
            str += " 调整" + this.ycc.getTnText();
        }
        if (this.itc) {
            str += " 强化" + this.itc.getTnText();
        }
        if (this.neg) {
            str += " 掉球" + this.neg.getTnText();
        }
        return str;
    };
    //this.getAvgAndText = function () {
    //    //let ret = this.getSum() / (this.t1 * 1 + this.t2 * 1 + this.t3 * 1 + this.t4 * 1 + this.t5 * 1 + this.t6 * 1 + this.t7 * 1 + this.t8 * 1 + this.t9 * 1 + this.t10 * 1);
    //    //ret = parseFloat(ret).toFixed(1);
    //    //return ret;

    //    let ret = this.getAvg();
    //    let str = "";
    //    if (ret <= 0.4) {
    //        str = "1格";
    //    }
    //    else if (ret > 0.4 && ret <= 1.1) {
    //        str = "2格";
    //    }
    //    else if (ret > 0.4 && ret <= 2.1) {
    //        str = "2格";
    //    }



    //          this.t1  * 0.4  * 1
    //        + this.t2  * 0.55 * 2
    //        + this.t3  * 0.7  * 3
    //        + this.t4  * 0.85 * 4
    //        + this.t5  * 1    * 5
    //        + this.t6  * 1.15 * 6
    //        + this.t7  * 1.3  * 7
    //        + this.t8  * 1.45 * 8
    //        + this.t9  * 1.6  * 9
    //        + this.t10 * 1.75 * 10;
    //};
    this.getDayByAvg = function (avg) {
        let ret = (100 - this.getSum()) / avg;
        ret = parseFloat(ret).toFixed(1);
        return ret;
    };
    this.getDay = function () {
        if (this.coach) {
            return this.getDayByAvg(this.coach);
        } else if (this.pos) {
            return this.getDayByAvg(this.pos);
        }
        return undefined;
    };
}
function trainingDay() {
    this.t1 = 0;
    this.t2 = 0;
    this.t3 = 0;
    this.t4 = 0;
    this.t5 = 0;
    this.t6 = 0;
    this.t7 = 0;
    this.t8 = 0;
    this.t9 = 0;
    this.t10 = 0;
    this.getSum = function () {
        let ret = this.t1 * 0.4 * 1 + this.t2 * 0.55 * 2 + this.t3 * 0.7 * 3 + this.t4 * 0.85 * 4 + this.t5 * 1 * 5 + this.t6 * 1.15 * 6 + this.t7 * 1.3 * 7 + this.t8 * 1.45 * 8 + this.t9 * 1.6 * 9 + this.t10 * 1.75 * 10;
        ret = parseFloat(ret).toFixed(1);
        return ret;
    };
    this.getAvg = function () {
        let ret = this.getSum() / (this.t1 * 1 + this.t2 * 1 + this.t3 * 1 + this.t4 * 1 + this.t5 * 1 + this.t6 * 1 + this.t7 * 1 + this.t8 * 1 + this.t9 * 1 + this.t10 * 1);
        ret = parseFloat(ret).toFixed(1);
        return ret;
    };
    this.getTnText = function () {
        let str = "";
        if (this.t1 > 0) {
            str += " 1格(" + this.t1 + ")";
        }
        if (this.t2 > 0) {
            str += " 2格(" + this.t2 + ")";
        }
        if (this.t3 > 0) {
            str += " 3格(" + this.t3 + ")";
        }
        if (this.t4 > 0) {
            str += " 4格(" + this.t4 + ")";
        }
        if (this.t5 > 0) {
            str += " 5格(" + this.t5 + ")";
        }
        if (this.t6 > 0) {
            str += " 6格(" + this.t6 + ")";
        }
        if (this.t7 > 0) {
            str += " 7格(" + this.t7 + ")";
        }
        if (this.t8 > 0) {
            str += " 8格(" + this.t8 + ")";
        }
        if (this.t9 > 0) {
            str += " 9格(" + this.t9 + ")";
        }
        if (this.t10 > 0) {
            str += " 10格(" + this.t10 + ")";
        }
        return str;
    };
}
var mzreg = {
    playerMax: /trainingField.players\s*=\s*({.+})/,
    playerId: /player_id_(\d+)/,
    bar_itc: /bar_itc_(\d+)/,
    bar_ycc: /bar_ycc_(\d+)/,
    bar_pos: /bar_pos_(\d+)/,
    bar_neg: /bar_neg_(\d+)/,
    trainingType: /&t=([^)]+)/,
    data2d_url: /matchviewer\/media/
    //data2d_url: /matchviewer\/getMatchFiles.php\?type=data&mid=\d+/
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
trainingInfo = {};
function clearCache() {
    var lists = GM_listValues();
    for (var i = 0; i < lists.length; i++) {
        let ts;
        if (lists[i].startsWith("Dt_")) {
            ts = GM_getValue(lists[i], false);
        } else {
            ts = GM_getValue("Dt_" + lists[i], false);
        }
        if (ts) {
            let dt = new Date(ts);
            let now = new Date();
            if (now.toLocaleDateString() == dt.toLocaleDateString()) {
                continue;
            }
        }
        GM_deleteValue(lists[i]);
    }
}
function myAjax(url, callback, noCache) {
    if (!noCache) {
        let tdata = getLocValue(url);
        if (tdata) {
            callback(tdata, true);
            return;
        }
    }
    $.ajax({
        type: "GET",
        url: url,
        dataType: "html",
        success: function (data) {
            setLocValue(url, data);
            callback(data, false);
            isAjaxing = false;
        }
    });

}
function getLocValue(key) {
    let ts = GM_getValue("Dt_" + key, false);

    if (ts) {
        let dt = new Date(ts);
        let now = new Date();
        //let d = now.getTime() - dt.getTime();
        if (now.toLocaleDateString() == dt.toLocaleDateString()) {
            if (now.getHours() >= 6 && now.getHours() <= 9 && now.getHours() != dt.getHours()) {
                return false;
            }
        } else {
            if (now.getHours() >= 6) {
                return false;
            }
        }
        let b64 = GM_getValue(key, false);
        if (b64) {
            if (b64.startsWith("H4sIAA")) {
                return pako.ungzip(base64js.toByteArray(b64), { to: 'string' });
            } else {
                return b64;
            }

        }
        return false;

    } else {
        return false;
    }
}
function setLocValue(key, val) {
    GM_setValue("Dt_" + key, new Date().getTime());
    let b64 = base64js.fromByteArray(pako.gzip(val));
    GM_setValue(key, b64);
}
function getMax(callback) {
    myAjax(
        "/?p=training",
        function (data) {
            var result = data.match(mzreg.playerMax);
            pmax = JSON.parse(result[1]);
            callback();

        });
    return false;
}
function setSrc(transfer, img, skill, maxed, skillBallDay, pid, k) {
    if (skill > 0) {
        if (transfer && skillBallDay) {
            if (new Date().getTime() - skillBallDay < 345600000) {
                $(img).parent().find("span").remove();
                $(img).parent().append("<span class=\"help_button_placeholder\"><a class=\"help_button\" href=\"#\" onclick=\"showHelpLayer('挂牌后属性可能有变动，不确定转会市场显示是否是真实属性，请自行甄别。<br/>属性变动时间" + new Date(skillBallDay).toLocaleString() + "', '属性不确定', true); return false\"><span class=\"help_button_wrapper\"><span class=\"help_button_text\">?</span></span></a></span>");
            }
        }
        if (pid && trainingInfo[pid][k]) {
            let extmp = $(img).parent().parent().find(".skill_exact2");
            if (extmp.length > 0) {
                extmp.remove();
            }
            let sum = 0;
            if (trainingInfo[pid][k][skill]) {
                sum = trainingInfo[pid][k][skill].stat.getSum();
            }
            $(img).parent().parent().append("<td class='skill_exact2'><div><span id=" + pid + "_" + k + "_" + skill + " class='skillval skill_exact_van'>" + sum + "%</span></div></td>");
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
    }
}
function showMax(GraphsType) {
    let players = $(".playerContainer");
    for (var i = 0; i < players.length; i++) {
        let pdom = players.eq(i);
        let pid = pdom.html().match(mzreg.playerId)[1];
        let player = pmax[pid];
        let imgs = pdom.find("img.skill");
        if (GraphsType == 0 && player) {
            setSrc(false, imgs[0], player.skills.speed, player.maxed.speed);
            setSrc(false, imgs[1], player.skills.stamina, player.maxed.stamina);
            setSrc(false, imgs[2], player.skills.gameintelligence, player.maxed.gameintelligence);
            setSrc(false, imgs[3], player.skills.passing, player.maxed.passing);
            setSrc(false, imgs[4], player.skills.shooting, player.maxed.shooting);
            setSrc(false, imgs[5], player.skills.heading, player.maxed.heading);
            setSrc(false, imgs[6], player.skills.goalkeeping, player.maxed.goalkeeping);
            setSrc(false, imgs[7], player.skills.technique, player.maxed.technique);
            setSrc(false, imgs[8], player.skills.tackling, player.maxed.tackling);
            setSrc(false, imgs[9], player.skills.highpassing, player.maxed.highpassing);
            setSrc(false, imgs[10], player.skills.situations, player.maxed.situations);
        } else if (pdom.find(".training_graphs").length > 0 && imgs.length > 0) {
            let skills = pdom.find("td.skillval");
            getTrainingGraphs(pid, imgs, skills);
        }
    }
    return false;
}
function drawPlayerByTrainingGraphs(pid, data, imgs, skills) {
    eval(data);
    let maxeds = ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green"];
    let skillBallDays = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let allSkillTraining_tmp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < series.length; i++) {
        if ((series[i].type == "line" && series[i].color == "rgba(255,0,0,0.7)")) {
            if (series[i].data.length > 0) {
                let g = series[i].data[0];
                let index = g.y - 1;
                if (index >= 0 && g.y <= 11) {
                    maxeds[index] = "red";
                }
            }
        } else {
            for (var j = 0; j < series[i].data.length; j++) {
                let g = series[i].data[j];
                let index = g.y - 1;
                if (index >= 0 && g.y <= 11) {
                    if (g.name == "Maxed") {
                        maxeds[index] = "red";
                    }
                    if (g.marker && g.marker.symbol) {
                        if (allSkillTraining_tmp[index] == 0) {
                            allSkillTraining_tmp[index] = new Array();
                            allSkillTraining_tmp[index].push(new playerTrainingBySkill());
                        }
                        let playerTS = allSkillTraining_tmp[index][allSkillTraining_tmp[index].length - 1];
                        if (/_ball/.test(g.marker.symbol)) {
                            if (skillBallDays[index] < g.x) {
                                skillBallDays[index] = g.x;
                                playerTS.ballDay = g.x;
                                allSkillTraining_tmp[index].push(new playerTrainingBySkill());
                            }
                        }
                        let result = g.marker.symbol.match(mzreg.trainingType);
                        let type = "";
                        if (result && result.length > 0) {
                            switch (result[1]) {
                                case "physio":
                                    //理疗
                                    type = "physio";
                                    break;
                                case "coach":
                                    //有教练
                                    type = "coach";
                                    break;
                                case "training_camp":
                                    //训练营
                                    type = "camp";
                                    break;
                                case "training_camp_ycc":
                                    //调整营
                                    type = "ycc";
                                    break;
                                case "training_camp_itc":
                                    //强化营
                                    type = "itc";
                                    break;
                                default:
                                    //未知
                                    console.log("未知训练类型:" + result[1]);
                                    break;
                            }
                        }
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
                    }
                }
            }
        }
    }
    let allSkillTraining = new Array();
    for (var t1 = 0; t1 < allSkillTraining_tmp.length; t1++) {
        if (skills[t1].nowSkill == undefined) {
            skills[t1].nowSkill = skills.eq(t1).html().replace("(", "").replace(")", "");
        }
        let nowSkill = parseInt(skills[t1].nowSkill);
        let tmp = {};
        for (var t2 = 0; t2 < allSkillTraining_tmp[t1].length; t2++) {
            let tmp2 = allSkillTraining_tmp[t1][t2];
            if (tmp2.stat.getSum() != 0) {
                tmp2.skill = nowSkill + 1 - allSkillTraining_tmp[t1].length + t2;
                tmp[tmp2.skill] = tmp2;
            }
        }
        allSkillTraining[t1] = tmp;
    }
    trainingInfo[pid] = allSkillTraining;
    for (var k = 0; k < maxeds.length; k++) {
        setSrc($(".player_share_skills").length == 0, imgs[k], skills[k].nowSkill, maxeds[k], skillBallDays[k], pid, k);
    }
}
function fillTrainingLevel(type, reg, playerTS, url, isneg) {
    let result = url.match(reg);
    if (result && result.length > 0) {
        let stat = playerTS.stat;
        //if (skillTraining[index] == 0) {
        //    stat = new trainingStat();
        //    skillTraining[index] = stat;
        //} else {
        //    stat = skillTraining[index];
        //}
        if (isneg) {
            stat.add(type, "t" + result[1]);
        } else {
            stat.add("all", "t" + result[1]);
            stat.add(type, "t" + result[1]);
        }
    }
}
function getTrainingGraphs(pid, imgs, skills) {
    myAjax(
        "/ajax.php?p=trainingGraph&sub=getJsonTrainingHistory&sport=soccer&player_id=" + pid,
        function (data) {
            drawPlayerByTrainingGraphs(pid, data, imgs, skills);
        });
}
function showPop(parent) {
    $("body").append("<div id=\"informationBubble\" class=\"shadow\"></div>");
    var bubble = $("#informationBubble");
    bubble.css("width", "200px");
    let tmpArr = parent.attr('id').split("_");

    let playTS = trainingInfo[tmpArr[0]][tmpArr[1]];
    let str = "";
    let sum = 0;
    if (playTS[tmpArr[2]]) {
        let training = playTS[tmpArr[2]].stat;
        //let training = new trainingStat();
        str = "平均 " + training.getAvg() + "%" + training.getTnText() + "<br/><br/>离下一次涨球训练天数:<br/>";
        if (training.camp) {
            str += training.getDayByAvg(training.camp.getAvg()) + "(进营) ";
        }
        if (training.coach) {
            str += training.getDayByAvg(training.coach.getAvg()) + "(有教练) ";
        }
        if (training.pos) {
            str += training.getDayByAvg(training.pos.getAvg()) + "(无教练)";
        }
        str += "<br/><br/>";

        sum = training.getSum();
    }
    let flag = false;
    str += "分段训练效率:";
    for (var i = 0; i < 10; i++) {
        if (playTS[i]) {
            flag = true;
            str += "<br/>" + i + "-" + (i + 1) + " 进度"
                + playTS[i].stat.getSum(true) + "%"
                + " 平均" + playTS[i].stat.getAvg() + "%<br/>" + playTS[i].stat.getTnText();
        }
    }

    let content = "<div class='clearfix'><h3 style='margin: 0; padding: 0'>当前训练进度"
        + sum
        + "%</h3><div class='skill_exact big'><div class='skill_exact_wrapper clearfix'><div class='skill_exact_bar' style='width: "
        + sum * 2
        + "px;'></div></div></div><p>"
        + (flag ? str : "")
        + "</p></div>";
    bubble.html(content);
    mz.stickToParent(bubble, parent);
    bubble.slideDown("fast");

    $(parent).bind("mouseleave", function () {
        bubble.remove();
    });
}
function initgw() {
    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = ".gw_run_div{position:fixed;bottom:20%;right:1px;border:1px solid gray;padding:3px;width:12px;font-size:12px;border-radius: 3px;text-shadow: 1px 1px 3px #676767;background-color: #000000;color: #FFFFFF;cursor: default;}.gw_run{cursor:pointer;}.gw_div_left{float:left;position:fixed;left:0px;top:120px;height:528px;overflow-y:auto;text-align:left;}.gw_div_right{float:right;position:fixed;right:0px;top:120px;height:528px;overflow-y:auto;text-align:left;}";
    document.getElementsByTagName('head')[0].appendChild(css);

    $(document.body).append("<div class='gw_run_div'><div id='gw_run' class='gw_run' title='点击可手动着色 快捷键:ALT + A'><b>手动着色</b></div><div>---</div><div id='gw_run2' class='gw_run' title='点击可手动着色和分析训练效率 快捷键:ALT + S'><b>训练效率分析</b></div><div>---</div><div id='gw_run3' class='gw_run' title='点击可清理缓存，可在运行变慢的时候点击'><b>清理缓存</b></div></div>");
    $('#gw_run')[0].addEventListener('click', function () { gw_start(0); });
    $('#gw_run2')[0].addEventListener('click', function () { gw_start(1); });
    $('#gw_run3')[0].addEventListener('click', function () { clearCache(); });


    document.onkeydown = function () {
        if (event.altKey) {
            if (window.event.keyCode == 65) {
                //alt + A
                gw_start(0);
            }
            else if (window.event.keyCode == 83) {
                //alt + S
                gw_start(1);
            }
            else if (window.event.keyCode == 68) {
                //alt + D
                Advanced2D();
            }
        }
    };
    $("body").on("mouseenter", ".skill_exact_van", function () {
        showPop($(this));
    });
}
//GraphsType 0 自动模式 1 强制训练图
function gw_start(GraphsType) {
    if ($("#players_container").width() < 660)
        $("#players_container").width("660");
    if ($(".player_share_skills").length > 0) {
        if (GraphsType == 0) {
            getMax(function () {
                showMax(0);
            });
        } else {
            showMax(GraphsType);
        }
    } else if ($(".playerContainer").find(".training_graphs").length > 0) {
        showMax(GraphsType);
    }
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
                    $('#canvas').parent().append('<div><b id="gw_jijing" class="gw_run" style="color: red;">比赛集锦</b>    <b id="gw_dongzuo" class="gw_run" style="color: red;">球员动作</b>    <b id="gw_copyxml1" class="gw_run" style="color: red;">复制主队战术</b>    <b id="gw_copyxml2" class="gw_run" style="color: red;">复制客队战术</b></div>');

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
            return "BA_NORMAL";
        case MatchStatus.BA_WALL:
            return "站人墙";
        case MatchStatus.BA_HOLD:
            return "抱着球";
        case MatchStatus.BA_DOWN:
            return "倒地";
        case MatchStatus.BA_HOLD_THROWIN:
            return "界外球准备";
        case MatchStatus.BA_THROWIN:
            return "界外球";
        case MatchStatus.BA_LEFT_FOOT_SHOT_FWD:
            return "左脚射门/长传";
        case MatchStatus.BA_LEFT_FOOT_SHOT_BACK:
            return "BA_LEFT_FOOT_SHOT_BACK";
        case MatchStatus.BA_LEFT_FOOT_SHOT_RIGHT:
            return "BA_LEFT_FOOT_SHOT_RIGHT";
        case MatchStatus.BA_LEFT_FOOT_SHOT_LEFT:
            return "BA_LEFT_FOOT_SHOT_LEFT";
        case MatchStatus.BA_RIGHT_FOOT_SHOT_FWD:
            return "右脚射门/长传";
        case MatchStatus.BA_RIGHT_FOOT_SHOT_BACK:
            return "BA_RIGHT_FOOT_SHOT_BACK";
        case MatchStatus.BA_RIGHT_FOOT_SHOT_RIGHT:
            return "BA_RIGHT_FOOT_SHOT_RIGHT";
        case MatchStatus.BA_RIGHT_FOOT_SHOT_LEFT:
            return "BA_RIGHT_FOOT_SHOT_LEFT";
        case MatchStatus.BA_LEFT_FOOT_PASS_FWD:
            return "左脚短传";
        case MatchStatus.BA_LEFT_FOOT_PASS_BACK:
            return "BA_LEFT_FOOT_PASS_BACK";
        case MatchStatus.BA_LEFT_FOOT_PASS_RIGHT:
            return "BA_LEFT_FOOT_PASS_RIGHT";
        case MatchStatus.BA_LEFT_FOOT_PASS_LEFT:
            return "BA_LEFT_FOOT_PASS_LEFT";
        case MatchStatus.BA_RIGHT_FOOT_PASS_FWD:
            return "右脚短传";
        case MatchStatus.BA_RIGHT_FOOT_PASS_BACK:
            return "BA_RIGHT_FOOT_PASS_BACK";
        case MatchStatus.BA_RIGHT_FOOT_PASS_RIGHT:
            return "BA_RIGHT_FOOT_PASS_RIGHT";
        case MatchStatus.BA_RIGHT_FOOT_PASS_LEFT:
            return "BA_RIGHT_FOOT_PASS_LEFT";
        case MatchStatus.BA_PICK_UP_BALL:
            return "捡起球";
        case MatchStatus.BA_DROP_BALL:
            return "放下球";
        case MatchStatus.BA_HEADER:
            return "争顶";
        case MatchStatus.BA_TRIP:
            return "失误/被抢断?";
        case MatchStatus.BA_CELEBRATE:
            return "庆祝进球";
        case MatchStatus.BA_GK_READY:
            return "准备扑救?";
        case MatchStatus.BA_GK_ACRO_LEFT:
            return "左ACRO";
        case MatchStatus.BA_GK_ACRO_LEFT_HOLD:
            return "左ACRO_HOLD";
        case MatchStatus.BA_GK_ACRO_RIGHT:
            return "右ACRO";
        case MatchStatus.BA_GK_ACRO_RIGHT_HOLD:
            return "右ACRO_HOLD";
        case MatchStatus.BA_GK_SIDESTEP_LEFT:
            return "左移";
        case MatchStatus.BA_GK_SIDESTEP_RIGHT:
            return "右移";
        case MatchStatus.BA_GK_KICK:
            return "BA_GK_KICK";
        case MatchStatus.BA_GK_THROW_BALL:
            return "BA_GK_THROW_BALL";
        case MatchStatus.BA_GK_STRETCH_LEFT:
            return "BA_GK_STRETCH_LEFT";
        case MatchStatus.BA_GK_STRETCH_LEFT_HOLD:
            return "BA_GK_STRETCH_LEFT_HOLD";
        case MatchStatus.BA_GK_STRETCH_RIGHT:
            return "BA_GK_STRETCH_RIGHT";
        case MatchStatus.BA_GK_STRETCH_RIGHT_HOLD:
            return "BA_GK_STRETCH_RIGHT_HOLD";
        case MatchStatus.BA_BALL_OWNER:
            return "持球/带球?";
        case MatchStatus.BA_TACKLE:
            return "上抢(失败?)";
        case MatchStatus.BA_SLIDING_TACKLE:
            return "BA_SLIDING_TACKLE";
        case MatchStatus.BA_SLIDING_TACKLE_STAND:
            return "BA_SLIDING_TACKLE_STAND";
        case MatchStatus.BA_MAX:
            return "BA_MAX";
        case 1001:
            return "头球攻门(左)";
        case 1002:
            return "头球攻门(右)";
        case 1003:
            return "胸部/头部停球";
        case 1011:
            return "上抢(成功)";
        case 1012:
            return "上抢(失败)";
        default:
            return "未知";
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
    alert("战术已复制到剪切板");
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
})();