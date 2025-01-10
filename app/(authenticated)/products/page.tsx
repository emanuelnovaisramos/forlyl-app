import { DashboardCard } from '@/components/dashboard/dashboardCard'
import { DashboardProgressBar } from '@/components/dashboard/dashboardProgressBar'
import { DashboardTableUsersActivity } from '@/components/dashboard/dashboardTableUsersActivity'
import { PageHeader } from '@/components/layout/pageHeader'
import { ProductCard } from '@/components/products/productCard'
import { FiArrowUpRight, FiFolder, FiPlus } from 'react-icons/fi'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { PiChartLineUp } from 'react-icons/pi'

const CARDS = [
  {
    header: {
      title: 'Projetos ativos',
      icon: FiFolder,
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
      icon: IoShieldCheckmarkOutline,
      children: (
        <div className="flex justify-center bg-done2 rounded-md items-center w-8 h-8">
          <FiArrowUpRight size={16} />
        </div>
      ),
    },
    content: '25',
  },
]

const PROGRESS_ITEMS = [
  {
    label: 'Curso abc',
    progress: 95,
  },
  {
    label: 'Curso xyz',
    progress: 67,
  },
  {
    label: 'Curso cde',
    progress: 54,
  },
  {
    label: 'Curso xyz',
    progress: 34,
  },
]

const USER_ACTIVITY_DATA = [
  {
    avatar: '/user-avatar-example.png',
    activity: 'Anúncios de Rede de Display',
    time: '2 horas',
  },
  {
    avatar: '/user-avatar-example.png',
    activity: 'Email: Faltam 3 dias',
    time: '3 horas',
  },
  {
    avatar: '/user-avatar-example.png',
    activity: '3 posts de CPL liberados',
    time: '5 horas',
  },
  {
    avatar: '/user-avatar-example.png',
    activity: 'Carrossel de captação',
    time: '1 dia',
  },
]

const PRODUCTS = [
  {
    imageUrl:
      'https://www.moskitcrm.com/hubfs/60_X%20cursos%20de%20vendas%20gratuitos.png',
    title: 'Curso online abc',
    progress: 50,
    description: 'Página de obrigado',
    badgeCount: 3,
  },
  {
    imageUrl:
      'https://www.moskitcrm.com/hubfs/60_X%20cursos%20de%20vendas%20gratuitos.png',
    title: 'Curso online xyz',
    progress: 70,
    description: 'Página inicial',
    badgeCount: 5,
  },
  {
    imageUrl:
      'https://www.moskitcrm.com/hubfs/60_X%20cursos%20de%20vendas%20gratuitos.png',
    title: 'Curso online cde',
    progress: 30,
    description: 'Página de captura',
    badgeCount: 2,
  },
]

export default function ProductsPage() {
  return (
    <div className="flex flex-col w-full gap-7">
      <PageHeader pageTitle="Meus projetos" />
      <div className="flex w-full gap-5">
        {CARDS.map((card, index) => (
          <DashboardCard className="flex-grow" key={index} header={card.header}>
            <p className="text-3xl p-7 font-semibold">{card.content}</p>
          </DashboardCard>
        ))}
      </div>
      <div className="flex items-start gap-5 w-full">
        <DashboardProgressBar
          title="Progresso dos projetos"
          icon={PiChartLineUp}
          itens={PROGRESS_ITEMS}
        />
        <DashboardTableUsersActivity data={USER_ACTIVITY_DATA} />
      </div>
      <div className="flex w-full h-max gap-5">
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
        <div className="border cursor-pointer w-[250px] flex justify-center items-center item min-h-full rounded-md">
          <FiPlus size={20} />
        </div>
      </div>
    </div>
  )
}
