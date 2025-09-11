import { useMutation } from '@tanstack/react-query'
import { API_URL } from '../config'
import { TOKEN_PATH } from '@/constants/tokens'
import { parseCookies } from 'nookies'

const fetchDeleteSubTask = async (id: string) => {
  const { [TOKEN_PATH]: TOKEN } = parseCookies()
  const res = await fetch(`${API_URL}/sub-task/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Internal error')
  }

  return data
}

export const useDeleteSubTask = () => {
  return useMutation({
    mutationFn: (id: string) => fetchDeleteSubTask(id),
  })
}
