import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './config/firebase-config'

initializeApp(firebaseConfig)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
