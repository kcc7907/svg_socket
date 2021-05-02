import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  connection: 'http://localhost:9999',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')