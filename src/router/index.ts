import { createRouter, createWebHistory } from 'vue-router'
import APP_ROUTES from './appRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [APP_ROUTES.POSTS, APP_ROUTES.POST_VIEW]
})

export default router
