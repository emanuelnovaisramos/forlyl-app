import Image from 'next/image'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { DashboardCard } from './dashboardCard'
import { ProjectActivity } from '@/types/projectActivity'
import { timeAgo } from '@/utils/timeAgo'
import { AiOutlineLoading } from 'react-icons/ai'

interface DashboardTableProjectActivityProps {
  activities: ProjectActivity[]
  isPending: boolean
  error?: boolean
}

export const DashboardTableProjectActivity = ({
  activities,
  isPending,
  error,
}: DashboardTableProjectActivityProps) => {
  return (
    <DashboardCard
      header={{
        title: 'Atividade recente',
        icon: RxCounterClockwiseClock,
      }}
      className="h-max"
    >
      <div className="max-h-[212px] overflow-y-auto">
        <Table className="w-full">
          <TableBody>
            {isPending && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  <div className="flex justify-center items-center">
                    <AiOutlineLoading className="animate-spin text-3xl text-primary" />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {error && !isPending && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4 text-red-500">
                  Ocorreu um erro ao carregar as atividades.
                </TableCell>
              </TableRow>
            )}
            {!isPending && !error && activities?.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  Nenhuma atividade encontrada.
                </TableCell>
              </TableRow>
            )}
            {!isPending &&
              !error &&
              activities?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="pl-7.5">{item.task?.name}</TableCell>
                  <TableCell className="border-l border-r border-border-primary">
                    <div className="flex justify-center items-center">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full">
                        <Image
                          src={item.executor?.avatar || '/user-avatar-example.png'}
                          alt={item.executor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[150px] text-center text-sm text-third">
                    {timeAgo(item.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </DashboardCard>
  )
}
