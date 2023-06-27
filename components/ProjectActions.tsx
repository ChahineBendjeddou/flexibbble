'use client'
import { deleteProject, fetchToken } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

interface ProjectActionsProps {
  projectId: string
}

const ProjectActions: FC<ProjectActionsProps> = ({ projectId }) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const handleDeleteProject = async () => {
    setIsDeleting(true)
    const { token } = await fetchToken()
    try {
      await deleteProject(projectId, token)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleting(false)
    }
  }
  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencile.svg" width={15} height={15} alt="Edit" />
      </Link>
      <button
        type="button"
        className={`textCenter delete-action_btn ${
          isDeleting ? 'bg-gray' : 'bg-primary-purple'
        } `}
        onClick={handleDeleteProject}
      >
        <Image src="/trash.svg" width={15} height={15} alt="Delete" />
      </button>
    </>
  )
}

export default ProjectActions
