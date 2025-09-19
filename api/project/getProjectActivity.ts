import { useQuery } from '@tanstack/react-query'
import { API_URL } from '../config'
import { parseCookies } from 'nookies'
import { TOKEN_PATH } from '@/constants/tokens'

const fetchGetProjectActivity = async (projectId: string) => {
  const { [TOKEN_PATH]: TOKEN } = parseCookies()

  const res = await fetch(`${API_URL}/project-activity/${projectId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Erro interno')
  }

  return data
}

export const useGetProjectActivity = (projectId: string) => {
  return useQuery({
    queryKey: ['projectActivity', projectId],
    queryFn: () => fetchGetProjectActivity(projectId),
    enabled: !!projectId,
  })
}
