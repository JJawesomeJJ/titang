<template>
        <div class="container" style="top:17%">
        <form name="myForm" id="myForm">
            <fieldset>
                <div class="user-model" style="position: relative;margin: 0 auto;width:90%;height:30px;">
                    <ul style="display: flex;position: relative;margin: 0 auto;font-weight: bold;font-size: 15px;">
                        <li style="position:relative;margin-left: 40%;color: #67C962;">注册</li>
                        <li style="margin-left:5%;color: black;word-break:keep-all;"><router-link to="/login" style="color: black;">登录</router-link></li>
                    </ul>
                </div>
                <input type="text" name="user" id="user" placeholder="用户名"><br>
                <input type="password" name="password" id="password" placeholder="密码"><br>
                <input type="password" name="password1"id="password1" placeholder="确认密码" ><br>
                <input type="text" name="email" id="email" placeholder="email">
                <div style="display:flex;position: relative;margin-left: 0px;"><div style="width: 50%;display: flex;margin-left: 2%;"><input type="radio" name="sex" id="man" value="man" style="width:20px;height: 20px;background-color: #02c1ed;"><nobr><h1 style="font-size: 15px;margin-left: 15px;line-height: 26px;">小哥哥</h1></nobr></div>
                    <input type="radio" name="sex" id="women" value="women" style="width:20px;height: 20px;background-color: #02c1ed;"><nobr><h1 style="font-size: 15px;margin-left: 15px;line-height: 26px;">小姐姐</h1></nobr></div>
                <span style="display: flex"><input type="text" id="code" name="code" placeholder="请输入验证码" >
                    <img src="http://39.108.236.127/php/admin/code.php" id="code_picture" width=100% height=100% @click="getNumCode()" style="margin-top: 2%;"></span>
                 <input type="button" neme="register" id="register"value="注册" v-on:click="check()"/>
            </fieldset>
        </form>
    </div>
</template>

<script>
    export default {
        name: "register",
        created(){
            this.menu("iconfont.icon-yonghu");
            if(this.getCookie("name").length>0)
            {
                window.location.href="http://39.108.236.127/#/personal_space";
            }
        },
        methods: {
            getNumCode() {
                var img = document.getElementById("code_picture");
                img.src = "http://39.108.236.127/php/admin/code.php?" + new Date().getTime();
            },
            check() {
                var x = document.forms["myForm"]["email"].value;
                var y = document.forms["myForm"]["user"].value;
                var z = document.forms["myForm"]["password"].value;
                var j = document.forms["myForm"]["password1"].value;
                var code = document.forms["myForm"]["code"].value;
                var sex = $("input[name='sex']:checked").val();
                if (y == "") {
                    this.toast("用户名不可为空");
                    return;
                }
                if (z.length < 6) {
                    this.toast("请确保密码大于6位");
                    return;
                }
                if (j != z) {
                    this.toast("密码不一致");
                    return;
                }
                var atpos = x.indexOf("@");
                var dotpos = x.lastIndexOf(".");
                if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
                    alert("不是一个有效的 e-mail 地址");
                    return false;

                }
                if (typeof(sex) == "undefined") {
                    this.toast("您还未选择性别");
                    return;
                }
                if (code.length < 1) {
                    this.toast("请输入验证码");
                    return;
                }
                var senddata = {"code": code, "name": y, "password": z, "email": x, "sex": sex};
                    this.$http.post(
                        "http://39.108.236.127/php/public/index.php/user/register",
                        {
                            "code": code,
                            "name": y,
                            "password":this.SHA256(z),
                            "email": x,
                            "sex": sex,
                        }, {emulateJSON: true},
                    ).then((res) => {
                        res = eval('(' + res.bodyText + ')');
                        if (res["code"] == "200") {
                            this.toast("欢迎你" + y);
                            localStorage.setItem("csrf_token",res["csrf_token"]);
                            localStorage.setItem("head_img",res["head_img"]);
                            this.setcookie(y, x, 7);
                            window.location.href = "#/user"
                        }
                        else {
                            if (res["code"] == "403" && res["data"] == "code_error") {
                                this.toast("验证码错误");
                                this.getNumCode();
                                return;
                            }
                            else {
                                console.log(res["data"]);
                                if (res["data"] == "mail") {
                                    this.toast("该email已被注册");
                                    this.getNumCode();
                                }
                                else {
                                    this.toast("用户名已被注册");
                                    this.getNumCode();
                                }
                            }
                        }
                    }).catch((error) => {
                        console.log(error)
                    }).bind(this);
            },
            setcookie(name, email, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toGMTString();
                document.cookie = "name" + "=" + encodeURI(name) + "; " + expires;
                +"path=/";
                document.cookie = "email" + "=" + email + "; " + expires;
                +"path=/";
            },
        }
    }
</script>
<style>
    input{
        text-align: center;
    }
</style>