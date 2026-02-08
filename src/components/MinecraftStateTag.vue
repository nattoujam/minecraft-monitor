<template>
  <div class="tag" :class="colorClass">{{ props.state }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { State } from '@/types'

const COLOR_CLASS_MAP = new Map<State, string>([
  ['starting', 'is-info'],
  ['running', 'is-primary'],
  ['stopped', 'is-danger'],
  ['unknown', ''],
])

const props = defineProps<{
  state: State
}>()

const colorClass = computed<string>(() => {
  return COLOR_CLASS_MAP.get(props.state) ?? ''
})
</script>
