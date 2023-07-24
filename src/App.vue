<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import APP_ROUTES from '@/router/appRoutes'

const body: HTMLElement | null = document.querySelector('body')
body?.classList.add('dark')
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="APP_ROUTES.HOME.path">{{ APP_ROUTES.HOME.name }}</RouterLink>
        <RouterLink :to="APP_ROUTES.POSTS.path">{{ APP_ROUTES.POSTS.name }}</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss">
@import '@assets/variables.scss';
@import '@assets/base-styling.scss';
@import '@assets/screens.scss';
@include base-styling;
</style>
