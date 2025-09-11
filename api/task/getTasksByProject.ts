import { TOKEN_PATH } from '@/constants/tokens'
import { useQuery } from '@tanstack/react-query'
import { parseCookies } from 'nookies'
import { API_URL } from '../config'

const fetchGetTasksByProject = async (projectId: string) => {
  const { [TOKEN_PATH]: TOKEN } = parseCookies()
  const res = await fetch(`${API_URL}/task/project/${projectId}`, {
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

export const useGetTasksByProject = (projectId: string) => {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => fetchGetTasksByProject(projectId),
    enabled: !!projectId,
  })
}
