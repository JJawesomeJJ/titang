<template>
    <div class="container_content" @click="dis()" >
        <div class="title">{{title}}</div>
        <div class="content" v-html="content">
            <div class="j-comment"></div>
        </div>
        <div class="comment_data">
        <li class="comment_container" v-for="i in this.comment">
            <div style="margin-top: 20px" v-if="i.comment!=null">
                <span><div class="iconfont icon-yonghu "></div><h1 style="line-height: 40px">{{i.user_id}}</h1><div class="iconfont icon-zan"style="margin-left: 240px;font-size: 20px;line-height: 35px"></div><div class="iconfont icon-gengduo" style="font-size: 20px"></div></span>
            <h1 style="margin-left:40px;margin-top:10px">{{i.comment}}</h1>
            </div>
        </li>
        </div>
        <div class="share_container" style="width:100%;height:65px;background-color:#2c3e50;position: fixed;bottom:40px;display: none;opacity: 0.8">
            <h1 style="position:relative;color:white;left:49%;line-height:21px;" >分享</h1>
            <div style="position: relative;">
                <ul style="display: flex;height: 100%;">
                    <li class="share" style="position: relative;"@click="share_xl('weibo')"><img src="https://ss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/wisegame/wh%3D68%2C68/sign=575e541cf0faaf5184b689b9b478a2d6/a044ad345982b2b749e7c5fe3cadcbef76099b94.jpg" style="width:45px;height:45px;border-radius: 10px"></li>
                    <li class="share" style="position: relative;left:-35%;"@click="share_xl('qq')"><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4191939046,1440445254&fm=26&gp=0.jpg" style="width:45px;height:45px;border-radius: 10px"></li>
                </ul>
            </div>
        </div>
        <div class="j-comment">
            <li class="ping"><div class="icon iconfont icon-zuojiantou" @click="back"></div></li>
            <li class="ping"><input type="text" name="comment_content" id="comment_content"></li>
            <li class="ping"><div class="iconfont icon-tiquliuliang1" v-on:click="comment_data"></div></li>
            <li class="ping"><div class="iconfont icon-fenxiang" @click="hover()"></div></li>
            <li class="ping"><div class="iconfont icon-erweima" @click="show()"></div></li>
        </div>
        <div class="back" style="position: fixed;top:0px;height:100%;width:100%;background-color: #2c3e50;opacity:0.8;display:none;vertical-align:center;text-align: center;" @click="visable()">
            <img src="http://39.108.236.127/image/code.jpg" style="height: 100px;width:100px;position: relative;top:35%;">
        </div>
    </div>
</template>

