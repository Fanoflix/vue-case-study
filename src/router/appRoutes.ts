import HomeView from '@/views/HomeView.vue'
import PostsLists from '@/views/Posts/PostsLists.vue'

const APP_ROUTES = Object.freeze({
  HOME: {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  POSTS: {
    path: '/posts',
    name: 'Posts',
    component: PostsLists
  }
})

export default APP_ROUTES
