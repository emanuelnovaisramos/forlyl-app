import { useMutation } from '@tanstack/react-query'
import { API_URL } from '../config'
import { TOKEN_PATH } from '@/constants/tokens'
import { parseCookies } from 'nookies'

export interface CreateProjectPhase {
  color: string
  name: string
  startDate: string
  endDate: string
}

export type CreateProjectParams = {
  name: string
  description: string
  niche: string
  audienceAgeFrom: number
  audienceAgeTo: number
  audienceMainInterest: string
  audienceAverageIncome?: number
  phases?: CreateProjectPhase[]
}

const fetchCreateProject = async (params: CreateProjectParams) => {
  const { [TOKEN_PATH]: TOKEN } = parseCookies()
  const res = await fetch(`${API_URL}/project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(params),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Internal error')
  }

  return data
}

export const useCreateProject = () => {
  return useMutation({
    mutationFn: (params: CreateProjectParams) => fetchCreateProject(params),
  })
}
