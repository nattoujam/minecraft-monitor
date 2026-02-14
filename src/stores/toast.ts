import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

type ToastLevel = 'is-info' | 'is-danger'

type Toast = {
  id: number
  message: string
  level: ToastLevel
  enable: boolean
}

const EXPIRED_MS = 10000

export const useToast = defineStore('toast', () => {
  let id = 0
  const toasts = ref<Array<Toast>>([])

  const getToast = computed(() => toasts.value.filter((toast) => toast.enable))

  const push = (message: string, level: ToastLevel) => {
    const toast = { id, message, level, enable: true }
    setTimeout(() => {
      toast.enable = false
      refresh()
    }, EXPIRED_MS)

    toasts.value.push(toast)
    id += 1
  }

  const remove = (id: number) => {
    toasts.value.forEach((toast) => {
      if (toast.id === id) toast.enable = false
    })
    refresh()
  }

  const refresh = () => {
    toasts.value = toasts.value.filter((toast) => toast.enable)
  }

  return {
    getToast,
    push,
    remove,
  }
})
