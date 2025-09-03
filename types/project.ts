export interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | string
  niche: string
  audienceAgeFrom: number
  audienceAgeTo: number
  audienceAverageIncome: string
  audienceMainInterest: string
  createdAt: string
  updatedAt: string
}