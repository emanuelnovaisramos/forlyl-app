'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { CreateProjectPhase } from '@/api/product/createProduct'

const phaseSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  color: z.string().min(1, 'A cor é obrigatória'),
  startDate: z.string().min(1, 'Data inicial é obrigatória'),
  endDate: z.string().min(1, 'Data final é obrigatória'),
})

type PhaseFormValues = z.infer<typeof phaseSchema>

interface ModalCreatePhasesProps {
  open: boolean
  onClose: () => void
  onSave: (phase: CreateProjectPhase) => void
  initialData?: CreateProjectPhase
}

export function ModalCreatePhases({
  open,
  onClose,
  onSave,
  initialData,
}: ModalCreatePhasesProps) {
  const form = useForm<PhaseFormValues>({
    resolver: zodResolver(phaseSchema),
    defaultValues: {
      name: initialData?.name || '',
      color: initialData?.color || '#000000',
      startDate: initialData?.startDate || '',
      endDate: initialData?.endDate || '',
    },
  })

  const { watch, reset, handleSubmit } = form

  const handleReset = () => {
    reset({
      name: '',
      color: '#000000',
      startDate: '',
      endDate: '',
    })
  }

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        color: initialData.color,
        startDate: initialData.startDate,
        endDate: initialData.endDate,
      })
    }
  }, [initialData, reset])

  const onSubmit = (data: PhaseFormValues) => {
    onSave({
      name: data.name,
      color: data.color,
      startDate: data.startDate,
      endDate: data.endDate,
    })
    reset()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose()
        handleReset()
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Editar Fase' : 'Criar Nova Fase'}
          </DialogTitle>
          <DialogDescription>
            Defina o nome, cor e intervalo de datas da fase do projeto.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex items-start w-full gap-2 justify-between">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col gap-1 w-full">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex: Planejamento" />
                    </FormControl>
                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col gap-1 w-full">
                    <FormLabel>Cor</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          type="color"
                          {...field}
                          className="w-10 h-10 p-0 border-none"
                        />
                        <span className="text-sm">{watch('color')}</span>
                      </div>
                    </FormControl>
                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col gap-1 w-full">
                    <FormLabel>Data Inicial</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} placeholder="YYYY-MM-DD" />
                    </FormControl>
                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col gap-1 w-full">
                    <FormLabel>Data Final</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} placeholder="YYYY-MM-DD" />
                    </FormControl>
                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit">
                {initialData ? 'Salvar Alterações' : 'Criar Fase'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
