'use client'
import { useGetTasksByProject } from '@/api/task/getTasksByProject'
import { PageHeader } from '@/components/layout/pageHeader'
import { GanttChart } from '@/components/project/gantt'
import { Kanban } from '@/components/project/kanban/kanban'
import { TaskForm } from '@/components/tasks/taskForm'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useProject } from '@/contexts/projectContext'
import { useToast } from '@/domains/toasterProvider'
import { Task } from '@/types/task'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

export default function Page() {
  const { project } = useProject()
  const { showToast } = useToast()
  const {
    data: tasks,
    isPending: isPendingTask,
    error: errorTask,
    refetch: refetchTasks,
  } = useGetTasksByProject(project?.id ?? '')

  const searchParams = useSearchParams()
  const router = useRouter()
  const view = searchParams.get('ver')

  const [tabValue, setTabValue] = useState(view || 'quadro')
  const [openSidebarTask, setOpenSidebarTask] = useState(false)
  const [editTask, setEditTask] = useState<Task | undefined>(undefined)
  const [tasksByStatus, setTasksByStatus] = useState<Record<string, Task[]>>({})

  useEffect(() => {
    if (tasks) {
      setTasksByStatus(tasks)
    }
  }, [tasks])

  useEffect(() => {
    if (view) {
      setTabValue(view)
    }
  }, [view])

  useEffect(() => {
    if (errorTask) {
      showToast({
        message: errorTask.message
          ? errorTask.message
          : 'Erro ao carregar projetos',
        type: 'error',
      })
    }
  }, [errorTask])

  const handleTabChange = (value: string) => {
    setTabValue(value)
    const params = new URLSearchParams(window.location.search)
    params.set('ver', value)
    router.replace(`${window.location.pathname}?${params.toString()}`)
  }

  const handleEditTask = (task: Task) => {
    setOpenSidebarTask(true)
    setEditTask(task)
  }

  const handleCallBackForm = () => {
    refetchTasks()
    setOpenSidebarTask(false)
    setEditTask(undefined)
  }

  const handleNewTask = () => {
    setEditTask(undefined)
    setOpenSidebarTask(true)
  }

  return (
    <div className="flex w-full flex-col gap-7.5 p-7.5">
      <TaskForm
        openSidebar={openSidebarTask}
        setOpenSidebar={handleCallBackForm}
        defaultValues={editTask}
        callBack={handleCallBackForm}
      />
      <div className="flex justify-between">
        <PageHeader pageTitle={project?.name as string} />
        <Button
          className="w-max min-w-max py-3 h-max font-bold"
          onClick={handleNewTask}
        >
          Adicionar tarefa
        </Button>
      </div>
      {isPendingTask && (
        <div className="flex-1 flex items-center justify-center">
          <AiOutlineLoading className="animate-spin text-4xl text-primary" />
        </div>
      )}
      {tasks && !isPendingTask && !errorTask && (
        <div className="flex flex-col">
          <Tabs value={tabValue} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="quadro">Quadros</TabsTrigger>
              <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
            </TabsList>
            <TabsContent value="quadro">
              <Kanban
                tasksByStatus={tasksByStatus}
                onEditTask={handleEditTask}
              />
            </TabsContent>
            <TabsContent value="cronograma">
              <GanttChart
                tasksByStatus={tasksByStatus}
                onEditTask={handleEditTask}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
