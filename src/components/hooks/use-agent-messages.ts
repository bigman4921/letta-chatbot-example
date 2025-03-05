import { AppMessage } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const getAgentMessagesQueryKey = (agentId: string) => [
  'agentMessages',
  agentId
]
