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
          <p class="title is-4">{{ props.status.motd ?? 'Minecraft Server' }}</p>
          <p class="subtitle is-6">{{ props.status.version ?? '' }}</p>
        </div>
      </div>

      <div class="content">
        <p><MinecraftStateTag :state="props.status.state" /></p>
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Status } from '@/types'

import MinecraftStateTag from '@/components/MinecraftStateTag.vue'

const props = defineProps<{
  status: Status
}>()

const latencyMs = computed<string>(() => (props.status.latency_ms ?? 0).toFixed(2))
</script>
