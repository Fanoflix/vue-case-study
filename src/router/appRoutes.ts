import PostView from '@/views/Posts/PostView.vue'
import PostsLists from '@/views/Posts/PostsLists.vue'

const APP_ROUTES = Object.freeze({
  POSTS: {
    path: '/',
    name: 'Feed',
    component: PostsLists
  },
  POST_VIEW: {
    path: '/post/:id',
    name: 'Post',
    component: PostView
  }
})

export default APP_ROUTES
