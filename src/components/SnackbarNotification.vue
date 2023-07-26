<script setup lang="ts">
import { useSnackbarStore } from '@/stores/snackbar'
import { storeToRefs } from 'pinia'

const snackbarStore = useSnackbarStore()
const { snackbarState } = storeToRefs(snackbarStore)
const { closeSnackbar } = snackbarStore
</script>

<template>
  <Transition name="snackbar-slide-in" mode="in-out">
    <div
      v-if="snackbarState.isActive"
      class="snackbar-notification-container"
      :class="[snackbarState.type]"
    >
      <div class="snackbar-message-container">
        <p>{{ snackbarState.message }}</p>
      </div>

      <div class="snackbar-cross-icon-container">
        <span class="snackbar-cross-icon pointer" @click.prevent="closeSnackbar">&#10005;</span>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import '@assets/variables.scss';

.snackbar-notification-container {
  position: fixed;
  transform: translate(-50%, 0%);
  left: 50%;
  bottom: 65px;

  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40vw;
  max-width: 60vw;
  max-height: 150px;
  border-radius: $global-border-radius;
  padding: $global-padding;
  color: $white;
  z-index: 100;

  .snackbar-cross-icon-container {
    align-self: flex-end;
    height: 100%;
    background: inherit;
    display: flex;
    align-items: center;
    justify-content: center;

    .snackbar-cross-icon {
      background: inherit;
      padding: 4px;
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: $global-border-radius;

      &:hover {
        filter: brightness(1.5);
      }
    }
  }

  .snackbar-message-container {
    height: auto;
    margin: auto $global-aesthetic-margin;

    p {
      width: 35vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.danger {
  background: $danger;
}

.success {
  background: $success-dark;
}

.warn {
  background: $warn;
}

.snackbar-slide-in-enter-from,
.snackbar-slide-in-leave-to {
  opacity: 0;
}

.snackbar-slide-in-enter-active,
.snackbar-slide-in-leave-active {
  transition: opacity 100ms ease-in;
}
</style>
