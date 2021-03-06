
var myChart_home, myChart_away;
var mdata;
var mid;
$(document).ready(function () {

    $('#mdiv').html('<table width="100%" cellspacing="0" cellpadding="2" class="hitlist marker"><tbody><tr class="odd"><td id="td_home" width="44%" style="text-align: right; font-weight: bold;"></td><td width="12%" style="text-align: center; white-space: nowrap; font-weight: bold;"><a id="a_match"></a></td><td id="td_away" width="44%" style="text-align: left; font-weight: bold;"></td></tr></tbody></table><table><tr><td><select id="TacTeam_home_sec" onchange="TacTeamChange(this.value, true);"></select></td><td><select id="TacTeam_away_sec" onchange="TacTeamChange(this.value, false);"></select></td></tr><tr><td><div id="homeTac" class="Tac"></div></td><td><div id="awayTac" class="Tac"></div></td></tr><tr><td><div style="text-align: center;"><label>HalfStatistics</label><table border="1" style="margin: auto;"><tr style="background-color: #ffffe5;"><td id="homeName">Home</td><td>Match Facts	</td><td id="awayName">Away</td></tr><tr><td id="homePossession">-</td><td>Possession</td><td id="awayPossession">-</td></tr><tr><td id="homeGoal">-</td><td>Goals(Penaltyshots)</td><td id="awayGoal">-</td></tr><tr><td id="homeSaves">-</td><td>Saves</td><td id="awaySaves">-</td></tr><tr><td id="homeShots">-</td><td>Shots/OnGoal</td><td id="awayShots">-</td></tr><tr><td id="homeCards">-</td><td>RedCards/yellowCards</td><td id="awayCards">-</td></tr><tr><td id="homeFK">-</td><td>Freekicks/Corners</td><td id="awayFK">-</td></tr><tr><td id="homePass">-</td><td>Passes(Good))</td><td id="awayPass">-</td></tr><tr><td id="homeTackles">-</td><td>Tackles(Won)</td><td id="awayTackles">-</td></tr><tr><td id="homeSubs">-</td><td>Substitutions/Injuries</td><td id="awaySubs">-</td></tr><tr><td id="homeThrowins">-</td><td>Throwins/Offsides</td><td id="awayThrowins">-</td></tr></table></div></td><td><div style="text-align: center;"><label>Statistics</label><table border="1" style="margin: auto;"><tr style="background-color: #ffffe5;"><td id="a_homeName">Home</td><td>Match Facts	</td><td id="a_awayName">Away</td></tr><tr><td id="a_homePossession">-</td><td>Possession</td><td id="a_awayPossession">-</td></tr><tr><td id="a_homeGoal">-</td><td>Goals(Penaltyshots)</td><td id="a_awayGoal">-</td></tr><tr><td id="a_homeSaves">-</td><td>Saves</td><td id="a_awaySaves">-</td></tr><tr><td id="a_homeShots">-</td><td>Shots/OnGoal</td><td id="a_awayShots">-</td></tr><tr><td id="a_homeCards">-</td><td>RedCards/yellowCards</td><td id="a_awayCards">-</td></tr><tr><td id="a_homeFK">-</td><td>Freekicks/Corners</td><td id="a_awayFK">-</td></tr><tr><td id="a_homePass">-</td><td>Passes(Good)</td><td id="a_awayPass">-</td></tr><tr><td id="a_homeTackles">-</td><td>Tackles(Won)</td><td id="a_awayTackles">-</td></tr><tr><td id="a_homeSubs">-</td><td>Substitutions/Injuries</td><td id="a_awaySubs">-</td></tr><tr><td id="a_homeThrowins">-</td><td>Throwins/Offsides</td><td id="a_awayThrowins">-</td></tr></table></div></td></tr><tr><td><div id="homeGoalsDiv" style="text-align: center;"></div></td><td><div id="awayGoalsDiv" style="text-align: center;"></div></td></tr></table>');
    myChart_home = echarts.init(document.getElementById("homeTac"));
    myChart_away = echarts.init(document.getElementById("awayTac"));

    let json1 = pako.ungzip(base64js.toByteArray(mdata), { to: 'string' });
    Show2Doc(JSON.parse(json1));
});
function Show2Doc(data) {

    AddLBStat(data);
    ShowMatchStat(data.stat);
    Add2Sec(data);
    TacTeamChange(0, true);
    TacTeamChange(0, false);

}
function TacTeamChange(sec, ishome) {
    if (ishome) {

        let htxt = match.data.stat.m_homeTeam.m_name + " Goal[" + match.data.stat.m_homeTeam.m_stat.goals + "]";
        ShowTeamTac(match, match.data.stat.m_homeTeam.m_id, sec, myChart_home, htxt, 'image://https://www.managerzone.com/dynimg/garment.php/n=a/set=home/pi=shirt/pa=3/b=0/c1=2BB8FF/c2=CC0044/lo=/no=/sp=soccer/img.png');
    }
    else {
        let atxt = match.data.stat.m_awayTeam.m_name + " Goal[" + match.data.stat.m_awayTeam.m_stat.goals + "]";
        ShowTeamTac(match, match.data.stat.m_awayTeam.m_id, sec, myChart_away, atxt, 'image://https://www.managerzone.com/dynimg/garment.php/n=a/set=home/pi=shirt/pa=16/b=0/c1=FF0000/c2=FFFFFF/lo=/no=/sp=soccer/img.png');
    }
}

