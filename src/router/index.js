import { createRouter, createWebHistory } from 'vue-router';
import ProductPage from '../pages/ProductPage.vue';

import CheckoutPage from '../pages/CheckoutPage.vue';
import AdminPage from '../pages/AdminPage.vue';
import HeroBanner from '../components/home/HeroBanner.vue';
import IphonePage from '../pages/catalog/IphonePage.vue';
import MacbookPage from '../pages/catalog/MacbookPage.vue';
import IpadPage from '../pages/catalog/IpadPage.vue';
import WatchPage from '../pages/catalog/WatchPage.vue';
import AirpodsPage from '../pages/catalog/AirpodsPage.vue';
const routes = [
  {
    path: '/',
    name: 'hero',
    component: HeroBanner,
  },
  {
    path: '/product/:slug',
    name: 'product',
    component: ProductPage,
  },

  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutPage,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
  },
  {
    path: '/iphone',
    name: 'iphone',
    component: IphonePage,
  },
  {
    path: '/macbook',
    name: 'macbook',
    component: MacbookPage,
  },
  {
    path: '/ipad',
    name: 'ipad',
    component: IpadPage,
  },
  {
    path: '/watch',
    name: 'watch',
    component: WatchPage,
  },
  {
    path: '/airpods',
    name: 'airpods',
    component: AirpodsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
