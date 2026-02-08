<template>
  <div class="section">
    <div class="buttons is-centered">
      <button class="cell button" @click="update">更新</button>
    </div>
    <div class="fixed-grid has-1-cols">
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
import { getMinecraftStatus, postWakeOnLan } from '@/util/minecraftApi'

import MinecraftServerCard from '@/components/MinecraftServerCard.vue'

const health = ref<Status | null>(null)
const lastUpdatedAt = ref<Date | null>()
const lockWoL = ref<boolean>(false)

const serverStoppped = computed<boolean>(() => health.value?.state === 'stopped')

const wake = async () => {
  lockWoL.value = true
  const res = await postWakeOnLan()

  if (res?.data.ok) {
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

const updateInterval = setInterval(update, 30 * 1000)

onBeforeUnmount(() => {
  clearInterval(updateInterval)
})

update()
</script>
