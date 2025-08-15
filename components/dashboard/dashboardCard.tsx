import { cn } from "@/utils/twMerge"

interface DashboardCardProps {
  className?: string
  header: {
    title: string
    icon: React.ElementType
    children?: React.ReactNode
  }
  children: React.ReactNode
}

export const DashboardCard = ({ className, header, children }: DashboardCardProps) => {
  return (
    <div className={cn("w-full border bg-white rounded-md relative overflow-hidden", className)}>
      <div className="w-full px-7.5 py-5 font-normal text-white flex justify-between items-center bg-background-four">
        <div className="flex gap-3 items-center">
          <header.icon size={18} />
          <p className="text-lg font-normal">{header.title}</p>
        </div>
        <div className="">{header?.children}</div>
      </div>
      {children}
    </div>
  )
}
