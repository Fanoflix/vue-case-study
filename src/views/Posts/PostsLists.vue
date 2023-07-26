<script setup lang="ts">
import PostPreview from '@/components/Post/PostPreview.vue'
import { useAsync, useNetwork } from '@/composables'
import postsAPIService from '@/services/posts/posts.service'
import type { Post } from '@/services/posts/types'
import { onMounted, watch } from 'vue'
import { SnackbarTypes, useSnackbarStore } from '@/stores/snackbar'
import type { CustomApiErrorResponse } from '@/composables/useAsync'

const { showSnackbar } = useSnackbarStore()
const { isOnline } = useNetwork()

const {
  data: posts,
  isLoading,
  run: getPosts,
  error
} = useAsync<Post[]>(async () => await postsAPIService.getAllPosts())

getPosts()

/**
 * @watchers
 */
watch(error, (newError: CustomApiErrorResponse) => {
  if (newError) showSnackbar(newError.message, SnackbarTypes.danger)
})

watch(isOnline, (updatedOnline) => {
  if (updatedOnline) getPosts()
})
</script>

<template>
  <div v-if="isLoading">Loading feed...</div>
  <section v-else class="posts-list">
    <h1>User Posts</h1>

    <PostPreview
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :body="post.body"
    />
  </section>
</template>

<style scoped lang="scss"></style>
