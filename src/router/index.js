import Vue from 'vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Country from 'components/country';
import CountryDetail from 'components/country-detail';
import Payment from 'components/payment';

// const CountryDetail = () => import('components/country-detail');

const routes = [
  {
    path: '/',
    redirect: '/country'
  },
  {
    path: '/country',
    component: Country,
    children: [
      {
        path: ':code',
        component: CountryDetail
      }
    ]
  },

  {
    path: '/payment',
    component: Payment
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
