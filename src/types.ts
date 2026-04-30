export type State = 'starting' | 'running' | 'stopped' | 'unknown'

export type ServerInfo = {
  code: string
  name: string
}

export type Status = {
  state: State
  online?: number
  max?: number
  motd?: string
  version?: string
  latency_ms?: number
  icon?: Base64URLString
}
