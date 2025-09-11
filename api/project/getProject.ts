import { TOKEN_PATH } from '@/constants/tokens'
import { parseCookies } from 'nookies'
import { API_URL } from '../config'
import { useQuery } from '@tanstack/react-query'

const fetchGetProject = async (projectId: string) => {
  const { [TOKEN_PATH]: TOKEN } = parseCookies()
  const res = await fetch(`${API_URL}/project/${projectId}`, {
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

export const useGetProject = (projectId: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchGetProject(projectId),
    enabled: !!projectId,
  })
}
