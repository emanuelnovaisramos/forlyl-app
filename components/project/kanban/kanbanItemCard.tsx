import { useEffect, useState } from 'react'
import { FaRegFile } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'
import Image from 'next/image'
import { ProgressBar } from '@/components/ui/progressbar'
import { Task } from '@/types/task'
import { formatDateHideCurrentYear } from '@/utils/formatDateHideCurrentYear'

export const KanbanItemCard = ({
  color,
  task,
  onClick,
}: {
  color: string
  task: Task
  onClick?: (task: Task) => void
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const totalSubTasks = task.subTasks?.length || 0
    const completedSubTasks =
      task.subTasks?.filter(st => st.completed).length || 0
    const calculatedProgress = totalSubTasks
      ? Math.round((completedSubTasks / totalSubTasks) * 100)
      : task.status === 'done'
      ? 100
      : 0
    setProgress(calculatedProgress)
  }, [task])

  return (
    <div
      className="flex flex-col cursor-pointer bg-background rounded-md border border-border-primary p-5 gap-2.5"
      onClick={onClick ? () => onClick(task) : undefined}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="font-semibold text-xs line-clamp-1 overflow-hidden">
            {task.name}
          </p>
          <p className="text-xs text-four line-clamp-2 overflow-hidden">
            {task.description}
          </p>
        </div>
        <FaRegFile size={16} className="min-w-max text-four" />
      </div>
      <div className="flex justify-between">
        <div
          className="flex w-max items-center gap-2 py-1 px-2 rounded-md text-white"
          style={{
            backgroundColor: `var(${color})`,
          }}
        >
          <IoTimeOutline size={18} />
          <p className="text-xs">{formatDateHideCurrentYear(task.dueDate)}</p>
        </div>
        <div className="relative h-6 w-6 overflow-hidden rounded-full">
          <Image
            src={'/user-avatar-example.png'}
            alt={'user'}
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>
      <div className="w-full flex items-center gap-3 mt-2">
        <ProgressBar size="h-1" progress={progress} />
        <p className="min-w-max text-xs text-four">{progress} %</p>
      </div>
    </div>
  )
}
