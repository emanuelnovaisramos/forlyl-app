'use client'
import { useGetUserProjects } from '@/api/user/getUserProjects'
import { PageHeader } from '@/components/layout/pageHeader'
import { Project } from '@/types/project'
import { FiPlus } from 'react-icons/fi'
import { AiOutlineLoading } from 'react-icons/ai'
import { useEffect } from 'react'
import { useToast } from '@/domains/toasterProvider'
import { ProjectCard } from '@/components/project/projectCard'

export default function ProjectsPage() {
  const { showToast } = useToast()
  const {
    data: userProjects,
    isLoading: loadingProjects,
    error: errorProjects,
  } = useGetUserProjects()

  useEffect(() => {
    if (errorProjects) {
      showToast({ message: 'Erro ao carregar projetos', type: 'error' })
    }
  }, [errorProjects])

  return (
    <div className="flex flex-col w-full gap-7.5 p-7.5">
      <PageHeader pageTitle="Projetos ativos" />
      {loadingProjects ? (
        <div className="flex">
          <AiOutlineLoading className="animate-spin text-4xl text-primary" />
        </div>
      ) : (
        <div className="flex w-full h-max gap-5">
          {userProjects?.map((project: Project, index: number) => (
            <ProjectCard key={index} project={project} />
          ))}
          <div className="border border-border-primary cursor-pointer w-[250px] flex justify-center items-center item min-h-full rounded-md">
            <FiPlus size={20} />
          </div>
        </div>
      )}
    </div>
  )
}
