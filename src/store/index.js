import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = {
  state: {
    chat_data:[],
      socket_list:{},
      name_list:[],
      message_list:[],
      name:null
  },
  mutations: {},
  actions: {
    change_data(data){
      this.chat_data=data;
    }
  },
  getters: {}
};
export default new Vuex.Store(store);
