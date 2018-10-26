// ==UserScript==
// @name         van.mz.playerAdvanced
// @namespace    http://www.budeng.win:852/
// @version      1.4
// @description  Player display optimization 球员着色插件
// @author       van
// @match        https://www.managerzone.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// ==/UserScript==

var mzreg = {
    playerMax: /trainingField.players\s*=\s*({.+})/,
    playerId: /player_id_(\d+)/
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
        return GM_getValue(key, false);

    } else {
        return false;
    }
}
function setLocValue(key, val) {
    GM_setValue("Dt_" + key, new Date().getTime());
    GM_setValue(key, val);
}
function getMax() {
    myAjax(
        "/?p=training",
        function (data) {
            var result = data.match(mzreg.playerMax);
            pmax = JSON.parse(result[1]);
            showMax();
        });
    return false;
}
function setSrc(img, skill, maxed, skillBallDay) {
    if (skill > 0) {
        if (skillBallDay) {
            if (new Date().getTime() - skillBallDay < 345600000) {
                $(img).parent().find("span").remove();
                $(img).parent().append("<span class=\"help_button_placeholder\"><a class=\"help_button\" href=\"#\" onclick=\"showHelpLayer('挂牌后属性可能有变动，不确定转会市场显示是否是真实属性，请自行甄别。<br/>属性变动时间" + new Date(skillBallDay).toLocaleString() + "', '属性不确定', true); return false\"><span class=\"help_button_wrapper\"><span class=\"help_button_text\">?</span></span></a></span>");
            }
        }
        if (maxed === "red") {
            if (/blevel_/.test(img.src)) {
                img.src = mzImg.red_skill_blevel[skill];
            } else {
                img.src = mzImg.red_skill[skill];
            }
        }
        else if (maxed === "green") {
            if (/blevel_/.test(img.src)) {
                img.src = mzImg.green_skill_blevel[skill];
            } else {
                img.src = mzImg.green_skill[skill];
            }
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
function drawPlayerByTrainingGraphs(data, imgs, skills) {
    eval(data);
    let maxeds = ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green"];
    let skillBallDays = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
        setSrc(imgs[k], skills.eq(k).html().replace("(", "").replace(")", ""), maxeds[k], skillBallDays[k]);
    }
}
function getTrainingGraphs(pid, imgs, skills) {
    myAjax(
        "/ajax.php?p=trainingGraph&sub=getJsonTrainingHistory&sport=soccer&player_id=" + pid,
        function (data) {
            drawPlayerByTrainingGraphs(data, imgs, skills);
        });
}
function initgw() {
    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = "#gw_run{position:fixed;bottom:20%;right:1px;border:1px solid gray;padding:3px;width:12px;font-size:12px;cursor:pointer;border-radius: 3px;text-shadow: 1px 1px 3px #676767;background-color: #000000;color: #FFFFFF;}";
    document.getElementsByTagName('head')[0].appendChild(css);

    $(document.body).append("<div id='gw_run' title='点击可手动着色 快捷键:ALT + A'><b>手动着色</b></div>");
    $('#gw_run')[0].addEventListener('click', gw_start);

    document.onkeydown = function () {
        if (event.altKey && window.event.keyCode == 65) {
            //alt + A
            gw_start();
        }
    };
}
function gw_start() {
    if ($(".player_share_skills").length > 0) {
        getMax();
    } else if ($(".playerContainer").find(".training_graphs").length > 0) {
        showMax();
    }
}
(function () {
    'use strict';

    initgw();
    gw_start();
})();