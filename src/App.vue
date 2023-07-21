<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const body: HTMLElement | null = document.querySelector('body')
body?.classList.add('dark')
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
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