var match = {};
function AddLBStat(data) {
    if (data) {
        match = { sp: data.sp, data: data };
        if (match.sp == undefined) {

            for (let i_id in data.longPass) {
                let pid = data.stat.m_players[i_id].Pid;
                if (match.sp[pid] == undefined) {
                    match.sp[pid] = {
                        item: data.stat.m_players[i_id],
                        EP: {}
                    };
                }

                for (let i = 0; i < data.longPass[i_id].length; i++) {
                    let item = data.longPass[i_id][i];
                    if (item.team) {
                        let jpid = data.stat.m_players[item.team.player.m_id].Pid;
                        if (match.sp[pid].EP[jpid] == undefined) {
                            match.sp[pid].EP[jpid] = {
                                count: 1,
                                item: data.stat.m_players[item.team.player.m_id]
                            };
                        } else {
                            match.sp[pid].EP[jpid].count += 1;
                        }
                    }
                }
            }
        }
    }

}

function ShowMatchStat(stat) {

    $('#td_home').html(stat.m_homeTeam.m_name);
    $('#td_away').html(stat.m_awayTeam.m_name);
    $('#a_match').text(stat.m_homeTeam.m_Statistics.goals + " - " + stat.m_awayTeam.m_Statistics.goals);
    $('#a_match').attr('href', 'https://www.managerzone.com/?p=match&sub=result&mid=' + mid);

    $('#homeName').html(stat.m_homeTeam.m_shortname);
    $('#awayName').html(stat.m_awayTeam.m_shortname);
    $('#homePossession').html(stat.m_homeTeam.m_HalfStatistics.possession + "%");
    $('#awayPossession').html(stat.m_awayTeam.m_HalfStatistics.possession + "%");
    $('#homeGoal').html(stat.m_homeTeam.m_HalfStatistics.goals + "(" + stat.m_homeTeam.m_HalfStatistics.penaltyshots + ")");
    $('#awayGoal').html(stat.m_awayTeam.m_HalfStatistics.goals + "(" + stat.m_awayTeam.m_HalfStatistics.penaltyshots + ")");
    $('#homeSaves').html(stat.m_homeTeam.m_HalfStatistics.saves);
    $('#awaySaves').html(stat.m_awayTeam.m_HalfStatistics.saves);
    $('#homeShots').html((parseInt(stat.m_homeTeam.m_HalfStatistics.shotsOnGoal) + parseInt(stat.m_homeTeam.m_HalfStatistics.shotsWide)) + "/" + stat.m_homeTeam.m_HalfStatistics.shotsOnGoal);
    $('#awayShots').html((parseInt(stat.m_awayTeam.m_HalfStatistics.shotsOnGoal) + parseInt(stat.m_awayTeam.m_HalfStatistics.shotsWide)) + "/" + stat.m_awayTeam.m_HalfStatistics.shotsOnGoal);
    $('#homeCards').html(stat.m_homeTeam.m_HalfStatistics.redCards + "/" + stat.m_homeTeam.m_HalfStatistics.yellowCards);
    $('#awayCards').html(stat.m_awayTeam.m_HalfStatistics.redCards + "/" + stat.m_awayTeam.m_HalfStatistics.yellowCards);
    $('#homeFK').html(stat.m_homeTeam.m_HalfStatistics.freekicks + "/" + stat.m_homeTeam.m_HalfStatistics.corners);
    $('#awayFK').html(stat.m_awayTeam.m_HalfStatistics.freekicks + "/" + stat.m_awayTeam.m_HalfStatistics.corners);
    let pass = parseInt(stat.m_homeTeam.m_HalfStatistics.goodPasses) + parseInt(stat.m_homeTeam.m_HalfStatistics.interceptedPasses) + parseInt(stat.m_homeTeam.m_HalfStatistics.oobPasses);
    $('#homePass').html(pass + "(" + (stat.m_homeTeam.m_HalfStatistics.goodPasses * 100 / pass).toFixed(2) + "%)");
    pass = parseInt(stat.m_awayTeam.m_HalfStatistics.goodPasses) + parseInt(stat.m_awayTeam.m_HalfStatistics.interceptedPasses) + parseInt(stat.m_awayTeam.m_HalfStatistics.oobPasses);
    $('#awayPass').html(pass + "(" + (stat.m_awayTeam.m_HalfStatistics.goodPasses * 100 / pass).toFixed(2) + "%)");
    let tackles = parseInt(stat.m_homeTeam.m_HalfStatistics.tacklesLost) + parseInt(stat.m_homeTeam.m_HalfStatistics.tacklesWon);
    $('#homeTackles').html(tackles + "(" + (stat.m_homeTeam.m_HalfStatistics.tacklesWon * 100 / tackles).toFixed(2) + "%)");
    tackles = parseInt(stat.m_awayTeam.m_HalfStatistics.tacklesLost) + parseInt(stat.m_awayTeam.m_HalfStatistics.tacklesWon);
    $('#awayTackles').html(tackles + "(" + (stat.m_awayTeam.m_HalfStatistics.tacklesWon * 100 / tackles).toFixed(2) + "%)");
    $('#homeSubs').html(stat.m_homeTeam.m_HalfStatistics.substitutions + "/" + stat.m_homeTeam.m_HalfStatistics.injuries);
    $('#awaySubs').html(stat.m_awayTeam.m_HalfStatistics.substitutions + "/" + stat.m_awayTeam.m_HalfStatistics.injuries);
    $('#homeThrowins').html(stat.m_homeTeam.m_HalfStatistics.throwins + "/" + stat.m_homeTeam.m_HalfStatistics.offsides);
    $('#awayThrowins').html(stat.m_awayTeam.m_HalfStatistics.throwins + "/" + stat.m_awayTeam.m_HalfStatistics.offsides);



    $('#a_homeName').html(stat.m_homeTeam.m_shortname);
    $('#a_awayName').html(stat.m_awayTeam.m_shortname);
    $('#a_homePossession').html(stat.m_homeTeam.m_Statistics.possession + "%");
    $('#a_awayPossession').html(stat.m_awayTeam.m_Statistics.possession + "%");
    $('#a_homeGoal').html(stat.m_homeTeam.m_Statistics.goals + "(" + stat.m_homeTeam.m_Statistics.penaltyshots + ")");
    $('#a_awayGoal').html(stat.m_awayTeam.m_Statistics.goals + "(" + stat.m_awayTeam.m_Statistics.penaltyshots + ")");
    $('#a_homeSaves').html(stat.m_homeTeam.m_Statistics.saves);
    $('#a_awaySaves').html(stat.m_awayTeam.m_Statistics.saves);
    $('#a_homeShots').html((parseInt(stat.m_homeTeam.m_Statistics.shotsOnGoal) + parseInt(stat.m_homeTeam.m_Statistics.shotsWide)) + "/" + stat.m_homeTeam.m_Statistics.shotsOnGoal);
    $('#a_awayShots').html((parseInt(stat.m_awayTeam.m_Statistics.shotsOnGoal) + parseInt(stat.m_awayTeam.m_Statistics.shotsWide)) + "/" + stat.m_awayTeam.m_Statistics.shotsOnGoal);
    $('#a_homeCards').html(stat.m_homeTeam.m_Statistics.redCards + "/" + stat.m_homeTeam.m_Statistics.yellowCards);
    $('#a_awayCards').html(stat.m_awayTeam.m_Statistics.redCards + "/" + stat.m_awayTeam.m_Statistics.yellowCards);
    $('#a_homeFK').html(stat.m_homeTeam.m_Statistics.freekicks + "/" + stat.m_homeTeam.m_Statistics.corners);
    $('#a_awayFK').html(stat.m_awayTeam.m_Statistics.freekicks + "/" + stat.m_awayTeam.m_Statistics.corners);
    pass = parseInt(stat.m_homeTeam.m_Statistics.goodPasses) + parseInt(stat.m_homeTeam.m_Statistics.interceptedPasses) + parseInt(stat.m_homeTeam.m_Statistics.oobPasses);
    $('#a_homePass').html(pass + "(" + (stat.m_homeTeam.m_Statistics.goodPasses * 100 / pass).toFixed(2) + "%)");
    pass = parseInt(stat.m_awayTeam.m_Statistics.goodPasses) + parseInt(stat.m_awayTeam.m_Statistics.interceptedPasses) + parseInt(stat.m_awayTeam.m_Statistics.oobPasses);
    $('#a_awayPass').html(pass + "(" + (stat.m_awayTeam.m_Statistics.goodPasses * 100 / pass).toFixed(2) + "%)");
    tackles = parseInt(stat.m_homeTeam.m_Statistics.tacklesLost) + parseInt(stat.m_homeTeam.m_Statistics.tacklesWon);
    $('#a_homeTackles').html(tackles + "(" + (stat.m_homeTeam.m_Statistics.tacklesWon * 100 / tackles).toFixed(2) + "%)");
    tackles = parseInt(stat.m_awayTeam.m_Statistics.tacklesLost) + parseInt(stat.m_awayTeam.m_Statistics.tacklesWon);
    $('#a_awayTackles').html(tackles + "(" + (stat.m_awayTeam.m_Statistics.tacklesWon * 100 / tackles).toFixed(2) + "%)");
    $('#a_homeSubs').html(stat.m_homeTeam.m_Statistics.substitutions + "/" + stat.m_homeTeam.m_Statistics.injuries);
    $('#a_awaySubs').html(stat.m_awayTeam.m_Statistics.substitutions + "/" + stat.m_awayTeam.m_Statistics.injuries);
    $('#a_homeThrowins').html(stat.m_homeTeam.m_Statistics.throwins + "/" + stat.m_homeTeam.m_Statistics.offsides);
    $('#a_awayThrowins').html(stat.m_awayTeam.m_Statistics.throwins + "/" + stat.m_awayTeam.m_Statistics.offsides);


    $('#homeGoalsDiv').empty();
    $('#awayGoalsDiv').empty();
    $('#homeGoalsDiv').append("<div><b> " + stat.m_homeTeam.m_tactic + "," + stat.m_homeTeam.m_playstyle + "," + stat.m_homeTeam.m_aggression + "</b></div>");
    $('#awayGoalsDiv').append("<div><b> " + stat.m_awayTeam.m_tactic + "," + stat.m_awayTeam.m_playstyle + "," + stat.m_awayTeam.m_aggression + "</b></div>");

    let tgdiv_home = new Array();
    let tgdiv_away = new Array();
    let tmpPid_Player = {};
    let tgdiv;
    for (let pid in stat.m_players) {
        tmpPid_Player[stat.m_players[pid].Pid] = stat.m_players[pid];
        if (stat.m_players[pid].m_stat.goals > 0 || stat.m_players[pid].m_stat.owngoals > 0 || stat.m_players[pid].m_stat.yellowCards > 0 || stat.m_players[pid].m_stat.redCards > 0) {
            for (let i = 0; i < stat.m_players[pid].m_events.length; i++) {

                if (stat.m_players[pid].m_events[i].m_type == 5) {
                    if (stat.m_players[pid].m_events[i].m_teamId == stat.m_homeTeam.m_id) {
                        tgdiv = tgdiv_home;
                    } else {
                        tgdiv = tgdiv_away;
                    }
                    let goaltxt = "";
                    let goalsrc = "";
                    if (stat.m_players[pid].m_teamId != stat.m_players[pid].m_events[i].m_teamId) {
                        goaltxt = "Owngoals "
                        goalsrc = 'https://www.managerzone.com/nocache-702/img/soccer/match/own_goal.png';
                    } else {
                        goaltxt = "Goals "
                        goalsrc = 'https://www.managerzone.com/nocache-702/img/soccer/match/goal.png';
                    }

                    tgdiv.push({
                        html: "<div>" + goaltxt + stat.m_players[pid].m_events[i].Time + "′ " + stat.m_players[pid].m_name + "(" + stat.m_players[pid].m_shirtNo + ')  <img src="' + goalsrc + '" width="13" height="13" alt=""></div>',
                        time: timeToFrame(stat.m_players[pid].m_events[i].Time)
                    });
                } else {
                    if (stat.m_players[pid].m_teamId == stat.m_homeTeam.m_id) {
                        tgdiv = tgdiv_home;
                    } else {
                        tgdiv = tgdiv_away;
                    }
                    if (stat.m_players[pid].m_events[i].m_type == 16) {
                        tgdiv.push({
                            html: "<div>RedCards " + stat.m_players[pid].m_events[i].Time + "′ " + stat.m_players[pid].m_name + "(" + stat.m_players[pid].m_shirtNo + ')  <img src="https://www.managerzone.com/nocache-702/img/soccer/card_red.png" height="13" alt=""></div>',
                            time: timeToFrame(stat.m_players[pid].m_events[i].Time)
                        });
                    } else if (stat.m_players[pid].m_events[i].m_type == 17) {
                        tgdiv.push({
                            html: "<div>YellowCards " + stat.m_players[pid].m_events[i].Time + "′ " + stat.m_players[pid].m_name + "(" + stat.m_players[pid].m_shirtNo + ')  <img src="https://www.managerzone.com/nocache-702/img/soccer/card_yellow.png" width="13" height="13" alt=""></div>',
                            time: timeToFrame(stat.m_players[pid].m_events[i].Time)
                        });
                    } else if (stat.m_players[pid].m_events[i].m_type == 18) {
                        tgdiv.push({
                            html: "<div>Double yellow " + stat.m_players[pid].m_events[i].Time + "′ " + stat.m_players[pid].m_name + "(" + stat.m_players[pid].m_shirtNo + ')  <img src="https://www.managerzone.com/nocache-702/img/soccer/card_yellow_red.png" height="13" alt=""></div>',
                            time: timeToFrame(stat.m_players[pid].m_events[i].Time)
                        });
                    }
                }
            }
        }
    }

    for (let i = 0; i < stat.Events.length; i++) {
        if (stat.Events[i].tagName == "Tactic") {

            if (stat.Events[i].attributes["teamId"] == stat.m_homeTeam.m_id) {
                tgdiv = tgdiv_home;
            } else {
                tgdiv = tgdiv_away;
            }
            tgdiv.push({
                html: "<div>" + stat.Events[i].attributes["time"] + "′ " + stat.Events[i].attributes["type"] + "->" + stat.Events[i].attributes["new_setting"],
                time: timeToFrame(stat.Events[i].attributes["time"])
            });
        } else if (stat.Events[i].tagName == "Substitution") {

            if (stat.Events[i].attributes["teamId"] == stat.m_homeTeam.m_id) {
                tgdiv = tgdiv_home;
            } else {
                tgdiv = tgdiv_away;
            }
            let player = tmpPid_Player[stat.Events[i].attributes["playerId"]];
            let sub_player = tmpPid_Player[stat.Events[i].attributes["substitutedId"]];
            let sub_str1 = "", sub_str2 = "";
            if (stat.Events[i].attributes["reason"] != undefined) {
                sub_str1 = stat.Events[i].attributes["reason"];
                if (stat.Events[i].attributes["minute"] != undefined) {
                    sub_str1 += stat.Events[i].attributes["minute"];
                }
            }
            if (stat.Events[i].attributes["scorecondition"] != undefined) {
                sub_str2 = stat.Events[i].attributes["scorecondition"];
                if (stat.Events[i].attributes["score"] != undefined) {
                    sub_str2 += " " + stat.Events[i].attributes["score"];
                }
            }
            tgdiv.push({
                html: "<div>" + stat.Events[i].attributes["time"] + "′ "
                    + player.m_name + "(" + player.m_shirtNo + ")↑ "
                    + sub_player.m_name + "(" + sub_player.m_shirtNo + ")↓ "
                    + sub_str1
                    + sub_str2,
                time: timeToFrame(stat.Events[i].attributes["time"])
            });
        }
    }

    tgdiv_home.sort(function (a, b) {
        return a.time - b.time;
    });
    tgdiv_away.sort(function (a, b) {
        return a.time - b.time;
    });

    for (let i = 0; i < tgdiv_home.length; i++) {
        $('#homeGoalsDiv').append(tgdiv_home[i].html);
    }
    for (let i = 0; i < tgdiv_away.length; i++) {
        $('#awayGoalsDiv').append(tgdiv_away[i].html);
    }

}
function Add2Sec(data) {
    $("#TacTeam_home_sec").empty();
    $("#TacTeam_home_sec").append("<option value='0'>Starting </option>");
    $("#TacTeam_away_sec").empty();
    $("#TacTeam_away_sec").append("<option value='0'>Starting </option>");
    for (let sf in data.xys) {
        $("#TacTeam_home_sec").append("<option value='" + sf + "'>" + frameToMatchMinute(sf) + "′</option>");
        $("#TacTeam_away_sec").append("<option value='" + sf + "'>" + frameToMatchMinute(sf) + "′</option>");
    }
}
function ShowTeamTac(match, tid, sec, myChart, tv_txt, symbol) {

    let arr = { data: new Array(), links: new Array(), categories: new Array() };
    let tmplk = {};

    let mlen = 1;
    let needTxy = false;

    if (match) {
        let stat = match.data.stat;
        let data = match.data;

        if (sec > 0) {
            let frame = data.xys[sec];
            for (let pi = 0; pi < frame.players.length; pi++) {
                let pitem = frame.players[pi];
                if (pitem.position) {
                    let item = stat.m_players[pitem.id];
                    if (item.m_teamId == tid) {

                        let ddtmp = GetHalf(sec, stat);
                        let needTxy_tmp = needTxy;
                        if (ddtmp.dd % 2 == 1) {
                            needTxy_tmp = !needTxy_tmp;
                        }

                        let id = arr.data.length;
                        let x = pitem.position.y;
                        let y = pitem.position.x;
                        if (needTxy_tmp) {
                            x = 1000 - x;
                        } else {
                            y = 750 - y;
                        }
                        arr.data.push({
                            category: arr.categories.length,
                            id: id,
                            name: item.m_name + "(" + item.Pid + ")",
                            x: x,
                            y: y,
                            value: item.m_shirtNo
                        });



                        arr.categories.push({
                            name: item.m_name

                        });
                        tmplk[item.Pid] = { links: arr.links, id: id, name: item.m_name };
                    }
                }

            }
        } else {
            for (let ipid in stat.m_players) {

                let item = stat.m_players[ipid];

                if (item.originY >= 0 && item.m_teamId == tid) {

                    let id = arr.data.length;
                    let x = item.originY;
                    let y = item.originX;
                    if (needTxy) {
                        x = 1000 - x;
                    } else {
                        y = 750 - y;
                    }
                    arr.data.push({
                        category: arr.categories.length,
                        id: id,
                        name: item.m_name + "(" + item.Pid + ")",
                        x: x,
                        y: y,
                        value: item.m_shirtNo
                    });



                    arr.categories.push({
                        name: item.m_name

                    });
                    tmplk[item.Pid] = { links: arr.links, id: id, name: item.m_name };
                }
            }

        }


        if (match.sp) {
            let sps = match.sp;
            for (let sp in sps) {
                for (let ep in sps[sp].EP) {
                    if (ep != sp) {
                        if (tmplk[ep] && tmplk[sp]) {
                            tmplk[sp].links.push(
                                {
                                    symbol: ['none', 'arrow'],
                                    symbolSize: 20,
                                    id: tmplk[sp].links.length,
                                    name: null,
                                    value: (sps[sp].EP[ep].count / mlen).toFixed(1),

                                    source: tmplk[sp].id,
                                    target: tmplk[ep].id,
                                    lineStyle: {
                                        width: 2 * sps[sp].EP[ep].count / mlen,
                                        curveness: 0.2
                                    },
                                    label: {
                                        show: true,
                                        formatter: '{c}'

                                    },
                                    emphasis: {
                                        lineStyle: {
                                            width: 2 * sps[sp].EP[ep].count / mlen + 2
                                        }
                                    }
                                });
                        }

                    }
                }
            }
        }
    }

    var option_home = {
        title: {
            text: tv_txt,
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
        },
        tooltip: {
            formatter: function () {
                if (typeof (arguments[0].name) == "string" && arguments[0].name.indexOf("(") > 0) {
                    return undefined;
                } else {
                    return arguments[0].value;
                }

            }
        },
        //legend: [{
        //    // selectedMode: 'single',
        //    data: arr.categories.map(function (a) {
        //        return a.name;
        //    })
        //}],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {

                //name: '球员',
                type: 'graph',
                layout: 'none',
                symbol: symbol,
                symbolSize: 35,
                data: arr.data,
                links: arr.links,
                categories: arr.categories,
                roam: true,
                focusNodeAdjacency: true,
                itemStyle: {
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 1,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                    }
                },
                label: {
                    show: true,
                    formatter: '{c}',
                    distance: 0
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter: "{b}"
                    }
                }
            }
        ]
    };

    myChart.setOption(option_home, true);

}

function GetHalf(frame, stat) {
    let d = "未知";
    let dd = 0;
    if (frame <= stat.eFrameHf1) {
        d = "上";
        dd = 1;
    } else if (frame >= stat.sFrameHf2 && frame <= stat.eFrameHf2) {
        d = "下";
        dd = 2;
    } else if (frame >= stat.sFrameHf3 && frame <= stat.eFrameHf3) {
        d = "加上";
        dd = 3;
    } else if (frame >= stat.sFrameHf4 && frame <= stat.eFrameHf4) {
        d = "加下";
        dd = 4;
    }
    return {
        d: d,
        dd: dd
    }

}

function frameToMatchMinute(frame) {
    let m_secsPerFrame = 0.6666667;
    return Math.ceil(frame * m_secsPerFrame / 60);
};
function timeToFrame(timeToParse) {
    var seconds = 0;
    try {
        var colonIdx = timeToParse.indexOf(":");
        var minute = parseInt(timeToParse.substring(0, colonIdx), 10);
        var second = parseFloat(timeToParse.substring(colonIdx + 1), 10);
        seconds = (minute * 60) + second;
    } catch (e) {
        console.log('Error converting ' + time + ' to frame number ' + e.message);
    }
    return Math.round(seconds / 0.6666667);
};