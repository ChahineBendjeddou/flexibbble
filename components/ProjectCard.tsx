'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

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
  const [randomLikes, setRandomLikes] = useState(0)
  const [randomViews, setRandomViews] = useState('')

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000))
    setRandomViews((Math.floor(Math.random() * 10000) / 1000).toFixed(1))
  }, [])
  return (
    <div className="flex-col flexCenter rounded-2xl drop-shadow-md">
      <Link
        href={`/project/${id}`}
        className="relative w-full h-full flexCenter group"
      >
        <Image
          src={image}
          width={414}
          height={314}
          alt="Project image"
          className="object-cover w-full h-full rounded-2xl"
        />
        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>
      <div className="w-full px-2 mt-3 text-sm font-semibold flexBetween">
        <Link href={`/profile/${userId}`}>
          <div className="gap-2 flexCenter">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="Profile Image"
            />
            <p>{name}</p>
          </div>
        </Link>
        <div className="gap-3 flexCenter">
          <div className="gap-2 flexCenter">
            <Image src="/hearth.svg" width={13} height={14} alt="Heart" />
            <p className="text-sm">{randomLikes}</p>
          </div>
          <div className="gap-2 flexCenter">
            <Image src="/eye.svg" width={13} height={14} alt="Eye" />
            <p className="text-sm">{randomViews}k</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
