import { FiUsers } from 'react-icons/fi';
import { GoZap } from 'react-icons/go';
import { HiOutlineArchive } from 'react-icons/hi';
import { IoIosLink } from 'react-icons/io';
import { LuChartNoAxesColumn, LuMegaphone, LuRocket, LuSquareChartGantt } from 'react-icons/lu';
import { MdOutlineFolder } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';

export const navItens = [
    {
        name: 'Dashboard',
        icon: RxDashboard,
        href: '/dashboard'
    },
    {
        name: 'Meus Produtos',
        icon: HiOutlineArchive,
        href: '/products'
    },
    {
        name: 'Criar Produto',
        icon: MdOutlineFolder,
        href: '/products/create'
    },
    {
        name: 'Campanha',
        icon: LuMegaphone,
        href: '/campaign'
    },
    {
        name: 'Calendário',
        icon: LuSquareChartGantt,
        href: '/calendar'
    },
    {
        name: 'Lançamentos',
        icon: LuRocket,
        href: '/launch'
    },
    {
        name: 'Relatórios',
        icon: LuChartNoAxesColumn,
        href: '/reports'
    },
    {
        name: 'Parcerias',
        icon: FiUsers,
        href: '/partnerships'
    },
    {
        name: 'Anúncios',
        icon: GoZap,
        href: '/ads'
    },
    {
        name: 'Links',
        icon: IoIosLink,
        href: '/links'
    }
]