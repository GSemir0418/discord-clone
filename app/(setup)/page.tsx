import React from 'react'
import { redirect } from 'next/navigation'
import { initialProfile } from '@/lib/initial-profile'
import { db } from '@/lib/db'

interface Props { }
const SetupPage: React.FC<Props> = async () => {
  const profile = await initialProfile()

  // 查询关联的 servers, 并连接第一个
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (server)
    redirect(`/servers/${server.id}`)
  return <div>Create a Server</div>
}

export default SetupPage
