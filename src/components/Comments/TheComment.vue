<script setup lang="ts">
import type { Comment } from '@/services/comments/types'

export interface TheCommentProps extends Pick<Comment, 'name' | 'email' | 'body'> {}

/**
 * @props
 */
const props = defineProps<TheCommentProps>()

/**
 * @state
 */
</script>

<template>
  <section class="comment-container">
    <div class="comment-user-info">
      <p class="comment-user-name">
        {{ props?.name }}
      </p>

      <p class="comment-user-email">
        {{ props?.email }}
      </p>
    </div>
    <p class="comment-body">
      {{ props?.body }}
    </p>
  </section>
</template>

<style lang="scss" scoped>
@import '@assets/variables.scss';
.comment-container {
  width: calc(0.95 * $center-content-width);
  border-radius: $global-border-radius;
  padding: $global-padding;
  margin: $global-aesthetic-margin auto;

  background-color: $primary;

  .comment-user-info {
    margin-bottom: $global-aesthetic-margin;

    .comment-user-email {
      font-size: 12px;
      color: $secondary-dark;
      font-weight: 600;
    }
  }
}
</style>
