'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Form, FormField, FormItem, FormLabel, FormControl } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { InputMoney } from '../ui/inputMoney'

const productSchema = z
  .object({
    audienceAgeFrom: z
      .number({
        required_error: 'Obrigatório',
        invalid_type_error: 'Obrigatório',
      })
      .min(1, { message: 'Mínimo 1 ano' })
      .max(100, { message: 'Máximo 100 anos' }),

    audienceAgeTo: z
      .number({
        required_error: 'Obrigatório',
        invalid_type_error: 'Obrigatório',
      })
      .min(1, { message: 'Mínimo 1 ano' })
      .max(100, { message: 'Máximo 100 anos' }),

    audienceMainInterest: z
      .string()
      .min(1, { message: 'O principal interesse do público é obrigatório' })
      .max(100, {
        message: 'O principal interesse deve ter no máximo 100 caracteres',
      }),

    audienceAverageIncome: z.number().optional(),
  })
  .refine(
    data =>
      data.audienceAgeFrom !== undefined &&
      data.audienceAgeTo !== undefined &&
      data.audienceAgeFrom <= data.audienceAgeTo,
    {
      path: ['audienceAgeTo'],
      message: 'Idade final deve ser maior ou igual à inicial',
    },
  )

export type ProductInfosPublic = z.infer<typeof productSchema>

export const StepCreateProductPublic = ({
  handleSubmit,
  isPending,
}: {
  handleSubmit: (data: ProductInfosPublic) => void
  isPending?: boolean
}) => {
  const form = useForm<ProductInfosPublic>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      audienceAgeFrom: undefined,
      audienceAgeTo: undefined,
      audienceMainInterest: '',
      audienceAverageIncome: undefined,
    },
  })

  const onSubmit = (data: ProductInfosPublic) => {
    handleSubmit(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[800px] mx-auto flex flex-col gap-4 p-6 bg-white rounded-md"
      >
        <h2 className="text-center text-2xl mb-4">Defina um público-alvo</h2>

        <div className="flex text-left flex-col gap-5 md:flex-row">
          <div className="flex flex-col w-full gap-2">
            <FormLabel>Faixa etária</FormLabel>
            <div className="flex items-start gap-2">
              <FormField
                control={form.control}
                name="audienceAgeFrom"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="de"
                        max={100}
                        value={field.value ?? ''}
                        onChange={e =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined,
                          )
                        }
                      />
                    </FormControl>
                    {form.formState.errors.audienceAgeFrom && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.audienceAgeFrom.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="audienceAgeTo"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="até"
                        max={100}
                        value={field.value ?? ''}
                        onChange={e =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined,
                          )
                        }
                      />
                    </FormControl>
                    {form.formState.errors.audienceAgeTo && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.audienceAgeTo.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="audienceMainInterest"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Interesse principal</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {form.formState.errors.audienceMainInterest && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.audienceMainInterest.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="audienceAverageIncome"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Renda média (opcional)</FormLabel>
                <FormControl>
                  <InputMoney
                    value={
                      typeof field.value === 'number' ? field.value : undefined
                    }
                    onChange={(val: number) => field.onChange(val)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={isPending}
          type="submit"
          className="w-[130px] mx-auto font-bold mt-4"
        >
          Próximo
        </Button>
      </form>
    </Form>
  )
}
