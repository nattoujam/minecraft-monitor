<template>
  <h1 class="title has-text-centered">Minecraft Monitor</h1>
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
.login-box {
  max-width: 300px;
  margin: 0 auto;
}
</style>
