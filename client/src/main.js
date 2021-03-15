import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import dtxPlugins from './plugins/dtxmixins'
import swal from 'sweetalert2'
import Axios from 'axios'

Vue.prototype.$http = Axios
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['x-access-token'] = token
}
Vue.prototype.swal = swal

Vue.config.productionTip = false
Vue.use(dtxPlugins)

new Vue({
  router,
  vuetify,
  render: h => h(App),
  store,
}).$mount('#app')
