import { KanbanColumn } from './kanbanColumn'

const kanbanColumns = [
  { name: 'Não iniciado', value: 'todo', count: 26 },
  { name: 'Em andamento', value: 'doing', count: 10 },
  { name: 'Concluído', value: 'done', count: 14 },
  { name: 'Em atraso', value: 'overdue', count: 5 },
];


export const Kanban = () => {
  return (
    <div className="grid grid-cols-4 items-start gap-5 max-[1500px]:grid-cols-2">
      {kanbanColumns.map(column => (
        <KanbanColumn
          key={column.value}
          name={column.name}
          value={column.value}
          count={column.count}
        />
      ))}
    </div>
  )
}
