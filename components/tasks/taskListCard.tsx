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
import { IoTimeOutline } from 'react-icons/io5'
import { Task } from '@/types/task'
import { formatDate } from '@/utils/formatDate'
import { TASK_STATUS } from '@/constants/taskStatus'
import { AiOutlineLoading } from 'react-icons/ai'

export const TaskListCard = ({
  tasks,
  isPending,
  error,
}: {
  tasks: Task[]
  isPending: boolean
  error?: boolean
}) => {
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
            <TableHead className="px-7.5 border-r border-border-primary text-primary">
              Tarefa
            </TableHead>
            <TableHead className="px-7.5 border-r border-border-primary text-primary">
              Subtarefa atual
            </TableHead>
            <TableHead className="px-7.5 border-r border-border-primary text-primary">
              Responsável
            </TableHead>
            <TableHead className="px-7.5 border-r border-border-primary w-[300px] text-primary">
              Data limite
            </TableHead>
            <TableHead className="px-7.5 border-r border-border-primary text-primary">
              Situação
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {isPending && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                <div className="flex justify-center items-center">
                  <AiOutlineLoading className="animate-spin text-3xl text-primary" />
                </div>
              </TableCell>
            </TableRow>
          )}

          {error && !isPending && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-red-500">
                Ocorreu um erro ao carregar as tarefas.
              </TableCell>
            </TableRow>
          )}

          {!isPending && !error && tasks?.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                Nenhuma tarefa encontrada.
              </TableCell>
            </TableRow>
          )}

          {!isPending &&
            !error &&
            tasks?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="border-r border-border-primary px-7.5 min-w-[250px]">
                  {item.name}
                </TableCell>
                <TableCell className="border-r border-border-primary px-7.5 min-w-[250px]">
                  {item.subTasks[0]?.title ?? 'Nenhuma'}
                </TableCell>
                <TableCell className="border-r border-border-primary min-w-[250px] px-7.5">
                  <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full">
                      <Image
                        src={
                          item.responsible?.avatar || '/user-avatar-example.png'
                        }
                        alt={item.responsible?.name || ''}
                        width={24}
                        height={24}
                        className="object-cover w-6 h-6"
                      />
                    </div>
                    <span>{item.responsible?.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-7.5 min-w-[250px] border-r border-border-primary">
                  {formatDate(item.dueDate)}
                </TableCell>
                <TableCell className="border-r border-border-primary min-w-[200px] px-7.5">
                  {(() => {
                    const statusObj = TASK_STATUS.find(
                      s => s.value === item.status,
                    )
                    if (!statusObj) return null
                    return (
                      <div
                        className={`py-1 px-2 items-center gap-1 flex rounded-md w-max text-white text-xs`}
                        style={{ backgroundColor: `var(${statusObj.color})` }}
                      >
                        <IoTimeOutline size={18} />
                        {statusObj.label}
                      </div>
                    )
                  })()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </DashboardCard>
  )
}
