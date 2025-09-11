import { useMutation } from '@tanstack/react-query'
import { API_URL } from '../config'
import { TOKEN_PATH } from '@/constants/tokens'
import { parseCookies } from 'nookies'
import { TaskStatus } from '@/types/task'

export type CreateTaskParams = {
  name: string
  responsibleId: string
  projectId: string
  phaseId: string
  startDate: string
  dueDate: string
  status?: TaskStatus
}

const fetchCreateTask = async (params: CreateTaskParams) => {
  const { [TOKEN_PATH]: TOKEN } = parseCookies()
  const res = await fetch(`${API_URL}/task`, {
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

export const useCreateTask = () => {
  return useMutation({
    mutationFn: (params: CreateTaskParams) => fetchCreateTask(params),
  })
}
