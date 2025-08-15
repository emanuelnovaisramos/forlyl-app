import Image from 'next/image'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { DashboardCard } from './dashboardCard'

type UserActivity = {
  avatar: string
  activity: string
  time: string
}

export const DashboardTableUsersActivity = ({
  data,
}: {
  data: UserActivity[]
}) => {
  return (
    <DashboardCard
      header={{
        title: 'Atividade recente',
        icon: RxCounterClockwiseClock,
      }}
      className='h-max'
    >
      <Table>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} >
              <TableCell className='pl-7.5'>{item.activity}</TableCell>
              <TableCell className='border-l border-r'>
                <div className="flex justify-center items-center">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={item.avatar}
                      alt={item.activity}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="w-[150px] text-center text-sm text-third">
                {item.time}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardCard>
  )
}
