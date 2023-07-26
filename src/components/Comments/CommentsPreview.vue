<script setup lang="ts">
import { useAsync } from '@/composables'
import applicationConfig from '@/config/application'
import commentsAPIService from '@/services/comments/comments.service'
import TheComment from '@/components/Comments/TheComment.vue'
import type { Comment } from '@/services/comments/types'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import APP_ROUTES from '@/router/appRoutes'
import { SnackbarTypes, useSnackbarStore } from '@/stores/snackbar'
const { showSnackbar } = useSnackbarStore()

interface CommentsPreviewProps {
  postId: number
}

const {
  data: comments,
  isLoading,
  error,
  run: fetchCommentsByPostId
} = useAsync<Comment[]>(async () => await commentsAPIService.getCommentsByPostId(props.postId))
const router = useRouter()

fetchCommentsByPostId()

/**
 * @computed
 */
const previewComments = computed(() => {
  return comments.value?.slice(0, applicationConfig.COMMENTS_PREVIEW_SIZE)
})

const remainingCommentsLength = computed(() =>
  comments.value ? comments.value?.length - applicationConfig.COMMENTS_PREVIEW_SIZE : 0
)

/**
 * @props
 */
const props = defineProps<CommentsPreviewProps>()

/**
 * @methods
 */
const goToDetailedPostView = () => {
  router.push({
    name: APP_ROUTES.POST_VIEW.name,
    params: { id: props.postId }
  })
}

/**
 * @watchers
 */
watch(error, (newError) => {
  if (newError) showSnackbar(newError.message, SnackbarTypes.danger)
})
</script>

<template>
  <div v-if="isLoading">Loading comments...</div>

  <section v-else class="comment-preview-container">
    <div v-for="comment in previewComments" :key="comment.id">
      <TheComment :name="comment.name" :email="comment.email" :body="comment.body" />
    </div>

    <button
      v-if="remainingCommentsLength"
      class="comment-remaining-comments pointer"
      @click.prevent="goToDetailedPostView"
    >
      {{ remainingCommentsLength }} remaining comments
    </button>
  </section>
</template>

<style lang="scss" scoped>
@import '@assets/variables.scss';
.comment-preview-container {
  margin: 0 auto;

  .comment-remaining-comments {
    &:hover {
      background-color: $primary;
    }
  }
}
</style>
