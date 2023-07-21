<script setup lang="ts">
import { ref } from 'vue'

interface PostViewProps {
  foo: string
  bar?: number
}

/**
 * @props
 */
const props = defineProps<PostViewProps>()

/**
 * @state
 */
const stateA = ref<string>('test')
</script>

<template>
  <div>New Template Component</div>
</template>

<style lang="scss" scoped></style>
