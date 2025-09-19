'use client'
import { DashboardCard } from '@/components/dashboard/dashboardCard'
import { PageHeader } from '@/components/layout/pageHeader'
import { FaRegFolder } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import { IoTimeOutline } from 'react-icons/io5'
import { PiSignpost } from 'react-icons/pi'
import { HiOutlineShieldCheck } from 'react-icons/hi2'
import { DashboardProgressBar } from '@/components/dashboard/dashboardProgressBar'
import { LuChartLine } from 'react-icons/lu'
import { DashboardTableProjectActivity } from '@/components/dashboard/dashboardTableUsersActivity'
import { TaskListCard } from '@/components/tasks/taskListCard'
import { useProject } from '@/contexts/projectContext'
import { useAuth } from '@/contexts/authContext'
import { useGetTasksByDeadline } from '@/api/task/getTasksByDeadline'
import { useGetProjectActivity } from '@/api/project/getProjectActivity'
import { useGetTasksByRecentUpdate } from '@/api/task/getTasksByRecentUpdate'

export default function DashboardProjectPage() {
  const { project } = useProject()
  const { user } = useAuth()
  const {
    data: listTasks,
    isPending: isPendingListTasks,
    error: errorListTask,
  } = useGetTasksByDeadline(project?.id || '')
  const {
    data: projectActivity,
    isPending: isLoadingProjectActivity,
    isError: errorProjectActivity,
  } = useGetProjectActivity(project?.id || '')
  const {
    data: projectTasksByRencentUpdate,
    isPending: isLoadingTasks,
    isError: errorTasks,
  } = useGetTasksByRecentUpdate(project?.id || '')

  return (
    <div className="flex flex-col gap-7.5 p-7.5">
      <PageHeader
        pageTitle={project?.name as string}
        subTitle={`Bem vindo, ${user?.name}!`}
      />

      <div className="grid grid-cols-4 gap-5 max-[1300px]:grid-cols-2 max-[700px]:grid-cols-1">
        <DashboardCard
          className="flex-grow"
          header={{
            title: 'Tarefas em atraso',
            icon: IoTimeOutline,
            children: (
              <div className="flex justify-center bg-delay rounded-md items-center w-8 h-8">
                <FiArrowUpRight size={16} />
              </div>
            ),
          }}
        >
          <p className="text-3xl p-7.5 font-semibold">
            {project?.tasksOverdue}
          </p>
        </DashboardCard>

        <DashboardCard
          className="flex-grow"
          header={{
            title: 'Tarefas para hoje',
            icon: FaRegFolder,
            children: (
              <div className="flex justify-center bg-today rounded-md items-center w-8 h-8">
                <FiArrowUpRight size={16} />
              </div>
            ),
          }}
        >
          <p className="text-3xl p-7.5 font-semibold">
            {project?.tasksInProgress}
          </p>
        </DashboardCard>

        <DashboardCard
          className="flex-grow"
          header={{
            title: 'Próximas tarefas',
            icon: PiSignpost,
            children: (
              <div className="flex justify-center bg-next rounded-md items-center w-8 h-8">
                <FiArrowUpRight size={16} />
              </div>
            ),
          }}
        >
          <p className="text-3xl p-7.5 font-semibold">{project?.tasksToDo}</p>
        </DashboardCard>

        <DashboardCard
          className="flex-grow"
          header={{
            title: 'Concluídos',
            icon: HiOutlineShieldCheck,
            children: (
              <div className="flex justify-center bg-done rounded-md items-center w-8 h-8">
                <FiArrowUpRight size={16} />
              </div>
            ),
          }}
        >
          <p className="text-3xl p-7.5 font-semibold">{project?.tasksDone}</p>
        </DashboardCard>
      </div>

      <div className="flex gap-5">
        <DashboardProgressBar
          title="Progresso das tarefas"
          icon={LuChartLine}
          items={projectTasksByRencentUpdate}
          isPending={isPendingListTasks}
          error={!!errorListTask}
        />
        <DashboardTableProjectActivity
          isPending={isLoadingProjectActivity}
          error={errorProjectActivity}
          activities={projectActivity}
        />
      </div>

      <TaskListCard
        tasks={listTasks}
        isPending={isLoadingTasks}
        error={errorTasks}
      />
    </div>
  )
}
