<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import APP_ROUTES from '@/router/appRoutes'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="APP_ROUTES.POSTS.path">{{ APP_ROUTES.POSTS.name }}</RouterLink>
      </nav>
    </div>
  </header>

  <section id="current-view">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </section>
</template>

<style lang="scss">
@import '@assets/variables.scss';

#current-view {
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
  align-items: center;
  margin: $global-aesthetic-margin + 30px auto;
  width: $center-content-width;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-1px);
  transform-origin: bottom right;
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(1px);
  transform-origin: bottom left;
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 250ms ease-in, opacity 250ms ease-in-out;
}
</style>
