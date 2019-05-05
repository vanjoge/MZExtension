// ==UserScript==
// @name         van.mz.playerAdvanced.Super
// @namespace    http://www.budeng.win:852/
// @version      3.10
// @description  Player display optimization 球员增强插件
// @author       van
// @match        https://www.managerzone.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @connect      www.budeng.win
// @require      https://cdn.bootcss.com/pako/1.0.5/pako.min.js
// @require      https://cdn.jsdelivr.net/gh/vanjoge/MZExtension/Scripts/base64js.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.js
// ==/UserScript==


var gm_mzlanguage = {
    zh: {
        Name: "中文",
        Save: "保存",
        Setting: "设置",
        Test: "测试",
        SettingTitle: "点击可对语言和XML导出进行设置",
        Language: "语言",
        XmlMode: "战术导出模式",
        XmlMode1: "顺序选择球员",
        XmlMode2: "根据位置选择球员(需提交数据到后台)",
        TacConf: "位置系数设置",
        AutoRun: "自动着色",
        AutoRun0: "仅打开页面时自动执行一次",
        AutoRun1: "随系统刷新自动着色(如果浏览器变卡请关闭此选项)",


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
        BA_TRIP: "丢失球权",
        BA_CELEBRATE: "庆祝进球",
        BA_GK_READY: "准备扑救",
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
        BA_BALL_OWNER: "控球",
        BA_TACKLE: "上抢",
        BA_SLIDING_TACKLE: "BA_SLIDING_TACKLE",
        BA_SLIDING_TACKLE_STAND: "BA_SLIDING_TACKLE_STAND",
        BA_MAX: "BA_MAX",
        BA_MY_1001: "头球攻门(L)",
        BA_MY_1002: "头球攻门(R)",
        BA_MY_1003: "卸下球",
        BA_MY_1011: "上抢(成功)",
        BA_MY_1012: "上抢(失败)",
        Unknown: "未知"


        ,
        training_pos: "无教练",
        training_camp: "进营",
        training_coach: "有教练",
        training_ycc: "调整",
        training_itc: "强化",
        training_neg: "掉球",
        training_unit: "格",
        training_unknown: "未知训练类型",
        training_ball_day: "离下一次涨球训练天数",
        training_part: "分段训练效率",
        training_total: "进度",
        training_avg: "平均",
        training_now: "当前训练进度",
        SkillsAnalysisTitle: "点击可手动着色和分析训练效率 快捷键:ALT + S",
        SkillsAnalysis: "训练效率分析"


    }
    ,

    en: {
        Name: "English",
        Save: "Save",
        Setting: "Setting",
        Test: "Test",
        SettingTitle: "Click setting language",
        Language: "Language",
        XmlMode: "Tactical Export Model",
        XmlMode1: "Sequential selection",
        XmlMode2: "Choose by location(need submit data to server)",
        TacConf: "Tactical Coefficient Setting",
        AutoRun: "Auto Colorable",
        AutoRun0: "By page loaded(Once)",
        AutoRun1: "By MZ Refresh",

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



        ,
        training_pos: "No coach",
        training_camp: "CAMP",
        training_coach: "Coach",
        training_ycc: "Ycc",
        training_itc: "Itc",
        training_neg: "Neg",
        training_unit: "↑",
        training_unknown: "Unknown training",
        training_ball_day: "Next ball days",
        training_part: "Training efficiency",
        training_total: "Total",
        training_avg: "Avg",
        training_now: "Now",
        SkillsAnalysisTitle: "Colorable Skill and Analysis of Training Efficiency Shortcut key :ALT + S",
        SkillsAnalysis: "Colorable By Graphs"
    }

    ,
    es: {
        Name: "Español",
        Save: "Grabar",
        Setting: "Ajustes",
        Test: "Test",
        SettingTitle: "Haga clic en configuración Idioma",
        Language: "Idioma",

        XmlMode: "Tactical Export Model",
        XmlMode1: "Sequential selection",
        XmlMode2: "Choose by location(need submit data to server)",
        TacConf: "Tactical Coefficient Setting",
        AutoRun: "Auto Colorable",
        AutoRun0: "By page loaded(Once)",
        AutoRun1: "By MZ Refresh",

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


        ,
        training_pos: "No coach",
        training_camp: "CAMP",
        training_coach: "Coach",
        training_ycc: "Ycc",
        training_itc: "Itc",
        training_neg: "Neg",
        training_unit: "↑",
        training_unknown: "Unknown training",
        training_ball_day: "Next ball days",
        training_part: "Training efficiency",
        training_total: "Total",
        training_avg: "Avg",
        training_now: "Now",
        SkillsAnalysisTitle: "Colorable Skill and Analysis of Training Efficiency Shortcut key :ALT + S",
        SkillsAnalysis: "Colorable By Graphs"
    }
};
var now_language = gm_mzlanguage.en;

