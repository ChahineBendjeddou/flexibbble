import { FC } from 'react'
import { getUserProjects } from '@/lib/actions'
import { UserProfile } from '@/common.types'
import ProfilePage from '@/components/ProfilePage'
interface ProfileProps {
  params: {
    id: string
  }
}

const Profile: FC<ProfileProps> = async ({ params: { id } }) => {
  const result = (await getUserProjects(id, 100)) as { user?: UserProfile }
  if (!result?.user) {
    return <p className="no-result-text">Failed to fetch user info</p>
  }
  return <ProfilePage user={result?.user} />
}

export default Profile
