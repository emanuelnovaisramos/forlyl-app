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
    name: 'Meus Projetos',
    icon: MdOutlineFolder,
    href: '/projetos',
    basePath: '/projetos',
  },
]
