<template>
  <div class="section">
    <div class="fixed-grid has-1-cols">
      <div class="cell buttons is-right">
        <button class="button" @click="logoutRequest">ログアウト</button>
      </div>

      <div class="cell buttons is-centered">
        <button class="button" @click="update">更新</button>
      </div>

      <div class="cell">
        <button
          v-if="serverStoppped"
          class="button is-fullwidth"
          :class="{ 'is-loading': lockWoL }"
          :disabled="lockWoL"
          @click="wake"
        >
          サーバー起動
        </button>
      </div>
      <div v-if="health" class="cell">
        <MinecraftServerCard :status="health" />
      </div>
    </div>
    <p>最終更新: {{ lastUpdatedAt?.toLocaleString() }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'

import type { Status } from '@/types'
import { getMinecraftStatus, postWakeOnLan, logout } from '@/util/minecraftApi'
import { useRouter } from 'vue-router'
import { useToast } from '@/stores/toast'

import MinecraftServerCard from '@/components/MinecraftServerCard.vue'

const health = ref<Status | null>(null)
const lastUpdatedAt = ref<Date | null>()
const lockWoL = ref<boolean>(false)

const router = useRouter()
const toastStore = useToast()

const serverStoppped = computed<boolean>(() => health.value?.state === 'stopped')

const wake = async () => {
  lockWoL.value = true
  const res = await postWakeOnLan()

  if (res?.data.ok) {
    toastStore.push('Wake On LAN request success.', 'is-info')
    setTimeout(
      () => {
        lockWoL.value = false
      },
      3 * 60 * 1000,
    )
  }
}

const update = async () => {
  const res = await getMinecraftStatus()
  health.value = res.data
  lastUpdatedAt.value = new Date()
}

const logoutRequest = async () => {
  toastStore.push('logout success.', 'is-info')

  await logout()
  router.push({ name: 'login' })
}

const updateInterval = setInterval(update, 30 * 1000)

onBeforeUnmount(() => {
  clearInterval(updateInterval)
})

update()
</script>
