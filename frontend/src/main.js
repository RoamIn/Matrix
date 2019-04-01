// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

import App from './app'
import router from './router'

// components
import Icon from '@/components/icon'

// plugins
import ajax from '@/plugins/ajax'

// use components
Vue.component(Icon.name, Icon)

// use plugins
Vue.use(VueClipboard)
Vue.use(ajax)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
