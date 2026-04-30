<template>
  <div class="section">
    <div class="fixed-grid has-1-cols">
      <div class="cell buttons is-right">
        <button class="button" @click="logoutRequest">ログアウト</button>
      </div>

      <div class="cell field has-addons is-centered">
        <div class="control">
          <input class="input" type="number" v-model="updateIntervalSec" />
        </div>
        <div class="control">
          <button class="button" @click="onUpdate">更新</button>
        </div>
      </div>
    </div>

    <div v-for="(server, i) in serverList" :key="server.code" class="fixed-grid has-1-cols">
      <div v-if="healths[i]" class="cell">
        <MinecraftServerCard
          :name="server.name"
          :status="healths[i]!"
          :loading="startLocks ?? false"
          :startDisabled="anyRunning"
          @start="startServer(server.code)"
          @stop="stopServer(server.code)"
        />
      </div>
    </div>

    <p>最終更新: {{ lastUpdatedAt?.toLocaleString() }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'

import type { Status, ServerInfo } from '@/types'
import { getMinecraftStatus, getServerList, logout, postStart, postStop } from '@/util/minecraftApi'
import { useRouter } from 'vue-router'
import { useToast } from '@/stores/toast'

import MinecraftServerCard from '@/components/MinecraftServerCard.vue'

let updateInterval: ReturnType<typeof setInterval> | undefined

const serverList = ref<ServerInfo[]>([])
const healths = ref<(Status | null)[]>([])
const lastUpdatedAt = ref<Date | null>()
const startLocks = ref<boolean>(false)
const updateIntervalSec = ref<number>(30)

const anyRunning = computed(() => healths.value.some((h) => h?.state === 'running'))

const router = useRouter()
const toastStore = useToast()

const startServer = async (code: string) => {
  startLocks.value = true
  const res = await postStart(code)

  if (res?.data.ok) {
    toastStore.push('Request success.', 'is-info')
  }
}

const stopServer = async (code: string) => {
  startLocks.value = true

  const res = await postStop(code)

  if (res?.data.ok) {
    toastStore.push('Request success.', 'is-info')
  }
}

const updateAll = async () => {
  startLocks.value = false

  const results = await Promise.all(
    serverList.value.map((server) => getMinecraftStatus(`/api/server/${server.code}/health`)),
  )
  healths.value = results.map((res) => res.data)
  lastUpdatedAt.value = new Date()
}

const createInterval = () => {
  updateInterval = setInterval(updateAll, updateIntervalSec.value * 1000)
}

const logoutRequest = async () => {
  toastStore.push('logout success.', 'is-info')

  await logout()
  router.push({ name: 'login' })
}

const init = async () => {
  const res = await getServerList()
  serverList.value = Array.isArray(res.data) ? res.data : []
  healths.value = serverList.value.map(() => null)
  createInterval()
  await updateAll()
}

onBeforeUnmount(() => {
  clearInterval(updateInterval)
})

const onUpdate = async () => {
  clearInterval(updateInterval)
  createInterval()
  await updateAll()
}

init()
</script>
