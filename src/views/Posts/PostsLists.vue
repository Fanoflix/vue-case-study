<script setup lang="ts">
import useAsync from '@/composables/useAsync'
import postsAPIService from '@/services/posts/posts.service'
import type { Post } from '@/services/posts/types'

const { data, isLoading, error, info, run } = useAsync<Post[]>(
  async () => await postsAPIService.getAllPosts
)

const fetchPosts = async () => {
  await run()
}

fetchPosts()
</script>

<template>
  <section class="posts-list">
    <h1>Posts Page</h1>

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      {{ data }}
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
