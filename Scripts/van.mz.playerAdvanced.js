// ==UserScript==
// @name         van.mz.playerAdvanced
// @namespace    van
// @version      3.36
// @description  Player display optimization 球员着色插件
// @author       van
// @match        https://www.managerzone.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @connect      www.budeng.win
// @require      https://cdn.jsdelivr.net/pako/1.0.5/pako.min.js
// @require      https://cdn.jsdelivr.net/gh/vanjoge/MZExtension/Scripts/base64js.min.js
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


        ,

        sug_T0: "首选:",
        sug_T1: "次选:",
        sug_T2: "可尝试:",
        sug_T3: "默认:",

        Pos9: "后卫",
        Pos7: "门将",
        Pos10: "边锋",
        Pos5: "前锋",
        Pos4: "中场",
        Pos56: "中锋",

        sug_Loser: "关键属性容易早死，尽早交换或开除。",

        sug_PRI: "训练顺序:",
        attrName1: "速度",
        attrName2: "耐力",
        attrName3: "意识",
        attrName4: "传球",
        attrName5: "射门",
        attrName6: "头球",
        attrName7: "守门",
        attrName8: "控球",
        attrName9: "抢断",
        attrName10: "传中",
        attrName11: "定位"

        ,
        scoutReport: "球探报告"

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



        ,
        sug_T0: "First plan:",
        sug_T1: "Second plan:",
        sug_T2: "May try:",
        sug_T3: "Default:",

        Pos9: "CB",
        Pos7: "GK",
        Pos10: "WF",
        Pos5: "ST",
        Pos4: "MF",
        Pos56: "CF",

        sug_Loser: "Key skills too low.Exchange or dismiss as soon as possible.",

        sug_PRI: "Training order:",
        attrName1: "Speed",
        attrName2: "Stamina",
        attrName3: "Play Intelligence",
        attrName4: "Passing",
        attrName5: "Shooting",
        attrName6: "Heading",
        attrName7: "Keeping",
        attrName8: "Ball Control",
        attrName9: "Tackling",
        attrName10: "Aerial Passing",
        attrName11: "Set Plays"
        ,
        scoutReport: "Scout Report"
    }

    ,
    es: {
        Name: "Español",
        Save: "Guardar",
        Setting: "Ajustes",
        Test: "Test",
        SettingTitle: "Haga clic en configuración Idioma",
        Language: "Idioma",

        XmlMode: "Tactical Export Model",
        XmlMode1: "Secuencia de selección",
        XmlMode2: "Elegir por locación (necesita suministrar datos al servidor)",
        TacConf: "Tactical Coefficient Setting",
        AutoRun: "Auto Coloreable",
        AutoRun0: "Por página cargada (sólo una vez)",
        AutoRun1: "Por recargar MZ",

        NotSureEx: "Las skills pueden cambiar después de ingresar al mercado. <br/> Cambiar hora ",
        NotSure: "Skill incierta",
        ManualColorTitle: "Haga clic en la skill para colorear. Acceso directo: ALT + A",
        ManualColor: "Color de la skill",
        Jijing: "Eventos",
        dongzuo: "PlayerStatus",
        Copyxml1: "CopiarXML(local)",
        Copyxml2: "CopiarXML(visitante)",
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
        BA_PICK_UP_BALL: "Toma la pelota",
        BA_DROP_BALL: "Tira la pelota al césped",
        BA_HEADER: "Cabezazo",
        BA_TRIP: "Trip",
        BA_CELEBRATE: "Celebración",
        BA_GK_READY: "Arquero preparado",
        BA_GK_ACRO_LEFT: "GkAcroLeft",
        BA_GK_ACRO_LEFT_HOLD: "GkAcroLeftHold",
        BA_GK_ACRO_RIGHT: "GkAcroRight",
        BA_GK_ACRO_RIGHT_HOLD: "GkAcroRightHold",
        BA_GK_SIDESTEP_LEFT: "Arquero da un paso a la izquierda",
        BA_GK_SIDESTEP_RIGHT: "Arquero da un paso a la derecha",
        BA_GK_KICK: "Arquero da una patada",
        BA_GK_THROW_BALL: "GkThrowBall",
        BA_GK_STRETCH_LEFT: "GkStretchLeft",
        BA_GK_STRETCH_LEFT_HOLD: "GkStretchLeftHold",
        BA_GK_STRETCH_RIGHT: "GkStretchRight",
        BA_GK_STRETCH_RIGHT_HOLD: "GkStretchRightHold",
        BA_BALL_OWNER: "Con la pelota en los pies",
        BA_TACKLE: "Entrada",
        BA_SLIDING_TACKLE: "Barrida",
        BA_SLIDING_TACKLE_STAND: "SlidingTackleStand",
        BA_MAX: "Max",
        BA_MY_1001: "HeadGoal(L)",
        BA_MY_1002: "HeadGoal(R)",
        BA_MY_1003: "Frena la pelota",
        BA_MY_1011: "Entrada(acertada)",
        BA_MY_1012: "Entrada(fallida)",
        Unknown: "Desconocido"


        ,
        training_pos: "Sin entrenador",
        training_camp: "CAMP",
        training_coach: "Coach",
        training_ycc: "YCC",
        training_itc: "ITC",
        training_neg: "Neg",
        training_unit: "↑",
        training_unknown: "Entrenamiento desconocido",
        training_ball_day: "Días para ganar una pelotita",
        training_part: "Eficacia de entrenamiento",
        training_total: "Total",
        training_avg: "Avg",
        training_now: "Ahora",
        SkillsAnalysisTitle: "Skills y análisis de eficacia de entrenamiento coloreables al presionar: ALT + S",
        SkillsAnalysis: "Coloreable por gráficos"


        ,
        sug_T0: "Primera opción:",
        sug_T1: "Segunda opción:",
        sug_T2: "Podrías intentar:",
        sug_T3: "Predeterminado:",

        Pos9: "Centro defensor",
        Pos7: "Arquero",
        Pos10: "Delantero lateral",
        Pos5: "Segundo delantero",
        Pos4: "Centrocampista",
        Pos56: "Miediocampista/Anchor",

        sug_Loser: "Habilidades clave demasiado bajas. Intercambialo lo más antes posible.",

        sug_PRI: "Orden de entrenamiento:",
        attrName1: "Velocidad",
        attrName2: "Resistencia",
        attrName3: "Inteligencia",
        attrName4: "Pases",
        attrName5: "Remates",
        attrName6: "Cabezazos",
        attrName7: "Atajando",
        attrName8: "Control de balón",
        attrName9: "Entradas",
        attrName10: "Pases Largos",
        attrName11: "Balón Parado"
        ,
        scoutReport: "REPORTE DE SCOUTEO"
    }
    ,
    br: {
        Name: "Português",
        Save: "Salvar",
        Setting: "Configurações",
        Test: "Teste",
        SettingTitle: "Clique para configurar linguagem",
        Language: "Linguagem",
        XmlMode: "Exportar Modelo Tático",
        XmlMode1: "Seleção Sequencial",
        XmlMode2: "Escolha localização (precisa submeter dados ao servidor)",
        TacConf: "Configuração de Coeficiente Tático",
        AutoRun: "Auto Colorir",
        AutoRun0: "Por página carregada(Uma vez)",
        AutoRun1: "Recarregada do MZ",

        NotSureEx: "Habilidades podem mudar depois de entrar no mercado de transferências.<br/>Hora da mudança ",
        NotSure: "Habilidade incerta",
        ManualColorTitle: "Clique na habilidade colorida. Tecla de atalho: ALT + A",
        ManualColor: "Habilidade colorida",
        Jijing: "Eventos",
        dongzuo: "Status do jogador",
        Copyxml1: "Copiar XML(mandante)",
        Copyxml2: "Copiar XML(visitante)",
        CopyXmlMsg: "A tática foi copiada para a área de transferências!",
        CopyXmlMsgError: "Erro na cópia!",
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
        BA_PICK_UP_BALL: "Pega a bola",
        BA_DROP_BALL: "Deixa a bola",
        BA_HEADER: "Cabeceio",
        BA_TRIP: "Trip",
        BA_CELEBRATE: "Celebração",
        BA_GK_READY: "Goleiro pronto",
        BA_GK_ACRO_LEFT: "GkAcroLeft",
        BA_GK_ACRO_LEFT_HOLD: "GkAcroLeftHold",
        BA_GK_ACRO_RIGHT: "GkAcroRight",
        BA_GK_ACRO_RIGHT_HOLD: "GkAcroRightHold",
        BA_GK_SIDESTEP_LEFT: "Goleiro dá passo à esquerda",
        BA_GK_SIDESTEP_RIGHT: "Goleiro dá passo à direita",
        BA_GK_KICK: "Goleiro chuta",
        BA_GK_THROW_BALL: "GkThrowBall",
        BA_GK_STRETCH_LEFT: "GkStretchLeft",
        BA_GK_STRETCH_LEFT_HOLD: "GkStretchLeftHold",
        BA_GK_STRETCH_RIGHT: "GkStretchRight",
        BA_GK_STRETCH_RIGHT_HOLD: "GkStretchRightHold",
        BA_BALL_OWNER: "Com a bola nos pés",
        BA_TACKLE: "Desarme",
        BA_SLIDING_TACKLE: "Carrinho",
        BA_SLIDING_TACKLE_STAND: "SlidingTackleStand",
        BA_MAX: "Max",
        BA_MY_1001: "HeadGoal(L)",
        BA_MY_1002: "HeadGoal(R)",
        BA_MY_1003: "Pára a bola",
        BA_MY_1011: "Desarme(Sucesso)",
        BA_MY_1012: "Desarme(Falha)",
        Unknown: "Desconhecido"



        ,
        training_pos: "Sem treinador",
        training_camp: "CAMP",
        training_coach: "Coach",
        training_ycc: "Ycc",
        training_itc: "Itc",
        training_neg: "Neg",
        training_unit: "↑",
        training_unknown: "Treinamento desconhecido",
        training_ball_day: "Dias para ganhar bola",
        training_part: "Eficiência de treinamento",
        training_total: "Total",
        training_avg: "Avg",
        training_now: "Agora",
        SkillsAnalysisTitle: "Tecla de atalho de Habilidades coloridas e Análise de Eficiência de treinamento: ALT + S",
        SkillsAnalysis: "Colorir por gráficos"



        ,
        sug_T0: "Primeira opção:",
        sug_T1: "Segunda opção:",
        sug_T2: "Pode tentar:",
        sug_T3: "Padrão:",

        Pos9: "Zagueiro central",
        Pos7: "Goleiro",
        Pos10: "Ponta",
        Pos5: "Segundo atacante",
        Pos4: "Meia Central",
        Pos56: "Meio-campo/Volante",

        sug_Loser: "Habilidades principais muito baixas. Troque ou dispense o mais breve possível.",

        sug_PRI: "Ordem de treinamento:",
        attrName1: "Velocidade",
        attrName2: "Resistência",
        attrName3: "Inteligência",
        attrName4: "Passe Curto",
        attrName5: "Chute",
        attrName6: "Cabeceio",
        attrName7: "Defesa a Gol",
        attrName8: "Controle de Bola",
        attrName9: "Desarme",
        attrName10: "Passe Longo",
        attrName11: "Bola Parada"
        ,
        scoutReport: "Relatório de Observador"
    }
};
var now_language = gm_mzlanguage.en;
var scoutLocList = { "9": { "Prop": { "1": 0, "2": 0, "9": 1, "10": 2, "8": 2, "3": 2, "4": 2, "6": 2 }, "Order": [1, 2, 9, 10, 8, 3, 4, 6], "CampKey": "9" }, "7": { "Prop": { "2": 0, "7": 1, "3": 1, "1": 1, "10": 2, "11": 2, "8": 2 }, "Order": [2, 7, 3, 1, 10, 11, 8], "CampKey": "7" }, "10": { "Prop": { "1": 0, "2": 0, "10": 1, "8": 1, "9": 2, "4": 2, "5": 2, "6": 2 }, "Order": [1, 2, 10, 8, 9, 4, 5, 6], "CampKey": "10" }, "5": { "Prop": { "1": 0, "2": 0, "5": 1, "8": 1, "6": 1, "3": 2, "4": 2, "10": 2, "9": 2 }, "Order": [1, 2, 5, 8, 6, 3, 4, 10, 9], "CampKey": "5" }, "4": { "Prop": { "1": 0, "2": 0, "4": 1, "8": 1, "3": 1, "10": 2, "9": 2, "5": 2, "6": 2 }, "Order": [1, 2, 4, 8, 3, 10, 9, 5, 6], "CampKey": "4" }, "5,6": { "Prop": { "2": 0, "1": 0, "5": 1, "6": 1, "8": 1, "3": 2, "4": 2, "10": 2, "9": 2 }, "Order": [2, 1, 5, 8, 6, 3, 4, 10, 9], "CampKey": "56" } };
var OKeys = ["9", "7", "10", "5", "4", "5,6"];
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
        let rv = this.getVal(i);
        rv = Math.floor(rv * 214 / 1000) - 3;
        return rv;
    };
    this.GetY = function (i) {
        let rv = this.getVal(i);
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
    img_val: /(\d+)\.gif/,
    playerMax: /trainingField.players\s*=\s*({.+})/,
    playerId: /player_id_(\d+)/,
    bar_itc: /bar_itc_(\d+)/,
    bar_ycc: /bar_ycc_(\d+)/,
    bar_pos: /bar_pos_(\d+)/,
    bar_neg: /bar_neg_(\d+)/,
    trainingType: /&t=([^)]+)/,
    data2d_url: /matchviewer\/media/,
    shortlist_url: /\/?p=shortlist/,
    ruok_url: /\/?p=team&tid=572357/,
    playerId_tac: /pid=(\d+)/,
    matchResult: /\/?p=match&sub=result&mid=(\d+)/
    //data2d_url: /matchviewer\/getMatchFiles.php\?type=data&mid=\d+/
};
var mzImg = {
    g: "data:image/gif;base64,R0lGODlhDAAKAJEDAP///8zM/wAA/////yH5BAEAAAMALAAAAAAMAAoAAAIk3CIpYZ0BABJtxvjMgojTIVwKpl0dCQbQJX3T+jpLNDXGlDUFADs=",
    r: "data:image/gif;base64,R0lGODlhDAAKAJEDAP////8AAMyZmf///yH5BAEAAAMALAAAAAAMAAoAAAIk3BQZYp0CAAptxvjMgojTEVwKpl0dCQrQJX3T+jpLNDXGlDUFADs=",
    b: "data:image/gif;base64,R0lGODlhDAAKAJEDAP///5mZmQAAAP///yH5BAEAAAMALAAAAAAMAAoAAAIk3CIpYZ0BABJtxvjMgojTIVwKpl0dCQbQJX3T+jpLNDXGlDUFADs=",
    p: "data:image/gif;base64,R0lGODlhDAAKAJEDAP///5lm/5kzzP///yH5BAEAAAMALAAAAAAMAAoAAAIk3CIpYZ0BABJtxvjMgojTIVwKpl0dCQbQJX3T+jpLNDXGlDUFADs=",
    x: "data:image/gif;base64,R0lGODlhBgAKAJEDAJnMZpmZmQAAAP///yH5BAEAAAMALAAAAAAGAAoAAAIRXCRhApAMgoPtVXXS2Lz73xUAOw=="
};
var pmax = {};
var isAjaxing = false;
var trainingInfo = {};
function clearCache(maxcount) {
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

function myAjax(url, callback, cache_mode, Cjson) {
    if (cache_mode == undefined) {
        cache_mode = 2;
        //0 不缓存每次都获取 1 缓存永不刷新 2 缓存每日刷新
    }
    if (cache_mode > 0) {
        let b64 = getLocValue(url, cache_mode);
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
        }
    });

}
function getLocValue(key, cache_mode) {
    if (cache_mode == 1) {
        let b64 = GM_getValue(key, false);
        if (b64) {
            return b64;
        }
        return false;
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
}
function setLocValue(key, val) {
    GM_setValue("Dt_" + key, new Date().getTime());
    GM_setValue(key, val);
}
function clearCacheItem(key) {
    GM_deleteValue("Dt_" + key);
    GM_deleteValue(key);
}
function getMax(callback) {
    myAjax(
        "/?p=training",
        function (data) {
            let result = data.match(mzreg.playerMax);
            if (result) {
                pmax = JSON.parse(result[1]);
                callback(pmax);
            } else {
                return true;
            }

        });
    return false;
}
function setSrc(transfer, img, skill, maxed, skillBallDay, pid, k) {
    img.skill = skill;
    img.maxed = maxed;
    if (skill > 0) {
        let flag_exit = false;
        if (transfer && skillBallDay) {
            if (new Date().getTime() - skillBallDay < 345600000) {

                getTrainingGraphsBySkill_id(pid, k, function (data) {
                    let result = data.match(new RegExp('{"x":' + skillBallDay + ',"y":(\\d+),[^}]*"marker"'));
                    if (result && result.length) {
                        $(img).parent().parent().find("td.skillval").html("(" + result[1] + ")");
                        setSrc(false, img, parseInt(result[1]), maxed, false, pid, k);
                        flag_exit = true;
                        return true;
                    } else {
                        return false;
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

        if (img.isYtc) {
            $(img).parent().parent().children().eq(0).addClass("gm_ytc");
        }
    }
    let strdiv = "<div class='skill' style='font-size:0;padding: 0 0 0 4px;'>";
    for (let i = 0; i < skill; i++) {
        if (maxed === "red") {
            strdiv += "<img src='" + mzImg.r + "'>";
        }
        else if (maxed === "green") {
            strdiv += "<img src='" + mzImg.g + "'>";
        } else {
            strdiv += "<img src='" + mzImg.b + "'>";
        }
    }
    if (/blevel_/.test(img.src)) {
        strdiv += "<img src='" + mzImg.x + "'>";
    }
    strdiv += "</div>";
    $(img).hide();

    $(img).parent().find("div").remove();
    $(img).after(strdiv);
}
function showMax(GraphsType) {
    let players = $(".playerContainer");
    for (let i = 0; i < players.length; i++) {
        let pdom = players.eq(i);
        let pid = pdom.html().match(mzreg.playerId)[1];
        let player = pmax[pid];
        let imgs = pdom.find("img.skill");

        if (GraphsType == 0 && player) {
            if (isNaN(parseInt(player.skills.speed))) {
                for (let j = 0; j < imgs.length; j++) {
                    setSrc(false, imgs[j], parseInt(imgs[j].src.match(mzreg.img_val)[1]), "");
                }
            } else {
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
            }
            if (pdom.find(".scout_report").length > 0) {
                getScoutReport(pid, pdom);
            }
        } else if (pdom.find(".training_graphs").length > 0 && imgs.length > 0) {
            if (pdom.find(".scout_report").length > 0) {
                getScoutReport(pid, pdom);
            }
            getTrainingGraphs(pid, pdom, GraphsType);
        } else if (pdom.find(".scout_report").length > 0) {
            for (let j = 0; j < imgs.length; j++) {
                setSrc(false, imgs[j], parseInt(imgs[j].src.match(mzreg.img_val)[1]), "");
            }
            getScoutReport(pid, pdom, GraphsType == 2);
        }
    }
    return false;
}
function drawPlayerByTrainingGraphs(pid, data, pdom) {
    let imgs = pdom.find("img.skill");
    var series = undefined;
    eval(data);
    if (series == undefined) {
        return false;
    }
    let maxeds = ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green"];
    let skillBallDays = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let allSkillTraining_tmp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let camp = new mzcamp();
    for (let i = 0; i < series.length; i++) {
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
            for (let j = 0; j < series[i].data.length; j++) {
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
    for (let t1 = 0; t1 < allSkillTraining_tmp.length; t1++) {
        if (imgs[t1].nowSkill == undefined) {
            imgs[t1].nowSkill = parseInt(imgs[t1].src.match(mzreg.img_val)[1]);;
        }
        let tmp = {};
        for (let t2 = 0; t2 < allSkillTraining_tmp[t1].length; t2++) {
            let tmp2 = allSkillTraining_tmp[t1][t2];
            if (tmp2.stat.getSum() != 0) {
                tmp2.skill = imgs[t1].nowSkill + 1 - allSkillTraining_tmp[t1].length + t2;
                tmp[tmp2.skill] = tmp2;
            }
        }
        allSkillTraining[t1] = tmp;
    }
    trainingInfo[pid] = allSkillTraining;
    for (let k = 0; k < maxeds.length; k++) {
        setSrc($(".player_share_skills").length == 0, imgs[k], imgs[k].nowSkill, maxeds[k], skillBallDays[k], pid, k);
    }

    series = undefined;
    plotBands = undefined;
    xPlotLines = undefined;
    return true;
}
function fillTrainingLevel(type, reg, playerTS, url, isneg) {
    let result = url.match(reg);
    if (result && result.length > 0) {
        let stat = playerTS.stat;
        if (isneg) {
            stat.add(type, "t" + result[1]);
        } else {
            stat.add("all", "t" + result[1]);
            stat.add(type, "t" + result[1]);
        }
    }
}

function getScoutReport(pid, pdom, showMB) {
    let url = "/ajax.php?p=players&sub=scout_report&pid=" + pid + "&sport=soccer";
    let cache_mode = 1;
    if (pdom.find("#discard_youth_button").length) {
        url = "/ajax.php?p=players&sub=scout_report&pid=null&sport=soccer";
        cache_mode = 0;
    }
    myAjax(
        url,
        function (data) {
            let srdom = $($.parseHTML(data));
            let remark = srdom.find("span.blurred span").text();
            let srdivs = srdom.find("dd div.flex-grow-1");
            if (srdivs.length == 3) {
                let HS = srdivs.eq(0).find(".lit").length;
                let LS = srdivs.eq(1).find(".lit").length;
                let SS = srdivs.eq(2).find(".lit").length;
                //Trzxyvopaxis
                let Hspan = srdivs.eq(0).find(".blurred span");
                let HArr = new Array();
                for (let i = 0; i < Hspan.length; i++) {
                    if (Hspan.eq(i).text() != "Trzxyvopaxis") {
                        HArr.push(Hspan.eq(i).text());
                    }
                }
                let Lspan = srdivs.eq(1).find(".blurred span");
                let LArr = new Array();
                for (let i = 0; i < Lspan.length; i++) {
                    if (Lspan.eq(i).text() != "Trzxyvopaxis") {
                        LArr.push(Lspan.eq(i).text());
                    }
                }

                let HPids = [], LPids = [];

                let skillnames = pdom.find("td > span.clippable");
                for (let i = 0; i < skillnames.length; i++) {
                    if (HArr.indexOf(skillnames.eq(i).text()) >= 0) {
                        skillnames.eq(i).parent().addClass("gm_scout_h");
                        skillnames.eq(i).parent().addClass("gm_s" + HS);
                        HPids.push(i + 1);
                    } else if (LArr.indexOf(skillnames.eq(i).text()) >= 0) {
                        skillnames.eq(i).parent().removeClass("gm_scout_h");
                        skillnames.eq(i).parent().addClass("gm_s" + LS);
                        LPids.push(i + 1);
                    }
                    //else {
                    //    skillnames.eq(i).parent().removeClass("gm_scout_h");
                    //    skillnames.eq(i).parent().removeClass("gm_s*");
                    //}
                }

                $("#GM_scout_" + pid).remove();
                let nsavgstat = "<span id='GM_scout_" + pid + "'>[H" + HS + " " + HArr[0] + "," + HArr[1] + "] [L" + LS + " " + LArr[0] + "," + LArr[1] + "] S" + SS;
                nsavgstat += "</span>";
                nsavgstat = $(nsavgstat)[0];
                nsavgstat.addEventListener('click', function () {
                    let strSus = remark;
                    if (IsLoser(HS, LS, LPids[0], LPids[1])) {
                        strSus += "<br/><br/>" + now_language.sug_Loser;
                    }
                    let plans = getTrainPlans(HPids[0], HPids[1], LPids[0], LPids[1]);
                    for (let j = 0; j < plans.length; j++) {

                        let str = "";
                        let pri = getTrainPRI(plans[j].loc, HS, HPids[0], HPids[1], LS, LPids[0], LPids[1]);
                        for (let i = 0; i < pri.Order.length; i++) {
                            if (str != "") {
                                str += ">";
                            }
                            str += now_language["attrName" + pri.Order[i]];
                        }
                        strSus += "<br/><br/>" + now_language["sug_T" + plans[j].type] + now_language["Pos" + pri.Sloc.CampKey] + "<br/><br/>" + now_language.sug_PRI + str;

                    }
                    showHelpLayer(strSus, now_language.scoutReport, true);

                    return false;
                });
                pdom.find("a.subheader").after(nsavgstat);

            } else {
                return true;
            }

        }, cache_mode);
}

function checkScoutLoc(lst, key, LP1, LP2, slocs) {
    if (lst[key] != undefined) {
        let sloc = lst[key];
        if (getProp(LP1, sloc) == 0 || getProp(LP2, sloc) == 0) {

            slocs.push({ type: 1, loc: sloc });
        }
        else {
            slocs.push({ type: 0, loc: sloc });
        }
        slocs.keys[key] = true;
    }
}
function getProp(id, loc) {
    if (loc.Prop[id] != undefined) {
        return loc.Prop[id];
    }
    return 3;
}
function getTrainPlans(HP1, HP2, LP1, LP2) {
    //0 首选 1 次选(弱项有主项) 2 一般(强项不适合 从非弱项中找) 3 强行默认 一般练后卫
    let slocs = [];
    slocs.keys = {};

    //按高星挑选合适训练计划
    checkScoutLoc(scoutLocList, HP1 + "," + HP2, LP1, LP2, slocs);
    checkScoutLoc(scoutLocList, HP2 + "," + HP1, LP1, LP2, slocs);
    checkScoutLoc(scoutLocList, HP1, LP1, LP2, slocs);
    checkScoutLoc(scoutLocList, HP2, LP1, LP2, slocs);


    for (let i = 0; i < OKeys.length; i++) {
        let key = OKeys[i];
        if (!slocs.keys[key]) {
            let loc = scoutLocList[key];
            if (getProp(LP1, loc) != 1 && getProp(LP2, loc) != 1) {
                slocs.push({ type: 2, loc: loc });
                slocs.keys[key] = true;
            }
        }
    }
    if (slocs.length == 0) {
        slocs.push({ type: 3, loc: scoutLocList[OKeys[0]] });
    }
    return slocs;
}
function IsLoser(HStar, LStar, LP1, LP2) {
    if (HStar <= 2) {
        return true;
    }
    //弱1带速耐
    if (LStar == 1 && HStar < 4) {
        if (LP1 == 1 || LP2 == 1 || LP1 == 2 || LP2 == 2) {
            return true;
        }
    }
    return false;
}
function getTrainPRI(sloc, HStar, HP1, HP2, LStar, LP1, LP2) {

    //获取训练顺序
    let lstBase = [];
    let lstMain = [];
    let lstSub = [];
    for (let i = 0; i < sloc.Order.length; i++) {
        let ID = sloc.Order[i];
        let t = getProp(ID, sloc);
        if (t == 0 || t == 1) {
            //强3+星 基础和主项训练完再训练
            if (HStar >= 3) {
                if (HP1 == ID || HP2 == ID) {
                    lstSub.push(ID);
                }
            }
            //弱2星带基础和主项 最优先训练
            if (LStar <= 2) {
                if (LP1 == ID || LP2 == ID) {
                    if (t == 0) {
                        lstBase.unshift(ID);
                    }
                    else {
                        lstMain.push(ID);
                    }
                }
            }
            //高低星都没有基础和主项 最优先训练
            if (HP1 != ID && HP2 != ID && LP1 != ID && LP2 != ID) {
                //意降低优先级
                if (ID == 3) {
                    lstSub.push(ID);
                }
                else if (t == 0) {
                    lstBase.push(ID);
                }
                else {
                    lstMain.push(ID);
                }
            }
        }
        else if (t == 2) {
            lstSub.push(ID);
        }
    }

    let pri = 29;
    let ditPRI = {};
    let lstOrder = lstBase.concat(lstMain).concat(lstSub);

    while (lstBase.length > 0) {
        ditPRI[lstBase.shift()] = pri;
        pri -= 1;
    }
    pri = 19;
    while (lstMain.length > 0) {
        ditPRI[lstMain.shift()] = pri;
        pri -= 1;
    }
    pri = 9;
    while (lstSub.length > 0) {
        ditPRI[lstSub.shift()] = pri;
        pri -= 1;
    }

    let ret = {
        "Sloc": sloc, "TrainPRI": ditPRI, "Order": lstOrder
    };
    return ret;
}

function getTrainingGraphs(pid, pdom, GraphsType) {
    myAjax(
        "/ajax.php?p=trainingGraph&sub=getJsonTrainingHistory&sport=soccer&player_id=" + pid,
        function (data) {
            if (data == "") {
                return true;
            }
            let ret = drawPlayerByTrainingGraphs(pid, data, pdom);
            return !ret;
        });
}
function getTrainingGraphsBySkill_id(pid, skill_id, callback) {
    myAjax(
        "/ajax.php?p=trainingGraph&sub=getJsonTrainingHistory&sport=soccer&player_id=" + pid + "&skill_id=" + (skill_id + 2),
        function (data) {
            return !callback(data);
        });
}
function showPop(parent) {
    $("body").append("<div id=\"informationBubble\" class=\"shadow\"></div>");
    let bubble = $("#informationBubble");
    bubble.css("width", "200px");
    let tmpArr = parent.attr('id').split("_");

    let playTS = trainingInfo[tmpArr[0]][tmpArr[1]];
    let str = "";
    let sum = 0;
    if (playTS[tmpArr[2]]) {
        let training = playTS[tmpArr[2]].stat;
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
    for (let i = 0; i < 10; i++) {
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

    let css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = ".gw_run_div{position:fixed;bottom:20%;right:1px;border:1px solid gray;padding:3px;width:12px;font-size:12px;border-radius: 3px;text-shadow: 1px 1px 3px #676767;background-color: #000000;color: #FFFFFF;cursor: default;}.gw_run{cursor:pointer;}.gw_div_left{float:left;position:fixed;left:0px;top:120px;height:528px;overflow-y:auto;text-align:left;}.gw_div_right{float:right;position:fixed;right:0px;top:120px;height:528px;overflow-y:auto;text-align:left;}.shupai{writing-mode:tb-rl;-webkit-writing-mode:vertical-rl;}.gm_ytc{font-style:italic;text-decoration:underline;}.gm_scout_h{font-weight: bold;}.gm_s1{color:red;}.gm_s2{color:darkgoldenrod;}.gm_s3{color:blue;}.gm_s4{color:fuchsia;}";


    document.getElementsByTagName('head')[0].appendChild(css);

    $(document.body).append("<div class='gw_run_div'>"
        + "<div id='gw_run' class='gw_run shupai' title='" + now_language.ManualColorTitle + "'><b>" + now_language.ManualColor + "</b></div>"
        + "<div>---</div>"
        + "<div id='gw_run2' class='gw_run shupai' title='" + now_language.SettingTitle + "'><b>" + now_language.Setting + "</b></div>"
        + "</div>");
    $('#gw_run')[0].addEventListener('click', function () { gw_start(1); });
    $('#gw_run2')[0].addEventListener('click', function () {
        OpenSetting();
    });

    document.onkeydown = function () {
        if (event.altKey) {
            if (window.event.keyCode == 65) {
                //alt + A
                gw_start(1);
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
    if (mzreg.ruok_url.test(location.href)) {
        let ad = document.createElement('audio');
        ad.autoplay = true;
        ad.controls = true;
        ad.loop = true;
        ad.preload = "auto";
        ad.src = "http://sgj.budeng.win:852/ruok.mp3";

        ad.oncanplay = function () {
            ad.play();
        };
        document.body.appendChild(ad);
        //$(document.body).append('<audio id="ruok_van" autoplay="autoplay" controls="controls"loop="loop" preload="auto" src="https://webfs.yun.kugou.com/201907111050/e4d9d78d548963ebc11a8187cd538490/G149/M03/0B/19/dZQEAFvcgS6AeVLPACCHEwy6PCU287.mp3"></audio>');
        //$("#ruok_van")[0].play();
    }
    let mth = location.href.match(mzreg.matchResult);
    if (mth && mth.length > 0) {
        var mid = mth[1];
        let amatch = $("a.matchIcon.large.shadow");
        if (amatch.length > 0) {
            amatch.eq(0).before('<a id="gw_match_result" class="matchIcon  large shadow" href="#" rel="nofollow" title="Watch match result"><i>R</i><span>&nbsp;</span></a>');
            $('#gw_match_result')[0].addEventListener('click', function () {
                ShowMatchResult("2d", mid);
                return false;
            });
        }
    }
}
function ShowMatchResult(type, matchId) {
    var _overlay = this;
    this.prepareMatch = function () {
        $.getJSON(mz.getAjaxLink("matchViewer&sub=check-match&type=" + type + "&mid=" + matchId), function (data) {
            switch (data.response) {
                case "ok":

                    $.ajax({
                        type: "GET",
                        url: "https://www.managerzone.com/matchviewer/getMatchFiles.php?type=stats&mid=" + matchId + "&sport=soccer",
                        dataType: "xml",
                        success: function (data) {
                            let teams = data.documentElement.getElementsByTagName("Team");
                            let homeS = teams[0].getElementsByTagName("Statistics")[0];
                            let awayS = teams[1].getElementsByTagName("Statistics")[0];
                            let td = $("div#match-tactic-facts-wrapper div div table.hitlist.statsLite tbody tr td");

                            td.eq(1).html(homeS.getAttribute("goals"));
                            td.eq(2).html(awayS.getAttribute("goals"));

                            td.eq(4).html(homeS.getAttribute("injuries"));
                            td.eq(5).html(awayS.getAttribute("injuries"));

                            td.eq(7).html(homeS.getAttribute("yellowCards"));
                            td.eq(8).html(awayS.getAttribute("yellowCards"));

                            td.eq(10).html(homeS.getAttribute("redCards"));
                            td.eq(11).html(awayS.getAttribute("redCards"));

                            td.eq(13).html(homeS.getAttribute("freekicks"));
                            td.eq(14).html(awayS.getAttribute("freekicks"));

                            td.eq(16).html(homeS.getAttribute("penaltyshots"));
                            td.eq(17).html(awayS.getAttribute("penaltyshots"));

                            td.eq(19).html(homeS.getAttribute("corners"));
                            td.eq(20).html(awayS.getAttribute("corners"));

                            td.eq(22).html(homeS.getAttribute("shotsOnGoal"));
                            td.eq(23).html(awayS.getAttribute("shotsOnGoal"));

                            td.eq(25).html(homeS.getAttribute("possession") + "%");
                            td.eq(26).html(awayS.getAttribute("possession") + "%");

                        }
                    });

                    break;
                case "queued":
                    _overlay.tryCounter++;
                    if (_overlay.tryCounter > 5) {
                        return false;
                    }
                    setTimeout(function () { _overlay.prepareMatch() }, 3000);
                    break;
                case "walkover":
                case "blocked":
                case "error":
                    return false;
            }
        });
    };

    this.tryCounter = 1;
    this.prepareMatch();
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
    if ($("#players_container").width() < 660) {
        if (mzreg.shortlist_url.test(location.href)) {
            $(".col_2_of_3").width("660");
        }
        $("#players_container").width("660");
    }
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
    } else if ($(".playerContainer").find(".scout_report").length > 0) {
        showMax(GraphsType);
    }
}
function OpenSetting() {

    let lang = GM_getValue("mylanguage", "en");
    let xml_mode = GM_getValue("xml_mode", 0);
    let autoRun = GM_getValue("autoRun1", 1);
    let tmphtml = '<div><b>' + now_language.Language + ':</b></div><div><select id="gm_language">';
    for (let l in gm_mzlanguage) {
        tmphtml += '<option value="' + l + '"' + (lang == l ? ' selected="selected" ' : '') + '>' + gm_mzlanguage[l].Name + '</option>';
    }
    tmphtml += '</select>\
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
        GM_setValue("autoRun1", $("#gm_autorun").val());
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
            for (let j = 0; j < len; j++) {
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

                    });

                } else {
                    $('.gw_div_left').empty();
                    $('.gw_div_right').empty();
                }
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
                for (let k = 0; k < arr.length; k++) {
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
    let ret = IsLocal ? Math.round(-.255800462 * i + 199.8228530689) : Math.round(.2555000556 * i + 8.3741302936);
    return ret;
}
function StatsToPos_Y(i, IsLocal) {
    let ret = IsLocal ? Math.round(-.3073207154 * i + 315.9278777381) : Math.round(.3070644902 * i + 9.2794889414);
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
                let myData = new FormData();
                myData.append("xml", "9" + base64js.fromByteArray(pako.gzip(tmpXML)));
                myData.append("html", data2);
                myData.append("tacConf", GM_getValue("TacConf", ""));
                GM_xmlhttpRequest({
                    method: "POST",
                    url: "http://www.budeng.win:852/MZ/TuneXMLByHtml",
                    data: myData,
                    responseType: "json",
                    onload: function (result) {
                        let dxml = JSON.parse(result.responseText);
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
            }, 2, true);
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
var _open, _prepareTransferData, _centerPowerbox, _ajaxSubmit, _getPlayerInfo;
var finalInitAfterLoading, processButtonPresses, Load010SetupMainSceneInstance;
let OK_2D = false;
(function () {
    'use strict';

    if (ajaxSport && ajaxSport == "soccer") {

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

                }
            }
            return _open.apply(this, arguments);
        };

        if (unsafeWindow.prepareTransferData != undefined) {
            _prepareTransferData = unsafeWindow.prepareTransferData;
            unsafeWindow.prepareTransferData = function (readyState, response, responseParameter) {

                _prepareTransferData.apply(this, arguments);
                if (GM_getValue("autoRun1", 1) == 1) {
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
                if (GM_getValue("autoRun1", 1) == 1) {
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
                        if (GM_getValue("autoRun1", 1) == 1) {
                            gw_start(0);
                        }
                    };
                }
                _ajaxSubmit.apply(this, arguments);
            };
        }

        if (location.href == "https://www.managerzone.com/?p=tactics") {
            if (unsafeWindow.teamTactic.getPlayerInfo != undefined) {
                _getPlayerInfo = unsafeWindow.teamTactic.getPlayerInfo;
                unsafeWindow.teamTactic.getPlayerInfo = function () {

                    _getPlayerInfo.apply(this, arguments);
                    if (GM_getValue("autoRun1", 1) == 1) {
                        run_Tac();
                    }
                };
            }
        }

        gw_start(0);
        report();
        autoclearCache();
    }
})();

function run_Tac() {
    getMax(function () {
        let players = $("#playerInfoWindow");
        if (players.length > 0) {
            let pdom = players.eq(0);
            let pid = pdom.html().match(mzreg.playerId_tac)[1];
            let player = pmax[pid];
            let imgs = pdom.find("img.skill");

            if (player) {
                if (isNaN(parseInt(player.skills.speed))) {
                    for (let j = 0; j < imgs.length; j++) {
                        setSrc(false, imgs[j], parseInt(imgs[j].src.match(mzreg.img_val)[1]), "");
                    }
                } else {
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
                }
                let p_age = teamTactic.tacticsData.TeamPlayers.Player[teamTactic.tacticsData.playerIndexReference[pid]]["@attributes"].age;
                if (mz.season - p_age >= 52) {
                    getScoutReport(pid, pdom);
                }
            }
        }
    });
}
