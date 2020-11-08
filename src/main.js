import Vue from 'vue'
import App from './App.vue'

import vueCustomElement from 'vue-custom-element';

Vue.use(vueCustomElement);

Vue.config.productionTip = false

Vue.customElement('vue-widget', App);
/*
new Vue({
  render: h => h(App),
}).$mount('#app')
*/
