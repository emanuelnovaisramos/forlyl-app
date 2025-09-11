import { FiPlus } from 'react-icons/fi'
import { KanbanItemCard } from './kanbanItemCard'
import { Task } from '@/types/task'

interface KanbanColumnProps {
  name: string
  count: number
  color: string
  tasks: Task[]
  onClickTask?: (task: Task) => void
}

export const KanbanColumn = ({
  name,
  count,
  color,
  tasks,
  onClickTask
}: KanbanColumnProps) => {
  return (
    <div className="flex flex-col relative flex-1 p-7.5 gap-6 w-full bg-white border border-border-primary rounded-md">
      <div className="flex w-full items-center gap-3 justify-between">
        <div className="flex h-max items-center gap-3">
          <h3 className="text-2xl">{name}</h3>
          <div className="px-2 py-1 bg-background-seven rounded-xl">
            <p className="text-[10px] text-third">{count}</p>
          </div>
        </div>
        <div className="flex  relative justify-center items-center rounded-md w-[18px] h-[18px]">
          <div
            className="absolute inset-0 rounded-md"
            style={{
              backgroundColor: `var(${color})`,
              opacity: 0.2,
            }}
          />
          <FiPlus
            size={16}
            style={{
              color: `var(${color})`,
              position: 'relative',
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div
          className="w-full h-1 rounded-md"
          style={{ backgroundColor: `var(${color})` }}
        />
        <div className="flex flex-col gap-2.5 h-full max-h-[600px] overflow-y-auto">
          {tasks.map(task => (
            <KanbanItemCard key={task.id} task={task} color={color} onClick={onClickTask} />
          ))}
        </div>
      </div>
    </div>
  )
}
