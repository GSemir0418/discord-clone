import { NextResponse } from 'next/server'
import type { DirectMessage } from '@prisma/client'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

const MESSAGES_BATCH = 10

export async function GET(req: Request) {
  try {
    const profile = await currentProfile()
    if (!profile)
      return new NextResponse('Unauthorized', { status: 401 })

    const { searchParams } = new URL(req.url)

    const cursor = searchParams.get('cursor')
    const conversationId = searchParams.get('conversationId')
    if (!conversationId)
      return new NextResponse('Conversation ID missing', { status: 400 })

    let messges: DirectMessage[] = []
    if (cursor) {
      messges = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          conversationId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    }
    else {
      messges = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        where: {
          conversationId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    }

    let nextCursor = null
    if (messges.length === MESSAGES_BATCH)
      nextCursor = messges[MESSAGES_BATCH - 1].id

    return NextResponse.json({
      items: messges,
      nextCursor,
    })
  }
  catch (error) {
    console.log('[DIRECT_MESSAGES_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
