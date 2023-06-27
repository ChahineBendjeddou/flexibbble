import { FC } from 'react'

interface ProjectCardProps {
  id: string
  image: string
  title: string
  name: string
  avatarUrl: string
  userId: string
}

const ProjectCard: FC<ProjectCardProps> = ({
  id,
  image,
  title,
  name,
  avatarUrl,
  userId,
}) => {
  return <div>ProjectCard</div>
}

export default ProjectCard
