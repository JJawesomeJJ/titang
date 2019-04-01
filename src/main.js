import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueResource from 'vue-resource'
import VueJsonp from 'vue-jsonp'
import home from './page/home/home'
import login from './page/user/login1'
import register from './page/user/register'
import news_list from './page/news/news_list'
import news_content from './page/news/news_content'
import user from './page/user/user'
import personal_space from './page/user/personal_space'
import chat from './page/chat/chat'
import chat_to from './page/chat/chat_to'
import survey from './page/survey/survey'
import survey_edit_page from './page/survey/survey_edit_page'
import my_survey from './page/survey/my_survey'
//import '../node_modules/mint-ui/lib/style.min.css'
import '../static/font-icon/iconfont.css'
import '../static/css/static.css'
import '../static/js/j-js'
import common from './js/common'
import variate from './js/variate'
Vue.prototype.variate=variate;
Vue.use(variate)
Vue.use(common);
Vue.use(VueJsonp);
Vue.use(VueResource);
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});