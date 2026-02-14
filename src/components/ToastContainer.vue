<template>
  <div class="toast-container is-flex is-flex-direction-column">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toastStore.getToast"
        class="notification"
        :class="toast.level"
        :key="`toast-${toast.id}`"
      >
        <button class="delete" @click="toastStore.remove(toast.id)"></button>
        {{ toast.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/stores/toast'

const toastStore = useToast()
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 30vw;
  min-width: 300px;
  z-index: 1000;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
