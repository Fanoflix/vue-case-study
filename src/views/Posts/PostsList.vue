<script setup lang="ts">
import PostPreview from '@/components/Post/PostPreview.vue'
import { useAsync, useNetwork } from '@/composables'
import postsAPIService from '@/services/posts/posts.service'
import type { Post } from '@/services/posts/types'
import { watch } from 'vue'
import { SnackbarTypes, useSnackbarStore } from '@/stores/snackbar'
import type { CustomApiErrorResponse } from '@/composables/useAsync'

const { showSnackbar } = useSnackbarStore()
const { isOnline } = useNetwork()

const {
  data: posts,
  isLoading,
  run: fetchAllPosts,
  error
} = useAsync<Post[]>(async () => await postsAPIService.getAllPosts())

fetchAllPosts()

/**
 * @watchers
 */
watch(error, (newError: CustomApiErrorResponse) => {
  if (newError) showSnackbar(newError.message, SnackbarTypes.danger)
})

watch(isOnline, (updatedOnline) => {
  // re-fetch on coming back online
  if (updatedOnline && !posts.value) fetchAllPosts()
})
</script>

<template>
  <div v-if="isLoading">Loading feed...</div>
  <section v-else class="posts-list">
    <h1 class="post-lists-page-title">Feed</h1>

    <PostPreview
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :body="post.body"
    />
  </section>
</template>

<style scoped lang="scss">
@import '@assets/variables.scss';

.post-lists-page-title {
  margin-bottom: $global-aesthetic-margin;
}
</style>
