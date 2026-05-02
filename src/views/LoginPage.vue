<template>
  <section class="hero is-fullheight mc-bg">
    <div class="hero-body">
      <div class="container">
        <LoginForm />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
</script>

<style scoped>
.mc-bg {
  background-color: var(--mc-bg);
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 16px 16px;
}
</style>
