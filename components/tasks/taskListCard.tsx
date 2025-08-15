import Image from 'next/image'
import { MdChecklist } from 'react-icons/md'
import { DashboardCard } from '../dashboard/dashboardCard'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from '../ui/table'
import { FiArrowUpRight } from 'react-icons/fi'
import { IoTimeOutline } from 'react-icons/io5'

const tasks = [
  {
    activity: 'Criativos de Aquecimento',
    subtask: 'Live com especialista',
    avatar: '/user-avatar-example.png',
    name: 'Joaquim Santos',
    time: '5 de novembro de 2024',
    status: { label: 'Em atraso', color: 'bg-red-500' },
  },
  {
    activity: 'Páginas de Captura',
    subtask: 'Criar página de captura',
    avatar: '/user-avatar-example.png',
    name: 'Gustavo Ferreira',
    time: '8 de novembro de 2024',
    status: { label: 'Em andamento', color: 'bg-blue-500' },
  },
  {
    activity: 'Emails de Aquecimento',
    subtask: 'Faltam 2 dias',
    avatar: '/user-avatar-example.png',
    name: 'Benício Dias',
    time: '8 de novembro de 2024',
    status: { label: 'Em andamento', color: 'bg-blue-500' },
  },
  {
    activity: 'Configurações Plataforma',
    subtask: 'Criar tag de alunos',
    avatar: '/user-avatar-example.png',
    name: 'Aline Fernandes',
    time: '10 de novembro de 2024',
    status: { label: 'Em andamento', color: 'bg-blue-500' },
  },
  {
    activity: 'Emails e WhatsApps Evento',
    subtask: 'Ao vivo - Aula 1',
    avatar: '/user-avatar-example.png',
    name: 'Gustavo Ferreira',
    time: '15 de novembro de 2024',
    status: { label: 'Em andamento', color: 'bg-blue-500' },
  },
  {
    activity: 'Escrever CPLs',
    subtask: 'CPL 2',
    avatar: '/user-avatar-example.png',
    name: 'Joaquim Santos',
    time: '25 de novembro de 2024',
    status: { label: 'Não iniciado', color: 'bg-yellow-500' },
  },
  {
    activity: 'Escrever Script Vídeo',
    subtask: 'Script',
    avatar: '/user-avatar-example.png',
    name: 'Aline Fernandes',
    time: '5 de dezembro de 2024',
    status: { label: 'Não iniciado', color: 'bg-yellow-500' },
  },
]

export const TaskListCard = () => {
  return (
    <DashboardCard
      header={{
        title: 'Lista de tarefas',
        icon: MdChecklist,
      }}
    >
      <Table>
        <TableHeader className="bg-background-six px-7.5">
          <TableRow className="text-base">
            <TableHead className="px-7.5 border-r text-primary">Tarefa</TableHead>
            <TableHead className="px-7.5 border-r text-primary">
              Subtarefa atual
            </TableHead>
            <TableHead className="px-7.5 border-r text-primary">
              Responsável
            </TableHead>
            <TableHead className="px-7.5 border-r w-[300px] text-primary">
              Data limite
            </TableHead>
            <TableHead className="px-7.5 border-r text-primary">
              Situação
            </TableHead>
            <TableHead className="px-7.5 w-[37px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='bg-white'>
          {tasks.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="border-r px-7.5 min-w-[250px]">
                {item.activity}
              </TableCell>
              <TableCell className="border-r px-7.5 min-w-[250px]">
                {item.subtask}
              </TableCell>
              <TableCell className="border-r min-w-[250px] px-7.5">
                <div className="flex items-center gap-2">
                  <div className="relative h-6 w-6 overflow-hidden rounded-full">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={24}
                      height={24}
                      className="object-cover w-6 h-6"
                    />
                  </div>
                  <span>{item.name}</span>
                </div>
              </TableCell>
              <TableCell className="px-7.5 min-w-[250px] border-r">
                {item.time}
              </TableCell>
              <TableCell className="border-r min-w-[200px] px-7.5">
                <div
                  className={`py-1 px-2 items-center gap-1 flex rounded-md w-max text-white text-xs ${item.status.color}`}
                >
                  <IoTimeOutline size={18} />
                  {item.status.label}
                </div>
              </TableCell>
              <TableCell className='bg-background'>
                <FiArrowUpRight size={18} className='flex justify-center items-center w-full' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardCard>
  )
}
