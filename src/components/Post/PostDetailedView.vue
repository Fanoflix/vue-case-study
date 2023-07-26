<script setup lang="ts">
import { ref } from 'vue'

interface PostDetailedViewProps {
  title: string
  body: string
}

/**
 * @props
 */
const props = defineProps<PostDetailedViewProps>()

/**
 * @state
 */
const stateA = ref<string>('test')
</script>

<template>
  <div>New Template Component</div>
</template>

<style lang="scss" scoped></style>
