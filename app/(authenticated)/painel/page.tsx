import { DashboardCard } from '@/components/dashboard/dashboardCard'
import { DashboardProgressBar } from '@/components/dashboard/dashboardProgressBar'
import { DashboardTableUsersActivity } from '@/components/dashboard/dashboardTableUsersActivity'
import { PageHeader } from '@/components/layout/pageHeader'
import { FiArrowUpRight } from 'react-icons/fi'
import { LuChartLine } from 'react-icons/lu'
import { FaRegFolder } from 'react-icons/fa'
import { HiOutlineShieldCheck } from 'react-icons/hi2'

const CARDS = [
  {
    header: {
      title: 'Projetos ativos',
      icon: FaRegFolder,
      children: (
        <div className="flex justify-center bg-done2 rounded-md items-center w-8 h-8">
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
        <div className="flex justify-center bg-done2 rounded-md items-center w-8 h-8">
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

/*
  {PRODUCTS.map((product, index) => (
            <ProductCard
              key={index}
              imageUrl={product.imageUrl}
              title={product.title}
              progress={product.progress}
              description={product.description}
              badgeCount={product.badgeCount}
            />
          ))}
*/

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full gap-7.5 p-7.5">
      <PageHeader pageTitle="Dashboard" />
      <div className="w-full flex gap-5">
        {CARDS.map((card, index) => (
          <DashboardCard className="flex-grow" key={index} header={card.header}>
            <p className="text-3xl p-7.5 font-semibold">{card.content}</p>
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
      <div className="flex flex-col gap-5">
        <h2 className="text-xl">Projetos ativos</h2>
        <div className="flex gap-5"></div>
      </div>
    </div>
  )
}
