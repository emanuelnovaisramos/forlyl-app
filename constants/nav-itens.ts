import { MdOutlineFolder } from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'

export const navItens = [
  {
    name: 'Dashboard',
    icon: RxDashboard,
    href: '/painel',
    basePath: '/painel',
  },
  {
    name: 'Meu Projeto',
    icon: MdOutlineFolder,
    href: '/projeto/painel',
    basePath: '/projeto',
    subRoutes: [
      { name: 'Dashboard do Projeto', href: '/projeto/painel' },
      { name: 'Quadro de Tarefas', href: '/projeto/quadro' },
      { name: 'Cronograma', href: '/projeto/cronograma' },
      { name: 'Calendário de Posts', href: '/projeto/calendario' },
      { name: 'Relatório de Métricas', href: '/projeto/relatorio' },
      { name: 'Organizador de Anúncios', href: '/projeto/anuncios' },
    ],
  },
]
