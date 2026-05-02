<template>
  <nav class="navbar is-dark mc-navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <span class="icon-text">
          <img src="/favicon.svg" class="mc-icon" alt="logo" />
          <span class="has-text-white has-text-weight-bold is-size-5">Minecraft Monitor</span>
        </span>
      </a>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        :class="{ 'is-active': isNavOpen }"
        @click="isNavOpen = !isNavOpen"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': isNavOpen }">
      <div class="navbar-end">
        <div class="navbar-item">
          <button class="button is-light is-small" @click="emit('logout')">
            <span class="icon">
              <i class="fas fa-right-from-bracket"></i>
            </span>
            <span>ログアウト</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isNavOpen = ref(false)
const emit = defineEmits<{ logout: [] }>()
</script>

<style scoped>
.mc-navbar {
  padding-inline: 1.5rem;
}

.mc-icon {
  width: 1.5rem;
  height: auto;
  margin-right: 0.5rem;
}
</style>
