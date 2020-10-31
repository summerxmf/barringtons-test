import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueLazyload from 'vue-lazyload';
import 'common/scss/index.scss';

Vue.use(VueLazyload, {
  loading: require('common/images/barringtons250x50.png')
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
