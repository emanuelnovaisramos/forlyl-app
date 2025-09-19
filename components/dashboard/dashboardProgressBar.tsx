import { DashboardCard } from '@/components/dashboard/dashboardCard'
import { ProgressBar } from '@/components/ui/progressbar'
import { Task } from '@/types/task'
import { AiOutlineLoading } from 'react-icons/ai'

interface DashboardProgressBarProps {
  title: string
  icon: React.ElementType
  items: Array<Task>
  isPending: boolean
  error?: boolean
}

export const DashboardProgressBar = ({
  title,
  icon,
  items,
  isPending,
  error = false,
}: DashboardProgressBarProps) => {
  const calcProgress = (task: Task) => {
    const totalSubTasks = task.subTasks?.length || 0
    const completedSubTasks =
      task.subTasks?.filter(st => st.completed).length || 0

    if (totalSubTasks > 0) {
      return Math.round((completedSubTasks / totalSubTasks) * 100)
    }

    return task.status === 'done' ? 100 : 0
  }

  return (
    <DashboardCard
      header={{
        title,
        icon,
      }}
      className="h-max"
    >
      <div className="w-full flex flex-col gap-6 p-7.5">
        {isPending && (
          <div className="flex justify-center items-center py-4">
            <AiOutlineLoading className="animate-spin text-3xl text-primary" />
          </div>
        )}
        {error && !isPending && (
          <div className="text-center text-red-500 py-4">
            Ocorreu um erro ao carregar os dados.
          </div>
        )}
        {!isPending && !error && items?.length === 0 && (
          <div className="text-center py-4">Nenhuma tarefa encontrada.</div>
        )}
        {!isPending &&
          !error &&
          items?.length > 0 &&
          items.map((item, index) => {
            const progress = calcProgress(item)
            return (
              <div key={index} className="flex w-full items-center gap-5">
                <p className="min-w-[140px] text-sm">{item.name}</p>
                <div className="flex-1 flex items-center gap-3">
                  <ProgressBar size="w-full h-3" progress={progress} />
                  <p className="min-w-[45px] text-sm">{progress} %</p>
                </div>
              </div>
            )
          })}
      </div>
    </DashboardCard>
  )
}
