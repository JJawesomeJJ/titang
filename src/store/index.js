import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = {
  state: {
    chat_data:[],
    socket_list:{},
    name_list:[],
    message_list:[],
    name:null,
    notify_list:[
      {
        "type": "reply",
        "message": {
          "url": "url=https%3A%2F%2Fnews.sina.cn%2F2019-04-07%2Fdetail-ihvhiqax0635222.d.html%3F%26cid%3D56261&title=%E9%87%8D%E5%BA%86%E5%B8%82%E4%BA%8C%E4%B8%AD%E9%99%A2%E8%AF%81%E5%AE%9E%E5%8E%9F%E5%89%AF%E9%99%A2%E9%95%BF%E9%81%87%E5%AE%B3%E8%BA%AB%E4%BA%A1%20%E8%AD%A6%E6%96%B9%E5%B7%B2%E4%BB%8B%E5%85%A5",
          "who": "\u6f58\u6cd3\u8fbe",
          "reply_content": "xixi",
          "head_img": "https:\/\/ss1.bdstatic.com\/70cFuXSh_Q1YnxGkpoWK1HF6hhy\/it\/u=3819576028,348824647&fm=26&gp=0.jpg"
        }
    }, {
      "type": "reply",
      "message": {
        "url": "https:\/\/news.sina.cn\/gn\/2019-04-06\/detail-ihvhiqax0440608.d.html?&cid=56261",
        "who": "\u8d75\u674e\u6770",
        "reply_content": "waawa",
        "head_img":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3819576028,348824647&fm=26&gp=0.jpg",
        "reply_source":"新闻页面"
      }
    }
    ]
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
