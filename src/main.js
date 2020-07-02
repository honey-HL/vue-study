import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import registryNotice from './utils/notice'

// 自定义组件 registryNotice
Vue.use(registryNotice)
Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')
