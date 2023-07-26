<script setup lang="ts">
import { useNetwork } from '@/composables'
import { computed, onUnmounted, ref, watch } from 'vue'
import applicationConfig from '@/config/application'
import { errorMessages, successMessages } from '@/config/constants'

const { isOnline, hasDisconnected } = useNetwork()

/**
 * @state
 */
const isActive = ref(false)
let notificationHideTimeout: number | undefined

/**
 * @methods
 */

const showNotification = () => {
  if (!hasDisconnected.value) return

  if (notificationHideTimeout) clearTimeout(notificationHideTimeout)
  isActive.value = true
}

const hideNotificationWithDelay = () => {
  notificationHideTimeout = setTimeout(() => {
    isActive.value = false
  }, applicationConfig.NETWORK_CONNECTIVITY_NOTIFICATION_FADE_TIMEOUT)
}

/**
 * @watchers
 */
watch(isOnline, () => {
  !isOnline.value ? showNotification() : hideNotificationWithDelay()
})

/**
 * @computed
 */
const networkNotificationText = computed(() =>
  isOnline.value ? successMessages.BACK_ONLINE_NOTIFICATION : errorMessages.OFFLINE_WARNING
)

/**
 * @lifecycleHooks
 */
onUnmounted(() => {
  clearTimeout(notificationHideTimeout)
})
</script>

<template>
  <Transition name="grow-top" mode="in-out">
    <div
      class="network-notification-container"
      :class="[{ success: isOnline, danger: !isOnline }]"
      v-if="isActive"
    >
      {{ networkNotificationText }}
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import '@assets/variables.scss';

.network-notification-container {
  position: sticky;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  color: $white;
  z-index: 100;
}

.danger {
  background: $danger;
}

.success {
  background: $success-dark;
}

.grow-top-enter-from,
.grow-top-leave-to {
  transform: scaleY(0);
  opacity: 0;
  transform-origin: top center;
}

.grow-top-enter-active,
.grow-top-leave-active {
  transition: transform 175ms ease-out, opacity 150ms ease-out;
}
</style>
