import { useQuery } from '@tanstack/react-query'
import { parseCookies } from 'nookies'
import { API_URL } from '../config'
import { TOKEN_PATH } from '@/constants/tokens'

const fetchGetTasksByRecentUpdate = async (projectId: string) => {
  const { [TOKEN_PATH]: TOKEN } = parseCookies()
  const res = await fetch(
    `${API_URL}/task/project/${projectId}/list-tasks-by-recent-update`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  )

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Internal error')
  }
  return data
}

export const useGetTasksByRecentUpdate = (projectId: string) => {
  return useQuery({
    queryKey: ['tasks-by-recent-update', projectId],
    queryFn: () => fetchGetTasksByRecentUpdate(projectId),
    enabled: !!projectId,
  })
}
