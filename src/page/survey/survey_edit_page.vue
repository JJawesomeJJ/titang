<template>
    <div class="container">
        <div class="title">
            <router-link to="/user"><div class="iconfont icon-zuojiantou" style="font-size:40px;width:60px;height: 100%;line-height: 52px;"></div></router-link>
            <h1>问卷调查编辑页</h1>
        </div>
        <div class="question_template">
            <transition-group name="list" tag="p">
            <div v-for="i in question_list" class="question_list" v-bind:key="i.index">
                <li class="question"><div id="delete" @click="delete_question(i)" v-if="i.flag==true" class="iconfont icon-guanbi" style="width:25px;height:25px;background-color: red;font-size:18px;border-radius: 50px;color: white;text-align: center;position: absolute;left:-30px;"></div><h1 v-if="i.flag==false">({{i.index}}) {{i.question}}</h1><input type="text" v-if="i.flag==true" placeholder="问题" v-model=i.question /><div class="edit_data"><div v-if="i.flag==false" class="iconfont icon-shurutianchong" @click="edit_page(i)"></div>
                    <div v-if="i.flag==true"  @click="edit_page(i)" ><input type="button" value="确认" style="background-color: #007AFF;width:35px;font-size: 13px;color: white;height: 25px;position: absolute;right:-35px;top:1px;"></div></div>
                </li>
            <li class="A"><h1 v-if="i.flag==false">A&nbsp;{{i.A}}</h1><input type="text" v-if="i.flag==true" placeholder="选项A" v-model=i.A /></li>
            <li class="B"><h1 v-if="i.flag==false">B&nbsp;{{i.B}}</h1><input type="text" v-if="i.flag==true" placeholder="选项B" v-model=i.B /></li>
            <li class="C"><h1 v-if="i.flag==false">C&nbsp;{{i.C}}</h1><input type="text" v-if="i.flag==true" placeholder="选项C" v-model=i.C /></li>
            <li class="D"><h1 v-if="i.flag==false">D&nbsp;{{i.D}}</h1><input type="text" v-if="i.flag==true" placeholder="选项D" v-model=i.D /></li>
            </div>
            </transition-group>
        </div>
        <div class="edit" @click="add_question"><div class="iconfont icon-tianjia" style="font-size:30px;text-align: center;color: white;line-height:40px;margin-top: 60px;background-image: linear-gradient(90deg,#007AFF,#02c1ed);border-radius: 10px;"></div></div>
        <div class="edit" @click="ready_post"><div class="iconfont icon-shangchuan" style="font-size:30px;text-align: center;color: white;line-height:40px;margin-top: 60px;background-image: linear-gradient(90deg,#D74B28,#FF3B30);border-radius: 10px;margin-top: 10px;margin-bottom:40px;"></div></div>
        <div class="show"></div>
        <div class="post_data_page">
            <div class="iconfont icon-guanbi" style="width:30px; height:30px;color:#FF3B30;position: fixed;top:50px;border-radius: 50px;font-size: 20px;right: 0px;" @click="post_page_dis"></div>
            <div class="rename_page">
                <h1 style="color:white;font-weight:lighter;font-weight: lighter;font-size: 18px;text-align: center;">{{title_name}}</h1>
                <div class="post" style="width: 90%;margin:0 auto;">
                    <input type="text" v-model="title" placeholder="调查名字"><br/>
                    <input type="text" v-model="code" placeholder="邮箱验证码"><br/>
                    <div class="get" style="width:50px;height: 30.5px;background-image: linear-gradient(90deg, rgb(0, 122, 255), rgb(2, 193, 237));position:absolute;right:9.2%;margin-top:-31px;border-radius:2px;"><h1 id="h1" style="text-align: center;line-height:31px;color: white;font-weight: lighter;" @click="get_emial_code">获取</h1><h2 id="h2" style="text-align: center;line-height:31px;color: white;font-weight: lighter;display: flex;display: none;font-size: 10px;">{{word}}</h2></div>
                    <div class="botton" style="display:flex;margin-top: 15px;">
                    <input type="button" @click="return_post"value="取消" style="background-image: linear-gradient(90deg, rgb(215, 75, 40), rgb(255, 59, 48));border: 0px;">
                    <input type="button" @click="create_template" value="确认" style="margin-left:10%;    background-image: linear-gradient(90deg, rgb(0, 122, 255), rgb(2, 193, 237));border: 0px;">
                    </div>
                </div>
                <div class="qrcode"><img src="http://39.108.236.127/php/admin/php_qrcode.php?url=http://39.108.236.127/#/survey_edit_page" alt="" style="width: 100%;height:80%;border-radius: 15px;"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "survey_edit_page",
        data: function () {
            return {
                question_list:[{"question":"did you forget the girl?","A":"早已忘怀","B":"历久弥新","C":"历历在目","D":"时光不散，我们不见","flag":false,"index":1}],
                word:null,
                title_name:"确认创建调查",
                title:"",
                code:"",
            }
        },
        methods:{
            edit_page(k,q){
                if(k.flag==false) {
                    for (var i of this.question_list) {
                        if (i.index == k.index) {
                            i.flag = true;
                        }
                    }
                }
                else {
                    for (var i of this.question_list) {
                        if (i.index==k.index) {
                            i.flag=false
                        }
                    }
                }
            },
            add_question(){
                var data={"question":"",
                    "A":"",
                    "B":"",
                    "C":"",
                    "D":"",
                    "flag":true,
                    "index":this.question_list.length+1};
                this.question_list.push(data);
            },
            post_page_dis(){
                $(".post_data_page").slideUp(200);
            },
            delete_question(arr){
                this.question_list.splice(arr.index-1,1);
                for(var i=0;i<this.question_list.length;i++)
                {
                    this.question_list[i].index=i+1;
                }
            },
            create_template(){
                var qustion_list={};
                for(var i of this.question_list)
                {
                    if(i.question!=""&&i.A!=""&&i.B!=""&&i.C!=""&&i.D!=""&&this.title!=""&&this.code!="")
                    {
                        qustion_list[i.question]=i.A+";"+i.B+";"+i.C+";"+i.D;
                    }
                    else {
                        this.toast("亲！不可以输入空值哦！");
                        return;
                    }
                }
                this.$http.post("http://39.108.236.127/php/public/index.php/survey/create",
                    {
                        "type":"create",
                        "question_arr":qustion_list,
                        "title":this.title,
                        "code":this.code
                    }
                ,{emulateJSON: true}).then((res)=>{
                    console.log(res);
                    res=eval('('+res.bodyText+')');
                    if(res.code=='600'){
                        this.exit_login();
                        return;
                    }
                    if(res.data=="ok");
                    this.toast("创建成功");
                    this.title_name="扫码参与调查";
                    //window.location.href="http://39.108.236.127/page/survey/"+this.title+"_"+this.getCookie('name')+".html";
                    $(".post").fadeOut(100);
                    $(".qrcode").fadeIn(100);
                    var img=document.querySelector(".qrcode>img");
                    var url="http://39.108.236.127/php/admin/php_qrcode.php?url="+"http://39.108.236.127/page/survey/"+encodeURI(this.title)+"_"+encodeURI(this.getCookie('name'))+".html";
                    img.setAttribute("src",url);
                }).catch((res)=>{
                    console.log(res);
                });

            },
            ready_post(){
                $(".post_data_page").slideDown(300);
            },
            return_post(){
                $(".post_data_page").slideUp(300);
            },
            get_emial_code(){
                var h1=document.getElementById("h1");
                var h2=document.getElementById("h2");
                $(".get").css("background-image","linear-gradient(90deg,#d8d8d8,#797979)");
                h1.style.display="none";
                h2.style.display="block";
                var self=this;
                var total=30;
                this.word="已发送"+"("+total+")";
                total=total-1;
                var set=setInterval(function () {
                    total=total-1;
                    self.word="已发送"+"("+total+")";
                },1000);
                var get_data={
                    "type":"survey"
                }
                this.$http.get("http://39.108.236.127/php/admin/class/email_code_.php",
                    {params:get_data}).then((res)=>
                {
                    console.log(res);
                    res=eval('('+res.bodyText+')');
                    if(res.bodyText=='600')
                    {
                        this.exit_login();
                        return;
                    }
                }).catch((exce)=>{
                    console.log(exce);
                });
                setTimeout(function () {
                    clearInterval(set);
                    self.word="获取验证码";
                    $(".get").css("background-image","linear-gradient(90deg, rgb(0, 122, 255), rgb(2, 193, 237))");
                    h1.style.display="block";
                    h2.style.display="none";
                },30000);
                var post_data={"type":"survey"};
            }
        },
        mounted (){

        },
        created(){
            this.is_login();
            this.menu("iconfont.icon-yonghu");
        },
    }
