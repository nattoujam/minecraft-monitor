import axios from 'axios'

import type { State } from '@/types'

const api = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-with': 'XMLHttpRequest',
  },
  responseType: 'json',
})

export const login = async (data: { username: string; password: string }) => await api.post('/api/login', data)
export const logout = async () => await api.post('/api/logout')
export const checkAuth = async () => await api.get('/api/check_auth')
export const getMinecraftStatus = async (endpoint: string) => await api.get(endpoint)
export const postRun = async (endpoint: string) => await api.post(endpoint)
export const getServerList = async () => await api.get('/api/server/list')
export const postStart = async (code: string) => await api.post(`/api/server/${code}/start`)
export const postStop = async (code: string) => await api.post(`/api/server/${code}/stop`)

export const stopMockServer = async (code: string) => await api.post(`/dev/mock/${code}/state`, { state: 'stopped' })
