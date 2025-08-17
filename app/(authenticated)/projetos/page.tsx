import { PageHeader } from '@/components/layout/pageHeader'
import { ProductCard } from '@/components/products/productCard'
import { FiPlus } from 'react-icons/fi'

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
    <div className="flex flex-col w-full gap-7.5 p-7.5">
      <PageHeader pageTitle="Projetos ativos" />
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
        <div className="border border-border-primary cursor-pointer w-[250px] flex justify-center items-center item min-h-full rounded-md">
          <FiPlus size={20} />
        </div>
      </div>
    </div>
  )
}
