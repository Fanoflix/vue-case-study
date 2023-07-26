<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { type Comment } from '@/services/comments/types'
import TheComment from '@/components/Comments/TheComment.vue'
import { useAsync } from '@/composables'
import commentsAPIService from '@/services/comments/comments.service'
import { useRoute, type RouteParams } from 'vue-router'
import postsAPIService from '@/services/posts/posts.service'
import type { Post } from '@/services/posts/types'
import APP_ROUTES from '@/router/appRoutes'
import { SnackbarTypes, useSnackbarStore } from '@/stores/snackbar'
const { showSnackbar } = useSnackbarStore()

const route = useRoute()

export interface PostViewRouteParams extends RouteParams {
  id: string
}

let { id } = route.params as PostViewRouteParams
const postId = parseInt(id)

const {
  data: comments,
  isLoading: isCommentsLoading,
  error: commentsError,
  run: fetchCommentsByPostId
} = useAsync<Comment[]>(async () => await commentsAPIService.getCommentsByPostId(postId))

const {
  data: post,
  isLoading: isPostLoading,
  error: postError,
  run: fetchPostById
} = useAsync<Post>(async () => await postsAPIService.getPostById(postId))

fetchPostById()
fetchCommentsByPostId()

/**
 * @computed
 */

const isLoading = computed(() => {
  return isCommentsLoading.value || isPostLoading.value
})

const errorMessage = computed(() => {
  if (!postError.value && !commentsError.value) {
    return null
  }

  let composedErrorMessage = ''

  if (postError.value) {
    composedErrorMessage = postError.value.message
  }

  if (commentsError.value) {
    composedErrorMessage = commentsError.value.message
  }

  if (postError.value && commentsError.value) {
    composedErrorMessage = `Multiple errors: ${postError.value.message}  ${commentsError.value.message}`
  }

  return composedErrorMessage
})

/**
 * @watchers
 */

watch(errorMessage, (newErrorMessage) => {
  console.log({ postError: postError.value, commentError: commentsError.value })

  if (newErrorMessage) showSnackbar(newErrorMessage, SnackbarTypes.danger)
})
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <section v-else class="post-detailed-container">
    <button class="go-back-button pointer" @click.prevent="$router.push(APP_ROUTES.POSTS.path)">
      &#8592; Go back to feed
    </button>

    <div class="post-container">
      <h4 class="post-preview-title">{{ post?.title }}</h4>
      <div class="post-preview-body">
        <p>
          {{ post?.body }}
        </p>
      </div>
    </div>

    <div class="comments-container">
      <TheComment
        v-for="comment in comments"
        :key="comment.id"
        :name="comment.name"
        :email="comment.email"
        :body="comment.body"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@assets/variables.scss';

.preview-container {
  width: $center-content-width;
  .post-preview-container {
    display: flex;
    flex-flow: column wrap;
    align-items: flex-start;
    justify-content: center;

    width: $center-content-width;
    padding: $global-padding;
    margin-bottom: $global-aesthetic-margin;
    border: 1px solid $primary;
    border-radius: $global-border-radius;

    .see-more-button {
      right: $global-padding;
      bottom: $global-padding;

      align-self: flex-end;
      justify-self: flex-end;
    }
  }
}

.post-preview-title,
.post-preview-body {
  padding: $global-padding;
}
</style>
