<template>
    <div class="container">
            <div class="title">
            <router-link to="/chat"><div class="iconfont icon-zuojiantou" style=""></div></router-link>
                <h1 style="text-align: center;margin:0px auto;font-size:15px;color: white;line-height: 50px;">{{name}}</h1>
            <router-link to="/chat"><div class="iconfont icon-yonghu" style="position:relative;right: 0px;"></div></router-link>
        </div>
        <div class="curtain"></div>
        <div id="chat_back">
            <li v-for="i in this.$store.state.chat_data">
                <div class="left" v-if="i.name==name&&name!=null">
                <div class="head_img"><img v-bind:src="get_head_img(name)"></div>
                <div class="me_padding">
                    <img v-if="i.type=='image'" v-bind:src="i.message" @click="show_large(i.message)">
                    <p class="me" v-if="i.type=='text'">{{i.message}}</p>
                </div>
                </div>
                <div class="right" v-else>
                    <div style="display: flex;">
                        <div class="right_head_img"><img v-bind:src="get_head_img(my_name)"></div>
                    <div class="right_me_padding">
                            <img v-if="i.type=='image'" v-bind:src="i.message" @click="show_large(i.message)">
                        <p class="me_right" v-if="i.type=='text'">{{i.message}}</p>
                    </div>
                        <div style="width: 5px;height: 5px;"></div>
                </div>
                </div>
            </li>
        </div>
        <div class="chat">
            <input type="text" class="chat_data" style="position:relative;width:81%;left:1%;height: 80%;top:10%;border-radius: 5px;padding: 0px 5px;opacity: 0.9;">
            <div class="iconfont icon-tianjia" @click="image_show()" style="width: 50px;height: 50px;text-align: center;font-size:29px;"></div>
            <input type="button"  @click="send_data()" style="color: white;font-weight:lighter;position:relative;width:13.5%;font-size:10px;;height: 80%;top:10%;border-radius: 5px;background-image: linear-gradient(90deg,#02C1ED,#8a6de9);" value="发送" >
        </div>
        <div class="image" style="display: none;position: fixed;background-color:white;opacity: 0.95;width: 100%;height:auto;bottom:40px;">
            <div style="display: flex;flex-wrap: wrap">
                <li v-for="i in this.expression_list" class="expression" @click="message_add_expression(i)">
                    <h1>{{i}}</h1>
                </li>
                <div class="iconfont icon-tupian" style="font-size:30px;color:#32cd32;position: relative;left: 5px;"></div>
                <input type="file" id="file" style="position:relative;width:20px;height:30px;z-index: 999;opacity:0;left: -20px;" accept="image/jpeg,image/jpg,image/png" @change="post_image();">
            </div>
        </div>
        <div class="back" style="position:fixed;display:none;top:0px;height:100%;width:100%;background-color: #2c3e50;opacity:1;vertical-align:middle;text-align: center;" @click="visable()">
            <img id="large" src="http://39.108.236.127/image/code.jpg" style="position:relative;height:auto;width:100%;margin: 0 auto;vertical-align:middle;">
        </div>
    </div>
</template>

