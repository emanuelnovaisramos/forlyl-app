import { DashboardCard } from '@/components/dashboard/dashboardCard'
import { PageHeader } from '@/components/layout/pageHeader'
import { FaRegFolder } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import { IoTimeOutline } from 'react-icons/io5'
import { PiSignpost } from 'react-icons/pi'
import { HiOutlineShieldCheck } from 'react-icons/hi2'
import { DashboardProgressBar } from '@/components/dashboard/dashboardProgressBar'
import { LuChartLine } from 'react-icons/lu'
import { DashboardTableUsersActivity } from '@/components/dashboard/dashboardTableUsersActivity'
import { TaskListCard } from '@/components/tasks/taskListCard'

const CARDS = [
  {
    header: {
      title: 'Tarefas em atraso',
      icon: IoTimeOutline,
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
      icon: FaRegFolder,
      children: (
        <div className="flex justify-center bg-today rounded-md items-center w-8 h-8">
          <FiArrowUpRight size={16} />
        </div>
      ),
    },
    content: '5',
  },
  {
    header: {
      title: 'Próximas tarefas',
      icon: PiSignpost,
      children: (
        <div className="flex justify-center bg-next rounded-md items-center w-8 h-8">
          <FiArrowUpRight size={16} />
        </div>
      ),
    },
    content: '5',
  },
  {
    header: {
      title: 'Concluídos',
      icon: HiOutlineShieldCheck,
      children: (
        <div className="flex justify-center bg-done rounded-md items-center w-8 h-8">
          <FiArrowUpRight size={16} />
        </div>
      ),
    },
    content: '5',
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

export default function DashboardProjectPage() {
  return (
    <div className="flex flex-col gap-7">
      <PageHeader pageTitle="Curso online abc" subTitle="Bom dia, Joaquim." />
      <div className="flex gap-5">
        {CARDS.map((card, index) => (
          <DashboardCard className="flex-grow" key={index} header={card.header}>
            <p className="text-3xl p-7 font-semibold">{card.content}</p>
          </DashboardCard>
        ))}
      </div>
      <div className="flex gap-5">
        <DashboardProgressBar
          title="Progresso das tarefas"
          icon={LuChartLine}
          itens={PROGRESS_ITEMS}
        />
        <DashboardTableUsersActivity data={USER_ACTIVITY_DATA} />
      </div>
      <TaskListCard />
    </div>
  )
}
