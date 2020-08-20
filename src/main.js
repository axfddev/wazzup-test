import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios';
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

import 'bootstrap/dist/css/bootstrap.css'

import Icon from 'vue-awesome/components/Icon'
Vue.component('v-icon', Icon);


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
