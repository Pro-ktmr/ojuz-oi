// GETのデータを配列にして返す
function GetQueryString() {
    var result = {};
    if (1 < window.location.search.length) {
        // 最初の1文字 (?記号) を除いた文字列を取得する
        var query = window.location.search.substring(1);
        // クエリの区切り記号 (&) で文字列を配列に分割する
        var parameters = query.split('&');

        for (var i = 0; i < parameters.length; i++) {
            // パラメータ名とパラメータ値に分割する
            var element = parameters[i].split('=');

            var paramName = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);

            // パラメータ名をキーとして連想配列に追加する
            result[paramName] = paramValue;
        }
    }
    return result;
}

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str) { // 読み込んだCSVデータが文字列として渡される
    var result = []; // 最終的な二次元配列を入れるための配列
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
    }

    return result;
}

//=====以下オリジナル=====

function checkData(){
    //自分の提出状況を表示
    if (ojuz_id.value != "") {
        var req_me = new XMLHttpRequest();
        req_me.open("GET", "https://ojuz-oi-backend.herokuapp.com/" + ojuz_id.value, false);
        req_me.send(null);
        var json = JSON.parse(req_me.responseText);

        for (var i = 0; i < problem_table.rows.length; i++) {
            if (json["ac"].indexOf(problem_table.rows[i].cells[1].innerHTML) != -1) {
                problem_table.rows[i].cells[1].className = "tiny ac";
                problem_table.rows[i].cells[2].className = "ac";
                problem_table.rows[i].cells[3].className = "ac";
                problem_table.rows[i].cells[4].className = "ac";
                problem_table.rows[i].cells[5].className = "ac";
                problem_table.rows[i].cells[6].className = "ac";
            }
        }

        for (var i = 0; i < problem_table.rows.length; i++) {
            if (json["wa"].indexOf(problem_table.rows[i].cells[1].innerHTML) != -1) {
                problem_table.rows[i].cells[1].className = "tiny wa";
                problem_table.rows[i].cells[2].className = "wa";
                problem_table.rows[i].cells[3].className = "wa";
                problem_table.rows[i].cells[4].className = "wa";
                problem_table.rows[i].cells[5].className = "wa";
                problem_table.rows[i].cells[6].className = "wa";
            }
        }
    }

    //ライバルの提出状況を表示
    for (var i = 0; i < problem_table.rows.length; i++) {
        problem_table.rows[i].cells[6].innerHTML = '';
    }
    if (rival_ojuz_id.value != "") {
        var text = rival_ojuz_id.value.split(',');
        for (var k = 0; k < text.length; k++) {
            var req_rival = new XMLHttpRequest();
            req_rival.open("GET", "https://ojuz-oi-backend.herokuapp.com/" + text[k], false);
            req_rival.send(null);
            var json = JSON.parse(req_rival.responseText);

            for (var i = 0; i < problem_table.rows.length; i++) {
                if (json["ac"].indexOf(problem_table.rows[i].cells[1].innerHTML) != -1) {
                    problem_table.rows[i].cells[6].innerHTML += '<span class="label-ac">' + text[k] + '</span> ';
                }
            }

            for (var i = 0; i < problem_table.rows.length; i++) {
                if (json["wa"].indexOf(problem_table.rows[i].cells[1].innerHTML) != -1) {
                    problem_table.rows[i].cells[6].innerHTML += '<span class="label-wa">' + text[k] + '</span> ';
                }
            }
        }
    }
}
//setInterval(checkData, 15000);//単位ミリ秒 1分=60000

