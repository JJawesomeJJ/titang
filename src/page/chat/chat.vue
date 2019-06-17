<template>
    <div class="container">
        <div class="title">
            <div class="head_img"><img v-bind:src="get_head_img(getCookie('name'))" style="width: 40px;height: 40px;border-radius: 50px;position: relative;top:5px;"></div>
            <h1>消息</h1>
         </div>
        <div class="search"><input type="text" placeholder="搜索"></div>
        <li v-for="i in $store.state.notify_list" v-if="i.type=='reply'" class="notify_list">
                <div class="all">
                    <div style="display: flex;">
                    <div class="head_img"><img :src="i.message.head_img" style="width: 40px;height: 40px;border-radius: 50px;position: relative;top:5px;"></div>
                    <div style="position:relative;top:0px;margin-left:0px;">
                        <h1 style="font-size:20px;line-height:35px;">{{i.message.who}}</h1>
                        <h1 style="color: black;line-height: 10px;font-weight: lighter;font-size: 15px;">{{i.message.reply_content}}</h1>
                    </div>
                    <div style="position:absolute;right: 20px;top:10px;text-align: center;">
                        <h3 style="color:black;font-weight: lighter;">来自{{i.message.reply_source}}的回复</h3>
                    </div>
                    </div>
                    <div style="width:60px;height: 100%;background-image: linear-gradient(90deg,#0af,#0085ff);position: absolute;right: -60px;z-index: 999;" @click="test()"><h1 style="color: white;font-weight: lighter;text-align: center;font-size: 15px;">置顶</h1></div>
                    <div style="width:60px;height: 100%;background-image:linear-gradient(90deg,#FF5053,#FF3B30);position: absolute;right: -120px;"><h1  style="color: white;font-weight: lighter;text-align: center;font-size: 15px;">删除</h1></div>
                </div>
        </li>
        <li v-for="i in $store.state.name_list">
            <router-link :to="{path:'/chat_to',query:{name:i,socket_id:$store.state.socket_list[i]}}">
                <div class="all">
                    <div class="head_img"><img v-bind:src="get_head_img(i)" style="width: 40px;height: 40px;border-radius: 50px;position: relative;top:5px;"></div>
                    <div style="position:relative;top:0px;margin-left:0px;">
                        <h1 style="color: black;">{{i}}</h1>
                        <h2 style="display:none;"></h2>
                    </div>
                    <div style="position:absolute;right: 20px;top:10px;text-align: center;" v-if="$store.state.message_list[i]!=0">
                        <h3></h3>
                        <div class="number">{{$store.state.message_list[i]}}</div>
                    </div>
                </div>
            </router-link>
        </li>
    </div>
</template>

<script>
    export default {
        name: "chat",
        data(){
            return{
                name:null,
                list_is_move:false,
                name_list:[],
                socket_list:{},
                head_img:null,
                flag:null
            }
        },
        watch:{
            online_list: {
                handler(newName, oldName) {
                },
                immediate: true,
                deep: true
            }
        },
        created(){
            this.is_login();
            this.menu("iconfont.icon-sousuo");
            this.name=this.getCookie("name");
            this.is_websocket();
        },
        updated(){
            //this.left_shift();
        },
        mounted(){
          this.left_shift(".notify_list");
        },
        destroyed:function () {
        },
        methods:{
            test(){
              alert("test");
            },
            is_exist(){
                var url="http://39.108.236.127/head_img/"+this.email+".jpeg";
                this.$http.get(url).then((res)=>{
                    this.head_img=url;
                }).catch((res)=>{
                    this.head_img="http://img3.imgtn.bdimg.com/it/u=3931249197,3470570548&fm=26&gp=0.jpg";
                })
            },
            local_load(){
                if(this.name_list==null)
                {
                    this.name_list=eval('('+localStorage.getItem("name_list")+')');
                }
                if(this.socket_list==null){
                    this.socket_list=eval('('+localStorage.getItem("socket_list")+')');
                }

            },
            is_websocket(){
                if(typeof(websocket)=='undefined'||websocket.readyState==3)
                {
                    if(this.name.length>0) {
                        this.websocket(this.name);
                    }
                }
            },
            left_shift(element){
                var list_is_move=false;
                var move=false;
                var is_move=false;
                var startX;
                var startY;
                var moveEndY;
                var moveEndX;
                var X;
                var Y;
                $(element).on("touchstart", function(e) {
                    //e.preventDefault();
                    $(element).stop();
                    $(element).css("left","0px");
                    startX = e.originalEvent.changedTouches[0].pageX,
                        startY = e.originalEvent.changedTouches[0].pageY;
                });
                $(element).on("touchmove", function(e) {
                    //e.preventDefault();
                    moveEndX = e.originalEvent.changedTouches[0].pageX;
                    moveEndY = e.originalEvent.changedTouches[0].pageY;
                    X = moveEndX - startX;
                    Y = moveEndY - startY;
                    if(X>0)
                    {
                        move="right";
                        var left = $(this).css("left");
                        left = left.substring(0, left.length - 2);
                        left=Number(left)+X;
                        if(left<=0){
                            $(this).css("left",left+"px");
                        }
                    }
                    if(X<0){
                        move="left";
                        if(X<0&&X>-120)
                        {
                            $(this).css("left",X+"px");
                        }
                    }
                });
                $(element).on("touchend",function (e) {
                    if(move=="left") {
                        var left = $(this).css("left");
                        left = left.substring(0, left.length - 2);
                        if (Math.abs(left) > 40) {
                            $(this).animate({"left": "-120px"});
                        } else {
                            $(this).animate({"left": "0px"});
                        }
                    }
                    if(move=="right")
                    {
                        $(this).animate({"left": "0px"});
                    }
                });

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
    overflow: hidden;
}
    .title{
        display:flex;
        position: relative;
        width: 100%;
        height:50px;
        background-image: linear-gradient(90deg,#0af,#0085ff);
    }
   .title h1{
        width: 78%;
        line-height:50px;
        text-align: center;
        font-size: 18px;
        color: white;
        font-weight: lighter;
    }
    .search{
        width: 100%;
        height: 35px;
        background-color: white;
        opacity: 0.9;
    }
    .search input{
        top: 5%;
        position: relative;
        left: 5%;
        width: 90%;
        height: 90%;
        background-color:#d8d8d8;
        opacity: 0.9;
        border: 1px solid white;
        border-radius: 5px;
        text-align: center;
    }
    li{
        display: flex;
        position: relative;
        height: 50px;
        width: 100%;
        border-bottom:0.5px solid grey;
        background-color: white;
    }
    .all{
        display: flex;
        height: 100%;
        width: 100%;
        position: relative;
    }
    li h1{
        line-height:50px;
        font-weight: lighter;
        font-size:20px;
        color: black;
    }
    li h2{
        color:grey;
    }
    .number{
        background-color: #00aaff;
        width: 20px;
        height: 20px;
        border-radius: 10px;
    }
    a{
        color: black;
        width: 100%;
    }
</style>