import { useMutation } from '@tanstack/react-query'
import { API_URL } from '../config'
import { parseCookies } from 'nookies'
import { TOKEN_PATH } from '@/constants/tokens'

const fetchGetUser = async () => {
  const { [TOKEN_PATH]: TOKEN } = parseCookies()

  if (!TOKEN) {
    return
  }

  const res = await fetch(`${API_URL}/auth/me`, {
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

export const useGetUser = () => {
  return useMutation({
    mutationFn: fetchGetUser,
  })
}
