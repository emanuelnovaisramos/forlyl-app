import { DashboardCard } from '@/components/dashboard/dashboardCard'
import { DashboardProgressBar } from '@/components/dashboard/dashboardProgressBar'
import { DashboardTableUsersActivity } from '@/components/dashboard/dashboardTableUsersActivity'
import { PageHeader } from '@/components/layout/pageHeader'
import { ListTasks } from '@/components/tasks/listTasks'
import { ProgressBar } from '@/components/ui/progressbar'
import { FiArrowUpRight, FiFolder } from 'react-icons/fi'
import { GrFormNextLink } from 'react-icons/gr'
import { IoMdTime } from 'react-icons/io'
import { LuChartLine } from 'react-icons/lu'
import { MdDone } from 'react-icons/md'
import { RxCounterClockwiseClock } from 'react-icons/rx'

const CARDS = [
  {
    header: {
      title: 'Tarefas em atraso',
      icon: IoMdTime,
      children: (
        <div className="flex justify-center bg-delay rounded-md items-center w-8 h-8">
          <FiArrowUpRight size={16} />
        </div>
      ),
    },
    content: '5',
  },
  {
    header: {
      title: 'Tarefas para hoje',
      icon: FiFolder,
      children: (
        <div className="flex justify-center bg-today rounded-md items-center w-8 h-8">
          <FiArrowUpRight size={16} />
        </div>
      ),
    },
    content: '12',
  },
  {
    header: {
      title: 'Próximas tarefas',
      icon: GrFormNextLink,
      children: (
        <div className="flex justify-center bg-next rounded-md items-center w-8 h-8">
          <FiArrowUpRight size={16} />
        </div>
      ),
    },
    content: '25',
  },
  {
    header: {
      title: 'Tarefas concluídas',
      icon: MdDone,
      children: (
        <div className="flex justify-center bg-done rounded-md items-center w-8 h-8">
          <FiArrowUpRight size={16} />
        </div>
      ),
    },
    content: '3',
  },
]

const PROGRESS_ITEMS = [
  {
    label: 'Criativos de Aquecimento',
    progress: 75,
  },
  {
    label: 'Páginas de Captura',
    progress: 57,
  },
  {
    label: 'Emails de Aquecimento',
    progress: 43,
  },
  {
    label: 'Configurações Plataforma',
    progress: 18,
  },
]

const USER_ACTIVITY_DATA = [
  {
    avatar: '/user-avatar-example.png',
    activity: 'Concluiu a tarefa "Configurações Plataforma"',
    time: '2 horas',
  },
  {
    avatar: '/user-avatar-example.png',
    activity: 'Iniciou a tarefa "Emails de Aquecimento"',
    time: '3 horas',
  },
  {
    avatar: '/user-avatar-example.png',
    activity: 'Concluiu a tarefa "Páginas de Captura"',
    time: '5 horas',
  },
  {
    avatar: '/user-avatar-example.png',
    activity: 'Iniciou a tarefa "Criativos de Aquecimento"',
    time: '1 dia',
  },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full gap-7">
      <PageHeader pageTitle="Dashboard do curso" subTitle="Bom dia, Joaquim" />
      <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((card, index) => (
          <DashboardCard className="flex-grow" key={index} header={card.header}>
            <p className="text-3xl p-7 font-semibold">{card.content}</p>
          </DashboardCard>
        ))}
      </div>
      <div className="flex items-start gap-5 w-full">
        <DashboardProgressBar
          title="Progresso das tarefas"
          icon={LuChartLine}
          itens={PROGRESS_ITEMS}
        />
        <DashboardTableUsersActivity data={USER_ACTIVITY_DATA} />
      </div>
      <div className='flex w-full'>
        <ListTasks/>
      </div>
    </div>
  )
}
