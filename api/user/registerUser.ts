import { useMutation } from '@tanstack/react-query'
import { API_URL } from '../config'

type CreateUser = {
  name: string
  email: string
  password: string
}

const fetchCreateUser = async (user: CreateUser) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Internal error')
  }

  return data
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: CreateUser) => fetchCreateUser(user),
  })
}
