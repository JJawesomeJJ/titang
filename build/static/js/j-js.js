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
        var container_height=height-tail_height;
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

})