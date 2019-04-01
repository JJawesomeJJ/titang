<template>
    <div class="container">
        <div class="title">
            <router-link to="/user"><div class="iconfont icon-zuojiantou" style="font-size:40px;width:60px;height: 100%;line-height: 52px;"></div></router-link>
            <h1>问卷调查</h1>
            </div>
        <div class="function">
        <div class="edit">
            <div class="icon"><img src="http://img0.imgtn.bdimg.com/it/u=3269685945,3728737171&fm=26&gp=0.jpg" style="width: 100%;height: 100%;border-radius: 15px;"/></div>
            <div class="right">
            <h1 style="color: white;font-weight: lighter;margin-left: 10px;">创建新的调查</h1><br/>
            <h1 style="color: white;font-weight: lighter;margin-left: 10px;">调查 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;统计</h1>
                <div class="open"><router-link to="/survey_edit_page"><input type="button"value="创建" style="width:70px;border: 1px solid limegreen;margin-left:10px;color: white;font-weight: lighter;background-color: #27ae60;margin-top:10px;border-radius: 5px;"></router-link></div>
            </div>
        </div>
        <div class="new">
            <div class="icon"><img src="http://img0.imgtn.bdimg.com/it/u=3269685945,3728737171&fm=26&gp=0.jpg" style="width: 100%;height: 100%;border-radius: 15px;"/></div>
            <div class="right">
                <h1 style="color: white;font-weight: lighter;margin-left: 10px;">我发起的调查</h1><br/>
                <h1 style="color: white;font-weight: lighter;margin-left: 10px;">调查 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;统计</h1>
                <div class="open"><router-link to="/my_survey"><input type="button"value="打开" style="width:70px;border: 1px solid limegreen;margin-left:10px;color: white;font-weight: lighter;background-color: #27ae60;margin-top:10px;border-radius: 5px;"></router-link></div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "survey",
        created(){
            this.menu("iconfont.icon-yonghu");
            this.is_login();
        },
        methods:{
        }
    }
</script>

<style scoped>
    .message{

    }
    .container{
        width: 100%;
        height: 90%;
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
    .template{
        position: relative;
        width: 100%;
        height: auto;
    }
    .function{
        position: relative;
        width: 100%;
        height:100px;
        display: flex;
    }
    .edit,.new{
        margin-top: 10px;
        width:45%;
        height: 90%;
        background-image: linear-gradient(90deg,#007AFF,#03a9f4);
        left: 50px;
        margin-left: 3%;
        border-radius: 5px;
        display: flex;
    }
    .edit:hover,.new:hover{
        box-shadow: 1px 1px 1px #888888;
        opacity: 0.8;
    }
    .icon{
        position: relative;
        top:25px;
        width: 50px;
        height: 50px;
        border-radius: 10px;
    }
    .right{
        position: relative;
        width: 60%;
        height: 100%;
        margin-left:5%;
    }
</style>