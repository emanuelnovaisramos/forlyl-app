import { MdChecklist } from 'react-icons/md'
import { DashboardCard } from '../dashboard/dashboardCard'
import { Table } from '@radix-ui/themes'
import { formatDate } from '@/utils/formatDate'
import { cn } from '@/utils/twMerge'
import { IoTimeOutline } from 'react-icons/io5'
import { GoArrowUpRight } from 'react-icons/go'

const taskData = [
  {
    task: 'Implement authentication',
    currentSubtask: 'Configure Firebase',
    responsible: 'Danilo Sousa',
    dueDate: new Date(2025, 0, 15),
    status: 'Em atraso',
  },
  {
    task: 'Create dashboard layout',
    currentSubtask: 'Finalize graph design',
    responsible: 'Zahra Ambessa',
    dueDate: new Date(2025, 0, 10),
    status: 'Em andamento',
  },
  {
    task: 'Fix production bugs',
    currentSubtask: 'Review logs',
    responsible: 'Jasper Eriksson',
    dueDate: new Date(2025, 0, 20),
    status: 'Em andamento',
  },
  {
    task: 'Test notification functionality',
    currentSubtask: 'Set up test server',
    responsible: 'Alice Martins',
    dueDate: new Date(2025, 0, 25),
    status: 'Em atraso',
  },
  {
    task: 'Test notification functionality',
    currentSubtask: 'Set up test server',
    responsible: 'Alice Martins',
    dueDate: new Date(2025, 0, 25),
    status: 'Feito',
  },
]

export const ListTasks = () => {
  const getStatusButton = (status: string): JSX.Element => {
    const statusColors: Record<string, string> = {
      'Em andamento': 'bg-today',
      Feito: 'bg-done',
      'Não iniciado': 'bg-next',
      'Em atraso': 'bg-delay',
    }

    const color = statusColors[status] || 'default'

    return (
      <div
        className={cn(
          'flex gap-2 items-center p-2 w-max text-white rounded-md',
          color,
        )}
      >
        <IoTimeOutline />
        {status}
      </div>
    )
  }

  return (
    <DashboardCard
      header={{
        title: 'Task List',
        icon: MdChecklist,
      }}
    >
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Tarefa</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Subtarefa atual</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Responsável</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Data limite</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Situação</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell
              justify="end"
              className="w-max"
            ></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {taskData.map((task, index) => (
            <Table.Row align="center" key={index}>
              <Table.RowHeaderCell>{task.task}</Table.RowHeaderCell>
              <Table.Cell>{task.currentSubtask}</Table.Cell>
              <Table.Cell>{task.responsible}</Table.Cell>
              <Table.Cell>{formatDate(task.dueDate)}</Table.Cell>
              <Table.Cell>{getStatusButton(task.status)}</Table.Cell>
              <Table.Cell className="w-max h-full justify-end items-end">
                <div className='p-4 bg-slate-100 rounded-md w-max text-black'>
                  <GoArrowUpRight />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </DashboardCard>
  )
}
