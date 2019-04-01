<template>
    <div id="app">
        <div class="j-container">
            <router-view></router-view>
        </div>
        <div class="j-nav-tail">
            <ul>
                <div class="caidan"><router-link to="/home"><i class="iconfont icon-shouye"></i></router-link></div>
                <div class="caidan"> <router-link to="/news_list"><i class="iconfont icon-wangting" style="font-size: 47px;"></i></router-link></div>
                <div class="caidan" ><router-link to="/chat"><i class="iconfont icon-sousuo"></i></router-link></div>
                <div class="caidan"><router-link to="/user"><i class="iconfont icon-yonghu"></i></router-link></div>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'app',
        created(){
        },
        methods:{
        }
    };
</script>
<style>
</style>