import { useMutation } from '@tanstack/react-query'
import { API_URL } from '../config'
import { TOKEN_PATH } from '@/constants/tokens'
import { parseCookies } from 'nookies'

export type CreateSubTaskParams = {
  taskId: string
  title: string
  completed?: boolean
}

const fetchCreateSubTask = async (params: CreateSubTaskParams) => {
  const { [TOKEN_PATH]: TOKEN } = parseCookies()
  const res = await fetch(`${API_URL}/sub-task`, {
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

export const useCreateSubTask = () => {
  return useMutation({
    mutationFn: (params: CreateSubTaskParams) => fetchCreateSubTask(params),
  })
}
