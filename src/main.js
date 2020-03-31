import Vue from 'vue'
import App from './app'
import iView from 'iview'
import axios from 'axios';
import 'iview/dist/styles/iview.css';
/* eslint-disable no-new */
Vue.use(iView);

axios.defaults.baseURL = 'http://localhost:3000/back'
Vue.prototype.$axios = axios
new Vue({
  el: 'body',
  components: { App }
})
