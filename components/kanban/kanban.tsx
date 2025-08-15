import { KanbanColumn } from './kanbanColumn'

const kanbanColumns = [
  { name: 'Não iniciado', value: 'todo', count: 26 },
  { name: 'Em andamento', value: 'doing', count: 10 },
  { name: 'Concluído', value: 'done', count: 14 },
  { name: 'Em atraso', value: 'overdue', count: 5 },
];


export const Kanban = () => {
  return (
    <div className="flex items-start gap-5">
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
