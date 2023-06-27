import { ProjectInterface } from '@/common.types'
import Categories from '@/components/Categories'
import LoadMore from '@/components/LoadMore'
import ProjectCard from '@/components/ProjectCard'
import { fetchAllProjects } from '@/lib/actions'

interface HomeProps {
  searchParams: SearchParams
}

type SearchParams = {
  category?: string
  endcursor?: string
}
type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[]
    pageInfo: {
      hasPreviousPage: boolean
      hasNextPage: boolean
      startCursor: string
      endCursor: string
    }
  }
}

const Home = async ({ searchParams: { category, endcursor } }: HomeProps) => {
  const data = (await fetchAllProjects(category, endcursor)) as ProjectSearch
  const projectsToDisplay = data?.projectSearch?.edges || []
  if (!projectsToDisplay.length) {
    return (
      <section className="flex-col flexStart paddings">
        <Categories />
        <p className="text-center no-result-text">
          No projects found, go create some first.
        </p>
      </section>
    )
  }
  const pagination = data?.projectSearch?.pageInfo
  return (
    <section className="flex-col mb-16 flex-start paddings">
      <Categories />
      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node.id}
            id={node.id}
            image={node.image}
            title={node.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>
      <LoadMore
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      />
    </section>
  )
}

export default Home
