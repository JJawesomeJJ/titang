$(document).ready(function() {
    var question_data;
    window.question_arr=[];
    var question_list=[];
    var to;
    page_init();
    function page_init() {
        var data = document.querySelector('#TPI').innerHTML;
        question_data=eval('('+data+')');
        to=question_data["title"];
        for(var i in question_data)
        {
            if(i!=="title") {
                question_arr.push(question_data[i])
                question_list.push(i);
            }
        }
    }
    function string_format() {
        String.EscapeChar = '';
        String.prototype.replaceAll = function (searchValue, replaceValue) {
            var regExp = new RegExp(searchValue, "g");
            return this.replace(regExp, replaceValue);
        }
        String.prototype.format = function () {
            var regexp = c;
            var args = arguments;
            var result = this.replace(regexp, function (m, i, o, n) {
                return args[i];
            });
            return result.replaceAll('%', String.EscapeChar);
        }
    }

    onload();

    function onload() {
        string_format();
        if (getCookie("writer").length > 0) {
            alert("您已参加过投票！");
            var type="update_sql";
            get_survey_info(type);
        }
    }
    $(".post").click(function () {
        var type="update_sql";
        if($(this).val()=="投票通道关闭,点击查看结果")
        {
            type="query_survey_info"
        }
        get_survey_info(type);
    });
    function get_survey_info(type) {
        var name = $(".name").val();
        var id = $(".id").val();
        var $radios = $("input[type=radio]:checked");
        var str = "";
        for (var i = 0; i < $radios.length; i++) {
            var data = $($radios[i]).val();
            if($($radios[i]).val().length<1)
            {
                alert("还有未选择的选项！");
                return;
            }
            str += $($radios[i]).val() + ";";
        }
        str = str.substring(0, str.length - 1);
        $.ajax({
            type: 'post',
            url: "http://39.108.236.127/php/public/index.php/survey/vote",
            data: {"type":type, "name": name, "id": id, "answer": str,"to":to},
            success: function (data) {
                setcookie(name, 30);
                //window.location.href="http://39.108.236.127/php/api/survey_html.html";
                var reg = /:"(.*?)"}/g;
                var arr = [];
                var result;
                while ((result = reg.exec(data)) != null) {
                    arr.push(result['1']);
                }
                var html = "";
                for (var i = 0; i < arr.length; i++) {
                    var question_selector=[];
                    if(question_arr[i]!=null) {
                        question_selector=question_arr[i].split(";");
                    }
                    var template_arr = arr[i].split(";");
                    var template = "<h1>%{9}%</h1>" +
                        " <div class=\"q %{0}%\">\n" +
                        "            <div class=\"A\" style=\"width: %{1}%;\">A<p>%{10}%</p><h2>%{5}%</h2></div>\n" +
                        "            <div class=\"B\" style=\"width: %{2}%;\">B<p>%{11}%</p><h2>%{6}%</h2></div>\n" +
                        "            <div class=\"C\" style=\"width: %{3}%;\">C<p>%{12}%</p><h2>%{7}%</h2></div>\n" +
                        "            <div class=\"D\" style=\"width: %{4}%;\">D<p>%{13}%</p><h2>%{8}%</h2></div>\n" +
                        "        </div>";
                    var all_num = parseInt(template_arr[0]) + parseInt(template_arr[1]) + parseInt(template_arr[2]) + parseInt(template_arr[3]);
                    if (all_num == 0) {
                        all_num = 1;
                    }
                    console.log(all_num);
                    html += template.format("q" + (i + 1), (((template_arr[0] / all_num).toFixed(2) * 100).toString() + "&&"), (((template_arr[1] / all_num).toFixed(2) * 100).toString() + "&&"), (((template_arr[2] / all_num).toFixed(2) * 100).toString() + "&&"), (((template_arr[3] / all_num).toFixed(2) * 100).toString() + "&&"), template_arr[0] + '次', template_arr[1] + '次', template_arr[2] + '次', template_arr[3] + '次',question_list[i],question_selector[0],question_selector[1],question_selector[2],question_selector[3]);
                }
                $(".container").css("display", "none");
                $(".result").css("display", "block");
                document.querySelector(".result_show").innerHTML = html.replaceAll("&&", "%");
            },
            error: function (res) {
            }
        });
    }
    function setcookie(name, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = "writer" + "=" + encodeURI(name) + "; " + expires;
        +"path=./";
    }

    function getCookie(cookieName) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (cookieName == arr[0]) {
                return decodeURIComponent(arr[1]);
            }
        }
        return "";
    }
});