<script>
    export default {
        name: "chat_to",
        data(){
            return{
                name:null,
                socket_id:null,
                head_img:null,
                my_name:null,
                expression_list:["😁","😂","😃","😄","👿","😉","😊","😌","😍","😏","😒","😓","😔","😖","😘","😚","😜","😝","😞","😡","😢","😣","😥","😨","😪","😭","😰","😱","😲","😳","😷","🙃","😋","😗","😛","🤑","🤓","😎","🤗","🙄","🤔","😩","😤","🤐","🤒","😴","👯","👶","👦","👧","👨","👩","👫","👱","👲","👳","👴","👵","👮","👷","👸","💂","👼","🎅","👻","💩","💀","👽","👾","💁","🙅","🙆","💆","💇","🙋","🙇","💑","💏","🙌","👏","👂","👀","👃","👄","💋","💅","👋","👍","👎","👆","👇","👈","👉","👌","✌","✊","💪","👐","🙏"]
            }
        },
        watch:{
            name_list: {
                handler(newName, oldName) {
                },
                immediate: true,
                deep: true
            }
        },
        updated(){
            this.page_down();
        },
        created(){
            this.menu("iconfont.icon-sousuo");
            this.my_name=this.getCookie("name");
            this.is_websocket();
            this.name=this.$route.query.name;
            this.socket_id=this.$route.query.socket_id;
            this.load();
            this.j_nav_dis();
            this.page_down();
            this.$store.state.name=this.name;
        },
        destroyed(){
            this.j_nav_show();
            this.set();
            this.$store.state.name=null;
        },
        mounted (){
            this.set_hei();
        },
        methods: {
            message_add_expression(data) {
                var all = $(".chat_data").val() + data;
                $(".chat_data").val(all);
            },
            show_large(url) {
                $(".back").fadeIn(300);
                var large = document.querySelector("#large");
                large.setAttribute("src", url);
                var hei = $("#large").height();
                var all = $(".back").height();
                var mid = (all - hei) / 2;
                if (mid <= 0) {
                    $("#large").css("padding-top", "0px");
                    $("#large").css("margin-top", "50px");
                }
                else {
                    mid = mid + "px";
                    $("#large").css("padding-top", mid);
                }
            },
            visable() {
                $(".back").css("display", "none");
            },
            image_show() {
                if ($(".image").css("display") == "none") {
                    $(".image").slideDown(300);
                }
                else {
                    $(".image").slideUp(300);
                }
            },
            image_dis() {
                $(".image").slideUp(300);
            },
            load_message_data() {
                this.$store.state.chat_data = eval('(' + localStorage.getItem(this.name) + ')');
            },
            set() {
                this.$store.state.message_list[this.name] = 0;
            },
            back() {
                window.location.href = "#/chat"
            },
            load() {
                this.$store.state.chat_data = eval('(' + localStorage.getItem(this.name) + ')');
                document.onkeydown = function (e) {
                    var theEvent = window.event || e;
                    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                    if (code == 13) {
                        this.send_data();
                    }
                }.bind(this);
            },
            j_nav_dis() {
                $(".j-nav-tail").slideUp(200);
            },
            j_nav_show() {
                $(".j-nav-tail").slideDown(200);
            },
            page_down() {
                var height = $(document).height() + 500;
                $(document).scrollTop(height);
                console.log("act");
            },
            send_data() {
                var me_data = $(".chat_data").val();
                $(".chat_data").val("");
                if (me_data.trim().length == 0) {
                    return;
                }
                websocket.send(JSON.stringify({
                    'message': me_data,
                    'type': 'chat',
                    'message_type': 'text',
                    'source': this.my_name,
                    'to': this.name
                    })
                )
                if (localStorage.getItem(this.name) == null) {
                    localStorage.setItem(this.name, JSON.stringify([]));
                }
                var data = localStorage.getItem(this.name);
                data = eval('(' + data + ')');
                var date = new Date();
                var time = date.getMonth() + "月" + date.getDay() + "日" + date.getHours() + ":" + date.getMinutes();
                data.push({"name": this.my_name, "type": "text", "message": me_data, "time": time});
                this.$store.state.chat_data = data;
                localStorage.setItem(this.name, JSON.stringify(data));
                this.page_down();
                var music = document.getElementById("message_send");
                music.loop = false;
                music.play();
                if ($(".image").css("display") == "block") {
                    $(".image").slideUp(300);
                }
            },
            is_websocket() {
                if (typeof(websocket) == 'undefined'||websocket.readyState==3) {
                    this.is_login();
                    this.websocket(this.getCookie("name"));
                }
            },
            set_hei() {
                var all_height = $(window).height();
                var top_height = $(".title").height();
                var bottom_height = $(".chat").height();
                var height = all_height - top_height + 40;
                height = height + "px";
                $(".curtain").css("height", height);
            },
            post_image() {
                var file = document.getElementById("file").files[0];
                if (file.size > 1000000) {
                    this.toast("图片太大啦，换个吧");
                    return;
                }
                var reader = new FileReader();
                var imagurlbase64;
                imagurlbase64 = reader.readAsDataURL(file);
                reader.onload = function (e) {
                    websocket.send(JSON.stringify({
                            'message': reader.result,
                            'message_type': 'image',
                            'type': 'chat',
                            'source': this.my_name,
                            'to': this.name
                        })
                    )
                    if (localStorage.getItem(this.name) == null) {
                        localStorage.setItem(this.name, JSON.stringify([]));
                    }
                    var data = localStorage.getItem(this.name);
                    data = eval('(' + data + ')');
                    var date = new Date();
                    var time = date.getMonth() + "月" + date.getDay() + "日" + date.getHours() + ":" + date.getMinutes();
                    data.push({"name": this.my_name, "type": "image", "message": reader.result, "time": time});
                    this.$store.state.chat_data = data;
                    localStorage.setItem(this.name, JSON.stringify(data));
                    this.page_down();
                    var music = document.getElementById("message_send");
                    music.loop = false;
                    music.play();
                }.bind(this);
            },
            image_compress(result,quality) {
                var image = new Image();
                image.src = result;
                image.onload(() => {
                    var width = this.width;
                    var height = this.height;
                    var cvs=documnet.createElement("canvas");
                    var ctx=cvs.getContext('2d');//设置绘图模式
                    cvs.width=image.width;
                    cvs.height=image.height;
                    ctx.drawImage(image,0,0,cvs.width,cvs.height);
                    canvas.toBlob()
                })
            }
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        position: relative;
        top:0px;
    }
    .title{
        display:flex;
        position: fixed;
        top:0px;
        width: 100%;
        height:50px;
        background-image: linear-gradient(90deg,#0af,#0085ff);
        overflow: hidden;
        z-index: 999;
    }
    .iconfont{
        font-size: 33px;
        color: white;
        font-weight: lighter;
    }
    .chat{
        position:fixed;
        display: flex;
        width: 100%;
        height: 40px;
        bottom: 0px;
        background-image: linear-gradient(90deg,#0af,#d8d8d8);
        overflow: hidden;
        z-index:888;
    }
    .curtain{
        position: fixed;
        background-image: linear-gradient(90deg,#02C1ED,#8a6de9);
        width: 100%;
        height: 50px;
        top:50px;
        overflow: hidden;
    }
    #chat_back{
        position: relative;
        width: 100%;
        padding-top: 55px;
        padding-bottom: 55px;
        height: auto;
        overflow: hidden;
    }
    li{
        width: 100%;
        min-height: 50px;
        position: relative;
        margin-bottom: 20px;
        padding: 5px 5px;
    }
    .left{
        position: relative;
        display: flex;
    }
    .right{
        position:relative;
        transform:rotateY(180deg);
    }
    .head_img img{
        width: 40px;
        height: 40px;
        border-radius: 50px;
        position: relative;
        top:0px;
        left:5px;
    }
    .right_head_img img{
        width: 40px;
        height: 40px;
        border-radius: 50px;
        position: relative;
        top:0px;
        left: 5px;
    }
    .me_padding{
        position: relative;
        width: auto;
        height: 80%;
        border-radius: 10px;
        background-image: linear-gradient(90deg,#27ae60,#02c1ed);
        margin-left:15px;
        padding:5px 5px;
    }
    .right_me_padding{
        position: relative;
        width: auto;
        height: 80%;
        border-radius: 10px;
        background-image: linear-gradient(90deg,#27ae60,#02c1ed);
        margin-left: 15px;
        padding:5px 5px;
    }
    .right_me_padding img{
        position: relative;
        width:100%;
        height: 100%;
        max-height: 150px;
        margin: 0 auto;
        max-width: 150px;
    }
    .me_padding img{
        position: relative;
        width:100%;
        height: 100%;
        max-height: 150px;
        margin: 0 auto;
        max-width: 150px;
    }
    .me{
        line-height:40px;
        padding-left: 5px;
        padding-right: 5px;
        position: relative;
    }
    .me_right{
        line-height:40px;
        padding-left: 5px;
        padding-right: 5px;
        position: relative;
        transform: rotateY(180deg);
    }
    input{
        border: 0.1px solid #00aaff;
    }
    .debug{
        position: relative;
        width:100%;
        height: 100%;
        max-height: 150px;
        margin: 0 auto;
    }
    .expression{
        width:21px;
        height:5px;
        min-height: 0px;
    }
    .expression h1{
        font-size: 25px;
    }
</style>