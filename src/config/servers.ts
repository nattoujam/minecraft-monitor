export interface ServerConfig {
  name: string
  runEndpoint: string
  healthEndpoint: string
}

export const servers: ServerConfig[] = [
  {
    name: 'Minecraft Server',
    runEndpoint: '/hook/run',
    healthEndpoint: '/api/health',
  },
]
