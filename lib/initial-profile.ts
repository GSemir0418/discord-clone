import { currentUser, redirectToSignIn } from '@clerk/nextjs'
import { db } from '@/lib/db'

export async function initialProfile() {
  const user = await currentUser()
  if (!user)
    return redirectToSignIn()

  // 查询数据库，有就返回 没有就创建
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  })
  if (profile)
    return profile

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.lastName} ${user.firstName}`,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
    },
  })
  return newProfile
}
