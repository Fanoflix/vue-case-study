<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import NetworkConnectivityNotification from '@/components/NetworkConnectivityNotification.vue'
import SnackbarNotification from './components/SnackbarNotification.vue'

const body: HTMLElement | null = document.querySelector('body')
body?.classList.add('dark')
</script>

<template>
  <NetworkConnectivityNotification />
  <SnackbarNotification />
  <AppLayout />
</template>

<style lang="scss">
@import '@assets/variables.scss';
@import '@assets/base-styling.scss';
@import '@assets/screens.scss';
@include base-styling;
</style>
