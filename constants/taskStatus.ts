export const TASK_STATUS = [
  {
    value: "toDo",
    label: "Não iniciado",
    color: "--color-kanban-toDo",
  },
  {
    value: "inProgress",
    label: "Em andamento",
    color: "--color-kanban-inProgress",
  },
  {
    value: "done",
    label: "Concluído",
    color: "--color-kanban-done",
  },
  {
    value: "overdue",
    label: "Em atraso",
    color: "--color-kanban-overdue",
  },
] as const