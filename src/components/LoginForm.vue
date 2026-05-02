<template>
  <div class="has-text-centered mb-6">
    <img src="/favicon.svg" class="mc-icon" alt="logo" />
    <p class="has-text-white has-text-weight-bold is-size-3 mt-3">Minecraft Monitor</p>
  </div>
  <form class="box login-box" @submit.prevent="loginRequest">
    <div class="field">
      <div class="control has-icons-left">
        <input class="input" type="text" placeholder="username" v-model="username" />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          :type="showPassword ? 'test' : 'password'"
          placeholder="password"
          v-model="password"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
        <span class="icon is-right is-clickable" @click="showPassword = !showPassword">
          <i class="fas" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button
          class="button is-success is-fullwidth mt-6"
          type="submit"
          :disabled="disableLoginButton"
        >
          Login
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/util/minecraftApi'
import { useToast } from '@/stores/toast'

const username = ref<string>('')
const password = ref<string>('')
const showPassword = ref<boolean>(false)

const disableLoginButton = computed(() => !username.value || !password.value)

const router = useRouter()
const toastStore = useToast()

const loginRequest = async () => {
  const data = {
    username: username.value,
    password: password.value,
  }

  try {
    const res = await login(data)
    if (res?.data.ok) {
      toastStore.push('login success.', 'is-info')
      router.push({ name: 'dashboard' })
    }
  } catch (error: any) {
    toastStore.push(error.message, 'is-danger')
  }
}
</script>

<style scoped>
.mc-icon {
  width: 5rem;
  height: auto;
}

.login-box {
  max-width: 340px;
  margin: 0 auto;
}
</style>
