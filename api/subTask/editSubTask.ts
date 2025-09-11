import { useMutation } from '@tanstack/react-query'
import { API_URL } from '../config'
import { TOKEN_PATH } from '@/constants/tokens'
import { parseCookies } from 'nookies'

export type UpdateSubTaskParams = {
  id: string
  subTask: {
    completed?: boolean
    title?: string
  }
}

const fetchUpdateSubTask = async (params: UpdateSubTaskParams) => {
  const { [TOKEN_PATH]: TOKEN } = parseCookies()
  const res = await fetch(`${API_URL}/sub-task/${params.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(params.subTask),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Internal error')
  }

  return data
}

export const useUpdateSubTask = () => {
  return useMutation({
    mutationFn: (params: UpdateSubTaskParams) => fetchUpdateSubTask(params),
  })
}
