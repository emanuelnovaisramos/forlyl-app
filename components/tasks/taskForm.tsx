'use client'
import { FaArrowLeft } from 'react-icons/fa'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { LuCalendar, LuFileText, LuUser } from 'react-icons/lu'
import { PiSpinnerBold } from 'react-icons/pi'
import { Drawer, DrawerContent } from '../ui/drawer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'
import { DateRange } from 'react-date-range'
import pt from 'date-fns/locale/pt'
import { parseISO } from 'date-fns'
import * as Popover from '@radix-ui/react-popover'
import { formatDateToISO } from '@/utils/formatDateToIso'
import { formatDate } from '@/utils/formatDate'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/authContext'
import { LuWorkflow } from 'react-icons/lu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { TASK_STATUS } from '@/constants/taskStatus'
import { useProject } from '@/contexts/projectContext'
import { Button } from '../ui/button'
import { useToast } from '@/domains/toasterProvider'
import { useCreateTask } from '@/api/task/createTask'
import { Task, TaskStatus } from '@/types/task'
import { useEditTask } from '@/api/task/editTask'
import { SubTasksTable } from './subTasksTable'

const taskForm = z.object({
  name: z
    .string()
    .min(1, { message: 'O nome da tarefa é obrigatório' })
    .max(100, { message: 'O nome deve ter no máximo 100 caracteres' }),
  startDate: z.string().min(1, { message: 'A data de início é obrigatória' }),
  dueDate: z.string().min(1, { message: 'A data de término é obrigatória' }),
  status: z.string().min(1, { message: 'O status é obrigatório' }),
  phaseId: z.string().min(1, { message: 'A fase é obrigatória' }),
  responsibleId: z.string().min(1, { message: 'O responsável é obrigatório' }),
  description: z
    .string()
    .min(1, { message: 'A descrição é obrigatória' })
    .max(100, { message: 'A descrição não pode ter mais que 100 caracteres' }),
})

type TaskFormValues = z.infer<typeof taskForm>

