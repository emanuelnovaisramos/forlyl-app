'use client'
import { useGetUserProjects } from '@/api/project/getUserProjects'
import { PageHeader } from '@/components/layout/pageHeader'
import { Project } from '@/types/project'
import { FiPlus } from 'react-icons/fi'
import { AiOutlineLoading } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { useToast } from '@/domains/toasterProvider'
import { ProjectCard } from '@/components/project/projectCard'
import { ModalCreateProject } from '@/components/project/modalCreateProject'
import { useMarkProjectAsDone } from '@/api/project/markProjectAsDone'
import { useDeleteProject } from '@/api/project/deleteProject'
import { useMarkProjectAsInactive } from '@/api/project/markProjectAsInactive'
import { useActiveProject } from '@/api/project/activeProject'

export default function ProjectsPage() {
  const { showToast } = useToast()
  const {
    data: userProjects,
    isLoading: loadingProjects,
    error: errorProjects,
  } = useGetUserProjects()
  const { mutateAsync: markProjectAsDone } = useMarkProjectAsDone()
  const { mutateAsync: deleteProject } = useDeleteProject()
  const { mutateAsync: inactiveProject } = useMarkProjectAsInactive()
  const { mutateAsync: activeProject } = useActiveProject()
  const [openModalCreateProject, setOpenModalCreateProject] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    if (userProjects) setProjects(userProjects)
  }, [userProjects])

  useEffect(() => {
    if (errorProjects) {
      showToast({ message: 'Erro ao carregar projetos', type: 'error' })
    }
  }, [errorProjects])

  const handleCreate = (project: Project) => {
    setProjects(prev => [project, ...prev])
    setOpenModalCreateProject(false)
  }

  const handleClickDone = async (id: string) => {
    await markProjectAsDone(id)
      .then(res => {
        setProjects(prev => prev.map(p => (p.id === id ? res : p)))
        showToast({ message: 'Projeto concluído', type: 'success' })
      })
      .catch(err => {
        showToast({
          message: err.message ? err.message : 'Erro ao concluir projeto',
          type: 'error',
        })
      })
  }

  const handleDeleteProject = async (id: string) => {
    await deleteProject(id)
      .then(() => {
        setProjects(prev => prev.filter(project => project.id !== id))
        showToast({ message: 'Projeto excluído', type: 'success' })
      })
      .catch(err => {
        showToast({
          message: err.message ? err.message : 'Erro ao excluir projeto',
          type: 'error',
        })
      })
  }

  const handleMarkAsInactive = (id: string) => {
    inactiveProject(id)
      .then(() => {
        setProjects(prev =>
          prev.map(p => (p.id === id ? { ...p, status: 'inactive' } : p)),
        )
        showToast({ message: 'Projeto marcado como inativo', type: 'success' })
      })
      .catch(err => {
        showToast({
          message: err.message ? err.message : 'Erro ao desativar projeto',
          type: 'error',
        })
      })
  }

  const handleActiveProject = async (id: string) => {
    await activeProject(id)
      .then(() => {
        setProjects(prev =>
          prev.map(p => (p.id === id ? { ...p, status: 'active' } : p)),
        )
        showToast({ message: 'Projeto ativado', type: 'success' })
      })
      .catch(err => {
        showToast({
          message: err.message ? err.message : 'Erro ao ativar projeto',
          type: 'error',
        })
      })
  }

  const activeProjects = projects.filter(p => p.status === 'active')
  const inactiveProjects = projects.filter(p => p.status === 'inactive')
  const doneProjects = projects.filter(p => p.status === 'done')

  return (
    <div className="flex flex-col w-full gap-7.5 p-7.5">
      <ModalCreateProject
        open={openModalCreateProject}
        setOpen={setOpenModalCreateProject}
        callBackCreate={handleCreate}
      />

      {loadingProjects ? (
        <div className="flex">
          <AiOutlineLoading className="animate-spin text-4xl text-primary" />
        </div>
      ) : (
        <div className="flex flex-col gap-7.5">
          <div className="flex flex-col gap-7.5">
            <PageHeader pageTitle="Projetos ativos" />
            <div className="flex w-full h-max gap-5 flex-wrap">
              {activeProjects.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  handleClickDone={handleClickDone}
                  handleClickDelete={handleDeleteProject}
                  handleClickInactive={handleMarkAsInactive}
                  handleClickActivate={handleActiveProject}
                />
              ))}

              <div
                className="border border-border-primary cursor-pointer w-[250px] min-h-[220px] flex justify-center items-center rounded-md"
                onClick={() => setOpenModalCreateProject(true)}
              >
                <FiPlus size={20} />
              </div>
            </div>
          </div>
          {inactiveProjects.length > 0 && (
            <div className="flex flex-col gap-7.5">
              <PageHeader pageTitle="Projetos inativos" />
              <div className="flex w-full h-max gap-5 flex-wrap">
                {inactiveProjects.map((project: Project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    handleClickDone={handleClickDone}
                    handleClickDelete={handleDeleteProject}
                    handleClickInactive={handleMarkAsInactive}
                    handleClickActivate={handleActiveProject}
                  />
                ))}
              </div>
            </div>
          )}
          {doneProjects.length > 0 && (
            <div className="flex flex-col gap-7.5">
              <PageHeader pageTitle="Projetos concluídos" />
              <div className="flex w-full h-max gap-5 flex-wrap">
                {doneProjects.map((project: Project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    handleClickDone={handleClickDone}
                    handleClickDelete={handleDeleteProject}
                    handleClickInactive={handleMarkAsInactive}
                    handleClickActivate={handleActiveProject}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
