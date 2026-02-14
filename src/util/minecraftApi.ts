import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-with': 'XMLHttpRequest',
  },
  responseType: 'json',
})

export const login = async (data: { username: string; password: string }) =>
  await api.post('/api/login', data)
export const logout = async () => await api.post('/api/logout')
export const checkAuth = async () => await api.get('/api/check_auth')
export const getMinecraftStatus = async () => await api.get('/api/health')
export const postWakeOnLan = async () => await api.post('/api/wake')
