import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {serverUrl} from "../env";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faCog, faShareAlt, faSave, faCircle, faTrash, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueSocketIO from 'vue-socket.io'

library.add(faPlay, faCog, faShareAlt, faSave, faCircle, faTrash, faPaperPlane)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  debug: true,
  connection: serverUrl
}))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
