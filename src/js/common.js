exports.install = function (Vue, options) {
    Vue.prototype.toast = function (message){
        $(".toast").remove();
        var html="<div class=\"toast\">"+"<div class=\"toast_content\"><h1>"+message+"</h1></div>"+"</div>";
        $("body").append(html);
        $(".toast").toggle(500);
        setTimeout(function () {
            $(".toast").fadeOut(800);
        },1000);
    };
    Vue.prototype.exit_login=function () {
        this.setcookie('','',-1);
        if(typeof(websocket)!='undefined')
        {
            if(websocket.readyState==1)
            {
                websocket.close();
            }
        }
        localStorage.removeItem("server_token");
        this.$http.get("http://39.108.236.127/php/public/index.php/user/logout",{params:{csrf_token:localStorage.getItem("csrf_token")}}).then((res) => {
            localStorage.removeItem("csrf_token");
            this.is_login();
        }).catch((res) => {
            this.is_login();
        });
    };
    Vue.prototype. setcookie=function(name, email, exdays) {
        if(document.cookie=="")
        {
            localStorage.setItem("name",name);
            localStorage.setItem("email",email);
            return;
        }
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = "name" + "=" + name + "; " + expires;
        +"path=/";
        document.cookie = "email" + "=" + email + "; " + expires;
        +"path=/";
        document.cookie = "sha" + "=" + "" + "; " + expires;
        +"path=/";
    };
    Vue.prototype.loading=function () {
        var number=0;
        $(".j-loading").css("display","flex");
        var load=setInterval(function () {
            if($(".j-loading").css("display")=="none")
            {
                clearInterval(load);
            }
            var list=document.querySelectorAll(".j-loading>div");
            var class_name=[];
            for(var i of list){
                class_name.push(i.className);
            }
            //console.log(class_name);
            class_name.unshift(class_name[2]);
            class_name.pop();
            //console.log(class_name);
            var time=0;
            for(var i=0;i<list.length;i++)
            {
                list[i].className=class_name[i];
            }
            if(number%2==0)
            {
                $(".j-loading").attr("class","j-loading show");
                $(".j-loading div:nth-child(2)").css("filter","blur(5px");
                $(".j-loading div:nth-child(2)").css("width","20px");
                $(".j-loading div:nth-child(2)").css("height","20px");
                $(".j-loading div:nth-child(1)").css("filter","blur(0px");
                $(".j-loading div:nth-child(3)").css("filter","blur(0px");

            }
            else{
                $(".j-loading.show").attr("class","j-loading");
                $(".j-loading div:nth-child(2)").css("width","25px");
                $(".j-loading div:nth-child(2)").css("height","25px");
                $(".j-loading div:nth-child(2)").css("filter","blur(0px");
                $(".j-loading div:nth-child(1)").css("filter","blur(5px");
                $(".j-loading div:nth-child(3)").css("filter","blur(5px");
            }
            number++;
        },1000)

    }
    Vue.prototype.unloading=function () {

    }
    Vue.prototype.websocket=function (name) {
        var self=this;
        var web="ws://39.108.236.127:9502";
        window.websocket=new WebSocket(web);
        websocket.onopen=function (evt) {
            console.log("连接成功");
            websocket.send(JSON.stringify(
                {
                    'username':name,
                    'type':'init'
                }
            ));
        }
        websocket.onclose=function (evt) {
            console.log("关闭");
        }
        websocket.onmessage=function (evt) {
            var system_data=eval('(' + evt.data + ')');
            if(system_data.type=='system')
            {
                if(typeof(show_flag)=='undefined') {
                    var show_flag=1;
                    alert("在线人数" + system_data.online_count);
                }
                self.variate.online_list=system_data.online;
                self.variate.name_list=[];
                for(var i in self.variate.online_list){
                    self.variate.name_list.push(i);
                }
            }
            else{
                alert(evt.data);
            }
        }
        websocket.onerror=function (evt,e) {
            console.log('error');
        }
    }
    Vue.prototype.getCookie=function (cookieName) {
        var strCookie = document.cookie;
        if(document.cookie=="")
        {
            if(localStorage.getItem(cookieName)!=null)
            {
                return localStorage.getItem(cookieName);
            }
            else {
                return "";
            }
        }
        var arrCookie = strCookie.split("; ");
        for(var i = 0; i < arrCookie.length; i++){
            var arr = arrCookie[i].split("=");
            if(cookieName == arr[0]){
                return decodeURIComponent(arr[1]);
            }
        }
        return "";
    }
    Vue.prototype.websocket=function(name)
    {
        var self=this;
        self.request_connect_server();
        var web="ws://39.108.236.127:9502";
        window.websocket=new WebSocket(web);
        websocket.onopen=function (evt) {
            console.log("连接成功");
            websocket.send(JSON.stringify(
                {
                    'username':name,
                    'type':'init',
                    'token_value':localStorage.getItem("server_token"),
                }
            ));
        }
        websocket.onclose=function (evt) {
            console.log("关闭");
        }
        websocket.onmessage=function (evt) {
            var system_data=eval('(' + evt.data + ')');
            if(Array.isArray(system_data))
            {
                console.log("is_array");
                for(var i of system_data)
                {
                    switch (i.type.toString()) {
                        case "alert":
                            alert(i.message);
                            break;
                        case "text":
                            layer.msg({
                                title:i.title,
                                type: 1,
                                content:system_data["content"]
                            });
                            break;
                        case "html":
                            layer.open({
                                title:i.title,
                                type: 1,
                                content:system_data["content"]
                            });
                            break;
                        case "msg":
                            layer.open({
                                title:i.title,
                                type: 1,
                                content:system_data["content"]
                            });
                            break;
                        case "window":
                            layer.open({
                                title:i.title,
                                type: 1,
                                offset: 't',
                                content:system_data["content"]
                            });
                            break;
                        case "other_commit":
                            break;
                        case "reply":
                            self.$store.state.notify_list.push(i);
                            break;
                        default:
                            break;
                    }
                }
                return;
            }
            else {
                if(typeof(system_data)=="string") {
                    system_data = eval('(' + system_data + ')');
                    console.log(system_data);
                    console.log("obejct");
                }
                var is_return=false;
                switch (system_data["type"]) {
                    case "alert":
                        is_return=true;
                        alert(system_data.content);
                        break;
                    case "window":
                        layer.open({
                            title:system_data["title"],
                            type: 1,
                            offset: 't',
                            content:system_data["content"]
                        });
                        break;
                    case "other_commit":
                        is_return=true;
                        break;
                    case "reply":
                        self.$store.state.notify_list.push(system_data);
                        is_return=true;
                        break;
                    case "close":
                        alert(system_data["message"]);
                        self.exit_login();
                        break;
                    default:
                        break;
                }
            }
            if(system_data.type=='system')
            {
                if(self.flag==null)
                {
                    console.log(system_data);
                    self.toast("在线人数" + system_data.online_count);
                    self.flag="unshow";
                }
                self.$store.state.socket_list=system_data.online;
                self.$store.state.name_list=[];
                var cook_name=self.getCookie("name");
                for(var i in self.$store.state.socket_list){
                    if(i!=cook_name) {
                        self.$store.state.name_list.push(i);
                        if(self.$store.state.message_list.hasOwnProperty(i)==false)
                        {
                            self.$store.state.message_list[i]=0;
                        }
                    }
                }
                localStorage.setItem("name_list",JSON.stringify(self.name_list));
                localStorage.setItem("socket_list",JSON.stringify(self.socket_list));
            }
            else {
                var data;
                var date = new Date();
                var time = date.getMonth() + "月" + date.getDay() + "日" + date.getHours() + ":" + date.getMinutes();
                if (localStorage.getItem(system_data.source) == null) {
                    localStorage.setItem(system_data.source, JSON.stringify([]));
                }
                data = localStorage.getItem(system_data.source);
                data = eval('(' + data + ')');
                data.push({"name":system_data.source,"type":system_data.type,"message":system_data.message, "time": time});
                if (self.$store.state.name = system_data.source) {
                    self.$store.state.chat_data = data;
                }
                localStorage.setItem(system_data.source, JSON.stringify(data));
                var old_list = self.$store.state.message_list;
                var number = self.$store.state.message_list[system_data.source];
                number = number + 1;
                self.$store.state.message_list = {};
                old_list[system_data.source] = number;
                self.$store.state.message_list = old_list;
                var music = document.getElementById("message_music");
                music.loop=false;
                music.play();
            }
        }
        websocket.onerror=function (evt,e) {
            console.log('error');
        }
    }
    Vue.prototype.SHA256=function (s){

            var chrsz   = 8;
            var hexcase = 0;

            function safe_add (x, y) {
                var lsw = (x & 0xFFFF) + (y & 0xFFFF);
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xFFFF);
            }

            function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
            function R (X, n) { return ( X >>> n ); }
            function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
            function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
            function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
            function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
            function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
            function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

            function core_sha256 (m, l) {
                var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
                var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
                var W = new Array(64);
                var a, b, c, d, e, f, g, h, i, j;
                var T1, T2;

                m[l >> 5] |= 0x80 << (24 - l % 32);
                m[((l + 64 >> 9) << 4) + 15] = l;

                for ( var i = 0; i<m.length; i+=16 ) {
                    a = HASH[0];
                    b = HASH[1];
                    c = HASH[2];
                    d = HASH[3];
                    e = HASH[4];
                    f = HASH[5];
                    g = HASH[6];
                    h = HASH[7];

                    for ( var j = 0; j<64; j++) {
                        if (j < 16) W[j] = m[j + i];
                        else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                        T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                        T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                        h = g;
                        g = f;
                        f = e;
                        e = safe_add(d, T1);
                        d = c;
                        c = b;
                        b = a;
                        a = safe_add(T1, T2);
                    }

                    HASH[0] = safe_add(a, HASH[0]);
                    HASH[1] = safe_add(b, HASH[1]);
                    HASH[2] = safe_add(c, HASH[2]);
                    HASH[3] = safe_add(d, HASH[3]);
                    HASH[4] = safe_add(e, HASH[4]);
                    HASH[5] = safe_add(f, HASH[5]);
                    HASH[6] = safe_add(g, HASH[6]);
                    HASH[7] = safe_add(h, HASH[7]);
                }
                return HASH;
            }

            function str2binb (str) {
                var bin = Array();
                var mask = (1 << chrsz) - 1;
                for(var i = 0; i < str.length * chrsz; i += chrsz) {
                    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
                }
                return bin;
            }

            function Utf8Encode(string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            }

            function binb2hex (binarray) {
                var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
                var str = "";
                for(var i = 0; i < binarray.length * 4; i++) {
                    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
                        hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
                }
                return str;
            }

            s = Utf8Encode(s);
            return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
        }
        Vue.prototype.menu=function (menu_name) {
                $(".caidan i").each(function () {
                    var val=$(this).attr("class");
                    if(val.indexOf("tianchong")!=-1) {
                        val=val.split("tianchong");
                        $(this).attr("class",val[0]);
                    }
                });
                var val=menu_name;
                if(val.indexOf("tianchong")==-1) {
                    val = val + "tianchong";
                    val=val.replace("."," ");
                }
                $("."+menu_name).attr("class",val);
            }
            Vue.prototype.is_login=function () {
                var self=this;
                if(self.getCookie("name").length<1)
                {
                    var go=window.location.href;
                    self.toast("登录发现更多");
                    window.location.href="#/login?go="+go;
                    return;
                }
            }
            Vue.prototype.timestamp=function () {
                var timestamp=new Date().getTime();
                timestamp=timestamp.toString().substring(0,timestamp.toString().length-3);
                return timestamp;
            }
            Vue.prototype.request_connect_server=function() {
                if (localStorage.getItem("server_token") == null) {
                    this.$http.post("http://39.108.236.127/php/public/index.php/user/server",
                        {
                            csrf_token: localStorage.getItem("csrf_token")
                        },{emulateJSON: true}).then(function (res) {
                        var data = eval('(' + res.bodyText + ')');
                        if (data.code == 200) {
                            localStorage.setItem("server_token", data.server_token);
                        } else {

                        }
                    }).catch(function (error) {
                        console.log(error);
                    }).bind(this);
                }
            }
            Vue.prototype.compress_img_base64=function(path, obj,quality) {
                var img = new Image();
                img.src = path;
                img.onload = function () {
                    var that = this;
                    // 默认按比例压缩
                    var w = that.width,
                        h = that.height,
                        scale = w / h;
                    w = obj.width || w;
                    h = obj.height || (w / scale);
                    console.log(obj.size);
                    // 默认图片质量为0.7
                    //生成canvas
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    // 创建属性节点
                    var anw = document.createAttribute("width");
                    anw.nodeValue = w;
                    var anh = document.createAttribute("height");
                    anh.nodeValue = h;
                    canvas.setAttributeNode(anw);
                    canvas.setAttributeNode(anh);
                    ctx.drawImage(that, 0, 0, w, h);
                    // 图像质量
                    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                        quality = obj.quality;
                    }
                    // quality值越小，所绘制出的图像越模糊
                    var base64 = canvas.toDataURL('image/jpeg', quality);
                    // 回调函数返回base64的值
                    return base64;
                }
            }
    Vue.prototype.date_timestamp=function (time) {
        var timestamp=new Date(time).getTime();
        return timestamp.toString().substring(0,timestamp.toString().length-3);
    }
    Vue.prototype.get_time_different=function (endDate,startDate) {
        var ms = endDate- startDate;
        if (ms < 0) return 0;
        if((ms/60/60)<24){
        return (Number((ms/60/60).toFixed(0))+Number(1))+"小时以内";
        }
        else
        {
            (Number((ms/60/60/24).toFixed(0))+Number(1))+"天以前";
        }
    }
    Vue.prototype.get_head_img=function (name1) {
        if(localStorage.getItem(name1+"_head_img")==null)
        {
            var head_img;
            $.ajax({
                url : 'http://39.108.236.127/php/public/index.php/user/head_img',
                type : 'get',
                async: false,//使用同步的方式,true为异步方式
                data : {  name:name1},//这里使用json对象
                success : function(data){
                    data=eval('('+data+')');
                    console.log(data["head_img"]);
                    localStorage.setItem(name1+"_head_img",data["head_img"]);
                    head_img=data["head_img"];
                },
                fail:function(err){
                    console.log(err);
                }
            });
            return head_img;
        }
        else {
            return localStorage.getItem(name1+"_head_img");
        }
    }
};