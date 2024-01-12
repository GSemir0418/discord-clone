import { NextResponse } from 'next/server'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile()
    if (!profile)
      return new NextResponse('Unauthorized', { status: 401 })

    if (!params.serverId)
      return new NextResponse('Server ID missing', { status: 400 })

    const server = await db.server.update({
      where: {
        id: params.serverId,
        // 确保服务器所有者自己不能离开服务器
        profileId: {
          not: profile.id
        },
        // 确保profile是当前服务器的成员之一
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id
          }
        }
      }
    })
    return NextResponse.json(server)
  }
  catch (error) {
    console.log('[SERVER LEAVE ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
