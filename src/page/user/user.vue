<template>
    <div class="container">
        <div class="head">
            <div class="title"><h1 style="position: relative;text-align: center;color: white;font-size: 20px;font-weight: bolder;">我的</h1></div>
            <div class="user">
                <router-link to="/login"><div class="unlogin" v-if="islogin==false" style="width:100%;height:80px;display: flex;position: relative;">
                    <img src="http://39.108.236.127/image/logo.png" style="border-radius:123px;height: 60px;width:60px;margin-left: 8vw;margin-top:16px;">
                    <div style="position: relative;left: 3vw;top:20px;">
                    <h1 style="position:relative;color: white;font-size: 20px;line-height:30px;">登录|注册</h1>
                        <div style="display: flex;margin-top:10px;"><li class="iconfont icon-shouji" style="font-size:16px;line-height: 5px;color: white;"></li> <h1 style="color: white;font-size: 16px;line-height: 5px;">登录发现更多</h1></div>
                    </div>
                    <div class="iconfont icon-youjiantou" style="color: white;position:absolute;right: 0px;line-height:100px;"></div>
                </div>
                </router-link>
                <router-link to="/personal_space"><div class="unlogin" v-if="islogin==true" style="width:100%;height:80px;display: flex;position: relative;">
                    <img v-bind:src="head_img" style="border-radius:123px;height: 60px;width:60px;margin-left: 8vw;margin-top:16px;">
                    <div style="position: relative;left: 3vw;top:20px;">
                        <h1 style="position:relative;color: white;font-size: 20px;line-height:30px;">{{user}}</h1>
                        <div style="display: flex;margin-top:10px;"><li class="iconfont icon-shouji" style="font-size:16px;line-height: 5px;color: white;"></li> <h1 style="color: white;font-size: 16px;line-height: 5px;">{{email}}</h1></div>
                    </div>
                    <div class="iconfont icon-youjiantou" style="color: white;position:absolute;right: 0px;line-height:100px;"></div>
                </div>
                </router-link>
            </div>
            <div class="redpacket"style="width:100%;height:98px;background-color: white;position: relative;top:45px;">
                <ul style="display: flex">
                    <li style="border-right: 0.5px solid #ddd;"><router-link to="/survey"><div class="iconfont icon-wenbenbianji" style="background-color: #FFB400;"></div></router-link><h1 style="line-height: 55px;">问卷调查</h1></li>
                    <li style="border-right: 0.5px solid #ddd;"><div class="iconfont icon-hongbao" style="background-color:#df5000;"></div><h1 style="line-height: 55px">红包</h1></li>
                    <li><div class="iconfont icon-zuanshi1" style="background-color:#4cd964;"></div><h1 style="line-height:55px;">优惠</h1></li>
                </ul>
            </div>
        </div>
        <div class="j-body">
                <li style="top:10px;">
                    <div class="iconfont icon-dibiao" style="width: 30px;height: 30px;color: #007aff;text-align: center;font-size:30px;line-height: 30px;margin-top:10px;"></div>
                    <h1>我的地址</h1>
                    <div class="iconfont icon-youjiantou" style="color:#bbb;position:absolute;right:0px;line-height: 53px;font-size: 20px;"></div>
                </li>
            <li style="top:20px;">
                <div class="iconfont icon-wangting" style="width: 30px;height: 30px;color: #007aff;text-align: center;font-size:30px;line-height: 30px;margin-top:10px;"></div>
                <h1>金币商店</h1>
                <div class="iconfont icon-youjiantou" style="color:#bbb;position:absolute;right:0px;line-height: 53px;font-size: 20px;"></div>
            </li>
            <li style="top:20px;">
                <div class="iconfont icon-fenxiang" style="width: 30px;height: 30px;color: #007aff;text-align: center;font-size:30px;line-height: 30px;margin-top:10px;"></div>
                <h1>分享时刻</h1>
                <div class="iconfont icon-youjiantou" style="color:#bbb;position:absolute;right:0px;line-height: 53px;font-size: 20px;"></div>
            </li>
            <li style="top:30px;">
                <div class="iconfont icon-dianhua" style="width: 30px;height: 30px;color: #007aff;text-align: center;font-size:30px;line-height: 30px;margin-top: 10px;"></div>
                <h1>联系我们</h1>
                <div class="iconfont icon-youjiantou" style="color:#bbb;position:absolute;right:0px;line-height: 53px;font-size: 20px;"></div>
            </li>
            <li style="top:30px;">
                <div class="iconfont icon-duihuaxinxi" style="width: 30px;height: 30px;color: #007aff;text-align: center;font-size:30px;line-height: 30px;margin-top:10px;"></div>
                <h1>反馈建议</h1>
                <div class="iconfont icon-youjiantou" style="color:#bbb;position:absolute;right:0px;line-height: 53px;font-size: 20px;"></div>
            </li>
        </div>
    </div>
</template>
<script>
    export default {
        name: "user",
        data:function () {
            return{
                islogin:false,
                user:"",
                email:"",
                head_img:""
            }
        },
        created(){
            this.menu("iconfont.icon-yonghu");
            this.login();
            this.head_img=localStorage.getItem("head_img");
            },
        methods:{
            login(){
                if(this.getCookie("name")!=""){
                    this.islogin=true;
                    this.user=this.getCookie('name');
                    this.email=this.getCookie('email');
                }
            },
        }
    }
</script>

<style scoped>
    .container{
        position: relative;
        top:0px;
    }
    .user{
        position: relative;
        width: 100%;
    }
    .head{
        position: relative;
        top:0px;
        width: 100%;
        height:150px;
        background-image: linear-gradient(90deg,#0af,#0085ff);
    }
    .title{
        position: relative;
        width: 100%;
    }
    .redpacket ul li{
        position: relative;
        width: 33.3vw;
        text-align: center;
        height: 98px;
    }
    .redpacket ul li div{
        top:10px;
        position: relative;
        margin: 0 auto;
        width:50px;
        height:50px;
        border-radius: 50px;
        line-height: 50px;
        color: white;
        font-size: 25px;
    }
    .j-body{
        position: relative;
        margin-top:103px;
        width:100%;
    }
    .j-body li{
        position: relative;
        width: 100%;
        height:50px;
        background-color:white;
        border-top:1px solid #ddd;
        display: flex;
    }
    .j-body li h1{
        white-space:nowrap;
        font-size: 15px;
        line-height: 50px;
        padding-left:15px;
        font-weight: bold;
    }
</style>