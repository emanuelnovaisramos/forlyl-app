'use client'

import { useState } from 'react'
import {
  HiOutlinePlusSm,
  HiOutlineTrash,
  HiOutlinePencil,
  HiCheck,
  HiX,
} from 'react-icons/hi'

import { Checkbox } from '../ui/checkbox'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from '../ui/table'
import { LuSquareCheckBig } from 'react-icons/lu'
import { SubTask } from '@/types/task'
import { Input } from '../ui/input'
import { useCreateSubTask } from '@/api/subTask/createSubTask'
import { useToast } from '@/domains/toasterProvider'
import { useUpdateSubTask } from '@/api/subTask/editSubTask'
import { AiOutlineLoading } from 'react-icons/ai'
import { useDeleteSubTask } from '@/api/subTask/deleteSubTask'

interface SubTasksTableProps {
  subTasks: SubTask[]
  mainTaskId?: string
  setSubTasks: (subTasks: SubTask[]) => void
}

export const SubTasksTable = ({
  subTasks,
  mainTaskId,
  setSubTasks,
}: SubTasksTableProps) => {
  const { showToast } = useToast()
  const { mutateAsync: createSubTask, isPending: isPendingCreate } =
    useCreateSubTask()
  const { mutateAsync: updateSubTask, isPending: isPendingUpdate } =
    useUpdateSubTask()
  const { mutateAsync: deleteSubTask } = useDeleteSubTask()
  const [tasks, setTasks] = useState<SubTask[]>(subTasks)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [newCompleted, setNewCompleted] = useState(false)
  const [addingRow, setAddingRow] = useState(false)

  const toggleCompleted = async (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (!task || !task.id.startsWith('temp-')) {
      // se tiver id real, atualiza no backend
      if (!task) return
      await updateSubTask({
        id,
        subTask: { completed: !task.completed },
      })
        .then(updated => {
          setTasks(prev =>
            prev.map(t =>
              t.id === id ? { ...t, completed: updated.completed } : t,
            ),
          )
        })
        .catch(err => {
          showToast({
            message: err.message
              ? err.message
              : 'Erro ao atualizar status',
          })
        })
      return
    }

    // se for tarefa temporária, só atualiza localmente
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    )
    setSubTasks(tasks)
  }

  const startEditing = (task: SubTask) => {
    setEditingId(task.id)
    setNewTitle(task.title)
  }

  const saveEdit = (id: string) => {
    if (newTitle.trim() === '') return

    const task = tasks.find(t => t.id === id)
    if (!task) return

    if (!id.startsWith('temp-')) {
      updateSubTask({ id, subTask: { title: newTitle } })
        .then(updated => {
          setTasks(prev =>
            prev.map(t => (t.id === id ? { ...t, title: updated.title } : t)),
          )
          setEditingId(null)
          setNewTitle('')
        })
        .catch(err => {
          showToast({
            message: err.message
              ? err.message
              : 'Erro ao atualizar subtarefa',
          })
        })
    } else {
      // temporária
      setTasks(prev =>
        prev.map(t => (t.id === id ? { ...t, title: newTitle } : t)),
      )
      setEditingId(null)
      setNewTitle('')
      setSubTasks(tasks)
    }
  }

  const handleDelete = (id: string) => {
    if (!id.startsWith('temp-')) {
      deleteSubTask(id)
        .then(() => {
          setTasks(prev => prev.filter(t => t.id !== id))
          showToast({ message: 'Subtarefa deletada com sucesso!' })
        })
        .catch(err => {
          showToast({
            message: err.message ? err.message : 'Erro ao deletar subtarefa',
          })
        })
    } else {
      // remove localmente
      setTasks(prev => prev.filter(t => t.id !== id))
      setSubTasks(tasks.filter(t => t.id !== id))
    }
  }

  const addTask = async () => {
    if (newTitle.trim() === '') return

    if (mainTaskId) {
      await createSubTask({
        taskId: mainTaskId,
        title: newTitle,
        completed: newCompleted,
      })
        .then(res => {
          setTasks(prev => [res, ...prev])
          setNewTitle('')
          setNewCompleted(false)
          setAddingRow(false)
        })
        .catch(err => {
          showToast({
            message: err.message
              ? err.message
              : 'Erro ao criar tarefa secundária',
          })
        })
    } else {
      // criar tarefa temporária
      const newTask: SubTask = {
        id: `temp-${Date.now()}`,
        title: newTitle,
        completed: newCompleted,
      }
      setTasks(prev => [newTask, ...prev])
      setNewTitle('')
      setNewCompleted(false)
      setAddingRow(false)
      setSubTasks?.([newTask, ...tasks])
    }
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex px-4 items-center gap-4 justify-between">
        <div className="flex items-center text-third gap-3">
          <LuSquareCheckBig />
          <p className="text-sm">Checklist</p>
        </div>
        <div
          className="flex p-1 rounded-md border border-border-primary cursor-pointer"
          onClick={() => {
            setAddingRow(prev => !prev)
            setNewTitle('')
            setEditingId(null)
          }}
        >
          <HiOutlinePlusSm size={16} className="text-primary" />
        </div>
      </div>

      <div className="flex relative">
        {(isPendingCreate || isPendingUpdate) && (
          <div className="flex absolute w-full h-full bg-gray-200/30 justify-center items-center z-20">
            <AiOutlineLoading className="animate-spin text-4xl text-primary" />
          </div>
        )}
        <Table className="border border-border-primary">
          <TableHeader className="bg-background-six border px-7.5">
            <TableRow className="text-base">
              <TableHead className="px-7.5 border-r border-border-primary text-primary w-[60px]">
                Status
              </TableHead>
              <TableHead className="px-7.5 border-r border-border-primary text-primary">
                Tarefa
              </TableHead>
              <TableHead className="px-7.5 text-primary w-[120px] text-center">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {addingRow && (
              <TableRow>
                <TableCell className="border-r p-0 border-border-primary text-center">
                  <div className="flex items-center w-full justify-center">
                    <Checkbox
                      checked={newCompleted}
                      variant="secondary"
                      onCheckedChange={checked =>
                        setNewCompleted(Boolean(checked))
                      }
                    />
                  </div>
                </TableCell>
                <TableCell className="px-7.5 text-xs">
                  <Input
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTask()}
                    className="py-0 px-2 text-xs"
                    placeholder="Nova tarefa"
                    autoFocus
                  />
                </TableCell>
                <TableCell className="px-7.5 border-l border-border-primary">
                  <div className="flex justify-center items-center gap-4">
                    <HiX
                      className="cursor-pointer text-red-500"
                      size={20}
                      onClick={() => {
                        setAddingRow(false)
                        setNewTitle('')
                        setNewCompleted(false)
                      }}
                    />
                    <HiCheck
                      className="cursor-pointer text-green-500"
                      size={20}
                      onClick={addTask}
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}

            {tasks.map(task => (
              <TableRow key={task.id}>
                <TableCell className="border-r p-0 border-border-primary text-center">
                  <div className="flex items-center w-full justify-center">
                    <Checkbox
                      checked={task.completed}
                      variant="secondary"
                      onClick={() => toggleCompleted(task.id)}
                    />
                  </div>
                </TableCell>

                <TableCell className="px-7.5 text-xs">
                  {editingId === task.id ? (
                    <Input
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveEdit(task.id)}
                      className="py-0 px-2 text-xs"
                    />
                  ) : (
                    task.title
                  )}
                </TableCell>

                <TableCell className="px-7.5 border-l border-border-primary">
                  <div className="flex justify-center items-center gap-4">
                    {editingId === task.id ? (
                      <>
                        <HiX
                          className="cursor-pointer text-red-500"
                          size={20}
                          onClick={() => {
                            setEditingId(null)
                            setNewTitle('')
                          }}
                        />
                        <HiCheck
                          className="cursor-pointer text-green-500"
                          size={20}
                          onClick={() => saveEdit(task.id)}
                        />
                      </>
                    ) : (
                      <>
                        <HiOutlinePencil
                          className="cursor-pointer text-blue-500"
                          onClick={() => {
                            startEditing(task)
                            setAddingRow(false)
                          }}
                        />
                        <HiOutlineTrash
                          className="cursor-pointer text-red-500"
                          onClick={() => handleDelete(task.id)}
                        />
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
