<template>
    <div class="container_content" @click="dis()" >
        <div class="title">{{title}}</div>
        <div class="content" v-html="content">
            <div class="j-comment"></div>
        </div>
        <div class="comment_data">
        <li class="comment_container" v-for="i in this.comment">
            <div style="margin-top: 20px" v-if="i.comment_content!=null">
                <span><div class="head-img"><img :src="i.head_img"></div><h1 style="line-height: 45px">{{i.user_id}}</h1>
                    <div class="iconfont icon-zan"style="position: absolute;right:45px;font-size: 20px;line-height: 35px"></div>
                    <div class="iconfont icon-gengduo" style="position: absolute;right:10px;font-size: 20px"></div>
                <div class="gengduo">
                    <h1 @click="reply_show(i.head_img,i.user_id,i.reply_id)">回复</h1>
                    <h1>举报</h1>
                </div></span>
                <h1 style="margin-left:40px;margin-top: -20px;color: #666666;font-weight: lighter;">{{i.time}}</h1>
            <p style="margin-left:45px;margin-top:20px;font-size: 15px;">{{i.comment_content}}</p>
                <div v-for="k in i.reply" style="margin-left:45px;margin-top:10px;display: flex;" @click="reply_show(k.head_img,k.user_id,i.reply_id)">
                    <h1 style="color: #666666;font-weight: lighter;" v-if="k.reply_who==i.user_id">{{k.user_id}}:</h1>
                    <h1 style="color: #666666;font-weight: lighter;" v-else>{{k.user_id+"@"+k.reply_who}}:</h1>
                    <p>{{k.comment_content}}</p>
                </div>
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
            <li class="ping"><div class="iconfont icon-tiquliuliang1" v-on:click="comment_data('reply')"></div></li>
            <li class="ping"><div class="iconfont icon-fenxiang" @click="hover()"></div></li>
            <li class="ping"><div class="iconfont icon-erweima" @click="show()"></div></li>
        </div>
        <div class="back" style="position: fixed;top:0px;height:100%;width:100%;background-color: #2c3e50;opacity:0.8;display:none;vertical-align:center;text-align: center;" @click="visable()">
            <img src="http://39.108.236.127/image/code.jpg" style="height: 100px;width:100px;position: relative;top:35%;">
        </div>
        <div class="reply_back" style="background-color: yellow;opacity: 0;position:fixed;top:0px;height: 100%;width: 100%;display: none;"></div>
        <div class="reply">
            <div style="width: 95%;position: relative;margin: 0 auto;">
            <div class="reply_title" style="display: flex;position: relative;">
                <h1 @click="reply_dis()">取消</h1>
                <h1 style="position: absolute;right: 0px;color: #797979;" v-if="reply_content==null||reply_content.length==0">发表</h1>
                <h1 style="position: absolute;right: 0px;" v-else @click="reply_other()">发表</h1>
            </div>
                <input type="text" v-model="reply_content" name="replay" :placeholder="'回复'+reply_user+reply_id" id="reply_content" style="background-color:lightgrey;border: 0px;height:40px;width: 98%;position:relative;top:10px;margin: 0 auto;box-shadow: none;">
            </div>
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
                reply_user:null,
                reply_content:null,
                head_img:null,
                reply_id:null,
                comment:[{"user_id":"赵李杰","comment":"xixi","time":"2019","reply_id":null}]
            }
        },
        created:function(){
            this.menu("iconfont.icon-wangting");
            this.title=this.$route.query.title;
            this.url=this.$route.query.url;
            this.get_cache_content();
            this.loading();
            this.j_nav_dis();
            this.get_comment();
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
                this.data_src();//为了将后端提取的图片显示出来
                $(".j-loading").css("display", "none");
            }
        },
        updated: function () {
            this.data_src();
            this.reply();
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
                    }
                    else {
                        this.get_content(this.url);
                    }
                }
            },
            back(){
                window.location.href="#/news_list";
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
                var url1='http://39.108.236.127/php/public/index.php/post/news?url='+url.replace(/&/g,'*');
                this.$http.jsonp(url1, {
                    jsonpCallback: "callback",
                }).then(function (res) {
                    this.content=res.body.replace(/\\n/g,'<br>').replace(/\\t/g,'').replace(/\\r/g,'').replace(/\\"\/\//g,'"http:\/\/').replace(/jpg\\"/g,'jpg"').replace(/<a href.*?>/g,'').replace(/.png\\/g,".png");
                    var cache={"url":this.url,"content":this.content}
                    localStorage.setItem("content_cache",JSON.stringify(cache));
                    $(".j-loading").css("display","none");
                }.bind(this));
            },
            get_comment(){
                var url="http://39.108.236.127/php/public/index.php/post/get_comment";
                var senddata={
                    url:this.url
                }
                this.$http.get(url,{
                    params:senddata,
                }).then(function (res) {
                    var comment_list=eval('('+res.bodyText+')');
                    for(var i=0;i<comment_list.length;i++)
                    {
                        comment_list[i].time=this.get_time_different(this.timestamp(),this.date_timestamp(comment_list[i].time));
                    }
                    var list=[];
                    if(!Array.isArray(comment_list))
                    {
                        var com_list=[];
                        com_list.push(comment_list);
                        comment_list=com_list;
                    }//debug
                    for(var i of comment_list)
                    {
                        if(i.reply_who==this.url)
                        {
                            list.push(i);
                            var index=list.indexOf(i);
                            list[index]["reply"]=[];
                            for(var k of comment_list)
                            {
                                if(k.reply_who==this.url){
                                    continue;//avoid repetit
                                }
                                if(k.reply_id==i.reply_id)
                                {
                                    list[index]["reply"].push(k)
                                }
                            }
                        }
                    }
                    this.comment=list;
                    console.log(list);
                }).bind(this);
            },
            comment_data(type){
                this.is_login();
                var com=document.getElementById("comment_content").value;
                if(com.trim()=="")
                {
                    this.toast("大爷，还没写内容呢！");
                    return;
                }
                var url="http://39.108.236.127/php/public/index.php/post/comment";
                var sendata={
                    "comment":com,
                    "url":this.url,
                    csrf_token:localStorage.getItem("csrf_token")
                }
                this.comment=[]
                this.$http.get(url,{
                    params:sendata,
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
                    if(res.body.code=="600")
                    {
                        this.toast("登录失效");
                        this.exit_login();
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
                var url1=url[res];
                window.open(url1);
            },
            reply(){
                var self;
                $(".reply_back").click(function () {
                    $(".reply").slideUp(100);
                    $(this).css("display","none");
                });
                $(".icon-gengduo").hover(function () {
                    console.log("load");
                    var ele=$(this).parents().children();
                    for(var i=0;i<ele.length;i++)
                    {
                        if($(ele[i]).attr("class")=="gengduo")
                        {
                            if($(ele[i]).css("display")=="none")
                            {
                                self=ele[i];
                                $(ele[i]).css("display","block");
                            }
                        }
                    }
                },function () {
                    $(self).slideUp(300);
                });
            },
            get_element(e){
                return e.currentTarget.parentElement;
            },
            reply_show(head_img,relay_user,reply_id){
                this.head_img=head_img;
                this.reply_id=reply_id;
                this.reply_user=relay_user;
                if($(".reply").css("display")=="none")
                {
                    $(".reply_back").css("display","block");
                    $(".reply").slideDown(100);
                    $("#reply_content").focus();
                }
            },
            reply_dis(){
                $(".reply").slideUp(100);
                $(".reply_back").css("display","none");
                this.reply_content=null;
            },
            reply_other(reply_user){
                if(this.reply_user!=null&&this.reply_content!=null&&this.reply_id!=null)
                {
                    this.$http.post("http://39.108.236.127/php/public/index.php/post/reply",
                        {
                            reply_who:this.reply_user,
                            comment_content:this.reply_content,
                            reply_id:this.reply_id,
                            url:this.url,
                            full_url:window.location.href.split("news_content?")[1],
                            head_img:this.head_img,
                            csrf_token:localStorage.getItem("csrf_token"),
                        },
                        {emulateJSON: true}).then(function (res) {
                        var res=eval('('+res.bodyText+')');
                        if(res.code=="200")
                        {
                            this.toast("回复成功");
                            this.get_comment();
                            this.reply_dis();
                        }
                        if("code"=="600")
                        {
                            this.toast("登录失效");
                            this.exit_login();
                        }
                    }).catch(function (err) {
                        console.log(err)
                    });
                }
                else {
                    this.toast("亲！还没输入呀！")
                }
            }
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
    position: relative;
    width: 95%;
    margin: 0 auto;
    display: flex;
    border-bottom: 0.05px solid #797979;
    padding-bottom: 30px;
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
.gengduo{
    display: none;
    position: absolute;
    right: 0px;
    top:50px;
    width: 70px;
    height: 70px;
    background-color:black;
    opacity: 0.8;
    border-radius: 10px;
    animation:show 0.3s ease-in-out normal;
}
.gengduo h1{
    color: white;
    text-align: center;
    font-weight: lighter;
    font-size: 15px;
    margin-top:8px;
}
.head-img{
    width: 40px;
    height: 40px;
    border-radius: 50px;
}
.head-img img{
    width: 100%;
    height: 100%;
    border-radius: 50px;
}
.reply{
    display: none;
    position: fixed;
    bottom: 0px;
    z-index: 999;
    background-color: white;
    height:90px;
    width: 100%;
    overflow: hidden;
}
.reply h1{
    font-weight: lighter;
    font-size: 16px;
}
@keyframes show {
    0%{transform: scale(0.1);opacity: 0.1}
    100%{transform: scale(1);opacity: 0.7}
}
    @media screen and (max-width: 690px){
        .title{
            font-size: 15px;
        }
    }

</style>