'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Form, FormField, FormItem, FormLabel, FormControl } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const projectSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'O nome do produto é obrigatório' })
    .max(100, {
      message: 'O nome do produto deve ter no máximo 100 caracteres',
    }),
  niche: z.string().min(1, { message: 'O nicho é obrigatório' }),
  description: z
    .string()
    .min(1, { message: 'A descrição é obrigatória' })
    .max(1000, { message: 'A descrição deve ter no máximo 1000 caracteres' }),
})

export type ProjectInfos = z.infer<typeof projectSchema>

export const StepCreateProjectInfos = ({
  handleSubmit,
}: {
  handleSubmit: (data: ProjectInfos) => void
}) => {
  const form = useForm<ProjectInfos>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      niche: '',
      description: '',
    },
  })

  const onSubmit = (data: ProjectInfos) => {
    handleSubmit(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full text-left max-w-[600px] mx-auto flex flex-col gap-4 p-6 bg-white rounded-md"
      >
        <h2 className="text-center text-2xl mb-4">Informações do Produto</h2>

        <div className="flex items-start gap-5 max-md:flex-col">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome do produto</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="niche"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nicho/Área de atuação</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emagrecimento">
                        Emagrecimento
                      </SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="beleza">Beleza</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {form.formState.errors.niche && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.niche.message}
                  </p>
                )}
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do produto</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </FormItem>
          )}
        />

        {/*
          <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagem do produto (opcional)</FormLabel>
              <FormControl>
                <input
                  type="file"
                  onChange={e => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
              {selectedFile && selectedFile.length > 0 && (
                <span className="text-sm text-gray-600">
                  Arquivo selecionado: {selectedFile[0].name}
                </span>
              )}
            </FormItem>
          )}
        />
        */}

        <Button type="submit" className="w-[130px] mx-auto font-bold mt-4">
          Próximo
        </Button>
      </form>
    </Form>
  )
}
