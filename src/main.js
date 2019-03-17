import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import router from './router'
import Vue2OrgTree from 'vue2-org-tree'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(Vue2OrgTree)
Vue.use(VeeValidate);
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
