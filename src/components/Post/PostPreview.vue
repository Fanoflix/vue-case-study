<script setup lang="ts">
import { computed, ref } from 'vue'
import applicationConfig from '@/config/application'
import CommentsPreview from '@/components/Comments/CommentsPreview.vue'
import type { Post } from '@/services/posts/types'

interface PostPreviewProps extends Pick<Post, 'id' | 'title' | 'body'> {}

/**
 * @props
 */
const props = defineProps<PostPreviewProps>()

/**
 * @state
 */
const showMore = ref(false)

/**
 * @computed properties
 */
const computedBodyContent = computed(() => (showMore.value ? props.body : clippedBodyContent.value))

const clippedBodyContent = computed(() => {
  return showMoreable.value
    ? `${props.body.substring(0, applicationConfig.CLIPPED_BODY_CONTENT_LENGTH)}...`
    : props.body
})

const showMoreable = computed(() => {
  return props.body.length > applicationConfig.CLIPPED_BODY_CONTENT_LENGTH
})

/**
 * @methods
 */
const toggleShowMore = () => {
  if (showMoreable.value) showMore.value = !showMore.value
}
</script>

<template>
  <section class="preview-container">
    <div class="post-preview-container">
      <h4 class="post-preview-title">{{ props?.title }}</h4>
      <div class="post-preview-body">
        <p>
          {{ computedBodyContent }}
        </p>
      </div>
      <button
        v-if="showMoreable && !showMore"
        class="see-more-button pointer"
        @click.prevent="toggleShowMore"
      >
        ... see more
      </button>
      <CommentsPreview v-if="props?.id" :postId="(props?.id as number)" />
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
