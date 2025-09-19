import { ProjectPhase } from './projectPhase'

export interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'done'
  niche: string
  phases?: ProjectPhase[]
  audienceAgeFrom: number
  audienceAgeTo: number
  audienceAverageIncome: string
  audienceMainInterest: string
  tasksTotal: number
  tasksToDo: number
  tasksInProgress: number
  tasksDone: number
  tasksOverdue: number
  createdAt: string
  updatedAt: string
}