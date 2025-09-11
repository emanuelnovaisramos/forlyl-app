import { useMutation } from '@tanstack/react-query'
import { API_URL } from '../config'
import { TOKEN_PATH } from '@/constants/tokens'
import { parseCookies } from 'nookies'
import { Task, TaskStatus } from '@/types/task'

export type EditTaskParams = {
  id: string
  name?: string
  responsibleId?: string
  phaseId?: string
  startDate?: string
  dueDate?: string
  status?: TaskStatus
  description?: string
}

const fetchEditTask = async (params: EditTaskParams) => {
  const { [TOKEN_PATH]: TOKEN } = parseCookies()
  const { id, ...body } = params

  const res = await fetch(`${API_URL}/task/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Erro ao atualizar a tarefa')
  }

  return data as Task
}

export const useEditTask = () => {
  return useMutation({
    mutationFn: (params: EditTaskParams) => fetchEditTask(params),
  })
}
