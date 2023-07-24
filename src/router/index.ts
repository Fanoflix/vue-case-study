import { createRouter, createWebHistory } from 'vue-router'
import APP_ROUTES from './appRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [APP_ROUTES.HOME, APP_ROUTES.POSTS]
})

export default router
