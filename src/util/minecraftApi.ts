import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-with': 'XMLHttpRequest',
  },
  responseType: 'json',
})

export const getMinecraftStatus = async () => await api.get('/health')
export const postWakeOnLan = async () => await api.post('/wake')
