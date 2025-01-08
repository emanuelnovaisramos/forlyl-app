interface PageHeaderProps {
  pageTitle: string
  subTitle?: string
  children?: React.ReactNode
}

export const PageHeader = ({
  pageTitle,
  subTitle,
  children,
}: PageHeaderProps) => {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex flex-col">
        <h2 className="text-3xl font-normal">{pageTitle}</h2>
        {subTitle && <p className="font-normal">{subTitle}</p>}
      </div>
      {children}
    </div>
  )
}
