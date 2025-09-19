'use client'
import { DashboardCard } from '@/components/dashboard/dashboardCard'
import { DashboardProgressBar } from '@/components/dashboard/dashboardProgressBar'
import { PageHeader } from '@/components/layout/pageHeader'
import { FiArrowUpRight } from 'react-icons/fi'
import { LuChartLine } from 'react-icons/lu'
import { FaRegFolder } from 'react-icons/fa'
import { HiOutlineShieldCheck } from 'react-icons/hi2'
import { useToast } from '@/domains/toasterProvider'
import { useEffect, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { ProjectCard } from '@/components/project/projectCard'
import { Project } from '@/types/project'
import { DashboardTableProjectActivity } from '@/components/dashboard/dashboardTableUsersActivity'
import { useGetProjectActivityByUser } from '@/api/project/getProjectActivityByUser'
import { useGetUserProjects } from '@/api/project/getUserProjects'
import { useMarkProjectAsDone } from '@/api/project/markProjectAsDone'
import { useDeleteProject } from '@/api/project/deleteProject'
import { useMarkProjectAsInactive } from '@/api/project/markProjectAsInactive'
import { useActiveProject } from '@/api/project/activeProject'
import { useGetTasksUserByDeadline } from '@/api/task/getTasksUserByDeadline'

export default function DashboardPage() {
  const { showToast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const {
    data: projectsApi,
    isPending: isPendingProjects,
    isError: errorProjects,
  } = useGetUserProjects()
  const {
    data: projectActivity,
    isPending: isPendingProjectActivity,
    isError: errorProjectActivity,
  } = useGetProjectActivityByUser()
  const {
    data: userTasks,
    isPending: isPendingUserTasks,
    isError: errorUserTasks,
  } = useGetTasksUserByDeadline()

  const { mutateAsync: markProjectAsDone } = useMarkProjectAsDone()
  const { mutateAsync: deleteProject } = useDeleteProject()
  const { mutateAsync: inactiveProject } = useMarkProjectAsInactive()
  const { mutateAsync: activeProject } = useActiveProject()

  useEffect(() => {
    if (projectsApi) setProjects(projectsApi)
  }, [projectsApi])

  useEffect(() => {
    if (errorProjects) {
      showToast({ message: 'Erro ao carregar projetos', type: 'error' })
    }
  }, [errorProjects, showToast])

  const activeProjects = projects.filter(p => p.status === 'active')
  const doneProjects = projects.filter(p => p.status === 'done')

  const handleClickDone = async (id: string) => {
    await markProjectAsDone(id)
      .then(res => {
        setProjects(prev => prev.map(p => (p.id === id ? res : p)))
        showToast({ message: 'Projeto concluído', type: 'success' })
      })
      .catch(err =>
        showToast({
          message: err.message || 'Erro ao concluir projeto',
          type: 'error',
        }),
      )
  }

  const handleDeleteProject = async (id: string) => {
    await deleteProject(id)
      .then(() => {
        setProjects(prev => prev.filter(p => p.id !== id))
        showToast({ message: 'Projeto excluído', type: 'success' })
      })
      .catch(err =>
        showToast({
          message: err.message || 'Erro ao excluir projeto',
          type: 'error',
        }),
      )
  }

  const handleMarkAsInactive = async (id: string) => {
    await inactiveProject(id)
      .then(() => {
        setProjects(prev =>
          prev.map(p => (p.id === id ? { ...p, status: 'inactive' } : p)),
        )
        showToast({ message: 'Projeto marcado como inativo', type: 'success' })
      })
      .catch(err =>
        showToast({
          message: err.message || 'Erro ao desativar projeto',
          type: 'error',
        }),
      )
  }

  const handleActiveProject = async (id: string) => {
    await activeProject(id)
      .then(() => {
        setProjects(prev =>
          prev.map(p => (p.id === id ? { ...p, status: 'active' } : p)),
        )
        showToast({ message: 'Projeto ativado', type: 'success' })
      })
      .catch(err =>
        showToast({
          message: err.message || 'Erro ao ativar projeto',
          type: 'error',
        }),
      )
  }

  return (
    <div className="flex flex-col w-full gap-7.5 p-7.5">
      <PageHeader pageTitle="Dashboard" />
      <div className="w-full flex gap-5">
        <DashboardCard
          className="flex-grow"
          header={{
            title: 'Projetos ativos',
            icon: FaRegFolder,
            children: (
              <div className="flex justify-center bg-done2 rounded-md items-center w-8 h-8">
                <FiArrowUpRight size={16} />
              </div>
            ),
          }}
        >
          <div className="p-7.5">
            {isPendingProjects ? (
              <AiOutlineLoading className="animate-spin text-3xl text-primary" />
            ) : (
              <p className="text-3xl font-semibold">{activeProjects.length}</p>
            )}
          </div>
        </DashboardCard>

        <DashboardCard
          className="flex-grow"
          header={{
            title: 'Concluídos',
            icon: HiOutlineShieldCheck,
            children: (
              <div className="flex justify-center bg-done2 rounded-md items-center w-8 h-8">
                <FiArrowUpRight size={16} />
              </div>
            ),
          }}
        >
          <div className="p-7.5">
            {isPendingProjects ? (
              <AiOutlineLoading className="animate-spin text-3xl text-primary" />
            ) : (
              <p className="text-3xl font-semibold">{doneProjects.length}</p>
            )}
          </div>
        </DashboardCard>
      </div>

      <div className="flex items-start gap-5 w-full">
        <DashboardProgressBar
          title="Progresso das tarefas"
          icon={LuChartLine}
          items={userTasks}
          isPending={isPendingUserTasks}
          error={errorUserTasks}
        />
        <DashboardTableProjectActivity
          activities={projectActivity}
          isPending={isPendingProjectActivity}
          error={errorProjectActivity}
        />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl">Projetos ativos</h2>
        {isPendingProjects ? (
          <div className="flex">
            <AiOutlineLoading className="animate-spin text-2xl text-primary" />
          </div>
        ) : (
          <div className="flex w-full h-max gap-5 flex-wrap">
            {activeProjects.map(project => (
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
        )}
      </div>
    </div>
  )
}
