import { useQuery } from '@tanstack/react-query'
import { API_URL } from '../config'
import { parseCookies } from 'nookies'
import { TOKEN_PATH } from '@/constants/tokens'

const fetchGetUserProjects = async () => {
  const { [TOKEN_PATH]: TOKEN } = parseCookies()

  const res = await fetch(`${API_URL}/project/user`, {
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

export const useGetUserProjects = () => {
  return useQuery({
    queryKey: ['userProjects'],
    queryFn: fetchGetUserProjects,
  })
}
