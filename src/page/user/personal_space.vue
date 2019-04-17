<template>
    <div class="container" style="position: relative;top: 0px;">
        <div style="position: relative;top:0px;width: 100%;background-image: linear-gradient(90deg,#0af,#0085ff);height:50px;">
            <h1 style="color: white;font-size: 20px;text-align: center;line-height:50px;font-weight: bold">账户信息</h1>
        </div>
    <div class="j-body"><input type="file" id="file" style="position: absolute;width: 100%;z-index: 999;opacity: 0;" accept="image/jpeg,image/jpg,image/png" @change=updata_img();><li>
            <div class="iconfont icon-yonghu" style="width: 30px;height: 30px;color: #007aff;text-align: center;font-size:30px;line-height: 35px;margin-top:10px;"></div>
            <h1>头像</h1>
            <img v-bind:src="head_img" style="height: 100%;width:55px;position:absolute;right:7vw;border-radius: 50px;">
            <div class="iconfont icon-youjiantou" style="display:inline-block;color:#bbb;position:absolute;left:92%;line-height: 53px;font-size: 20px;"></div>
        </li>
        <li style="">
            <div class="iconfont icon-duihuaxinxi" style="width: 30px;height: 30px;color: #007aff;text-align: center;font-size:30px;line-height: 35px;margin-top:10px;"></div>
            <h1>用户名</h1>
            <h1 style="position: absolute;right:7vw;">{{this.name}}</h1>
            <div class="iconfont icon-youjiantou" style="display:inline-block;color:#bbb;position:absolute;left:92%;line-height: 53px;font-size: 20px;"></div>
        </li>
        <h2>绑定email</h2>
        <li>
            <div class="iconfont icon-fasongxinxi" style="width: 30px;height: 30px;color: #007aff;text-align: center;font-size:30px;line-height: 35px;margin-top:10px;"></div>
            <h1>email</h1>
            <h1 style="position: absolute;right:7vw;">{{this.email}}</h1>
            <div class="iconfont icon-youjiantou" style="display:inline-block;color:#bbb;position:absolute;left:92%;line-height: 53px;font-size: 20px;"></div>
        </li>
        <h2>安全设置</h2>
        <li @click="change_show()">
            <div class="iconfont icon-xiugai" style="width: 30px;height: 30px;color: #007aff;text-align: center;font-size:30px;line-height: 35px;margin-top:10px;"></div>
            <h1>修改密码</h1>
            <div class="iconfont icon-youjiantou" style="display:inline-block;color:#bbb;position:absolute;left:92%;line-height: 53px;font-size: 20px;"></div>
        </li>
        <li style="top:3vh;" @click="exit_login()">
            <h1 style="position:relative;margin:0px auto;text-align: center;color:red;font-size:22px;">退出登录</h1>
        </li>
    </div>
        <div class="change_password" style="position: absolute;width:100vw;height:100vh;background-color: #222222;z-index:500;top:0px;opacity: 0.8;display: none;"id="change">
        </div>
        <div class="iconfont icon-zuojiantou" style="position:absolute;color: white;top:-5px;left: 0px;z-index: 999" @click="change_dis()"></div>
        <form style="display: none;">
            <input type="text" id="oldpassword"placeholder="请输入旧密码">
            <input type="text" id="newpassword" placeholder="请输入新的密码">
            <input type="text" id="email_code" placeholder="请输入邮箱验证码"><div class="email_post" style="width:87px;height:50px;border-radius: 10px;position: absolute;z-index:999;right:0px;top:75px;"><h1 style="text-align: center;font-size: 17px;line-height:30px;"id="h1" @click="post_code()">获取验证码</h1><h2 style="text-align: center;font-size: 17px;line-height:30px;display: none" id="h2">{{word}}</h2></div>
            <div class="sure" @click="change_password()"><h1 style="text-align: center;font-size: 20px;line-height: 35px;">确认</h1></div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "personal_space",
        data:function () {
            return{
                is_exist_img:null,
                name:null,
                email:null,
                head_img:"",
                word:"获取验证码",
                old:null,
                new:null,
                code:null
            }
        },
        updated(){
            if(this.name.length<1)
            {
                window.location.href = "#/user";
            }
        },
        created(){
            this.menu("iconfont.icon-yonghu");
            this.name=this.getCookie('name');
            this.email=this.getCookie('email');
            this.is_login();
            this.is_exist();
        },
        methods: {
            change_dis() {
                if (document.querySelector("#change").style.display == "none") {
                    window.location.href = "#/user";
                    return;
                }
                $("#change").slideUp(200);
                $("form").slideUp(200);
            },
            change_show() {
                $("#change").slideDown(200);
                $("form").slideDown(200);
                $("form").css("z-index", "999");
            },
            updata_img() {
                var file = document.getElementById("file").files[0];
                if (file.size > 100000) {
                    this.toast("图片太大啦，换个吧");
                    return;
                }
                var formdata = new FormData();
                formdata.append("file", file);
                this.$http.post("http://39.108.236.127/php/admin/head_img.php", formdata).then((res) => {
                    if (res.body.code == "200") {
                        this.head_img = "http://39.108.236.127/head_img/" + this.email + ".jpeg?" + new Date().getTime();
                    }
                    else {
                        this.toast("登录失效");
                    }
                }).catch((error) => {
                    //console.log(error);
                })
            },
            is_exist() {
               this.head_img=localStorage.getItem("head_img");
            },
            post_code(){
                var h1=document.getElementById("h1");
                var h2=document.getElementById("h2");
                h1.style.display="none";
                h2.style.display="block";
                var self=this;
                var total=30;
                var set=setInterval(function () {
                    total=total-1;
                    self.word="已发送"+"("+total+")";
                },1000);
                setTimeout(function () {
                    clearInterval(set);
                    self.word="获取验证码";
                    h1.style.display="block";
                    h2.style.display="none";
                },30000);
                this.$http.get("http://39.108.236.127/php/admin/class/email_code.php").then((res)=>{
                }).catch((exce)=>{
                    console.log(exce);
                });
            },
            change_password(){
                var oldpassword=$("#oldpassword").val();
                var newpassword=$("#newpassword").val();
                var code=$("#email_code").val();
                if(oldpassword.length==0||newpassword.length==0||code.length==0)
                {
                    this.toast("还没填完呢！");
                    return;
                }
                this.old=oldpassword;
                this.new=newpassword;
                this.code=code;
                this.$http.post("http://39.108.236.127/php/admin/class/change_password.php",
                    {
                        oldpassword:oldpassword,
                        newpassword:newpassword,
                        code:code,
                    },
                    {emulateJSON: true}
                ).then((res)=>{
                    res= eval('(' + res.bodyText + ')');
                    if(res.data=="ok")
                    {
                        this.toast("密码修改成功");
                        this.exit_login();
                        return;
                    }
                    if(res.code=="403")
                    {
                        this.toast("登录失效");
                        this.exit_login();
                        return;
                    }
                    if(res.data=="password_error")
                    {
                        this.toast("原密码错误");
                        return;
                    }
                    if(res.data=="code_error")
                    {
                        this.toast("验证码错误");
                        return;
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            }

        }
    }
</script>

<style scoped>
    form{
        margin-top: 0px;
        margin-bottom: 0px;
        z-index: 999;
        position: absolute;
        width: 99.5%;
        border-radius: 10px;
        top:30vh;
    }
    form input{
        position:relative;
        top:5px;
        width: 100%;
        height: 32px;
        border: 1px solid #00aaff;
    }
    .sure{
        background-color: #00aaff;
        width: 100%;
        height: 32px;
    }
    .j-body{
        background-color: lightgrey;
        position: relative;
        width:100%;
        height:90vh;
    }
    .j-body li{
        position: relative;
        width: 100%;
        height:55px;
        background-color:white;
        border-top:1px solid #ddd;
        display: flex;
    }
    .j-body li h1{
        text-align:match-parent;
        box-sizing: inherit;
        white-space:nowrap;
        font-size: 15px;
        line-height: 55px;
        padding-left:15px;
        font-weight: bold;
    }
    h2{
        position: relative;
        line-height: 5vh;
        color: #999;
        font-size:10px;
    }
</style>