import { KanbanColumn } from './kanbanColumn'
import { TASK_STATUS } from '@/constants/taskStatus'
import { Task, TaskStatus } from '@/types/task'

export const Kanban = ({
  tasksByStatus,
  onEditTask,
}: {
  tasksByStatus: Record<TaskStatus, Task[]>
  onEditTask?: (task: Task) => void
}) => {
  return (
    <div className="grid grid-cols-4 items-start gap-5 max-[1500px]:grid-cols-2">
      {TASK_STATUS.map(column => (
        <KanbanColumn
          key={column.value}
          name={column.label}
          color={column.color}
          count={tasksByStatus[column.value]?.length || 0}
          tasks={tasksByStatus[column.value] || []}
          onClickTask={onEditTask}
        />
      ))}
    </div>
  )
}
