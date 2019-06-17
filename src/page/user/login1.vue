<template>
    <div class="container" style="top:28%;">
        <form name="myForm" id="myForm">
            <fieldset>
                <div class="user-model" style="position: relative;margin: 0 auto;width:90%;height:30px;">
                    <ul style="display: flex;position: relative;margin: 0 auto;font-weight: bold;font-size: 15px;">
                        <li style="position:relative;margin-left: 40%;color: black;word-break:keep-all;"> <router-link to="/register" style="color:black;">注册</router-link></li>
                        <li style="margin-left:5%;color:green;word-break:keep-all;">登录</li>
                    </ul>
                </div>
                <input type="text" name="user" placeholder="用户名"><br>
                <input type="password" name="password" placeholder="密码"><br>
                <span style="display: flex"><input type="text" id="code" name="code" placeholder="请输入验证码">
                <img src="http://39.108.236.127/php/admin/code.php" id="code_picture" width=100% height=100% @click="getNumCode()"style="margin-top: 2%;"></span>
                <input type="button"  id="login" value="登录"@click="check()"/>
            </fieldset>
            <div style="position: absolute;right:20px;height: 20px;bottom: 10px;"><a href="http://39.108.236.127/php/public/index.php/user/forget" style="display: block;"><h1 style="color: lightseagreen;display: block;">忘记密码?</h1></a></div>
        </form>
    </div>
</template>
<script>
    export default {
        name: "login",
        data:function () {
            return{
                code:null,
                x:null,
                y:null,
            }
        },
        created(){
            this.menu("iconfont.icon-yonghu");
            if(this.getCookie("name").length>0)
            {
                window.location.href="http://39.108.236.127/#/personal_space";
            }
        },
        methods: {
            check() {
                this.menu("iconfont.icon-yonghu");
                var x = document.forms["myForm"]["user"].value;
                var y = document.forms["myForm"]["password"].value;
                var code = document.forms["myForm"]["code"].value;
                this.code = code;
                this.x = x;
                this.y = y;
                if (x == "" || y == "") {
                    this.toast("用户名或密码不可为空");
                    return false;
                }
                if(this.code==null&&this.code.length==0)
                {
                    this.toast("请输入验证码！");
                    return;
                }
                var send_data = {"code": code, "name": x, "password": y}
                this.$http.post("http://39.108.236.127/php/public/index.php/user/login",
                    {
                        code:this.code,
                        name:this.x,
                        password:this.SHA256(this.y)
                    },
                    {emulateJSON: true}
                )
                    .then((res) => {//成功胡回调
                        res= eval('(' + res.bodyText + ')');
                        console.log(res);
                        if (res["code"] == "200") {
                            localStorage.setItem("head_img",res["head_img"]);
                            localStorage.setItem("csrf_token",res["csrf_token"]);
                            this.toast("欢迎你" + x);
                            //this.websocket(x);
                            this.setcookie(x,res['email'], 30);
                            var url=window.location.href;
                            var list=url.split("go=");
                            if(list.length<2)
                            {
                                window.location.href="http://39.108.236.127/#/user";
                            }
                            else {
                                url = decodeURIComponent(list[1]);
                                window.location.href = url;
                            }
                        }
                        else {
                            if (res["code"] == "403" && res["data"] == "code_error") {
                                this.toast("验证码错误");
                                this.getNumCode();
                                return;
                            }
                            else {
                                if (res["data"] == "unsign") {
                                    this.toast("该用户尚未注册");
                                    this.getNumCode();
                                }
                                else {
                                    this.toast("密码错误");
                                    this.getNumCode();
                                }
                            }
                        }
                    })
                    .catch((error) => {   //失败的回掉
                        console.log(error)
                    });
            },
            getNumCode() {
                var img = document.getElementById("code_picture");
                img.src = "http://39.108.236.127/php/admin/code.php?" + new Date().getTime();
            },
        }
    }
</script>
<style>
</style>