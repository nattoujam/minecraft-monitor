import DashboardPage from '@/views/DashboardPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { checkAuth } from '@/util/minecraftApi'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage,
      meta: { requireAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
  ],
})

router.beforeEach(async (to) => {
  if (!to.meta.requireAuth) return true

  try {
    await checkAuth()
    return true
  } catch (e: any) {
    if (e.response?.status === 401) {
      return {
        path: '/login',
        query: { redirect: to.fullPath },
      }
    }
  }
})

export default router