function CTable() {
    //key value
    this.data = {};
    //keys
    this.keys = new Array();
    this.addData = function (key, value) {
        if (this.data[key] == undefined) {
            this.keys.push(key);
            this.keys.sort(function (a, b) {
                return a - b;
            });
        }
        this.data[key] = value;
    };
    this.getVal = function (i) {
        if (this.data[i] == undefined) {
            //
        } else {
            return this.data[i];
        }
    };
    this.GetX = function (i) {
        var rv = this.getVal(i);
        rv = Math.floor(rv * 214 / 1000) - 3;
        return rv;
    };
    this.GetY = function (i) {
        var rv = GetVal(i);
        rv = Math.floor(rv * 328 / 1000) - 1;
        return rv;
    };
}

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
            str += " " + now_language.training_pos + this.pos.getTnText();
        }
        if (this.camp) {
            str += " " + now_language.training_camp + this.camp.getTnText();
        }
        if (this.coach) {
            str += " " + now_language.training_coach + this.coach.getTnText();
        }
        if (this.ycc) {
            str += " " + now_language.training_ycc + this.ycc.getTnText();
        }
        if (this.itc) {
            str += " " + now_language.training_itc + this.itc.getTnText();
        }
        if (this.neg) {
            str += " " + now_language.training_neg + this.neg.getTnText();
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
            str += " 1" + now_language.training_unit + "(" + this.t1 + ")";
        }
        if (this.t2 > 0) {
            str += " 2" + now_language.training_unit + "(" + this.t2 + ")";
        }
        if (this.t3 > 0) {
            str += " 3" + now_language.training_unit + "(" + this.t3 + ")";
        }
        if (this.t4 > 0) {
            str += " 4" + now_language.training_unit + "(" + this.t4 + ")";
        }
        if (this.t5 > 0) {
            str += " 5" + now_language.training_unit + "(" + this.t5 + ")";
        }
        if (this.t6 > 0) {
            str += " 6" + now_language.training_unit + "(" + this.t6 + ")";
        }
        if (this.t7 > 0) {
            str += " 7" + now_language.training_unit + "(" + this.t7 + ")";
        }
        if (this.t8 > 0) {
            str += " 8" + now_language.training_unit + "(" + this.t8 + ")";
        }
        if (this.t9 > 0) {
            str += " 9" + now_language.training_unit + "(" + this.t9 + ")";
        }
        if (this.t10 > 0) {
            str += " 10" + now_language.training_unit + "(" + this.t10 + ")";
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
function setSrc(transfer, img, skill, maxed, skillBallDay, pid, k) {
    if (skill > 0) {
        let flag_exit = false;
        if (transfer && skillBallDay) {
            if (new Date().getTime() - skillBallDay < 345600000) {

                getTrainingGraphsBySkill_id(pid, k, function (data) {
                    let result = data.match(new RegExp('{"x":' + skillBallDay + ',"y":(\\d+),[^}]*"marker"'));
                    if (result && result.length) {
                        $(img).parent().parent().find("td.skillval").html("(" + result[1] + ")");
                        setSrc(false, img, result[1], maxed, false, pid, k);
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
        if (img.isYtc) {
            $(img).parent().parent().children()[0].className = "gm_ytc";
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
                        if (allSkillTraining_tmp[index] == 0) {
                            allSkillTraining_tmp[index] = new Array();
                            allSkillTraining_tmp[index].push(new playerTrainingBySkill());
                        }
                        let playerTS = allSkillTraining_tmp[index][allSkillTraining_tmp[index].length - 1];
                        if (/training_camp/.test(g.marker.symbol)) {
                            //训练营 判断是否是ytc
                            if (camp.inYTC(g.x)) {
                                imgs[index].isYtc = true;
                            }

                        }
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
                                    console.log(now_language.training_unknown + ":" + result[1]);
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
function getTrainingGraphsBySkill_id(pid, skill_id, callback) {
    myAjax(
        "/ajax.php?p=trainingGraph&sub=getJsonTrainingHistory&sport=soccer&player_id=" + pid + "&skill_id=" + (skill_id + 2),
        function (data) {
            callback(data);
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
        str = now_language.training_avg + " " + training.getAvg() + "%" + training.getTnText() + "<br/><br/>" + now_language.training_ball_day + ":<br/>";
        if (training.camp) {
            str += training.getDayByAvg(training.camp.getAvg()) + "(" + now_language.training_camp + ") ";
        }
        if (training.coach) {
            str += training.getDayByAvg(training.coach.getAvg()) + "(" + now_language.training_coach + ") ";
        }
        if (training.pos) {
            str += training.getDayByAvg(training.pos.getAvg()) + "(" + now_language.training_pos + ")";
        }
        str += "<br/><br/>";

        sum = training.getSum();
    }
    let flag = false;
    str += now_language.training_part + ":";
    for (var i = 0; i < 10; i++) {
        if (playTS[i]) {
            flag = true;
            str += "<br/>" + i + "-" + (i + 1) + " " + now_language.training_total + ":"
                + playTS[i].stat.getSum(true) + "%"
                + " " + now_language.training_avg + ":" + playTS[i].stat.getAvg() + "%<br/>" + playTS[i].stat.getTnText();
        }
    }

    let content = "<div class='clearfix'><h3 style='margin: 0; padding: 0'>" + now_language.training_now + ":"
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
function report() {
    let username = $("#header-username").html();
    if (username != undefined) {

        GM_xmlhttpRequest({
            method: "GET",
            url: "http://www.budeng.win:852/MZ/ReportUsr?username=" + username,
            responseType: "json",
            onload: function (result) {
            },
            onerror: function (result) {
            }
        });
    }
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
function OpenSetting() {

    let lang = GM_getValue("mylanguage", "en");
    let xml_mode = GM_getValue("xml_mode", 0);
    let autoRun = GM_getValue("autoRun", 0);
    let tmphtml;
    tmphtml = '\
<div><b>'+ now_language.Language + ':</b></div>\
<div><select id="gm_language">\
<option value="en"'+ (lang == "en" ? ' selected="selected" ' : '') + '>' + gm_mzlanguage.en.Name + '</option>\
<option value="zh"'+ (lang == "zh" ? ' selected="selected" ' : '') + '>' + gm_mzlanguage.zh.Name + '</option>\
<option value="es"'+ (lang == "es" ? ' selected="selected" ' : '') + '>' + gm_mzlanguage.es.Name + '</option>\
</select>\
</div>\
\
<div><b>'+ now_language.AutoRun + ':</b></div>\
<div><select id="gm_autorun">\
<option value="0"'+ (autoRun == 0 ? ' selected="selected" ' : '') + '>' + now_language.AutoRun0 + '</option>\
<option value="1"'+ (autoRun == 1 ? ' selected="selected" ' : '') + '>' + now_language.AutoRun1 + '</option>\
</select>\
</div>\
\
<div><b>'+ now_language.XmlMode + ':</b></div>\
<div><select id="gm_xml_mode">\
<option value="0"'+ (xml_mode == 0 ? ' selected="selected" ' : '') + '>' + now_language.XmlMode1 + '</option>\
<option value="1"'+ (xml_mode == 1 ? ' selected="selected" ' : '') + '>' + now_language.XmlMode2 + '</option>\
</select>\
</div>\
<div><b>'+ now_language.TacConf + ':</b></div>\
<div><textarea style="width: 380px;height:200px;" id="txtTacConf" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"></textarea>\
</div>\
<div>\
<a href="#" class="mzbtn buttondiv button_account" id="gm_setting_save">\
<span class="buttonClassMiddle"><span style="white-space: nowrap">'+ now_language.Save + '</span></span><span class="buttonClassRight">&nbsp;</span>\
</a>\
</div>\
';

    showHelpLayer(tmphtml, now_language.Setting, true);
    $("#txtTacConf").val(GM_getValue("TacConf", ""));
    $("#gm_setting_save")[0].addEventListener('click', function () {
        setLanguage($("#gm_language").val());
        GM_setValue("xml_mode", $("#gm_xml_mode").val());
        GM_setValue("autoRun", $("#gm_autorun").val());
        GM_setValue("TacConf", $("#txtTacConf").val());

        $('#gw_run')[0].title = now_language.ManualColorTitle;
        $('#gw_run').html("<b>" + now_language.ManualColor + "</b>");
        $('#gw_run2')[0].title = now_language.SettingTitle;
        $('#gw_run2').html("<b>" + now_language.Setting + "</b>");

        $('#gw_jijing').html(now_language.Jijing);
        $('#gw_dongzuo').html(now_language.dongzuo);
        $('#gw_copyxml1').html(now_language.Copyxml1);
        $('#gw_copyxml2').html(now_language.Copyxml2);
        $('#gw_test').html(now_language.Test);


        powerboxCloseAll();
    });
}

//以下为2D比赛辅助
function MatchEvent() {
    this.data = new Array();
    this.setAllPlayerEvent = function (team, tc) {
        for (let i = 0; i < tc.length; i++) {
            this.data.push(tc[i]);
        }

        for (let i = 0; i < team.m_players.length; i++) {
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

    this.longPass = {};


    this.setData = function (match) {
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
        out_of_play.resetIndex();
        let ball_move;
        let ballz = 0;
        longPass = {};
        let LPtmp = {
            flag: false,
            data: {},
            begindown: false,
            state: 0,//0 初始 1开始上升 2开始下降,
            owner: false
        };
        for (var i = 0; i < matchBuffer.length; i++) {
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
                                    if (LPtmp.data.end >= m_ko2Frame) {
                                        xd = gball.x - gp.position.x;//+ 5;
                                    } else {
                                        xd = gball.x - gp.position.x;// - 5;
                                    }
                                    let yd = gball.y - gp.position.y;
                                    let distance = Math.sqrt(xd * xd + yd * yd);
                                    if (dit_player[gp.id].m_side == LPtmp.owner.m_side) {
                                        if (distance < distance1) {
                                            distance1 = distance;
                                            LPtmp.data.team = {
                                                player: dit_player[gp.id],
                                                gp: gp,
                                                distance: distance
                                            };
                                        }
                                    } else {
                                        if (distance < distance2) {
                                            distance2 = distance;
                                            LPtmp.data.other = {
                                                player: dit_player[gp.id],
                                                gp: gp,
                                                distance: distance
                                            }
                                        }
                                    }
                                }
                            }

                            if (LPtmp.data.end >= m_ko2Frame) {

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

                        var p = dit_player[players[j].id];
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
                                    if (i >= m_ko2Frame) {
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
                        data.h += getMatchStatusName(data.team.events[k].status);
                        if (data.team.events[k].status == 1001 || data.team.events[k].status == 1002) {
                            let d = 0;
                            if (data.end <= m_htFrame) {
                                d = 1;
                            } else if (data.end >= m_ko2Frame && data.end <= m_ht2Frame) {
                                d = 2;
                            } else if (data.end >= m_ko3Frame && data.end <= m_ht3Frame) {
                                d = 3;
                            } else if (data.end >= m_ko4Frame && data.end <= m_ht4Frame) {
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
                        data.h += getMatchStatusName(data.other.events[k].status);
                    }
                    data.h += "][";

                    let gball = this.match.matchBuffer[data.end].ball;
                    let sball = this.match.matchBuffer[data.start].ball;
                    let dx1 = 0, dy1 = 0, dx2 = 0, dy2 = 0;
                    if (data.end >= m_ko2Frame) {
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
                            X: new MyMathArr(),
                            Y: new MyMathArr()
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
    }
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
};

function MyMathArr() {
    this.data = new Array();

    let sum = function (x, y) { return x + y; };　　//求和函数
    let square = function (x) { return x * x; };　　//数组中每个元素求它的平方

    this.cal = function () {

        var avg = this.data.reduce(sum) / this.data.length;
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
function PlayerPos() {
    this.data = {};
    this.stat = new Array();

    this.setData = function (match, pids) {
        //构建临时数据(不合并连续帧)
        let matchBuffer = match.matchBuffer;
        let tmpP = {
        };
        for (let i = 0; i < pids.length; i++) {
            tmpP[pids[i]] = {};
        }
        let dl = 10;
        let nowItem;
        let lastKey = false;
        let tmpdata = {};
        for (let i = 0; i < matchBuffer.length; i++) {

            let players = matchBuffer[i].players;

            for (var j = 0; j < players.length; j++) {
                if (players[j].status != undefined) {

                    //移动判断
                    if (tmpP[players[j].id] != undefined) {
                        tmpP[players[j].id] = players[j];
                    }
                }
            }
            let key = "";
            for (let k = 1; k < pids.length; k++) {
                let p1 = tmpP[pids[k - 1]];
                let p2 = tmpP[pids[k]];
                if (p1.position == undefined || p2.position == undefined) {
                    key = false;
                    break;
                }
                let dx = p2.position.x - p1.position.x
                let dy = p2.position.y - p1.position.y;
                let dz = p2.position.z - p1.position.z;
                key += dx + "_" + dy + "_";//+ "_" + dz;
                tmpP[pids[k - 1]] = {};
            }
            tmpP[pids[pids.length - 1]] = {};
            if (key) {

                if (tmpdata[key] == undefined) {
                    tmpdata[key] = new Array();
                }
                tmpdata[key].push(i);

                if (key != lastKey) {
                    //结束
                    if (nowItem) {
                        let dframe = nowItem.end - nowItem.start;
                        if (dframe > 1) {
                            this.stat.push(nowItem);
                        }
                        nowItem = false;
                    }
                } else {

                    if (nowItem) {
                        nowItem.end = i;
                    } else {
                        nowItem = {
                            start: i - 1, end: i, key: key
                        };
                    }
                }
            }
            lastKey = key;

        }
        for (let kk in tmpdata) {
            if (tmpdata[kk].length > dl) {
                this.data[kk] = tmpdata[kk];
            }
        }
    };

    //this.setData = function (match, pids) {
    //    //构建临时数据(不合并连续帧)
    //    let matchBuffer = match.matchBuffer;
    //    let tmpPos = {
    //        last: {}
    //    };
    //    let nowItem;
    //    for (var i = 0; i < matchBuffer.length; i++) {

    //        let nowkey = false;
    //        let players = matchBuffer[i].players;

    //        let flag = true;
    //        let len = pids.length;
    //        for (var j = 0; j < players.length; j++) {
    //            if (players[j].status != undefined) {

    //                //移动判断
    //                if (pids[players[j].id] != undefined) {
    //                    let pos = tmpPos.last[players[j].id];
    //                    tmpPos.last[players[j].id] = players[j];
    //                    if (pos != undefined) {

    //                        let dx = players[j].position.x - pos.position.x;
    //                        let dy = players[j].position.y - pos.position.y;
    //                        let dz = players[j].position.z - pos.position.z;

    //                        let key = dx + "_" + dy;//+ "_" + dz;
    //                        //已不符合 不需要再判断
    //                        if (flag) {
    //                            if (nowkey) {
    //                                //直接判断
    //                                if (nowkey == key) {
    //                                    len--;
    //                                }
    //                                else {
    //                                    //结束
    //                                    flag = false;
    //                                    //不能break; 否则最后位置不更新
    //                                }
    //                            } else {
    //                                //第一次直接符合
    //                                len--;
    //                            }
    //                        }
    //                        nowkey = key;
    //                    }
    //                }
    //            }
    //        }
    //        if (flag && len <= 0) {
    //            if (nowItem) {
    //                nowItem.end = i;
    //            } else {
    //                nowItem = {
    //                    start: i, end: i, keys: {}
    //                };
    //            }
    //            if (nowItem.keys[nowkey] == undefined) {
    //                nowItem.keys[nowkey] = 1;
    //            }
    //            else {
    //                nowItem.keys[nowkey] += 1;
    //            }


    //        } else {
    //            //结束
    //            if (nowItem) {

    //                let dframe = nowItem.end - nowItem.start;
    //                if (dframe > 1) {
    //                    this.data.push(nowItem);
    //                }
    //            }
    //            nowItem = false;
    //        }
    //    }
    //};
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
let dit_bypid = {};
let dit_player = {};
let m_koFrame = 0, m_htFrame = 0, m_ko2Frame = 0, m_ht2Frame = 0, m_ko3Frame = 0, m_ht3Frame = 0, m_ko4Frame = 0, m_ht4Frame = 0;

function Advanced2D() {

    if (OK_2D) {
        if ($("#canvas").length > 0) {

            let home = MyGame.prototype.mzlive.m_match.getHomeTeam();
            let away = MyGame.prototype.mzlive.m_match.getAwayTeam();

            if (home != null && away != null) {

                let nl = matchLoader.matchXml.documentElement.evaluate('Periods/*');
                let p;
                while (p = nl.iterateNext()) {
                    if (p.getAttribute('name') == 'half1') {
                        m_koFrame = MyGame.prototype.mzlive.m_match.timeToFrame(p.getAttribute('start'));
                        m_htFrame = MyGame.prototype.mzlive.m_match.timeToFrame(p.getAttribute('end'));
                    }
                    else if (p.getAttribute('name') == 'half2') {
                        m_ko2Frame = MyGame.prototype.mzlive.m_match.timeToFrame(p.getAttribute('start'));
                        m_ht2Frame = MyGame.prototype.mzlive.m_match.timeToFrame(p.getAttribute('end'));
                    }
                    else if (p.getAttribute('name') == 'extra1') {
                        m_ko3Frame = MyGame.prototype.mzlive.m_match.timeToFrame(p.getAttribute('start'));
                        m_ht3Frame = MyGame.prototype.mzlive.m_match.timeToFrame(p.getAttribute('end'));
                    }
                    else if (p.getAttribute('name') == 'extra2') {
                        m_ko4Frame = MyGame.prototype.mzlive.m_match.timeToFrame(p.getAttribute('start'));
                        m_ht4Frame = MyGame.prototype.mzlive.m_match.timeToFrame(p.getAttribute('end'));
                    }
                }

                let players = matchLoader.matchXml.documentElement.evaluate('Player');
                let re1;
                dit_bypid = {};
                dit_player = {};
                while (re1 = players.iterateNext()) {
                    let ttt = {
                        internalId: re1.getAttribute('internalId'),
                        name: re1.getAttribute('name'),
                        shirtno: re1.getAttribute('shirtno'),
                        teamId: re1.getAttribute('teamId'),
                        origin: re1.getAttribute('origin')
                    };
                    dit_bypid[re1.getAttribute('id')] = ttt;
                    if (ttt.teamId == home.m_teamId) {
                        dit_player[ttt.internalId] = home.getPlayerByPlayerId(ttt.internalId);
                    } else {
                        dit_player[ttt.internalId] = away.getPlayerByPlayerId(ttt.internalId);
                    }
                }

                let events = matchLoader.matchXml.documentElement.evaluate('Events/*');

                let re, begin, end;

                let homeTc = new Array();
                let awayTc = new Array();


                out_of_play = new OutOfPlay();
                out_of_play.add(0, m_koFrame);
                out_of_play.add(m_htFrame, m_ko2Frame);
                if (m_ko3Frame > 0) {
                    out_of_play.add(m_ht2Frame, m_ko3Frame);
                }
                if (m_ko4Frame > 0) {
                    out_of_play.add(m_ht3Frame, m_ko4Frame);
                }
                while (re = events.iterateNext()) {
                    begin = re.getAttribute('intervalendframe');
                    end = re.getAttribute('startframe');
                    if (begin != undefined && end != undefined) {
                        out_of_play.add(begin, end);
                    }

                    //战术变动
                    if (re.tagName == 'Tactic') {
                        let t_teamid = re.getAttribute('teamId');
                        let t_time = re.getAttribute('time');
                        let t_type = re.getAttribute('type');
                        let t_new_setting = re.getAttribute('new_setting');
                        if (t_teamid == home.m_teamId) {
                            homeTc.push({
                                tag: 'Tactic',
                                m_frame: MyGame.prototype.mzlive.m_match.timeToFrame(t_time),
                                type: t_type,
                                new_setting: t_new_setting,
                                m_team: home
                            });
                        } else {
                            awayTc.push({
                                tag: 'Tactic',
                                m_frame: MyGame.prototype.mzlive.m_match.timeToFrame(t_time),
                                type: t_type,
                                new_setting: t_new_setting,
                                m_team: away
                            });
                        }
                    }
                    //换人
                    else if (re.tagName == 'Substitution') {
                        let t_time = re.getAttribute('time');
                        let t_clock = re.getAttribute('clock');
                        let t_frame = re.getAttribute('frame');
                        let t_playerId = re.getAttribute('playerId');
                        let t_teamId = re.getAttribute('teamId');
                        let t_substitutedId = re.getAttribute('substitutedId');
                        let t_reason = re.getAttribute('reason');
                        let t_minute = re.getAttribute('minute');
                        let t_scorecondition = re.getAttribute('scorecondition');
                        let t_score = re.getAttribute('score');

                        let t_player, t_sub_player;
                        let p5 = dit_bypid[t_playerId];
                        if (p5) {
                            t_player = dit_player[p5.internalId];
                        }
                        p5 = dit_bypid[t_substitutedId];
                        if (p5) {
                            t_sub_player = dit_player[p5.internalId];
                        }

                        if (t_teamId == home.m_teamId) {
                            homeTc.push({
                                tag: 'Sub',
                                m_frame: t_frame,
                                clock: t_clock,
                                player: t_player,
                                sub_player: t_sub_player,
                                reason: t_reason,
                                minute: t_minute,
                                scorecondition: t_scorecondition,
                                score: t_score,
                                m_team: home
                            });
                        } else {
                            awayTc.push({
                                tag: 'Sub',
                                m_frame: t_frame,
                                clock: t_clock,
                                player: t_player,
                                sub_player: t_sub_player,
                                reason: t_reason,
                                minute: t_minute,
                                scorecondition: t_scorecondition,
                                score: t_score,
                                m_team: away
                            });
                        }
                    }
                }
                out_of_play.Sort();




                let lstEventHome = new MatchEvent();
                let lstEventAway = new MatchEvent();
                lstEventHome.setAllPlayerEvent(home, homeTc);
                lstEventAway.setAllPlayerEvent(away, awayTc);

                lstEventHome.Sort();
                lstEventAway.Sort();

                mStaticEventHome = lstEventHome;
                mStaticEventAway = lstEventAway;

                let lstEvent2 = new MatchEvent2();
                lstEvent2.setData(MyGame.prototype.mzlive.m_match);
                mEvent = lstEvent2;

                console.log(dit_bypid);

                lstEvent2.tolog(MyGame.prototype.mzlive.m_match);

                if ($('.gw_div_left').length == 0) {
                    $('#canvas').parent().append('<div class="gw_div_left"></div>');
                    $('#canvas').parent().append('<div class="gw_div_right"></div>');
                    $('#canvas').parent().append(
                        '<div><b id="gw_jijing" class="gw_run" style="color: red;">' + now_language.Jijing + '</b>'
                        + '    <b id="gw_dongzuo" class="gw_run" style="color: red;">' + now_language.dongzuo + '</b>'
                        + '    <b id="gw_copyxml1" class="gw_run" style="color: red;">' + now_language.Copyxml1 + '</b>'
                        + '    <b id="gw_copyxml2" class="gw_run" style="color: red;">' + now_language.Copyxml2 + '</b>'
                        + '    <b id="gw_test" class="gw_run" style="color: red;">' + now_language.Test + '</b>'
                        + '</div>');

                    $('#gw_jijing')[0].addEventListener('click', function () {
                        ShowDiv(0);
                    });

                    $('#gw_dongzuo')[0].addEventListener('click', function () {
                        ShowDiv(1);
                    });

                    $('#gw_copyxml1')[0].addEventListener('click', function () {
                        CopyXML(true);

                    });
                    $('#gw_copyxml2')[0].addEventListener('click', function () {
                        CopyXML(false);
                    });
                    $('#gw_test')[0].addEventListener('click', function () {
                        //let pp = new PlayerPos();
                        ////let pids = {
                        ////    18: {}, 19: {}, 21: {}, length: 3
                        ////};
                        //let arr2 = [dit_bypid["199889186"].internalId, dit_bypid["200235263"].internalId, dit_bypid["199916602"].internalId];
                        //pp.setData(MyGame.prototype.mzlive.m_match, arr2);

                        drawGif();

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

        let team = MyGame.prototype.mzlive.m_match.getHomeTeam();
        $('.gw_div_left').append("<div><b>" +
            team.getTactics() + " " + team.getPlayStyle() + " " + team.getAggression()
            + "</b></div>");
        for (let i = 0; i < lstEventHome.data.length; i++) {
            if (lstEventHome.data[i].tag == "Tactic") {
                $('.gw_div_left').append('<div><b id="gw_eventH' + i + '" class="gw_run">'
                    + MyGame.prototype.mzlive.m_match.frameToMatchMinute(lstEventHome.data[i].m_frame) + "′ "
                    + lstEventHome.data[i].type + " -> "
                    + lstEventHome.data[i].new_setting + '</b></div>');
            } else if (lstEventHome.data[i].tag == "Sub") {
                $('.gw_div_left').append('<div><b id="gw_eventH' + i + '" class="gw_run">'
                    + MyGame.prototype.mzlive.m_match.frameToMatchMinute(lstEventHome.data[i].m_frame) + "′ "
                    + lstEventHome.data[i].player.m_name + "(" + lstEventHome.data[i].player.m_shirtNo + ")↑ "
                    + lstEventHome.data[i].sub_player.m_name + "(" + lstEventHome.data[i].sub_player.m_shirtNo + ")↓<br/>"
                    + lstEventHome.data[i].reason + lstEventHome.data[i].minute + "′[" + lstEventHome.data[i].scorecondition + " " + lstEventHome.data[i].score + "]"
                    + '</b></div>');

            } else {
                $('.gw_div_left').append('<div><b id="gw_eventH' + i + '" class="gw_run">'
                    + MyGame.prototype.mzlive.m_match.frameToMatchMinute(lstEventHome.data[i].m_frame) + "′ "
                    + lstEventHome.data[i].m_owner.m_name + "(" + lstEventHome.data[i].m_owner.m_shirtNo + ") "
                    + lstEventHome.data[i].m_description + '</b></div>');
            }

            let dom = $('#gw_eventH' + i)[0];
            dom.m_frame = lstEventHome.data[i].m_frame;
            dom.m_frame -= 45;
            if (dom.m_frame < 0) {
                dom.m_frame = 0;
            }
            dom.addEventListener('click', function () { MyGame.prototype.mzlive.m_match.setCurrentFrame(this.m_frame); });
        }

        team = MyGame.prototype.mzlive.m_match.getAwayTeam();
        $('.gw_div_right').append("<div><b>" +
            team.getTactics() + " " + team.getPlayStyle() + " " + team.getAggression()
            + "</b></div>");
        for (let i = 0; i < lstEventAway.data.length; i++) {
            if (lstEventAway.data[i].tag == "Tactic") {
                $('.gw_div_right').append('<div><b id="gw_eventA' + i + '" class="gw_run">'
                    + MyGame.prototype.mzlive.m_match.frameToMatchMinute(lstEventAway.data[i].m_frame) + "′ "
                    + lstEventAway.data[i].type + " -> "
                    + lstEventAway.data[i].new_setting + '</b></div>');
            } else if (lstEventAway.data[i].tag == "Sub") {
                $('.gw_div_right').append('<div><b id="gw_eventA' + i + '" class="gw_run">'
                    + MyGame.prototype.mzlive.m_match.frameToMatchMinute(lstEventAway.data[i].m_frame) + "′ "
                    + lstEventAway.data[i].player.m_name + "(" + lstEventAway.data[i].player.m_shirtNo + ")↑ "
                    + lstEventAway.data[i].sub_player.m_name + "(" + lstEventAway.data[i].sub_player.m_shirtNo + ")↓<br/>"
                    + lstEventAway.data[i].reason + lstEventAway.data[i].minute + "′[" + lstEventAway.data[i].scorecondition + " " + lstEventAway.data[i].score + "]"
                    + '</b></div>');
            } else {
                $('.gw_div_right').append('<div><b id="gw_eventA' + i + '" class="gw_run">'
                    + MyGame.prototype.mzlive.m_match.frameToMatchMinute(lstEventAway.data[i].m_frame) + "′ "
                    + lstEventAway.data[i].m_owner.m_name + "(" + lstEventAway.data[i].m_owner.m_shirtNo + ") "
                    + lstEventAway.data[i].m_description + '</b></div>');
            }
            let dom = $('#gw_eventA' + i)[0];
            dom.m_frame = lstEventAway.data[i].m_frame;
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
function CopyXML(ishome) {

    let xml_mode = GM_getValue("xml_mode", 0);
    if (xml_mode == 0) {
        getMax(function () {
            let tmpXML = Stats2XML(ishome, pmax);
            GM_setClipboard(tmpXML);
            alert(now_language.CopyXmlMsg);
        });
    } else {
        let tmpXML = Stats2XML(ishome);
        myAjax(
            "/?p=players",
            function (data2) {
                // 
                var myData = new FormData();
                myData.append("xml", "9" + base64js.fromByteArray(pako.gzip(tmpXML)));
                myData.append("html", data2);
                myData.append("tacConf", GM_getValue("TacConf", ""));
                GM_xmlhttpRequest({
                    method: "POST",
                    url: "http://www.budeng.win:852/MZ/TuneXMLByHtml",
                    data: myData,
                    responseType: "json",
                    onload: function (result) {
                        var dxml = JSON.parse(result.responseText);
                        if (dxml.ErrorCode == 0) {
                            GM_setClipboard(dxml.data);
                            alert(now_language.CopyXmlMsg);
                        } else {
                            alert(now_language.CopyXmlMsgError);
                        }
                    },
                    onerror: function (result) {
                        alert(now_language.CopyXmlMsgError);
                    }
                });
            }, false, true);
    }
}
function Stats2XML(ishome, players) {

    let team;
    if (ishome) {
        team = MyGame.prototype.mzlive.m_match.getHomeTeam();
    } else {
        team = MyGame.prototype.mzlive.m_match.getAwayTeam();
    }

    let pidArr = new Array();
    if (players) {
        for (let pid in players) {
            pidArr.push(pid);
        }
    }
    while (pidArr.length < 11) {
        pidArr.push(0);
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
    return tmpXML;
}
function drawGif() {
    var gif = new GIF({
        workers: 2,
        quality: 30,
        workerScript: blobURL,
        dither: "FloydSteinberg-serpentine"
    });

    gif.on('finished', function (blob) {
        window.open(URL.createObjectURL(blob));
    });
    gw_gif_currFrame = MyGame.prototype.mzlive.m_match.m_currFrame;
    gw_gif_frame = 45;
    gw_gif = gif;
}
var _open, _prepareTransferData, _centerPowerbox, _ajaxSubmit;
var finalInitAfterLoading, processButtonPresses, Load010SetupMainSceneInstance, ms_renderFrame;
let OK_2D = false;
var blobURL;
var gw_gif = false, gw_gif_frame = 0, gw_gif_currFrame = 0;
(function () {
    'use strict';

    var blob = new Blob(['(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module \'"+o+"\'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var NeuQuant=require("./TypedNeuQuant.js");var LZWEncoder=require("./LZWEncoder.js");function ByteArray(){this.page=-1;this.pages=[];this.newPage()}ByteArray.pageSize=4096;ByteArray.charMap={};for(var i=0;i<256;i++)ByteArray.charMap[i]=String.fromCharCode(i);ByteArray.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(ByteArray.pageSize);this.cursor=0};ByteArray.prototype.getData=function(){var rv="";for(var p=0;p<this.pages.length;p++){for(var i=0;i<ByteArray.pageSize;i++){rv+=ByteArray.charMap[this.pages[p][i]]}}return rv};ByteArray.prototype.writeByte=function(val){if(this.cursor>=ByteArray.pageSize)this.newPage();this.pages[this.page][this.cursor++]=val};ByteArray.prototype.writeUTFBytes=function(string){for(var l=string.length,i=0;i<l;i++)this.writeByte(string.charCodeAt(i))};ByteArray.prototype.writeBytes=function(array,offset,length){for(var l=length||array.length,i=offset||0;i<l;i++)this.writeByte(array[i])};function GIFEncoder(width,height){this.width=~~width;this.height=~~height;this.transparent=null;this.transIndex=0;this.repeat=-1;this.delay=0;this.image=null;this.pixels=null;this.indexedPixels=null;this.colorDepth=null;this.colorTab=null;this.neuQuant=null;this.usedEntry=new Array;this.palSize=7;this.dispose=-1;this.firstFrame=true;this.sample=10;this.dither=false;this.globalPalette=false;this.out=new ByteArray}GIFEncoder.prototype.setDelay=function(milliseconds){this.delay=Math.round(milliseconds/10)};GIFEncoder.prototype.setFrameRate=function(fps){this.delay=Math.round(100/fps)};GIFEncoder.prototype.setDispose=function(disposalCode){if(disposalCode>=0)this.dispose=disposalCode};GIFEncoder.prototype.setRepeat=function(repeat){this.repeat=repeat};GIFEncoder.prototype.setTransparent=function(color){this.transparent=color};GIFEncoder.prototype.addFrame=function(imageData){this.image=imageData;this.colorTab=this.globalPalette&&this.globalPalette.slice?this.globalPalette:null;this.getImagePixels();this.analyzePixels();if(this.globalPalette===true)this.globalPalette=this.colorTab;if(this.firstFrame){this.writeLSD();this.writePalette();if(this.repeat>=0){this.writeNetscapeExt()}}this.writeGraphicCtrlExt();this.writeImageDesc();if(!this.firstFrame&&!this.globalPalette)this.writePalette();this.writePixels();this.firstFrame=false};GIFEncoder.prototype.finish=function(){this.out.writeByte(59)};GIFEncoder.prototype.setQuality=function(quality){if(quality<1)quality=1;this.sample=quality};GIFEncoder.prototype.setDither=function(dither){if(dither===true)dither="FloydSteinberg";this.dither=dither};GIFEncoder.prototype.setGlobalPalette=function(palette){this.globalPalette=palette};GIFEncoder.prototype.getGlobalPalette=function(){return this.globalPalette&&this.globalPalette.slice&&this.globalPalette.slice(0)||this.globalPalette};GIFEncoder.prototype.writeHeader=function(){this.out.writeUTFBytes("GIF89a")};GIFEncoder.prototype.analyzePixels=function(){if(!this.colorTab){this.neuQuant=new NeuQuant(this.pixels,this.sample);this.neuQuant.buildColormap();this.colorTab=this.neuQuant.getColormap()}if(this.dither){this.ditherPixels(this.dither.replace("-serpentine",""),this.dither.match(/-serpentine/)!==null)}else{this.indexPixels()}this.pixels=null;this.colorDepth=8;this.palSize=7;if(this.transparent!==null){this.transIndex=this.findClosest(this.transparent,true)}};GIFEncoder.prototype.indexPixels=function(imgq){var nPix=this.pixels.length/3;this.indexedPixels=new Uint8Array(nPix);var k=0;for(var j=0;j<nPix;j++){var index=this.findClosestRGB(this.pixels[k++]&255,this.pixels[k++]&255,this.pixels[k++]&255);this.usedEntry[index]=true;this.indexedPixels[j]=index}};GIFEncoder.prototype.ditherPixels=function(kernel,serpentine){var kernels={FalseFloydSteinberg:[[3/8,1,0],[3/8,0,1],[2/8,1,1]],FloydSteinberg:[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]],Stucki:[[8/42,1,0],[4/42,2,0],[2/42,-2,1],[4/42,-1,1],[8/42,0,1],[4/42,1,1],[2/42,2,1],[1/42,-2,2],[2/42,-1,2],[4/42,0,2],[2/42,1,2],[1/42,2,2]],Atkinson:[[1/8,1,0],[1/8,2,0],[1/8,-1,1],[1/8,0,1],[1/8,1,1],[1/8,0,2]]};if(!kernel||!kernels[kernel]){throw"Unknown dithering kernel: "+kernel}var ds=kernels[kernel];var index=0,height=this.height,width=this.width,data=this.pixels;var direction=serpentine?-1:1;this.indexedPixels=new Uint8Array(this.pixels.length/3);for(var y=0;y<height;y++){if(serpentine)direction=direction*-1;for(var x=direction==1?0:width-1,xend=direction==1?width:0;x!==xend;x+=direction){index=y*width+x;var idx=index*3;var r1=data[idx];var g1=data[idx+1];var b1=data[idx+2];idx=this.findClosestRGB(r1,g1,b1);this.usedEntry[idx]=true;this.indexedPixels[index]=idx;idx*=3;var r2=this.colorTab[idx];var g2=this.colorTab[idx+1];var b2=this.colorTab[idx+2];var er=r1-r2;var eg=g1-g2;var eb=b1-b2;for(var i=direction==1?0:ds.length-1,end=direction==1?ds.length:0;i!==end;i+=direction){var x1=ds[i][1];var y1=ds[i][2];if(x1+x>=0&&x1+x<width&&y1+y>=0&&y1+y<height){var d=ds[i][0];idx=index+x1+y1*width;idx*=3;data[idx]=Math.max(0,Math.min(255,data[idx]+er*d));data[idx+1]=Math.max(0,Math.min(255,data[idx+1]+eg*d));data[idx+2]=Math.max(0,Math.min(255,data[idx+2]+eb*d))}}}}};GIFEncoder.prototype.findClosest=function(c,used){return this.findClosestRGB((c&16711680)>>16,(c&65280)>>8,c&255,used)};GIFEncoder.prototype.findClosestRGB=function(r,g,b,used){if(this.colorTab===null)return-1;if(this.neuQuant&&!used){return this.neuQuant.lookupRGB(r,g,b)}var c=b|g<<8|r<<16;var minpos=0;var dmin=256*256*256;var len=this.colorTab.length;for(var i=0,index=0;i<len;index++){var dr=r-(this.colorTab[i++]&255);var dg=g-(this.colorTab[i++]&255);var db=b-(this.colorTab[i++]&255);var d=dr*dr+dg*dg+db*db;if((!used||this.usedEntry[index])&&d<dmin){dmin=d;minpos=index}}return minpos};GIFEncoder.prototype.getImagePixels=function(){var w=this.width;var h=this.height;this.pixels=new Uint8Array(w*h*3);var data=this.image;var srcPos=0;var count=0;for(var i=0;i<h;i++){for(var j=0;j<w;j++){this.pixels[count++]=data[srcPos++];this.pixels[count++]=data[srcPos++];this.pixels[count++]=data[srcPos++];srcPos++}}};GIFEncoder.prototype.writeGraphicCtrlExt=function(){this.out.writeByte(33);this.out.writeByte(249);this.out.writeByte(4);var transp,disp;if(this.transparent===null){transp=0;disp=0}else{transp=1;disp=2}if(this.dispose>=0){disp=dispose&7}disp<<=2;this.out.writeByte(0|disp|0|transp);this.writeShort(this.delay);this.out.writeByte(this.transIndex);this.out.writeByte(0)};GIFEncoder.prototype.writeImageDesc=function(){this.out.writeByte(44);this.writeShort(0);this.writeShort(0);this.writeShort(this.width);this.writeShort(this.height);if(this.firstFrame||this.globalPalette){this.out.writeByte(0)}else{this.out.writeByte(128|0|0|0|this.palSize)}};GIFEncoder.prototype.writeLSD=function(){this.writeShort(this.width);this.writeShort(this.height);this.out.writeByte(128|112|0|this.palSize);this.out.writeByte(0);this.out.writeByte(0)};GIFEncoder.prototype.writeNetscapeExt=function(){this.out.writeByte(33);this.out.writeByte(255);this.out.writeByte(11);this.out.writeUTFBytes("NETSCAPE2.0");this.out.writeByte(3);this.out.writeByte(1);this.writeShort(this.repeat);this.out.writeByte(0)};GIFEncoder.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);var n=3*256-this.colorTab.length;for(var i=0;i<n;i++)this.out.writeByte(0)};GIFEncoder.prototype.writeShort=function(pValue){this.out.writeByte(pValue&255);this.out.writeByte(pValue>>8&255)};GIFEncoder.prototype.writePixels=function(){var enc=new LZWEncoder(this.width,this.height,this.indexedPixels,this.colorDepth);enc.encode(this.out)};GIFEncoder.prototype.stream=function(){return this.out};module.exports=GIFEncoder},{"./LZWEncoder.js":2,"./TypedNeuQuant.js":3}],2:[function(require,module,exports){var EOF=-1;var BITS=12;var HSIZE=5003;var masks=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function LZWEncoder(width,height,pixels,colorDepth){var initCodeSize=Math.max(2,colorDepth);var accum=new Uint8Array(256);var htab=new Int32Array(HSIZE);var codetab=new Int32Array(HSIZE);var cur_accum,cur_bits=0;var a_count;var free_ent=0;var maxcode;var clear_flg=false;var g_init_bits,ClearCode,EOFCode;function char_out(c,outs){accum[a_count++]=c;if(a_count>=254)flush_char(outs)}function cl_block(outs){cl_hash(HSIZE);free_ent=ClearCode+2;clear_flg=true;output(ClearCode,outs)}function cl_hash(hsize){for(var i=0;i<hsize;++i)htab[i]=-1}function compress(init_bits,outs){var fcode,c,i,ent,disp,hsize_reg,hshift;g_init_bits=init_bits;clear_flg=false;n_bits=g_init_bits;maxcode=MAXCODE(n_bits);ClearCode=1<<init_bits-1;EOFCode=ClearCode+1;free_ent=ClearCode+2;a_count=0;ent=nextPixel();hshift=0;for(fcode=HSIZE;fcode<65536;fcode*=2)++hshift;hshift=8-hshift;hsize_reg=HSIZE;cl_hash(hsize_reg);output(ClearCode,outs);outer_loop:while((c=nextPixel())!=EOF){fcode=(c<<BITS)+ent;i=c<<hshift^ent;if(htab[i]===fcode){ent=codetab[i];continue}else if(htab[i]>=0){disp=hsize_reg-i;if(i===0)disp=1;do{if((i-=disp)<0)i+=hsize_reg;if(htab[i]===fcode){ent=codetab[i];continue outer_loop}}while(htab[i]>=0)}output(ent,outs);ent=c;if(free_ent<1<<BITS){codetab[i]=free_ent++;htab[i]=fcode}else{cl_block(outs)}}output(ent,outs);output(EOFCode,outs)}function encode(outs){outs.writeByte(initCodeSize);remaining=width*height;curPixel=0;compress(initCodeSize+1,outs);outs.writeByte(0)}function flush_char(outs){if(a_count>0){outs.writeByte(a_count);outs.writeBytes(accum,0,a_count);a_count=0}}function MAXCODE(n_bits){return(1<<n_bits)-1}function nextPixel(){if(remaining===0)return EOF;--remaining;var pix=pixels[curPixel++];return pix&255}function output(code,outs){cur_accum&=masks[cur_bits];if(cur_bits>0)cur_accum|=code<<cur_bits;else cur_accum=code;cur_bits+=n_bits;while(cur_bits>=8){char_out(cur_accum&255,outs);cur_accum>>=8;cur_bits-=8}if(free_ent>maxcode||clear_flg){if(clear_flg){maxcode=MAXCODE(n_bits=g_init_bits);clear_flg=false}else{++n_bits;if(n_bits==BITS)maxcode=1<<BITS;else maxcode=MAXCODE(n_bits)}}if(code==EOFCode){while(cur_bits>0){char_out(cur_accum&255,outs);cur_accum>>=8;cur_bits-=8}flush_char(outs)}}this.encode=encode}module.exports=LZWEncoder},{}],3:[function(require,module,exports){var ncycles=100;var netsize=256;var maxnetpos=netsize-1;var netbiasshift=4;var intbiasshift=16;var intbias=1<<intbiasshift;var gammashift=10;var gamma=1<<gammashift;var betashift=10;var beta=intbias>>betashift;var betagamma=intbias<<gammashift-betashift;var initrad=netsize>>3;var radiusbiasshift=6;var radiusbias=1<<radiusbiasshift;var initradius=initrad*radiusbias;var radiusdec=30;var alphabiasshift=10;var initalpha=1<<alphabiasshift;var alphadec;var radbiasshift=8;var radbias=1<<radbiasshift;var alpharadbshift=alphabiasshift+radbiasshift;var alpharadbias=1<<alpharadbshift;var prime1=499;var prime2=491;var prime3=487;var prime4=503;var minpicturebytes=3*prime4;function NeuQuant(pixels,samplefac){var network;var netindex;var bias;var freq;var radpower;function init(){network=[];netindex=new Int32Array(256);bias=new Int32Array(netsize);freq=new Int32Array(netsize);radpower=new Int32Array(netsize>>3);var i,v;for(i=0;i<netsize;i++){v=(i<<netbiasshift+8)/netsize;network[i]=new Float64Array([v,v,v,0]);freq[i]=intbias/netsize;bias[i]=0}}function unbiasnet(){for(var i=0;i<netsize;i++){network[i][0]>>=netbiasshift;network[i][1]>>=netbiasshift;network[i][2]>>=netbiasshift;network[i][3]=i}}function altersingle(alpha,i,b,g,r){network[i][0]-=alpha*(network[i][0]-b)/initalpha;network[i][1]-=alpha*(network[i][1]-g)/initalpha;network[i][2]-=alpha*(network[i][2]-r)/initalpha}function alterneigh(radius,i,b,g,r){var lo=Math.abs(i-radius);var hi=Math.min(i+radius,netsize);var j=i+1;var k=i-1;var m=1;var p,a;while(j<hi||k>lo){a=radpower[m++];if(j<hi){p=network[j++];p[0]-=a*(p[0]-b)/alpharadbias;p[1]-=a*(p[1]-g)/alpharadbias;p[2]-=a*(p[2]-r)/alpharadbias}if(k>lo){p=network[k--];p[0]-=a*(p[0]-b)/alpharadbias;p[1]-=a*(p[1]-g)/alpharadbias;p[2]-=a*(p[2]-r)/alpharadbias}}}function contest(b,g,r){var bestd=~(1<<31);var bestbiasd=bestd;var bestpos=-1;var bestbiaspos=bestpos;var i,n,dist,biasdist,betafreq;for(i=0;i<netsize;i++){n=network[i];dist=Math.abs(n[0]-b)+Math.abs(n[1]-g)+Math.abs(n[2]-r);if(dist<bestd){bestd=dist;bestpos=i}biasdist=dist-(bias[i]>>intbiasshift-netbiasshift);if(biasdist<bestbiasd){bestbiasd=biasdist;bestbiaspos=i}betafreq=freq[i]>>betashift;freq[i]-=betafreq;bias[i]+=betafreq<<gammashift}freq[bestpos]+=beta;bias[bestpos]-=betagamma;return bestbiaspos}function inxbuild(){var i,j,p,q,smallpos,smallval,previouscol=0,startpos=0;for(i=0;i<netsize;i++){p=network[i];smallpos=i;smallval=p[1];for(j=i+1;j<netsize;j++){q=network[j];if(q[1]<smallval){smallpos=j;smallval=q[1]}}q=network[smallpos];if(i!=smallpos){j=q[0];q[0]=p[0];p[0]=j;j=q[1];q[1]=p[1];p[1]=j;j=q[2];q[2]=p[2];p[2]=j;j=q[3];q[3]=p[3];p[3]=j}if(smallval!=previouscol){netindex[previouscol]=startpos+i>>1;for(j=previouscol+1;j<smallval;j++)netindex[j]=i;previouscol=smallval;startpos=i}}netindex[previouscol]=startpos+maxnetpos>>1;for(j=previouscol+1;j<256;j++)netindex[j]=maxnetpos}function inxsearch(b,g,r){var a,p,dist;var bestd=1e3;var best=-1;var i=netindex[g];var j=i-1;while(i<netsize||j>=0){if(i<netsize){p=network[i];dist=p[1]-g;if(dist>=bestd)i=netsize;else{i++;if(dist<0)dist=-dist;a=p[0]-b;if(a<0)a=-a;dist+=a;if(dist<bestd){a=p[2]-r;if(a<0)a=-a;dist+=a;if(dist<bestd){bestd=dist;best=p[3]}}}}if(j>=0){p=network[j];dist=g-p[1];if(dist>=bestd)j=-1;else{j--;if(dist<0)dist=-dist;a=p[0]-b;if(a<0)a=-a;dist+=a;if(dist<bestd){a=p[2]-r;if(a<0)a=-a;dist+=a;if(dist<bestd){bestd=dist;best=p[3]}}}}}return best}function learn(){var i;var lengthcount=pixels.length;var alphadec=30+(samplefac-1)/3;var samplepixels=lengthcount/(3*samplefac);var delta=~~(samplepixels/ncycles);var alpha=initalpha;var radius=initradius;var rad=radius>>radiusbiasshift;if(rad<=1)rad=0;for(i=0;i<rad;i++)radpower[i]=alpha*((rad*rad-i*i)*radbias/(rad*rad));var step;if(lengthcount<minpicturebytes){samplefac=1;step=3}else if(lengthcount%prime1!==0){step=3*prime1}else if(lengthcount%prime2!==0){step=3*prime2}else if(lengthcount%prime3!==0){step=3*prime3}else{step=3*prime4}var b,g,r,j;var pix=0;i=0;while(i<samplepixels){b=(pixels[pix]&255)<<netbiasshift;g=(pixels[pix+1]&255)<<netbiasshift;r=(pixels[pix+2]&255)<<netbiasshift;j=contest(b,g,r);altersingle(alpha,j,b,g,r);if(rad!==0)alterneigh(rad,j,b,g,r);pix+=step;if(pix>=lengthcount)pix-=lengthcount;i++;if(delta===0)delta=1;if(i%delta===0){alpha-=alpha/alphadec;radius-=radius/radiusdec;rad=radius>>radiusbiasshift;if(rad<=1)rad=0;for(j=0;j<rad;j++)radpower[j]=alpha*((rad*rad-j*j)*radbias/(rad*rad))}}}function buildColormap(){init();learn();unbiasnet();inxbuild()}this.buildColormap=buildColormap;function getColormap(){var map=[];var index=[];for(var i=0;i<netsize;i++)index[network[i][3]]=i;var k=0;for(var l=0;l<netsize;l++){var j=index[l];map[k++]=network[j][0];map[k++]=network[j][1];map[k++]=network[j][2]}return map}this.getColormap=getColormap;this.lookupRGB=inxsearch}module.exports=NeuQuant},{}],4:[function(require,module,exports){var GIFEncoder,renderFrame;GIFEncoder=require("./GIFEncoder.js");renderFrame=function(frame){var encoder,page,stream,transfer;encoder=new GIFEncoder(frame.width,frame.height);if(frame.index===0){encoder.writeHeader()}else{encoder.firstFrame=false}encoder.setTransparent(frame.transparent);encoder.setRepeat(frame.repeat);encoder.setDelay(frame.delay);encoder.setQuality(frame.quality);encoder.setDither(frame.dither);encoder.setGlobalPalette(frame.globalPalette);encoder.addFrame(frame.data);if(frame.last){encoder.finish()}if(frame.globalPalette===true){frame.globalPalette=encoder.getGlobalPalette()}stream=encoder.stream();frame.data=stream.pages;frame.cursor=stream.cursor;frame.pageSize=stream.constructor.pageSize;if(frame.canTransfer){transfer=function(){var i,len,ref,results;ref=frame.data;results=[];for(i=0,len=ref.length;i<len;i++){page=ref[i];results.push(page.buffer)}return results}();return self.postMessage(frame,transfer)}else{return self.postMessage(frame)}};self.onmessage=function(event){return renderFrame(event.data)}},{"./GIFEncoder.js":1}]},{},[4]);']);

    // Obtain a blob URL reference to our worker 'file'.
    blobURL = window.URL.createObjectURL(blob);


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
                    if (!MyGame.prototype.mzlive.m_ms.R_renderFrame) {
                        ms_renderFrame = MyGame.prototype.mzlive.m_ms.renderFrame;
                        MyGame.prototype.mzlive.m_ms.renderFrame = function () {
                            ms_renderFrame.apply(this);
                            if (gw_gif && gw_gif_currFrame != MyGame.prototype.mzlive.m_match.m_currFrame) {
                                gw_gif_currFrame = MyGame.prototype.mzlive.m_match.m_currFrame;

                                gw_gif.addFrame(ig.system.canvas, { copy: true, delay: 1 });
                                gw_gif_frame--;
                                if (gw_gif_frame <= 0) {
                                    gw_gif.render();
                                    gw_gif = false;
                                }
                            }
                        };
                        MyGame.prototype.mzlive.m_ms.R_renderFrame = true;
                    }
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

    if (unsafeWindow.prepareTransferData != undefined) {
        _prepareTransferData = unsafeWindow.prepareTransferData;
        unsafeWindow.prepareTransferData = function (readyState, response, responseParameter) {

            _prepareTransferData.apply(this, arguments);
            if (GM_getValue("autoRun", 0) == 1) {
                if (typeof (responseParameter) === "undefined" || !responseParameter) {
                    gw_start(0);
                }
            }
        };
    }

    if (unsafeWindow.centerPowerbox != undefined) {
        _centerPowerbox = unsafeWindow.centerPowerbox;
        unsafeWindow.centerPowerbox = function () {

            _centerPowerbox.apply(this, arguments);
            if (GM_getValue("autoRun", 0) == 1) {
                gw_start(0);
            }
        };
    }

    if ($.fn.ajaxSubmit != undefined) {
        _ajaxSubmit = $.fn.ajaxSubmit;
        $.fn.ajaxSubmit = function (options) {
            if (options.gm_success_is == undefined) {
                options.gm_success_is = true;
                options.gm_success = options.success;
                options.success = function () {
                    options.gm_success.apply(this, arguments);
                    if (GM_getValue("autoRun", 0) == 1) {
                        gw_start(0);
                    }
                };
            }
            _ajaxSubmit.apply(this, arguments);
        };
    }


    gw_start(0);
    report();
    autoclearCache();
})();
