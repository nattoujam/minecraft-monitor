<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img v-if="props.status.icon" :src="props.status.icon" />
            <img v-else src="@/assets/pause.png" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ props.name }}</p>
          <p class="subtitle is-6">{{ props.status.motd ?? '' }}</p>
        </div>
      </div>

      <div class="content">
        <div class="tags">
          <MinecraftStateTag :state="props.status.state" />
          <span v-if="props.status.version" class="tag">{{ props.status.version }}</span>
        </div>
        <template v-if="props.status.state === 'running'">
          <p>
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-user"></i>
              </span>
              <span>{{ props.status.online }} / {{ props.status.max }}</span>
            </span>
          </p>
          <p class="is-size-7">({{ latencyMs }} ms)</p>
        </template>
      </div>
    </div>

    <div class="card-footer">
      <div class="card-footer-item">
        <button
          v-if="props.status.state !== 'running'"
          class="button is-fullwidth"
          :class="{ 'is-loading': props.loading }"
          :disabled="props.startDisabled"
          @click="emits('start')"
        >
          起動
        </button>
        <button
          v-else
          class="button is-fullwidth is-danger"
          :class="{ 'is-loading': props.loading }"
          @click="emits('stop')"
        >
          停止
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Status } from '@/types'

import MinecraftStateTag from '@/components/MinecraftStateTag.vue'

const props = defineProps<{
  name: string
  status: Status
  loading: boolean
  startDisabled: boolean
}>()

const emits = defineEmits<{
  (e: 'start'): void
  (e: 'stop'): void
}>()

const latencyMs = computed<string>(() => (props.status.latency_ms ?? 0).toFixed(2))
</script>
