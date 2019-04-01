<template id="new_list">
    <div class="news_list">
        <li v-for="i in list">
            <router-link :to="{path:'/news_content',query:{url:i.URL,title:i.title}}">
            <div class="tabel-view">
                    <img class="thumbnail" v-if="typeof(i.allPics['pics']['0'])=='object'" :src="i.allPics['pics']['0']['imgurl']">
                    <img class="thumbnail" v-else :src="img_url">
                    <div class="media-body">
                        <p>{{i.title}}</p>
                        <p class="source">---{{i.source}}</p>
                    </div>
            </div>
            </router-link>
        </li>
        <div class="j-bar">
            <ul>
            <li></li>
            <li></li>
            <li></li>
            </ul>
        </div>
        <div class="news_back"></div>
    </div>
</template>
<script>
    export default {
        e1:"#new_lis",
        name: "news_list",
        data: function () {
            return {
                list: [],
                back_img:"",
                img_url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528218497579&di=1b32fc768ea44907f4bdcdd23094b2b8&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fe%2F5850a9beece26.jpg",
                page:1,
                test:[{}],
                list_index:0,
                loading_flag:null
            }
        },
        created() {
            console.log(this.timestamp());
            this.menu("iconfont.icon-wangting");
            this.back_img=localStorage.getItem("now_back");
            var cache_data=eval('('+localStorage.getItem("news_list_cache")+')');
            this.get_list();
            window.addEventListener('scroll',this.scroll_button);
            //setInterval(this.json_appen,2000);
        },
        mounted () {
            this.start_loading();
            this.set_back();
        },
        beforeDestroy(){
            window.removeEventListener("scroll",this.scroll_button);
        },
        destroyed:function () {
            window.removeEventListener("scroll",this.scroll_button);
        },
        updated:function () {
        },
        methods: {
            get_list() {
                var news_list_cache=eval('('+localStorage.getItem("news_list_cache")+')');
                if(news_list_cache!=null) {
                    if ((parseInt(news_list_cache.create_time) + parseInt(news_list_cache.time_out)) > parseInt(this.timestamp())) {
                        this.list = news_list_cache.cache_data;
                        return;
                    }
                }
                    var url='https://interface.sina.cn/wap_api/layout_col.d.json?showcid=56261&col=56261&level=1%2C2&show_num=30&page='+this.page+'&act=more&jsoncallback=callbackFunction&_='+new Date().getTime()+'&callback='+new Date().getTime();
                    this.$http.jsonp(url, {
                    jsonp: 'callBackParam',
                    jsonpCallback: "callbackFunction"
                }).then(function (res) {
                    this.list=res.body.result.data.list;
                    this.page=this.page+1;
                }.bind(this));
            },
            json_appen() {
                var  url1='https://interface.sina.cn/wap_api/layout_col.d.json?showcid=56261&col=56261&level=1%2C2&show_num=30&page='+this.page+'&act=more&jsoncallback=callbackFunction&_='+new Date().getTime()+'&callback='+new Date().getTime();
                this.$http.jsonp(url1, {
                    jsonp: 'callBackParam',
                    jsonpCallback: "callbackFunction"
                }).then(function (res) {
                    for(var i=0;i<res.body.result.data['list'].length;i++)
                    {
                        this.list.push(res.body.result.data['list'][i]);
                    }
                    var new_list_cache={"create_time":this.timestamp(),"cache_page":this.page+1,"time_out":600,"cache_data":res.body.result.data['list']};
                    localStorage.setItem("news_list_cache",JSON.stringify(new_list_cache));
                    this.page=this.page+1;
                }.bind(this));
            },
            scroll_button() {
                if ($(document).scrollTop()+100>= $(document).height() - $(window).height()) {
                    this.$options.methods.json_appen.bind(this)();
                }
            },
            set_back(){
                $(".news_back").css({"background":"url("+this.back_img+")","background-size":"100% 100%"});
            },
            loading(){
                var list=document.querySelectorAll(".j-bar>ul>li");
                for(var i=0;i<list.length;i++)
                {
                    if(i==this.list_index)
                    {
                        list[i].setAttribute("class","j-loading1");
                    }
                    else {
                        list[i].setAttribute("class","");
                    }
                }
                this.list_index++;
                if(this.list_index==3)
                {
                    this.list_index=0;
                }
            },
            start_loading(){
                this.loading_flag=setInterval(this.loading,350)
            },
        }
    }
</script>

<style scoped>
.news_list{
    width: 100%;
    height: auto;
    position:absolute;
    z-index:999;
}
.news_list li{
    max-width: 600px;
    width: 100%;
    height: 75px;
    background-color: white;
    border-bottom:2px solid grey;
    margin-top: 3px;
    border-radius: 12px;
    position: relative;
    margin: 0 auto;
    animation: show1 0.5s ease-in normal;
    z-index:999;
    opacity: 0.8;
    }
@keyframes show1 {
    0%{opacity: 0.4}
    50%{opacity: 0.8}
    100%{opacity:1}
}
.tabel-view{
    width:100%;
    height: 100%;
    position: relative;
}
.thumbnail{
    position: relative;
    width:20%;
    height: 100%;
    border-radius: 5px;
}
.tabel-view p{
    position: relative;
    margin-left: 28%;
    top:-65px;
    font-weight: bold;
    color: black;
    }
.tabel-view .source{
    position: relative;
    margin-left: 71%;
    color: black;
    margin-bottom: 0px;
    buttom:0px;
}
.news_list li:hover{
    opacity: 1.0;
}
.media-body{
    width: 100%;
    height: 100%;
}
.j-bar{
    position: relative;
    display: flex;
    margin: 0 auto;
    width:100%;
    height: 50px;
    background-color: white;
    opacity: 0.8;
    z-index:2;
}
.j-bar ul{
    position: relative;
    display: flex;
    width: 80px;
    margin: 0 auto;
}
.j-bar ul li{
    width: 20px;
    height: 20px;
    border-radius:50px;
    background-color:#888888;
    margin-left: 5px;
    opacity: 0.8;
}
.j-loading1{
    background-color:#02c1ed !important;
    transform: scale(1.2);
    transition:0.5s;
    opacity: 1!important;
}
h1{
    visibility: hidden;
}
    .news_back{
        position: fixed;
        top:0px;
        width: 100%;
        height: 100%;
        z-index:1;
    }

</style>