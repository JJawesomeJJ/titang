import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//webpack按需加载组件
const home = r =>
  require.ensure([], () => r(require('../page/home/home')), ' home');
const login = l =>
    require.ensure([], () => l(require('../page/user/login1')), ' login');
const register = k =>
    require.ensure([], () => k(require('../page/user/register')), 'register');
const news_list = j =>
    require.ensure([], () => j(require('../page/news/news_list')), 'news_list');
const news_content = w =>
    require.ensure([], () => w(require('../page/news/news_content')), 'new_content');
const user = i =>
    require.ensure([], () => i(require('../page/user/user')), 'user');
const personal_space= a =>
    require.ensure([], () => a(require('../page/user/personal_space')), 'personal_space');
const chat= c =>
    require.ensure([], () => c(require('../page/chat/chat')), 'chat');
const chat_to= c_t =>
    require.ensure([], () => c_t(require('../page/chat/chat_to')), 'chat_to');
const survey= s =>
    require.ensure([], () => s(require('../page/survey/survey')), 'survey');
const survey_edit_page=s_e =>
    require.ensure([], () => s_e(require('../page/survey/survey_edit_page')), 'survey_edit_page');
const my_survey=m_s =>
    require.ensure([], () => m_s(require('../page/survey/my_survey')), 'my_survey');
export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
      {
          path: '/login',
          name: 'login',
          component: login
      },
      {
          path: '/register',
          name: 'register',
          component: register
      },
      {
          path: '/news_list',
          name: 'news_list',
          component:news_list
      },
      {
          path: '/news_content',
          name: 'news_content',
          component:news_content
      },
      {
          path:'/user',
          name:'user',
          component:user
      },
      {
          path:'/personal_space',
          name:'personal_space',
          component:personal_space
      },
      {
          path:'/chat',
          name:'chat',
          component:chat

      },
      {
          path:'/chat_to',
          name:'chat_to',
          component:chat_to

      },
      {
          path:'/survey',
          name:'survey',
          component:survey
      },
      {
          path:'/survey_edit_page',
          name:'survey_edit_page',
          component:survey_edit_page
      },
      {
          path:'/my_survey',
          name:'my_survey',
          component:my_survey
      }

  ]
});