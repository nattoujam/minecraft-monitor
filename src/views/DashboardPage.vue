<template>
  <AppHeader @logout="logoutRequest" />
  <div class="section mc-bg">
    <div class="is-flex is-justify-content-flex-end is-align-items-center mb-5">
      <span class="has-text-grey is-size-7 mr-4">
        最終更新: {{ lastUpdatedAt?.toLocaleString() ?? '---' }}
      </span>
      <div class="field has-addons mb-0">
        <div class="control">
          <div class="select">
            <select v-model="updateIntervalSec" @change="onUpdate">
              <option :value="0">Off</option>
              <option :value="5">5s</option>
              <option :value="10">10s</option>
              <option :value="30">30s</option>
              <option :value="60">1m</option>
              <option :value="300">5m</option>
            </select>
          </div>
        </div>
        <div class="control">
          <button class="button" @click="onUpdate" title="今すぐ更新">
            <span class="icon">
              <i class="fas fa-rotate" :class="{ 'fa-spin': isRefreshing }"></i>
            </span>
          </button>
        </div>
      </div>
    </div>

    <div class="fixed-grid has-2-cols has-1-cols-mobile">
      <div class="grid">
        <div v-for="(server, i) in serverList" :key="server.code" class="cell">
          <MinecraftServerCard
            v-if="healths[i]"
            :name="server.name"
            :status="healths[i]!"
            :loading="startLocks ?? false"
            :startDisabled="anyRunning"
            @start="startServer(server.code)"
            @stop="stopServer(server.code)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'

import type { Status, ServerInfo } from '@/types'
import AppHeader from '@/components/AppHeader.vue'
import { getMinecraftStatus, getServerList, logout, postStart, postStop } from '@/util/minecraftApi'
import { useRouter } from 'vue-router'
import { useToast } from '@/stores/toast'

import MinecraftServerCard from '@/components/MinecraftServerCard.vue'

let updateInterval: ReturnType<typeof setInterval> | undefined

const serverList = ref<ServerInfo[]>([])
const healths = ref<(Status | null)[]>([])
const lastUpdatedAt = ref<Date | null>()
const startLocks = ref<boolean>(false)
const isRefreshing = ref<boolean>(false)
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
  isRefreshing.value = true

  const results = await Promise.all(
    serverList.value.map((server) => getMinecraftStatus(`/api/server/${server.code}/health`)),
  )
  healths.value = results.map((res) => res.data)
  lastUpdatedAt.value = new Date()
  isRefreshing.value = false
}

const createInterval = () => {
  if (updateIntervalSec.value > 0) {
    updateInterval = setInterval(updateAll, updateIntervalSec.value * 1000)
  }
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

<style scoped>
.mc-bg {
  min-height: 100vh;
  background-color: var(--mc-bg);
  padding-top: calc(3rem + 3.25rem);
}
</style>