export const TaskForm = ({
  defaultValues,
  openSidebar,
  setOpenSidebar,
  callBack,
}: {
  defaultValues?: Task
  openSidebar: boolean
  setOpenSidebar: (value: boolean) => void
  callBack?: (task: Task) => void
}) => {
  const { showToast } = useToast()
  const { mutateAsync: createTask, isPending: isPendingCreateTask } =
    useCreateTask()
  const { mutateAsync: updateTask } = useEditTask()
  const { user } = useAuth()
  const { project } = useProject()
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskForm),
    defaultValues: {
      name: defaultValues?.name || '',
      startDate: defaultValues?.startDate || '',
      dueDate: defaultValues?.dueDate || '',
      description: defaultValues?.description || '',
      status: defaultValues?.status || 'toDo',
      phaseId: defaultValues?.phase?.id || '',
      responsibleId: defaultValues?.responsible?.id || user?.id,
    },
  })

  useEffect(() => {
    if (openSidebar) {
      form.reset({
        name: defaultValues?.name || '',
        startDate: defaultValues?.startDate || '',
        dueDate: defaultValues?.dueDate || '',
        description: defaultValues?.description || '',
        status: defaultValues?.status || 'toDo',
        phaseId: defaultValues?.phase?.id || '',
        responsibleId: defaultValues?.responsible?.id || user?.id,
      })
    }
  }, [openSidebar, defaultValues, form])

  const startDate = form.watch('startDate')
  const dueDate = form.watch('dueDate')
  const [openRangePicker, setOpenRangePicker] = useState(false)

  const onSubmit = async (data: TaskFormValues) => {
    try {
      if (defaultValues) {
        const updatedTask = await updateTask({
          id: defaultValues.id || '',
          ...data,
          status: data.status as TaskStatus,
        })

        showToast({
          type: 'success',
          message: 'Tarefa atualizada com sucesso!',
        })

        if (callBack) {
          callBack(updatedTask)
        }
      } else {
        const newTask = await createTask({
          ...data,
          status: data.status as TaskStatus,
          projectId: project?.id || '',
        })

        showToast({
          type: 'success',
          message: 'Tarefa criada com sucesso!',
        })

        if (callBack) {
          callBack(newTask)
        }
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
          ? error
          : 'Ocorreu um erro ao salvar a tarefa'

      showToast({
        type: 'error',
        message,
      })
    }
  }

  return (
    <Drawer open={openSidebar} onOpenChange={setOpenSidebar} direction="right">
      <DrawerContent className="flex bg-transparent w-max border-none h-full ml-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
            className="flex flex-col w-full p-7.5 gap-5 items-start max-w-[700px] bg-white h-full"
          >
            <div className="flex h-max w-full items-center gap-2 mb-7.5 justify-between">
              <div className="flex w-full items-center gap-7.5">
                <FaArrowLeft
                  size={24}
                  className="cursor-pointer"
                  onClick={() => setOpenSidebar(false)}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          variant="no-styles"
                          className="text-2xl w-full"
                          placeholder="Nome da tarefa"
                        />
                      </FormControl>
                      {form.formState.errors.name && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              {(!defaultValues || form.formState.isDirty) && (
                <Button
                  disabled={isPendingCreateTask}
                  className="w-max font-bold p-2"
                  variant="outline"
                >
                  Salvar
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center min-w-[200px] text-third text-sm gap-4">
                  <LuCalendar size={18} />
                  Prazo
                </div>

                <div className="flex items-center gap-2 text-sm relative">
                  <Popover.Root
                    open={openRangePicker}
                    onOpenChange={setOpenRangePicker}
                  >
                    <Popover.Trigger asChild>
                      <div className="flex items-center text-sm gap-2 cursor-pointer">
                        <p>
                          {startDate
                            ? formatDate(startDate)
                            : 'Selecione a data inicial'}
                        </p>
                        <IoIosArrowRoundForward size={16} />
                        <p>
                          {dueDate
                            ? formatDate(dueDate)
                            : 'Selecione a data final'}
                        </p>
                      </div>
                    </Popover.Trigger>
                    <Popover.Content
                      side="bottom"
                      align="center"
                      className="z-50 shadow-lg bg-white rounded border p-2"
                    >
                      <DateRange
                        editableDateInputs
                        onChange={ranges => {
                          const range = ranges.selection
                          if (range.startDate && range.endDate) {
                            form.setValue(
                              'startDate',
                              formatDateToISO(range.startDate),
                            )
                            form.setValue(
                              'dueDate',
                              formatDateToISO(range.endDate),
                            )
                          }
                        }}
                        moveRangeOnFirstSelection={false}
                        ranges={[
                          {
                            startDate: startDate
                              ? parseISO(startDate)
                              : new Date(),
                            endDate: dueDate ? parseISO(dueDate) : new Date(),
                            key: 'selection',
                          },
                        ]}
                        locale={pt}
                        rangeColors={['#2C58E4']}
                        showDateDisplay={false}
                        minDate={new Date()}
                      />
                    </Popover.Content>
                  </Popover.Root>
                </div>
              </div>
              {(form.formState.errors.startDate ||
                form.formState.errors.dueDate) && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.startDate?.message ||
                    form.formState.errors.dueDate?.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center min-w-[200px] text-third text-sm gap-4">
                <LuUser size={18} />
                Responsável
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm">{user?.name}</p>
              </div>
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => {
                const current = TASK_STATUS.find(s => s.value === field.value)

                return (
                  <FormItem className="w-full">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center min-w-[200px] text-third text-sm gap-4">
                        <PiSpinnerBold size={18} />
                        Status
                      </div>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className="w-max py-1 px-2 text-sm rounded-md border-none"
                            style={{
                              backgroundColor: current
                                ? `var(${current.color})`
                                : 'transparent',
                            }}
                          >
                            <SelectValue
                              placeholder="Selecione o status"
                              className=""
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {TASK_STATUS.map(status => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                              >
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    {form.formState.errors.status && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.status.message}
                      </p>
                    )}
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center min-w-[200px] text-third text-sm gap-4">
                      <LuFileText size={16} />
                      Descrição
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        variant="no-styles"
                        className="w-full text-sm"
                        placeholder="Descrição da tarefa"
                      />
                    </FormControl>
                  </div>
                  {form.formState.errors.description && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phaseId"
              render={({ field }) => {
                const current = TASK_STATUS.find(s => s.value === field.value)

                return (
                  <FormItem className="w-full">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center min-w-[200px] text-third text-sm gap-4">
                        <LuWorkflow size={18} />
                        Fase do Projeto
                      </div>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className="w-max p-0 text-sm shadow-none rounded-md border-none"
                            style={{
                              backgroundColor: current
                                ? current.color
                                : 'transparent',
                            }}
                          >
                            <SelectValue placeholder="Selecione a fase" />
                          </SelectTrigger>
                          <SelectContent>
                            {project?.phases && project.phases.length > 0 ? (
                              project.phases.map(phase => (
                                <SelectItem key={phase.id} value={phase.id}>
                                  {phase.name}
                                </SelectItem>
                              ))
                            ) : (
                              <div className="p-3 text-sm text-third">
                                Nenhuma fase cadastrada
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    {form.formState.errors.phaseId && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.phaseId.message}
                      </p>
                    )}
                  </FormItem>
                )
              }}
            />
            {defaultValues && (
              <div className="flex w-full mt-7.5">
                <SubTasksTable
                  subTasks={defaultValues.subTasks}
                  mainTaskId={defaultValues.id}
                />
              </div>
            )}
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
