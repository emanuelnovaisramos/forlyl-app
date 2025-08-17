import { FiPlus } from 'react-icons/fi'
import { KanbanItemCard } from './kanbanItemCard'

interface KanbanColumnProps {
  name: string
  count: number
  value: string
}

export const KanbanColumn = ({ name, count, value }: KanbanColumnProps) => {
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
              backgroundColor: `var(--color-kanban-${value})`,
              opacity: 0.2,
            }}
          />
          <FiPlus
            size={16}
            style={{
              color: `var(--color-kanban-${value})`,
              position: 'relative',
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div
          className="w-full h-1 rounded-md"
          style={{ backgroundColor: `var(--color-kanban-${value})` }}
        />
        <div className="flex flex-col gap-2.5 h-full max-h-[600px] overflow-y-auto">
          <KanbanItemCard value={value} />
          <KanbanItemCard value={value} />
        </div>
      </div>
    </div>
  )
}
