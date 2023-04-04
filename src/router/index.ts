import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Menu from '../views/MenuView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Menu
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
