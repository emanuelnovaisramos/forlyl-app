import { useMutation } from '@tanstack/react-query'
import { API_URL } from '../config'

type Login = {
  email: string
  password: string
}

const fetchLogin = async (login: Login) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(login),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Internal error')
  }

  return data
}

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (login: Login) => fetchLogin(login),
  })
}
