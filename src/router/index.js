import BaseLayout from '@/components/layout/BaseLayout.vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import OrderLayout from '@/components/layout/OrderLayout.vue';
import BillPage from '@/views/BillPage.vue';
import DashboardPage from '@/views/DashboardPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import MenuPage from '@/views/MenuPage.vue';
import OrderPage from '@/views/OrderPage.vue';
import ProductPage from '@/views/ProductPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import ReportPage from '@/views/ReportPage.vue';
import SettingsPage from '@/views/SettingsPage.vue';
import { isLoggedIn } from '@/lib/helpers/session';
import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import { logout } from '@/lib/firebase/services/userService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: DashboardLayout,
          children: [
            { path: '', name: 'dashboard', component: DashboardPage },
            { path: 'product', name: 'product', component: ProductPage },
            { path: 'report', name: 'report', component: ReportPage },
            { path: 'settings', name: 'settings', component: SettingsPage }
          ]
        },
        {
          path: 'order/bill',
          component: BaseLayout,
          children: [{ path: '', name: 'bill', component: BillPage }]
        },
        {
          path: 'order',
          component: OrderLayout,
          children: [
            { path: '', name: 'order', component: OrderPage },
            { path: 'menu', name: 'menu', component: MenuPage }
          ]
        },
      ]
    },
    {
      path: '/auth',
      component: BaseLayout,
      redirect: '/auth/login',
      meta: { requiresAuth: false },
      children: [
        { path: 'login', name: 'login', component: LoginPage },
        { path: 'register', name: 'register', component: RegisterPage }
      ]
    }
  ]
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    Cookies.remove('isLogin');
    Cookies.remove('jwtToken');
    logout();
    // return { name: 'login' };
  }
  if (!to.meta.requiresAuth && isLoggedIn()) {
    // return { name: 'dashboard' };
  }
});

export default router;
