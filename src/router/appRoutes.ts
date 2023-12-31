import PostView from '@/views/Posts/PostView.vue'
import PostsList from '@/views/Posts/PostsList.vue'

const APP_ROUTES = Object.freeze({
  POSTS: {
    path: '/',
    name: 'Feed',
    component: PostsList
  },
  POST_VIEW: {
    path: '/post/:id',
    name: 'Post',
    component: PostView
  }
})

export default APP_ROUTES
