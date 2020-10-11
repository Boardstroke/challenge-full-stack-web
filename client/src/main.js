import Vue from 'vue'
import App from './App.vue'
import Snackbar from './components/Snackbar.vue'
import router from './router/index'
import vuetify from './plugins/vuetify';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueMask from 'v-mask'

Vue.prototype.$EventBus = new Vue()
Vue.component('Snackbar', Snackbar)
Vue.use(VueMask);

library.add(faTrashAlt, faPen)

Vue.component('fa', FontAwesomeIcon)

import './index.scss';
Vue.config.productionTip = false


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
