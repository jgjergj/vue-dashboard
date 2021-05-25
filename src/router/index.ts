import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/dashboard/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import('@/views/dashboard/Home.vue'),
    children: [
      // Dashboard
      {
        name: 'Dashboard',
        path: '',
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
      // Pages
      // {
      //   name: 'User Profile',
      //   path: 'pages/user',
      //   component: () => import('@/views/dashboard/pages/UserProfile.vue'),
      // },
      // {
      //   name: 'Notifications',
      //   path: 'components/notifications',
      //   component: () => import('@/views/dashboard/component/Notifications.vue'),
      // },
      // {
      //   name: 'Icons',
      //   path: 'components/icons',
      //   component: () => import('@/views/dashboard/component/Icons.vue'),
      // },
      // {
      //   name: 'Typography',
      //   path: 'components/typography',
      //   component: () => import('@/views/dashboard/component/Typography.vue'),
      // },
      // // Tables
      // {
      //   name: 'Regular Tables',
      //   path: 'tables/regular-tables',
      //   component: () => import('@/views/dashboard/tables/RegularTables.vue'),
      // },
      // // Maps
      // {
      //   name: 'Google Maps',
      //   path: 'maps/google-maps',
      //   component: () => import('@/views/dashboard/maps/GoogleMaps.vue'),
      // },
      // // Upgrade
      // {
      //   name: 'Upgrade',
      //   path: 'upgrade',
      //   component: () => import('@/views/dashboard/Upgrade.vue'),
      // },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
