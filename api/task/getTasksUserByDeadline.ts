import { useQuery } from '@tanstack/react-query'
import { parseCookies } from 'nookies'
import { API_URL } from '../config'
import { TOKEN_PATH } from '@/constants/tokens'

const fetchGetTasksUserByDeadline = async (limit?: number) => {
  const { [TOKEN_PATH]: TOKEN } = parseCookies()
  const query = limit ? `?limit=${limit}` : ''
  const res = await fetch(`${API_URL}/task/upcoming-deadlines${query}`, {
    method: 'GET',
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

export const useGetTasksUserByDeadline = (limit?: number) => {
  return useQuery({
    queryKey: ['user-tasks-by-deadline', limit],
    queryFn: () => fetchGetTasksUserByDeadline(limit),
    enabled: true,
  })
}