</script>

<style scoped>
    .container{
        width: 100%;
        height:100%;
        top:0px;
        background-color: #c8c7cc;
        position: relative;
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
    .edit{
        position: relative;
        width:90%;
        height:40px;
        border-radius: 10px;
        margin: 0 auto;
    }
    .question_template{
        position: relative;
        top:50px;
    }
    .question{
        position: relative;
        width: 100%;
        height: 100%;
        margin-top:20px;
        display: flex;
    }
    .edit_data div{
        font-size: 20px;
        position: absolute;
        right: 0px;
        color: #4a82d1;
    }
    .edit_data div:hover{
        color: #0086b3;
    }
    .question h1{
        font-size:20px;
        font-weight: lighter;
    }
    .question_template input{
        width:100%;
        border-radius: 5px;
        border: 1px solid #03a9f4;
        text-align: center;
        height: 25px;
    }
    .question_list{
        margin-top: 30px;
        position: relative;
    }
    .question_list li{
        margin: 0 auto;
        margin-top: 5px;
        width:80%;
    }
    .question_list li h1{
        position: relative;
        margin-top: 5px;
        font-weight: lighter;
    }
    .show{
        position:fixed;
        width: 100%;
        height: 100%;
        top:0px;
        z-index: -1;
        background-color: #c8c7cc;
    }
    .post_data_page{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: white;
        opacity: 0.9;
        z-index:998;
        display: none;
        top:0px;
    }
    .rename_page{
        width: 90%;
        margin: 0 auto;
        height:190px;
        background-image: linear-gradient(90deg,#007AFF,#0062cc);
        margin-top: 250px;
        border-radius: 10px;
    }
    .rename_page input{
        position: relative;
        width:100%;
        border-radius: 5px;
        border: 1px solid #007AFF;
        height: 30px;
        margin-top: 10px;
        text-align: center;
    }
    .botton input{
        width: 45%;
    }
    .qrcode{
        position: relative;
        display: none;
        width:50%;
        height: 100%;
        margin: 0 auto;
    }
    .question_list{
        animation:dis 0.5s ease-in-out normal;
    }
    @keyframes dis {
        0%{opacity: 0;transform: scale(0.2)}
        100%{opacity: 1;transform: scale(1)}
    }
    .list-item {
        display: inline-block;
        margin-right: 10px;
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