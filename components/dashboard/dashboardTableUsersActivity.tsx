import { Table } from '@radix-ui/themes'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { DashboardCard } from './dashboardCard'
import Image from 'next/image'

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
    >
      <Table.Root variant="surface" className="border-none">
        <Table.Body>
          {data.map((user, index) => (
            <Table.Row align="center" key={index}>
              <Table.RowHeaderCell className='font-normal'>
                {user.activity}
              </Table.RowHeaderCell>
              <Table.Cell className='w-full justify-center flex h-full border-l-[1px] border-r-[1px]'>
                <Image
                  className="w-7 h-7 object-cover rounded-full"
                  src={user.avatar}
                  width={100}
                  height={100}
                  alt={''}
                />
              </Table.Cell>
              <Table.Cell className='text-normal text-gray-600'>{user.time}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </DashboardCard>
  )
}
