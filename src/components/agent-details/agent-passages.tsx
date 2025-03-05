import { useAgentContext } from '@/app/[agentId]/context/agent-context'
import { useAgentPassages } from '../hooks/use-agent-passages'
import { SkeletonLoadBlock } from '../ui/skeleton-load-block'

export function AgentPassages() {
  const { agentId } = useAgentContext()
  const { data, isLoading } = useAgentPassages(agentId)
  const passages = data || []

  if (!passages || isLoading) {
    return <SkeletonLoadBlock className='w-[18em] h-[6em]' />
  }

  return (
    <div>
      {passages.length > 0 ? (
        passages.map((block) => (
          <div key={block.id} className='mb-2'>
            <span className='text-sm'>{block.text}</span>
          </div>
        ))
      ) : (
        <span className='text-sm text-muted-foreground'>
          Nothing here yet 
        </span>
      )}
    </div>
  )
}