<script>
    export default {
        name: "news_content",
        data(){
            return{
                name:null,
                content:null,
                title:null,
                url:null,
                comment:[]
            }
        },
        created:function(){
            this.menu("iconfont.icon-wangting");
            this.title=this.$route.query.title;
            this.url=this.$route.query.url;
            this.get_cache_content();
            this.loading();
            this.j_nav_dis();
            addEventListener('scroll',null);
        },
        mounted () {
        },
        destroyed:function () {
            this.j_nav_show();
            this.debug_hide_j_loading();//为了解决数据未加载导致j-loading一直显示
        },
        watch:{
            content:function () {
                this.get_comment();
                //console.log(this.comment)
                this.data_src();//为了将后端提取的图片显示出来
                $(".j-loading").css("display", "none");
            }
        },
        updated: function () {
            this.data_src();
        },
        methods:{
            debug_hide_j_loading(){
                if($(".j-loading").css("display")!="none")
                {
                    $(".j-loading").css("display","none");
                }
            },
            get_cache_content() {
                if (localStorage.getItem("content_cache") == null) {
                    this.get_content(this.url);
                }
                else {
                    var content_cache_ = JSON.parse(localStorage.getItem("content_cache"));
                    if (content_cache_.url == this.url) {
                        this.content = content_cache_.content.replace(/\\n/g,'<br>').replace(/\\t/g,'').replace(/\\r/g,'').replace(/\\"\/\//g,'"http:\/\/').replace(/jpg\\"/g,'jpg"').replace(/<a href.*?>/g,'').replace("/\/\//g","");
                        console.log(this.content);
                    }
                    else {
                        this.get_content(this.url);
                    }
                }
            },
            back(){
                window.location.href="http://39.108.236.127/#/news_list";
            },
            j_nav_dis() {
                $(".j-nav-tail").slideUp(200);
            },
            j_nav_show(){
                $(".j-nav-tail").slideDown(200);
            },
            show(){
                $(".back").slideDown(200);
            },
            visable(){
                $(".back").css("display","none");
            },
            get_content(url) {
                var url1='http://39.108.236.127/php/api/news.php?url='+url.replace(/&/g,'*');
                console.log(url1)
                this.$http.jsonp(url1, {
                    jsonpCallback: "callback",
                }).then(function (res) {
                    this.content=res.body.replace(/\\n/g,'<br>').replace(/\\t/g,'').replace(/\\r/g,'').replace(/\\"\/\//g,'"http:\/\/').replace(/jpg\\"/g,'jpg"').replace(/<a href.*?>/g,'').replace(/.png\\/g,".png");
                    console.log(this.content);
                    var cache={"url":this.url,"content":this.content}
                    localStorage.setItem("content_cache",JSON.stringify(cache));
                    $(".j-loading").css("display","none");
                }.bind(this));
            },
            get_comment(){
                var url="http://39.108.236.127/php/api/comment_query.php";
                var senddata={
                    url:this.url
                }
                this.$http.jsonp(url,{
                    jsonpCallback: "callback",
                    params:senddata
                }).then(function (res) {
                    console.log(res.body);
                    for(var i=0;i<res.body.length;i++)
                    {
                        this.comment.push(res.body[i]);
                    }
                });
            },
            comment_data(){
                this.is_login();
                var com=document.getElementById("comment_content").value;
                if(com.trim()=="")
                {
                    this.toast("大爷，还没写内容呢！");
                    return;
                }
                var url="http://39.108.236.127/php/api/news_comment.php";
                var sendata={
                    comment:com,
                    url:this.url,
                }
                this.comment=[]
                this.$http.jsonp(url,{
                    jsonpCallback:"callback",
                    params:sendata
                }).then(function (res) {
                    if(res.body.code=='200')
                    {
                        this.toast("评论成功");
                        this.get_comment();
                        $("input").val("");
                        var music = document.getElementById("message_send");
                        music.loop=false;
                        music.play();
                    }
                    if(res.body.code=="403")
                    {
                        this.toast("登录失效");
                        this.setcookie('','',-1);
                        window.location.href = "#/user";
                    }
                }.bind(this)).catch(function (res) {
            console.log(res)
        })
            },
            hover(){
                $(".icon-fenxiang").css("background","#2c3e50");
                $(".share_container").slideDown(200);
    },
            dis(){
                $(".content").not(".icon-fenxiang").click(function () {
                    $(".icon-fenxiang").css("background-color","grey");
                    $(".share_container").slideUp(200);
                })
            },
            data_src(){
                $(".content img").each(function(){
                    var path=$(this).attr('data-src');
                    $(this).attr('src',path);
                    $(this).attr('style',"width:100%;")
                    if($(this).attr('class')=="\\\"art_img_mini_img")
                    {
                        $(this).css("display","none");
                    }
                });

            },
            share_xl(res){
                var url={
                    weibo: "http://service.weibo.com/share/share.php?url="+window.location.href,
                    qq: "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" +window.location.href+ "&title=" + "&desc=" + "&summary=&site=",
                }
                var url1=url[res]
                window.open(url1)
            },
        }
    }
</script>

<style scoped>
    .container_content{
        background-color:lightgrey;
        position: absolute;
        width: 100%;
    }
.content{
    position: relative;
    line-height: 50px;
    font-size:21px;
    padding-bottom: 2vh;
}
.comment_data{
    position: relative;
    margin-bottom: 55px;
    padding-bottom: 5vh;
}
span{
    display: flex;
}
{
    margin-left: 5px;
}
    .j-comment{
        background-color:grey;
        line-height:42px;
        position:fixed;
        display: flex;
        width:100%;
        height:40px;
        bottom:0px;
        border-top: 1px solid #007aff;
        opacity:0.9;
        margin-top: 50px;
    }
    h{
        line-height: 45px;
    }
img{
    width: 100%;
}
figure{
    margin-top: 0px;
    position: relative;
    top:0px;
}
.title{
    position:relative;
    width: 100%;
    height: 60px;
    background-color: #0086b3;
    background-image: linear-gradient(90deg,#0af,#0085ff);
    color: white;
    font-weight: lighter;
    text-align: center;
    font-size: 30px;
    line-height:60px;
}
input{
    height: 60%;
    width: 100%;
    border-radius: 8px;
    padding: 2px 5px;
    border: 1.1px solid black;
}

.comment_container{
    display: flex;
}
.ping{
    margin-left: 13px;
}
.icon-yonghu
{
    text-align: center;
    line-height: 41px;
    width: 40px;
    height: 40px;
    margin-top: 5px;
    background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534307402308&di=49936e5ddd1ec1928912b4bc61d820ba&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F10%2F53%2F80%2F72b1OOOPIC6e.jpg");
    background-size: 100% 100%;
    border-radius: 20px;
    font-size:34px;
}
.iconfont{
    font-size: 30px;
}
.share{
    width: 100%;
    height: 100%;
}


    @media screen and (max-width: 690px){
        .title{
            font-size: 15px;
        }
    }

</style>