import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import VueCookies from "vue-cookies"
import Toasted from 'vue-toasted';
import VueSimpleAlert from "vue-simple-alert";

Vue.use(Toasted)
Vue.use(VueSimpleAlert);
Vue.use(VueCookies)

Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
      el.clickOutsideEvent = function (event) {
        // here I check that click was outside the el and his childrens
        if (!(el == event.target || el.contains(event.target))) {
          // and if it did, call method provided in attribute value
          vnode.context[binding.expression](event);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    },
  });

const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

window.app = app
