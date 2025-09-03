'use client'
import { useState } from 'react'
import { StepCreateProductWelcome } from './stepCreateProductWelcome'
import { ProductInfos, StepCreateProductInfos } from './stepCreateProductInfos'
import {
  ProductInfosPublic,
  StepCreateProductPublic,
} from './stepCreateProductPublic'
import { StepCreateProductPhases } from './stepCreateProductPhases'
import {
  CreateProductParams,
  CreateProjectPhase,
  useCreateProduct,
} from '@/api/product/createProduct'
import { useToast } from '@/domains/toasterProvider'
import { useRouter } from 'next/navigation'
import { HOME_ROUTE } from '@/constants/mainRoutes'

export const CreateProductOnboarding = ({
  isFirst = false,
}: {
  isFirst?: boolean
}) => {
  const { mutateAsync: createProduct, isPending: isPendingCreate } =
    useCreateProduct()
  const { showToast } = useToast()
  const [productInfos, setProductInfos] = useState<ProductInfos>()
  const [productInfosPublic, setProductInfosPublic] =
    useState<ProductInfosPublic>()
  const [currentStep, setCurrentStep] = useState(isFirst ? 1 : 2)
  const route = useRouter()

  const handleNext = () => setCurrentStep(prev => prev + 1)

  const handleSubmit = async ({
    createProductParams,
  }: {
    createProductParams: CreateProductParams
  }) => {
    if (!productInfos || !productInfosPublic) return

    await createProduct(createProductParams)
      .then(() => {
        showToast({
          message: 'Produto criado com sucesso!',
          type: 'success',
        })
        if (isFirst) {
          route.push(HOME_ROUTE)
        }
      })
      .catch(error => {
        showToast({
          message:
            error?.message ||
            'Erro ao criar produto, tente novamente mais tarde.',
          type: 'error',
        })
      })
  }

  const steps: Partial<Record<number, JSX.Element>> = {
    ...(isFirst ? { 1: <StepCreateProductWelcome onNext={handleNext} /> } : {}),
    2: (
      <StepCreateProductInfos
        handleSubmit={data => {
          setProductInfos(data)
          handleNext()
        }}
      />
    ),
    3: (
      <StepCreateProductPublic
        handleSubmit={data => {
          setProductInfosPublic(data)
          handleNext()
        }}
        isPending={isPendingCreate}
      />
    ),
    4: (
      <StepCreateProductPhases
        handleSubmit={(data: CreateProjectPhase[]) => {
          if (productInfos?.name && productInfosPublic) {
            handleSubmit({
              createProductParams: {
                ...productInfos,
                ...productInfosPublic,
                name: productInfos.name,
                phases: data,
                audienceAgeFrom: productInfosPublic?.audienceAgeFrom ?? 0,
                audienceAgeTo: productInfosPublic?.audienceAgeTo ?? 0,
                audienceAverageIncome:
                  productInfosPublic?.audienceAverageIncome ?? 0,
              },
            })
          } else {
            showToast({
              message: 'Por favor, preencha todas as informações obrigatórias.',
              type: 'error',
            })
          }
        }}
      />
    ),
  }

  const totalSteps = Object.keys(steps).length

  return (
    <div className="w-full max-w-[1040px] mx-4 relative flex justify-center items-center text-center flex-col gap-5 min-h-[70vh] bg-white rounded-md">
      <div className="flex flex-col gap-5 mb-[60px] justify-center items-center w-full">
        {steps[currentStep]}
      </div>
      <div className="flex absolute z-50 bottom-[10px] text-third">
        {currentStep}/{totalSteps}
      </div>
    </div>
  )
}
