export type State = 'starting' | 'running' | 'stopped' | 'unknown'

export type Status = {
  state: State
  online?: number
  max?: number
  motd?: string
  version?: string
  latency_ms?: number
  icon?: Base64URLString
}
