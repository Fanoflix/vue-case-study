<script setup lang="ts">
import applicationConfig from '@/config/application'
import { ref } from 'vue'

interface CommentsPreviewProps {
  foo: string
  bar?: number
}

/**
 * @props
 */
const props = defineProps<CommentsPreviewProps>()

/**
 * @state
 */
const stateA = ref<string>('test')
</script>

<template>
  <div>New Template Component</div>
</template>

<style lang="scss" scoped></style>
