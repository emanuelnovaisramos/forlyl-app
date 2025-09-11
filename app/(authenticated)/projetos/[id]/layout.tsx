'use client'

import { useGetProject } from '@/api/project/getProject'
import { ProjectProvider } from '@/contexts/projectContext'
import { useToast } from '@/domains/toasterProvider'
import Link from 'next/link'
import { usePathname, useParams, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

const routes = [
  { route: 'painel', name: 'Painel do projeto' },
  { route: 'tarefas?ver=quadro', name: 'Quadro de tarefas' },
  { route: 'tarefas?ver=cronograma', name: 'Cronograma' },
  { route: 'calendario', name: 'Calendário de posts' },
  { route: 'relatorios', name: 'Relatório de métricas' },
  { route: 'anuncios', name: 'Organizador de anúncios' },
]

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { showToast } = useToast()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const params = useParams()
  const projectId = Array.isArray(params?.id) ? params.id[0] : params?.id

  const {
    data: projectInfos,
    isLoading: isLoadingProject,
    error: errorProject,
  } = useGetProject(projectId!)

  useEffect(() => {
    if (errorProject) {
      showToast({
        message: errorProject ? errorProject.message : 'Não foi possível carregar as informações do projeto.',
        type: 'error',
      })
    }
  }, [errorProject])

  return (
    <ProjectProvider
      value={{
        project: projectInfos,
        isLoading: isLoadingProject,
        error: errorProject,
      }}
    >
      <div className="flex w-full h-full relative overflow-hidden">
        <nav className="flex flex-col gap-7.5 px-7.5 py-10 min-w-[270px] bg-background-five">
          {routes.map(route => {
            const href = `/projetos/${projectId}/${route.route}`
            const [hrefPath, queryString] = href.split('?')
            const hrefQuery = queryString?.split('=')[1]

            const isActive =
              hrefPath === pathName &&
              (hrefQuery === undefined || hrefQuery === searchParams.get('ver'))

            return (
              <Link
                key={route.route}
                href={href}
                className={`${
                  isActive ? 'font-bold' : ''
                } flex items-center gap-2`}
              >
                {route.name}
              </Link>
            )
          })}
        </nav>
        {projectInfos && (
          <main className="flex-1 h-full overflow-auto">{children}</main>
        )}
        {isLoadingProject && (
          <div className="flex-1 flex items-center justify-center">
            <AiOutlineLoading className="animate-spin text-4xl text-primary" />
          </div>
        )}
        {!isLoadingProject && !projectInfos && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg">Projeto não encontrado</p>
          </div>
        )}
      </div>
    </ProjectProvider>
  )
}
