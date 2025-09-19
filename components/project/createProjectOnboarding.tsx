'use client'
import { useState } from 'react'
import { useToast } from '@/domains/toasterProvider'
import { useRouter } from 'next/navigation'
import { HOME_ROUTE } from '@/constants/mainRoutes'
import { StepCreateProductWelcome } from './stepCreateProjectWelcome'
import { StepCreateProductPhases } from './stepCreateProjectPhases'
import {
  ProjectInfosPublic,
  StepCreateProjectPublic,
} from './stepCreateProjectPublic'
import { ProjectInfos, StepCreateProjectInfos } from './stepCreateProjecIinfos'
import {
  CreateProjectParams,
  CreateProjectPhase,
  useCreateProject,
} from '@/api/project/createProject'
import { Project } from '@/types/project'

export const CreateProjectOnboarding = ({
  isFirst = false,
  callBackCreate
}: {
  isFirst?: boolean
  callBackCreate?: (project: Project) => void
}) => {
  const { mutateAsync: createProject, isPending: isPendingCreate } =
    useCreateProject()
  const { showToast } = useToast()
  const [productInfos, setProductInfos] = useState<ProjectInfos>()
  const [productInfosPublic, setProductInfosPublic] =
    useState<ProjectInfosPublic>()
  const [currentStep, setCurrentStep] = useState(isFirst ? 1 : 2)
  const route = useRouter()
  const [isRedirect, setIsRedirect] = useState(false)

  const handleNext = () => setCurrentStep(prev => prev + 1)

  const handleSubmit = async ({
    createProjectParams,
  }: {
    createProjectParams: CreateProjectParams
  }) => {
    if (!productInfos || !productInfosPublic) return

    await createProject(createProjectParams)
      .then((res) => {
        showToast({
          message: 'Produto criado com sucesso!',
          type: 'success',
        })
        if (isFirst) {
          route.push(HOME_ROUTE)
          setIsRedirect(true)
        }
        if(callBackCreate){
          callBackCreate(res)
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
      <StepCreateProjectInfos
        handleSubmit={data => {
          setProductInfos(data)
          handleNext()
        }}
      />
    ),
    3: (
      <StepCreateProjectPublic
        handleSubmit={data => {
          setProductInfosPublic(data)
          handleNext()
        }}
        isPending={isPendingCreate || isRedirect}
      />
    ),
    4: (
      <StepCreateProductPhases
        handleSubmit={(data: CreateProjectPhase[]) => {
          if (productInfos?.name && productInfosPublic) {
            handleSubmit({
              createProjectParams: {
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
        isPending={isPendingCreate || isRedirect}
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
        {isFirst ? currentStep : currentStep - 1}/{totalSteps}
      </div>
    </div>
  )
}
