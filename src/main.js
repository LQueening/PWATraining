// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMdl from 'vue-mdl'
import {VueMasonryPlugin} from 'vue-masonry'
import Vuefire from 'vuefire'
import firebase from './service/firebase'
import fly from 'flyio'

/*将Event Bus绑定到实例中*/
const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus;
    }
  }
});

Vue.use(VueMdl);
Vue.use(VueMasonryPlugin);
Vue.use(Vuefire);
Vue.config.productionTip = false;
Vue.prototype.fly = fly;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  firebase: {
    calender: firebase.database.ref('calender').orderByChild('created_at')
  },
});
