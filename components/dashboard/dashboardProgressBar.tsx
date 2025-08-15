import { ProgressBar } from '../ui/progressbar'
import { DashboardCard } from './dashboardCard'

interface Item {
  label: string
  progress: number
}

interface DashboardProgressBarProps {
  title: string
  icon: React.ElementType
  itens: Array<Item>
}

export const DashboardProgressBar: React.FC<DashboardProgressBarProps> = ({
  title,
  icon,
  itens,
}) => {
  return (
    <DashboardCard
      header={{
        title: title,
        icon: icon,
      }}
    >
      <div className="w-full flex flex-col gap-6 p-7.5">
        {itens.map((item: Item, index) => (
          <div key={index} className="flex w-full items-center gap-5">
            <p className="min-w-56 text-sm">{item.label}</p>
            <div className="w-full flex items-center gap-3">
              <ProgressBar size='h-3' progress={item.progress} />
              <p className="min-w-max text-sm">{item.progress} %</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}
