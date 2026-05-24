export interface Endpoint {
  id: string
  name: string
  url: string
  status: 'up' | 'degraded' | 'down'
  response_time_ms: number
  uptime_pct: number
  last_checked: string
}

export interface AggregateStats {
  total: number
  up: number
  degraded: number
  down: number
  avg_response_time: number
  avg_uptime: number
}
