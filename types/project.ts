import { ProjectPhase } from "./projectPhase"

export interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | string
  niche: string
  phases?: ProjectPhase[]
  audienceAgeFrom: number
  audienceAgeTo: number
  audienceAverageIncome: string
  audienceMainInterest: string
  createdAt: string
  updatedAt: string
}