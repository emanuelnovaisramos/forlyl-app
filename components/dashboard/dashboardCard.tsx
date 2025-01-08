interface DashboardCardProps {
  header: {
    title: string
    icon: React.ElementType
    children?: React.ReactNode
  }
  children: React.ReactNode
}

export const DashboardCard = ({ header, children }: DashboardCardProps) => {
  return (
    <div className="w-full border rounded-md relative overflow-hidden">
      <div className="w-full px-7 py-5 font-normal text-white flex justify-between items-center bg-four">
        <div className="flex gap-3 items-center">
          <header.icon size={23} />
          <p className="text-lg">{header.title}</p>
        </div>
        <div className="">{header?.children}</div>
      </div>
      {children}
    </div>
  )
}
