import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import registryNotice from './utils/notice'
import router from './krouter'
import store from './kstore'
// import store from './store'
// import router from './router'

// 自定义组件 registryNotice
Vue.use(registryNotice)
Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  // 设置router，它怎么起作用？
  router,

  store,
  render: h => h(App)
}).$mount('#app')
