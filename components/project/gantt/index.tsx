'use client'

import { useEffect, useRef, useState } from 'react'
import './styles.scss'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import 'dhtmlx-gantt'
import { Task, TaskStatus, SubTask } from '@/types/task'

type GanttTask = {
  id: string | number
  text: string
  start_date: Date
  end_date: Date
  progress: number
  css: TaskStatus
}


export const GanttChart = ({
  tasksByStatus,
  onEditTask,
}: {
  tasksByStatus: Record<TaskStatus, Task[]>
  onEditTask?: (task: Task) => void
}) => {
  const ganttContainer = useRef<HTMLDivElement>(null)
  const [ganttTasks, setGanttTasks] = useState<GanttTask[]>([])

  useEffect(() => {
    const today = new Date()
    const addDays = (date: Date, days: number) => {
      const copy = new Date(date)
      copy.setDate(copy.getDate() + days)
      return copy
    }

    const allTasks: GanttTask[] = []
    Object.values(tasksByStatus).forEach(tasks => {
      tasks.forEach(task => {
        let progress = 0
        const totalSubTasks = task.subTasks?.length || 0
        const completedSubTasks =
          task.subTasks?.filter((st: SubTask) => st.completed).length || 0

        if (totalSubTasks > 0) {
          progress = completedSubTasks / totalSubTasks
        } else {
          progress = task.status === 'done' ? 1 : 0
        }

        allTasks.push({
          id: task.id,
          text: task.name,
          start_date: task.startDate ? new Date(task.startDate) : today,
          end_date: task.dueDate ? new Date(task.dueDate) : addDays(today, 1),
          progress,
          css: task.status,
        })
      })
    })

    setGanttTasks(allTasks)
  }, [tasksByStatus])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gantt = (window as any).gantt
    if (!ganttContainer.current) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gantt.templates.task_class = function (start: any, end: any, task: any) {
      return `status-${task.css}`
    }

    gantt.attachEvent('onTaskClick', function (id: string) {
      const task = Object.values(tasksByStatus)
        .flat()
        .find(t => t.id.toString() === id.toString())
      if (task && onEditTask) {
        onEditTask(task)
      }
      return true
    })

    gantt.config.drag_links = false
    gantt.config.drag_move = false
    gantt.config.drag_resize = false
    gantt.config.drag_progress = false
    gantt.config.lightbox = null
    gantt.config.columns = []

    gantt.init(ganttContainer.current)
    gantt.parse({ data: ganttTasks })

    const rowHeight = gantt.config.row_height || 30
    const totalHeight = ganttTasks.length * rowHeight + 52
    ganttContainer.current.style.height = `${totalHeight}px`

    return () => {
      gantt.clearAll()
    }
  }, [ganttTasks, tasksByStatus, onEditTask])

  return <div ref={ganttContainer} className="w-full h-full gantt" />
}
