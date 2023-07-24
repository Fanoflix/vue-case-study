<script setup lang="ts">
import useAsync from '@/composables/useAsync'
import commentsAPIService from '@/services/comments/comments.service'
import type { Comment } from '@/services/comments/types'
import postsAPIService from '@/services/posts/posts.service'
import type { Post } from '@/services/posts/types'
import { onMounted, ref } from 'vue'

const posts = ref<Post[] | null>(null)
const comments = ref<Comment[] | null>(null)
const currAPI = ref<boolean>(false)

const { data, error, isLoading, info, run } = useAsync<Post[]>(
  async () => await postsAPIService.getAllPosts()
)

onMounted(function () {
  fetchPosts()
})

console.log('RETurns', {
  data: data.value,
  error: error.value,
  isLoading: isLoading.value,
  info: info.value
})

async function fetchPosts() {
  await run()
  posts.value = data.value
}
// const fetchPosts = async () => {
// isLoading.value = true
// try {
//   const [error, data, info] = await postsAPIService.getAllPosts()
//   console.log({ error, data, info })
//   posts.value = data as Post[]
// } catch (error) {
//   showSnackbar()
// } finally {
//   isLoading.value = false
// }
// }

// const fetchComments = async () => {
// isLoading.value = true
// try {
//   const [error, data, info] = await commentsAPIService.getAllComments()
//   console.log({ error, data, info })
// } catch (error) {
//   showSnackbar()
// } finally {
//   isLoading.value = false
// }
// }

const showSnackbar = () => {
  console.log('Showing Snackbar!')
}

fetchPosts()

const toggleAPI = () => {
  currAPI.value ? fetchComments() : fetchPosts()
  currAPI.value = !currAPI.value
}
</script>

<template>
  <h2 v-if="isLoading">LOADING {{ isLoading }}</h2>
  <main v-else>
    {{ posts?.[0] }} AND
    <div>
      {{ data }}
    </div>
  </main>
  <button @click="toggleAPI">Toggle</button>
</template>
