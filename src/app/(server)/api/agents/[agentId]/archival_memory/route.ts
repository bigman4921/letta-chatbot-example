import { NextRequest, NextResponse } from 'next/server'
import client from '@/config/letta-client'
import { validateAgentOwner } from '../../helpers'
import { Context } from '@/types'

async function getAgentPassages(
  req: NextRequest,
  context: Context<{ agentId: string }>
) {
  const result = await validateAgentOwner(req, context)
  if (result instanceof NextResponse) {
    return result
  }
  const { agentId } = result

  try {
    const passages = await client.agents.passages.list(agentId)
    if (!passages) {
      return NextResponse.json(
        { error: 'Passages not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(passages)
  } catch (error) {
    console.error('Error fetching passages:', error)
    return NextResponse.json(
      { error: 'Error fetching passages' },
      { status: 500 }
    )
  }
}

export const GET = getAgentPassages