window.onload = function () {

    //GETを表に反映
    var g = GetQueryString();
    if (g["ojuz_id"]) ojuz_id.value = g["ojuz_id"];
    if (g["sta"] == "on") sta.checked = true;
    if (g["rival_ojuz_id"]) rival_ojuz_id.value = g["rival_ojuz_id"];
    if (g["rival_sta"] == "on") rival_sta.checked = true;
    if (g["year_begin"]) year_begin.value = g["year_begin"];
    if (g["year_end"]) year_end.value = g["year_end"];
    //if (g["joiho"] == "off") joiho.checked = false;
    if (g["joisp"] == "off") joisp.checked = false;
    if (g["joiop"] == "off") joiop.checked = false;
    if (g["apio"] == "off") apio.checked = false;
    if (g["ioi"] == "off") ioi.checked = false;
    if (g["sort"]) sort.value = g["sort"];
    if (g["nojudge"] == "off") nojudge.checked = false;
    if (g["batch"] == "off") batch.checked = false;
    if (g["interactive"] == "off") interactive.checked = false;
    if (g["communication"] == "off") communication.checked = false;
    if (g["output_only"] == "off") output_only.checked = false;
    if (g["unknown_type"] == "off") unknown_type.checked = false;

    //問題一覧を表示
    var req = new XMLHttpRequest();
    req.open("GET", "list.txt?ver="+new Date().getTime(), false);
    req.send(null);

    var result = new Array();
    result = convertCSVtoArray(req.responseText);

    for (var i = 0; i < result.length; i++) {
        if (result[i].length <= 1) continue;
        //if (joiho.checked == false && result[i][3] == "JOIho") continue;
        if (joisp.checked == false && result[i][3] == "JOIsp") continue;
        if (joiop.checked == false && result[i][3] == "JOIop") continue;
        if (apio.checked == false && result[i][3] == "APIO") continue;
        if (ioi.checked == false && result[i][3] == "IOI") continue;
        if (result[i][2] < year_begin.value) continue;
        if (result[i][2] > year_end.value) continue;
        if (nojudge.checked == true && result[i][7].indexOf("Unavailable") != -1) continue;
        if (batch.checked == false && result[i][6] == "Batch") continue;
        if (interactive.checked == false && result[i][6] == "Interactive") continue;
        if (communication.checked == false && result[i][6] == "Communication") continue;
        if (output_only.checked == false && result[i][6] == "Output Only") continue;
        if (unknown_type.checked == false && result[i][6] == "未分類") continue;

        var tr = problem_table.insertRow(-1);

        var td0 = tr.insertCell(-1);
        td0.innerHTML = result[i][0];
        td0.className = "level_"+result[i][0];

        var td1 = tr.insertCell(-1);
        td1.innerHTML = result[i][1];
        td1.className = "tiny"

        var td2 = tr.insertCell(-1);
        td2.innerHTML = result[i][3] + result[i][2] + " " + result[i][4];

        var td3 = tr.insertCell(-1);
        td3.innerHTML = '<a href="https://oj.uz/problem/submit/' + result[i][1] + '" target="_blank">' + result[i][5] + '</a>';
        td3.innerHTML += result[i][7];

        var td4 = tr.insertCell(-1);
        td4.innerHTML = result[i][6];

        var td5 = tr.insertCell(-1);
        td5.innerHTML = "";
        if (result[i][8] != null && result[i][8].indexOf("http") != -1) td5.innerHTML += '<a href="' + result[i][8] + '" target="_blank">日本語</a>';

        var td6 = tr.insertCell(-1);
    }

    if (sort.value == "default") $("#problem_table_main").tablesorter(); 
    if (sort.value == "difficulty") $("#problem_table_main").tablesorter({sortList:[[0,0]]}); 

    checkData();

    loading.className = "unvisible";
}

function clock() {
    var weeks = new Array("Sun", "Mon", "Thu", "Wed", "Thr", "Fri", "Sat");

    var now = new Date();
    var y = now.getFullYear();
    var mo = now.getMonth() + 1;
    var d = now.getDate();
    var w = weeks[now.getDay()]; //0~6で日曜始まりで取得されるからweeks配列のインデックスとして指定
    var h = now.getHours();
    var mi = now.getMinutes();
    var s = now.getSeconds();

    //2ケタ処理
    if (mo < 10) mo = "0" + mo;
    if (d < 10) d = "0" + d;
    if (mi < 10) mi = "0" + mi;
    if (s < 10) s = "0" + s;

    document.getElementById("clock_date").innerHTML = y + "/" + mo + "/" + d + " (" + w + ")";
    document.getElementById("clock_time").innerHTML = h + ":" + mi + ":" + s;
}
setInterval(clock, 1000);