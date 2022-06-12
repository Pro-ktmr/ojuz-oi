
function stat(){
    //統計情報初期化
    if (sta.checked || rival_sta.checked) {
        statistic.innerHTML = "<h2>統計｜Statistic</h2>";
    }

    //自分の提出状況を表示
    if (ojuz_id.value != "") {
        

        //自分の統計情報を表示
        if (sta.checked == true) {
            statistic.innerHTML += "<h3>" + ojuz_id.value + "</h3>";
            statistic.innerHTML += '<table id="' + ojuz_id.value + '" class="statistic_table"></table>';

            if (apio.checked == true){
                var tr = document.getElementById(ojuz_id.value).insertRow(-1);
                var tr2 = document.getElementById(ojuz_id.value).insertRow(-1);
                var tr3 = document.getElementById(ojuz_id.value).insertRow(-1);
                var tr4 = document.getElementById(ojuz_id.value).insertRow(-1);
                tr.innerHTML = '<th class="p">問題</th><th class="p">【APIO】</th>';
                tr2.innerHTML = '<th class="p">問題数</th>';
                tr3.innerHTML = '<th class="p">割合</th>';
                tr4.innerHTML = '<th class="p">得点</th>';
                var td2 = tr2.insertCell(-1);
                var td3 = tr3.insertCell(-1);
                var td4 = tr4.insertCell(-1);
                var all = 0;
                var ac = 0;
                var point_all = 0;
                var point = 0;
                for (var i = 1; i < problem_table.rows.length; i++) {
                    if (problem_table.rows[i].cells[1].innerHTML.indexOf("APIO") != -1){
                        all++;
                        point_all += Number(problem_table.rows[i].cells[3].innerHTML);
                        if (problem_table.rows[i].cells[1].className == "ac"){
                            ac++;
                            point += Number(problem_table.rows[i].cells[3].innerHTML);
                        }
                    }
                }
                td2.innerHTML = ac + "/" + all;
                if (all == 0) td3.innerHTML = "0%";
                else td3.innerHTML = Math.round(100 * ac / all) + "%";
                td4.innerHTML = point + "/" + point_all;

                if(point_all != 0 && point/point_all >= 0.8){
                    td2.className = "ac";
                    td3.className = "ac";
                    td4.className = "ac";
                }
                else if(point_all != 0 && point/point_all >= 0.6){
                    td2.className = "tle";
                    td3.className = "tle";
                    td4.className = "tle";
                }
                else if(point != 0){
                    td2.className = "wa";
                    td3.className = "wa";
                    td4.className = "wa";
                }
                
                for (var i=0; i<year_end.value-year_begin.value+1; i++){
                    if ((i+1)%7 == 0){
                        tr = document.getElementById(ojuz_id.value).insertRow(-1);
                        tr2 = document.getElementById(ojuz_id.value).insertRow(-1);
                        tr3 = document.getElementById(ojuz_id.value).insertRow(-1);
                        tr4 = document.getElementById(ojuz_id.value).insertRow(-1);
                        tr.innerHTML = '<th class="p">問題</th>';
                        tr2.innerHTML = '<th class="p">問題数</th>';
                        tr3.innerHTML = '<th class="p">割合</th>';
                        tr4.innerHTML = '<th class="p">得点</th>';
                    }
                    tr.innerHTML += '<th class="p">' + (Number(year_begin.value) + i) + '年</th>';
                    td2 = tr2.insertCell(-1);
                    td3 = tr3.insertCell(-1);
                    td4 = tr4.insertCell(-1);
                    all = 0;
                    ac = 0;
                    point_all = 0;
                    point = 0;
                    for (var j = 1; j < problem_table.rows.length; j++) {
                        if (problem_table.rows[j].cells[1].innerHTML.indexOf("APIO" + (Number(year_begin.value) + i)) != -1) {
                            all++;
                            point_all += Number(problem_table.rows[j].cells[3].innerHTML);
                            if (problem_table.rows[j].cells[1].className == "ac"){
                                ac++;
                                point += Number(problem_table.rows[j].cells[3].innerHTML);
                            }
                        }
                    }
                    td2.innerHTML = ac + "/" + all;
                    if (all == 0) td3.innerHTML = "0%";
                    else td3.innerHTML = Math.round(100 * ac / all) + "%";
                    td4.innerHTML = point + "/" + point_all;

                    if(point_all != 0 && point/point_all >= 0.8){
                        td2.className = "ac";
                        td3.className = "ac";
                        td4.className = "ac";
                    }
                    else if(point_all != 0 && point/point_all >= 0.6){
                        td2.className = "tle";
                        td3.className = "tle";
                        td4.className = "tle";
                    }
                    else if(point != 0){
                        td2.className = "wa";
                        td3.className = "wa";
                        td4.className = "wa";
                    }
                }
            }

            if (ioi.checked == true){
                var tr = document.getElementById(ojuz_id.value).insertRow(-1);
                var tr2 = document.getElementById(ojuz_id.value).insertRow(-1);
                var tr3 = document.getElementById(ojuz_id.value).insertRow(-1);
                var tr4 = document.getElementById(ojuz_id.value).insertRow(-1);
                tr.innerHTML = '<th class="p">問題</th><th class="p">【IOI】</th>';
                tr2.innerHTML = '<th class="p">問題数</th>';
                tr3.innerHTML = '<th class="p">割合</th>';
                tr4.innerHTML = '<th class="p">得点</th>';
                var td2 = tr2.insertCell(-1);
                var td3 = tr3.insertCell(-1);
                var td4 = tr4.insertCell(-1);
                var all = 0;
                var ac = 0;
                var point_all = 0;
                var point = 0;
                for (var i = 1; i < problem_table.rows.length; i++) {
                    if (problem_table.rows[i].cells[1].innerHTML.indexOf("IOI") != -1){
                        all++;
                        point_all += Number(problem_table.rows[i].cells[3].innerHTML);
                        if (problem_table.rows[i].cells[1].className == "ac"){
                            ac++;
                            point += Number(problem_table.rows[i].cells[3].innerHTML);
                        }
                    }
                }
                td2.innerHTML = ac + "/" + all;
                if (all == 0) td3.innerHTML = "0%";
                else td3.innerHTML = Math.round(100 * ac / all) + "%";
                td4.innerHTML = point + "/" + point_all;

                if(point_all != 0 && point/point_all >= 0.8){
                    td2.className = "ac";
                    td3.className = "ac";
                    td4.className = "ac";
                }
                else if(point_all != 0 && point/point_all >= 0.6){
                    td2.className = "tle";
                    td3.className = "tle";
                    td4.className = "tle";
                }
                else if(point != 0){
                    td2.className = "wa";
                    td3.className = "wa";
                    td4.className = "wa";
                }
                
                for (var i=0; i<year_end.value-year_begin.value+1; i++){
                    if ((i+1)%7 == 0){
                        tr = document.getElementById(ojuz_id.value).insertRow(-1);
                        tr2 = document.getElementById(ojuz_id.value).insertRow(-1);
                        tr3 = document.getElementById(ojuz_id.value).insertRow(-1);
                        tr4 = document.getElementById(ojuz_id.value).insertRow(-1);
                        tr.innerHTML = '<th class="p">問題</th>';
                        tr2.innerHTML = '<th class="p">問題数</th>';
                        tr3.innerHTML = '<th class="p">割合</th>';
                        tr4.innerHTML = '<th class="p">得点</th>';
                    }
                    tr.innerHTML += '<th class="p">' + (Number(year_begin.value) + i) + '年</th>';
                    td2 = tr2.insertCell(-1);
                    td3 = tr3.insertCell(-1);
                    td4 = tr4.insertCell(-1);
                    all = 0;
                    ac = 0;
                    point_all = 0;
                    point = 0;
                    for (var j = 1; j < problem_table.rows.length; j++) {
                        if (problem_table.rows[j].cells[1].innerHTML.indexOf("APIO"(Number(year_begin.value) + i)) != -1) {
                            all++;
                            point_all += Number(problem_table.rows[j].cells[3].innerHTML);
                            if (problem_table.rows[j].cells[1].className == "ac"){
                                ac++;
                                point += Number(problem_table.rows[j].cells[3].innerHTML);
                            }
                        }
                    }
                    td2.innerHTML = ac + "/" + all;
                    if (all == 0) td3.innerHTML = "0%";
                    else td3.innerHTML = Math.round(100 * ac / all) + "%";
                    td4.innerHTML = point + "/" + point_all;

                    if(point_all != 0 && point/point_all >= 0.7){
                        td2.className = "ac";
                        td3.className = "ac";
                        td4.className = "ac";
                    }
                    else if(point_all != 0 && point/point_all >= 0.5){
                        td2.className = "tle";
                        td3.className = "tle";
                        td4.className = "tle";
                    }
                    else if(point != 0){
                        td2.className = "wa";
                        td3.className = "wa";
                        td4.className = "wa";
                    }
                }
            }
        }
    }

    //ライバルの提出状況を表示
    for (var i = 1; i < problem_table.rows.length; i++) {
        problem_table.rows[i].cells[6].innerHTML = '';
    }
    if (rival_ojuz_id.value != "") {
        var text = rival_ojuz_id.value.split(',');
        for (var k = 0; k < text.length; k++) {
            
            //ライバルの統計情報を表示
            if (rival_sta.checked == true) {
                if (text[k] == ojuz_id.value) continue;
                statistic.innerHTML += "<h3>" + text[k] + "</h3>";
                statistic.innerHTML += '<table id="' + text[k] + '" class="statistic_table"></table>';

                if (apio.checked == true) {
                    var tr = document.getElementById(text[k]).insertRow(-1);
                    var tr2 = document.getElementById(text[k]).insertRow(-1);
                    var tr3 = document.getElementById(text[k]).insertRow(-1);
                    var tr4 = document.getElementById(text[k]).insertRow(-1);
                    tr.innerHTML = '<th class="p">問題</th><th class="p">【APIO】</th>';
                    tr2.innerHTML = '<th class="p">問題数</th>';
                    tr3.innerHTML = '<th class="p">割合</th>';
                    tr4.innerHTML = '<th class="p">得点</th>';
                    var td2 = tr2.insertCell(-1);
                    var td3 = tr3.insertCell(-1);
                    var td4 = tr4.insertCell(-1);
                    var all = 0;
                    var ac = 0;
                    var point_all = 0;
                    var point = 0;
                    for (var i = 1; i < problem_table.rows.length; i++) {
                        if (problem_table.rows[i].cells[1].innerHTML.indexOf("APIO") != -1) {
                            all++;
                            point_all += Number(problem_table.rows[i].cells[3].innerHTML);
                            if (problem_table.rows[i].cells[4].innerHTML.indexOf('<span class="label-ac">'+text[k]) != -1) {
                                ac++;
                                point += Number(problem_table.rows[i].cells[3].innerHTML);
                            }
                        }
                    }
                    td2.innerHTML = ac + "/" + all;
                    if (all == 0) td3.innerHTML = "0%";
                    else td3.innerHTML = Math.round(100 * ac / all) + "%";
                    td4.innerHTML = point + "/" + point_all;

                    if (point_all != 0 && point / point_all >= 0.8) {
                        td2.className = "ac";
                        td3.className = "ac";
                        td4.className = "ac";
                    }
                    else if (point_all != 0 && point / point_all >= 0.6) {
                        td2.className = "tle";
                        td3.className = "tle";
                        td4.className = "tle";
                    }
                    else if (point != 0) {
                        td2.className = "wa";
                        td3.className = "wa";
                        td4.className = "wa";
                    }

                    for (var i = 0; i < year_end.value - year_begin.value + 1; i++) {
                        if ((i + 1) % 7 == 0) {
                            tr = document.getElementById(text[k]).insertRow(-1);
                            tr2 = document.getElementById(text[k]).insertRow(-1);
                            tr3 = document.getElementById(text[k]).insertRow(-1);
                            tr4 = document.getElementById(text[k]).insertRow(-1);
                            tr.innerHTML = '<th class="p">問題</th>';
                            tr2.innerHTML = '<th class="p">問題数</th>';
                            tr3.innerHTML = '<th class="p">割合</th>';
                            tr4.innerHTML = '<th class="p">得点</th>';
                        }
                        tr.innerHTML += '<th class="p">' + (Number(year_begin.value) + i) + '年</th>';
                        td2 = tr2.insertCell(-1);
                        td3 = tr3.insertCell(-1);
                        td4 = tr4.insertCell(-1);
                        all = 0;
                        ac = 0;
                        point_all = 0;
                        point = 0;
                        for (var j = 1; j < problem_table.rows.length; j++) {
                            if (problem_table.rows[j].cells[1].innerHTML.indexOf("APIO" + (Number(year_begin.value) + i)) != -1) {
                                all++;
                                point_all += Number(problem_table.rows[j].cells[3].innerHTML);
                                if (problem_table.rows[j].cells[4].innerHTML.indexOf('<span class="label-ac">'+text[k]) != -1) {
                                    ac++;
                                    point += Number(problem_table.rows[j].cells[3].innerHTML);
                                }
                            }
                        }
                        td2.innerHTML = ac + "/" + all;
                        if (all == 0) td3.innerHTML = "0%";
                        else td3.innerHTML = Math.round(100 * ac / all) + "%";
                        td4.innerHTML = point + "/" + point_all;

                        if (point_all != 0 && point / point_all >= 0.8) {
                            td2.className = "ac";
                            td3.className = "ac";
                            td4.className = "ac";
                        }
                        else if (point_all != 0 && point / point_all >= 0.6) {
                            td2.className = "tle";
                            td3.className = "tle";
                            td4.className = "tle";
                        }
                        else if (point != 0) {
                            td2.className = "wa";
                            td3.className = "wa";
                            td4.className = "wa";
                        }
                    }
                }

                if (ioi.checked == true) {
                    var tr = document.getElementById(text[k]).insertRow(-1);
                    var tr2 = document.getElementById(text[k]).insertRow(-1);
                    var tr3 = document.getElementById(text[k]).insertRow(-1);
                    var tr4 = document.getElementById(text[k]).insertRow(-1);
                    tr.innerHTML = '<th class="p">問題</th><th class="p">【IOI】</th>';
                    tr2.innerHTML = '<th class="p">問題数</th>';
                    tr3.innerHTML = '<th class="p">割合</th>';
                    tr4.innerHTML = '<th class="p">得点</th>';
                    var td2 = tr2.insertCell(-1);
                    var td3 = tr3.insertCell(-1);
                    var td4 = tr4.insertCell(-1);
                    var all = 0;
                    var ac = 0;
                    var point_all = 0;
                    var point = 0;
                    for (var i = 1; i < problem_table.rows.length; i++) {
                        if (problem_table.rows[i].cells[1].innerHTML.indexOf("IOI") != -1) {
                            all++;
                            point_all += Number(problem_table.rows[i].cells[3].innerHTML);
                            if (problem_table.rows[i].cells[1].className == "ac") {
                                ac++;
                                point += Number(problem_table.rows[i].cells[3].innerHTML);
                            }
                        }
                    }
                    td2.innerHTML = ac + "/" + all;
                    if (all == 0) td3.innerHTML = "0%";
                    else td3.innerHTML = Math.round(100 * ac / all) + "%";
                    td4.innerHTML = point + "/" + point_all;

                    if (point_all != 0 && point / point_all >= 0.8) {
                        td2.className = "ac";
                        td3.className = "ac";
                        td4.className = "ac";
                    }
                    else if (point_all != 0 && point / point_all >= 0.6) {
                        td2.className = "tle";
                        td3.className = "tle";
                        td4.className = "tle";
                    }
                    else if (point != 0) {
                        td2.className = "wa";
                        td3.className = "wa";
                        td4.className = "wa";
                    }

                    for (var i = 0; i < year_end.value - year_begin.value + 1; i++) {
                        if ((i + 1) % 7 == 0) {
                            tr = document.getElementById(text[k]).insertRow(-1);
                            tr2 = document.getElementById(text[k]).insertRow(-1);
                            tr3 = document.getElementById(text[k]).insertRow(-1);
                            tr4 = document.getElementById(text[k]).insertRow(-1);
                            tr.innerHTML = '<th class="p">問題</th>';
                            tr2.innerHTML = '<th class="p">問題数</th>';
                            tr3.innerHTML = '<th class="p">割合</th>';
                            tr4.innerHTML = '<th class="p">得点</th>';
                        }
                        tr.innerHTML += '<th class="p">' + (Number(year_begin.value) + i) + '年</th>';
                        td2 = tr2.insertCell(-1);
                        td3 = tr3.insertCell(-1);
                        td4 = tr4.insertCell(-1);
                        all = 0;
                        ac = 0;
                        point_all = 0;
                        point = 0;
                        for (var j = 1; j < problem_table.rows.length; j++) {
                            if (problem_table.rows[j].cells[1].innerHTML.indexOf("IOI" + (Number(year_begin.value) + i)) != -1) {
                                all++;
                                point_all += Number(problem_table.rows[j].cells[3].innerHTML);
                                if (problem_table.rows[j].cells[1].className == "ac") {
                                    ac++;
                                    point += Number(problem_table.rows[j].cells[3].innerHTML);
                                }
                            }
                        }
                        td2.innerHTML = ac + "/" + all;
                        if (all == 0) td3.innerHTML = "0%";
                        else td3.innerHTML = Math.round(100 * ac / all) + "%";
                        td4.innerHTML = point + "/" + point_all;

                        if (point_all != 0 && point / point_all >= 0.7) {
                            td2.className = "ac";
                            td3.className = "ac";
                            td4.className = "ac";
                        }
                        else if (point_all != 0 && point / point_all >= 0.5) {
                            td2.className = "tle";
                            td3.className = "tle";
                            td4.className = "tle";
                        }
                        else if (point != 0) {
                            td2.className = "wa";
                            td3.className = "wa";
                            td4.className = "wa";
                        }
                    }
                }
            }
        }
    }
}
