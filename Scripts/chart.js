$(document).ready(function () {
    teams = data.teams;
    length = teams.length;
    type = data.type;
    items = data[type];
    season = data.season;
    league_id = data.league_id;
    var series = [];
    teams.forEach(function (team) {
        var team_id = team.team_id
            , team_name = team.team_name
            , positions = items[team_id]
            , index = positions[positions.length - 1][1];
        series[series.length] = {
            name: team_name,
            data: positions,
            index: index
        }
    });
    var chart = new Highcharts.chart({
        chart: {
            type: "line",
            renderTo: "graph",
            zoomType: "x"
        },
        title: {
            text: "<b>China" + " --- " + data.league_name + "</b>",
            style: {
                font: "14pt Rokkitt, Verdana, sans-serif"
            },
            y: 17,
            margin: 20
        },
        subtitle: {
            text: "<b>Season " + season + "</b>",
            style: {
                font: "13pt Rokkitt, Verdana, sans-serif"
            },
            y: 40
        },
        xAxis: {
            title: {
                text: "Round"
            },
            min: 1,
            tickInterval: 1,
            plotLines: [{
                color: "#ddd",
                value: 12,
                width: 1
            }]
        },
        yAxis: {
            title: {
                text: "positions" === type ? "Position" : "Points"
            },
            opposite: !1,
            reversed: "positions" === type,
            min: "positions" === type ? 1 : 0,
            max: "positions" === type ? 12 : void 0,
            tickInterval: 1,
            lineColor: "#ff0000",
            lineWidth: 1
        },
        tooltip: {
            headerFormat: "<b>{series.name}</b><br/>",
            pointFormat: '<tspan style="fill:#ff8833" x="8" dy="15">●</tspan> <b>Round: {point.x}</b><br/><tspan style="fill:#7cb5ec" x="8" dy="15">●</tspan> <b>' + ("positions" === type ? "Position" : "Points") + ": {point.y}</b>"
        },
        plotOptions: {
            series: {
                animation: {
                    duration: 500
                },
                marker: {
                    radius: 3,
                    lineColor: null,
                    symbol: "circle"
                }
            }
        },
        legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
            borderWidth: 0,
            itemStyle: {
                font: "11pt Rokkitt, Verdana, sans-serif"
            },
            itemMarginTop: 2,
            itemMarginBottom: 2,
            reversed: "positions" !== type
        },
        series: series,
        exporting: {
            enabled: !1
        }
    });

});
