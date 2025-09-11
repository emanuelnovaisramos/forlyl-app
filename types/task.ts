import { User } from '@/contexts/authContext'
import { ProjectPhase } from './projectPhase'

export type TaskStatus = 'toDo' | 'inProgress' | 'done' | 'overdue'


export type SubTask = {
  id: string
  title: string
  completed: boolean
}

export interface Task {
  id: string
  name: string
  description: string
  status: TaskStatus
  startDate: string
  dueDate: string
  createdAt: string
  updatedAt: string
  responsible: User | null
  phase: ProjectPhase | null
  subTasks: SubTask[]
}
