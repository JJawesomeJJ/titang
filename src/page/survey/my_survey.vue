<template>
    <div class="container">
        <div class="show"></div>
        <div class="title">
            <router-link to="/user"><div class="iconfont icon-zuojiantou" style="font-size:40px;width:60px;height: 100%;line-height:52px;"></div></router-link>
            <h1>我发起的调查</h1>
        </div>
        <div class="my_survey">
            <transition-group name="list" tag="p">
                <div v-for="i in my_survey_list" class="survey_list" v-bind:key="i.name">
                    <div class="survey_name"><h1>{{i.name}}</h1></div>
                    <div class="con_j">
                    <div class="state">
                        <div class="num"><h1>参加人数{{i.num}}</h1></div>
                        <div class="num" style="background-color: #FF3B30;margin-top:5px;"><h1 style="line-height: 19px;">当前状态{{i.state}}</h1></div>
                        <div class="num" style="background-color: yellow;margin-top:5px;"><h1 style="line-height: 15px;color: black;">发布时间</h1><h1 style="word-break:break-all;width:100%;line-height:14px;color: black;">{{i.time}}</h1></div>
                    </div>
                        <div class="code">
                            <h1>扫码参与</h1>
                            <img :src="get_code_url(i.name)" style="width: 100%;height:82%;">
                        </div>
                        <div class="code">
                            <h1>控制台</h1>
                            <input type="button" @click="download_survey(i.name)"value="导出excel" style="background-image: linear-gradient(90deg,#2ac845,#0085ff);border: 0px;margin-top: 0px;">
                            <input type="button" v-if="i.state!='withdraw'"@click="draw_survey(i.name)"value="回收调查" style="background-image: linear-gradient(90deg,#2ac845,#0085ff);border: 0px;">
                            <input type="button" v-else value="已回收" style="background-image: linear-gradient(90deg,#FF3B30,#df5000);border: 0px;">
                            <input type="button" @click="delete_survey(i.name)"value="删除调查" style="background-image: linear-gradient(90deg,#2ac845,#0085ff);border: 0px;">
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my_survey",
        data:function () {
            return{
                my_survey_list:[
                ],
            }
        },
        created(){
            this.is_login();
            this.menu("iconfont.icon-yonghu");
            this.get_data();
        },
        methods:{
            get_code_url(name){
                var writer=this.getCookie('name');
                return "http://39.108.236.127/php/admin/php_qrcode.php?url="+"http://39.108.236.127/page/survey/"+encodeURI(name)+".html";
            },
            get_data(){
                this.$http.post("http://39.108.236.127/php/public/index.php/survey/query",
                    {
                        "type":"get_my_survey",
                        "csrf_token":localStorage.getItem("csrf_token")
                    },{emulateJSON:true}).then((res)=>{
                        console.log(res);
                        res=eval('('+res.bodyText+')');
                        if(res.code=='600')
                        {
                            this.exit_login();
                        }
                        for(var i of res)
                        {
                            this.my_survey_list.push(i)
                        }
                }).catch((res)=>{

                });
            },
            delete_survey(name){
                this.$http.post("http://39.108.236.127/php/public/index.php/survey/delete",
                    {
                        "type":"delete",
                        "name":name,
                        "csrf_token":localStorage.getItem("csrf_token")
                    },{emulateJSON:true}).then((res)=>{
                    console.log(res);
                    res=eval('('+res.bodyText+')');
                    if(res.code=='600'){
                        this.exit_login();
                    }
                    if(res.message=="ok"){
                        this.toast("已成功删除");
                        for(var i=0;i<this.my_survey_list.length;i++){
                            if(this.my_survey_list[i].name==name){
                                this.my_survey_list.splice(i,1);
                            }
                        }
                    }
                }).catch((res)=>{

                });
            },
            draw_survey(name){
                this.$http.post("http://39.108.236.127/php/public/index.php/survey/draw",
                    {
                        "type":"draw",
                        "name":name,
                        "csrf_token":localStorage.getItem("csrf_token")
                    },{emulateJSON:true}).then((res)=>{
                    console.log(res);
                    res=eval('('+res.bodyText+')');
                    if(res.code=='600')
                    {
                        this.exit_login();
                        return;
                    }
                    if(res.message=="ok"){
                        this.toast("回收成功,已关闭投票接口");
                        for(var i=0;i<this.my_survey_list.length;i++){
                            if(this.my_survey_list[i]["name"]==name){
                                this.my_survey_list[i]["state"]="withdraw";

                            }
                        }
                    }
                }).catch((res)=>{

                });
            },
            download_survey(name){
                var url="http://39.108.236.127/php/api/log_excel.php?survey_name="+name;
                window.open(url);
            }
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
        height:100%;
        top:0px;
        background-color: #c8c7cc;
        position: relative;
        overflow-x: hidden;
    }
    .title{
        display: flex;
        position:fixed;
        top:0px;
        width: 100%;
        height:50px;
        margin: 0 auto;
        background-image: linear-gradient(90deg,#0af,#0085ff);
        z-index: 999;
    }
    .title h1{
        position: relative;
        width: 100%;
        left:-25px;
        line-height:50px;
        text-align: center;
        font-size: 18px;
        color: white;
        font-weight: lighter;
    }
    .my_survey{
        position: relative;
        top:50px;
        margin-bottom: 60px;
    }
    .survey_list{
        position: relative;
        width: 90%;
        margin: 0 auto;
        height: 170px;
        background-image: linear-gradient(90deg,#0085ff,#795da3);
        border-radius: 10px;
        margin-top: 20px;
    }
    .survey_name{
        position: relative;
    }
    .survey_name h1{
        color: white;
        font-size: 15px;
        font-weight: lighter;
        line-height:40px;
        z-index: 999;
        text-align: center;
    }
    .num{
        background-color: limegreen;
        width:100px;
        height: 40px;
        border-radius: 10px;
        opacity: 0.9;
    }
    .num h1
    {
        text-align: center;
        color: white;
        font-size: 13px;
        font-weight: lighter;
        line-height: 40px;
    }
    .state{
    }
    .code{
        width:110px;
        height:130px;
        background-color: white;
        margin-left:6vw;
        border-radius: 15px;
        background-color: grey;
        opacity: 0.8;
    }
    .code h1{
        text-align: center;
        color: white;
        font-weight: lighter;
        font-size: 15px;
    }
    .con_j{
        display: flex;
    }
    .code input{
        position: relative;
        width:100%;
        border-radius: 5px;
        border: 1px solid #007AFF;
        height: 30px;
        margin-top:8px;
        text-align: center;
        color: white;
    }
    .show{
        position:fixed;
        width: 100%;
        height: 100%;
        top:0px;
        z-index: -1;
        background-color: #c8c7cc;
    }
    .list-enter-active, .list-leave-active {
        transition: all 0.3s;
    }
    .list-enter, .list-leave-to
        /* .list-leave-active for below version 2.1.8 */ {
        transform: translateX(200px);
        opacity: 0;
    }
</style>