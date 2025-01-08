import { DashboardCard } from '@/components/dashboard/dashboardCard'
import { PageHeader } from '@/components/layout/pageHeader'
import { FiArrowUpRight, FiFolder } from 'react-icons/fi'
import { GrFormNextLink } from 'react-icons/gr'
import { IoMdTime } from 'react-icons/io'
import { MdDone } from 'react-icons/md'

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full gap-7">
      <PageHeader pageTitle="Dashboard do curso" subTitle="Bom dia, Joaquim" />
      <div className="flex w-full items-center gap-5">
        <DashboardCard
          header={{
            title: 'Tarefas em atraso',
            icon: IoMdTime,
            children: (
              <div className="flex justify-center bg-delay rounded-md items-center w-8 h-8">
                <FiArrowUpRight size={16} />
              </div>
            ),
          }}
        >
          <p className="text-3xl p-7 font-semibold">5</p>
        </DashboardCard>
        <DashboardCard
          header={{
            title: 'Tarefas para hoje',
            icon: FiFolder ,
            children: (
              <div className="flex justify-center bg-today rounded-md items-center w-8 h-8">
                <FiArrowUpRight size={16} />
              </div>
            ),
          }}
        >
          <p className="text-3xl p-7 font-semibold">12</p>
        </DashboardCard>
        <DashboardCard
          header={{
            title: 'Próximas tarefas',
            icon: GrFormNextLink,
            children: (
              <div className="flex justify-center bg-next rounded-md items-center w-8 h-8">
                <FiArrowUpRight size={16} />
              </div>
            ),
          }}
        >
          <p className="text-3xl p-7 font-semibold">25</p>
        </DashboardCard>
        <DashboardCard
          header={{
            title: 'Tarefas em atraso',
            icon: MdDone,
            children: (
              <div className="flex justify-center bg-done rounded-md items-center w-8 h-8">
                <FiArrowUpRight size={16} />
              </div>
            ),
          }}
        >
          <p className="text-3xl p-7 font-semibold">3</p>
        </DashboardCard>
      </div>
    </div>
  )
}
