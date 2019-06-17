$(document).ready(function () {
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;

    }
    window.number=0;
    $(" .caidan i").click(function () {
        $(".caidan i").each(function () {
            var val=$(this).attr("class");
            if(val.indexOf("tianchong")!=-1) {
                val=val.split("tianchong");
                $(this).attr("class",val[0]);
            }
        });
        var val=$(this).attr("class");
        if(val.indexOf("tianchong")==-1) {
            val = val + "tianchong";
        }
        $(this).attr("class",val);
    })
    var flag=IsPC();
    console.log(flag)
    window.onresize=function () {
        onload();
    }
    onload();
    function onload() {
        var height=$(window).height();
        var tail_height=$(".j-nav-tail").height();
        var container_height=height;
        container_height=container_height.toString()+"px";
        $(".j-container").css("height",container_height);
        console.log(height);
    }
    $(".j-other").hover(function(){
        $(".j-grid").slideDown(250);
        $(".j-container").css("z-index","-1");
        $(".j-cover").css("display","block");
    },function () {
        $(".j-grid").slideUp(1);
        $(".j-container").css("z-index","0");
        $(".j-cover").css("display","none");
    })
    $(".j-grid li").click(function () {
        $(".j-cover").css("display","none");
        $(".j-grid").slideUp(250);

    })
    function getNumCode() {
        var img = document.getElementById("code_picture");
        img.src = "http://111.230.101.206/php/admin/code.php?"+new Date().getTime();
    }
    function setcookie(name,password,exdays)
    {
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = "name" + "=" + name + "; " + expires;+"path=/";
        document.cookie = "password" + "=" + password + "; " + expires;+"path=/";
    }

    function stopevt() {
        var ev = getEvent();
        if (ev.stopPropagation) {
            ev.stopPropagation();
        } else if (window.ev) {
            window.ev.cancelBubble = true;
        }
    }
    function toast(message) {
        var html="<div class=\"toast\">"+"<h1>"+message+"</h1>"+"</div>";
        $("body").append(html);
        $(".toast").fadeIn(500);
        setTimeout(function () {
            $(".toast").slideUp(1000);
        },200)
    }
    function back_change() {
        var date=new Date();
        var hour=date.getHours();
        if(localStorage.getItem("back_list")==null)
        {
            download_background_url();
            return;
        }
        var list=eval('('+localStorage.getItem("back_list")+')');
        set_back(hour,list);
    }
    function download_background_url() {
        $.ajax({
            type:'get',
            url:"http://39.108.236.127/php/public/index.php/admin/theme/get",
            data:{"type":"get_theme_back"},
            dataType: "jsonp",
            jsonp: 'callback',
            jsonpCallback: "callback",
            success:function(json) {
                var list_data=json;
                var list={
                    "night":list_data[0],
                    "sunrise":list_data[1],
                    "noon":list_data[2],
                    "sunset":list_data[3],
                }
                var date=new Date();
                var hour=date.getHours();
                localStorage.setItem("back_list",JSON.stringify(list));
                localStorage.setItem("theme_version",json.version);
                var list=eval('('+localStorage.getItem("back_list")+')');
                set_back(hour,list);
            },
            error: function (XMLHttpReuqest, textStautus, errothrown) {
                console.log(textStautus);
                console.log(errothrown);
            },
        });
    }
    function set_back(hour,list) {
        if(0<hour&&hour<6)
        {
            $(".j-container").css({"background":"url("+list["night"]+")","background-size":"100% 100%"});
            localStorage.setItem("now_back",list["night"]);
            var time=(6-hour)*60*60*1000;
            setTimeout(back_change,time);
        }
        if(hour>=6&&hour<10)
        {
            $(".j-container").css({"background":"url("+list["sunrise"]+")","background-size":"100% 100%"});
            localStorage.setItem("now_back",list["sunrise"]);
            var time=(10-hour)*60*60*1000;
            setTimeout(back_change,time);
        }
        if(hour>=10&&hour<17)
        {
            $(".j-container").css({"background":"url("+list["noon"]+")","background-size":"100% 100%"});
            localStorage.setItem("now_back",list["noon"]);
            var time=(17-hour)*60*60*1000;
            setTimeout(back_change,time);
        }
        if(hour>=17&&hour<20)
        {
            $(".j-container").css({"background":"url("+list["sunset"]+")","background-size":"100% 100%"});
            localStorage.setItem("now_back",list["sunset"]);
            var time=(20-hour)*60*60*1000;
            setTimeout(back_change,time);
        }
        if(hour>=20)
        {
            $(".j-container").css({"background":"url("+list["night"]+")","background-size":"100% 100%"});
            localStorage.setItem("now_back",list["night"]);
            var time=(24-hour)*60*60*1000;
            setTimeout(back_change,time);
        }
        is_update();
    }
    function is_update() {
        $.ajax({
            type:'get',
            url:"http://39.108.236.127/php/public/index.php/admin/theme/get",
            data:{"type":"get_version"},
            dataType: "jsonp",
            jsonp: 'callback',
            jsonpCallback: "callback",
            success:function(json) {
                var version=json.version;
                if(localStorage.getItem("theme_version")==null)
                {
                    back_change();
                    return;
                }
                if(localStorage.getItem("theme_version")!=version)
                {
                    localStorage.removeItem("back_list");
                    back_change();
                }
                console.log(version);
            },
            error: function (XMLHttpReuqest, textStautus, errothrown) {
                console.log(textStautus);
                console.log(errothrown);
            },
        });
    }
    back_change();
})