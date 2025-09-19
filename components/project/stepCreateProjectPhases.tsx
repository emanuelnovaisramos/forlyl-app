'use client'
import { useState } from 'react'
import { DateRange } from 'react-date-range'
import pt from 'date-fns/locale/pt'
import { addDays, format, parseISO } from 'date-fns'
import { Button } from '../ui/button'
import { ModalCreatePhases } from './modalCreatePhases'
import { MdEdit } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { CreateProjectPhase } from '@/api/project/createProject'
import { HiOutlinePlusSm } from 'react-icons/hi'

export const StepCreateProductPhases = ({
  handleSubmit,
  isPending
}: {
  handleSubmit: (phases: CreateProjectPhase[]) => void
  isPending?: boolean
}) => {
  const today = new Date()
  const formatDate = (date: Date) => format(date, 'yyyy-MM-dd')
  const [editable, setEditable] = useState(false)
  const [openModalPhase, setOpenModalPhase] = useState(false)
  const [editPhase, setEditPhase] = useState<CreateProjectPhase | null>(null)
  const [phases, setPhases] = useState<CreateProjectPhase[]>([
    {
      name: 'Pré-lançamento',
      color: '#4486F4',
      startDate: formatDate(today),
      endDate: formatDate(addDays(today, 5)),
    },
    {
      name: 'Lançamento',
      color: '#EA671E',
      startDate: formatDate(addDays(today, 6)),
      endDate: formatDate(addDays(today, 15)),
    },
    {
      name: 'Etc',
      color: '#21CA32',
      startDate: formatDate(addDays(today, 16)),
      endDate: formatDate(addDays(today, 28)),
    },
    {
      name: 'Etc',
      color: '#F44444',
      startDate: formatDate(addDays(today, 29)),
      endDate: formatDate(addDays(today, 37)),
    },
    {
      name: 'Pós-lançamento',
      color: '#F4CD44',
      startDate: formatDate(addDays(today, 38)),
      endDate: formatDate(addDays(today, 45)),
    },
  ])

  const formatPhaseRange = (phases: CreateProjectPhase[]) => {
    if (!phases.length) return ''
    const first = new Date(
      Math.min(...phases.map(p => parseISO(p.startDate).getTime())),
    )
    const last = new Date(
      Math.max(...phases.map(p => parseISO(p.endDate).getTime())),
    )
    const sameYear = first.getFullYear() === last.getFullYear()
    const firstFormatted = format(first, "d 'de' MMMM", { locale: pt })
    const lastFormatted = format(
      last,
      sameYear ? "d 'de' MMMM" : "d 'de' MMMM yyyy",
      { locale: pt },
    )
    return `${firstFormatted} - ${lastFormatted}`
  }

  const handleEditPhase = (phase: CreateProjectPhase) => {
    setEditPhase(phase)
    setOpenModalPhase(true)
  }

  const handleDeletePhase = (phaseToDelete: CreateProjectPhase) => {
    setPhases(prev => prev.filter(p => p !== phaseToDelete))
  }

  const handleSavePhase = (updatedPhase: CreateProjectPhase) => {
    setPhases(prev => {
      if (editPhase) {
        return prev.map(p => (p === editPhase ? updatedPhase : p))
      }
      return [...prev, updatedPhase]
    })
    setOpenModalPhase(false)
    setEditPhase(null)
  }

  const handleClickSubmit = () => {
    handleSubmit(phases)
  }

  return (
    <div className="flex flex-col px-[50px] w-full gap-7.5 max-md:px-4">
      <ModalCreatePhases
        open={openModalPhase}
        onClose={() => {
          setOpenModalPhase(false)
          setEditPhase(null)
        }}
        onSave={handleSavePhase}
        initialData={editPhase || undefined}
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl">Seu lançamento foi definido</h2>
        <p>
          Com base no tipo de lançamento e período mais indicado, sugerimos sua
          data de lançamento.
        </p>
      </div>
      <div className="flex gap-9 items-start">
        <DateRange
          ranges={phases.map(phase => ({
            startDate: parseISO(phase.startDate),
            endDate: parseISO(phase.endDate),
          }))}
          rangeColors={phases.map(phase => phase.color)}
          locale={pt}
          monthDisplayFormat="MMMM yyyy"
          weekdayDisplayFormat="EEEEEE"
          showDateDisplay={false}
          editableDateInputs={false}
          onChange={() => {}}
          className="date-range-no-click"
          minDate={new Date()}
          maxDate={
            phases.length
              ? parseISO(phases[phases.length - 1].endDate)
              : undefined
          }
        />
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col text-left gap-2 justify-start items-start">
            <p className="text-five text-3xl">{formatPhaseRange(phases)}</p>
            {!editable && (
              <p>Data sugerida com base nas informações anteriores</p>
            )}
          </div>
          <div className="flex justify-center items-center flex-col gap-5">
            <p className="text-center">Legenda:</p>
            <div className="flex flex-wrap gap-2.5 gap-x-7.5 w-full">
              {phases.map((phase, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className="min-w-10 h-6 rounded-sm"
                    style={{ backgroundColor: phase.color }}
                  ></div>
                  <span className="text-four text-left text-sm min-w-[125px]">
                    {phase.name}
                  </span>
                  {editable && (
                    <div className="flex items-center gap-2">
                      <div
                        className="flex p-1 rounded-md border border-border-primary cursor-pointer"
                        onClick={() => handleEditPhase(phase)}
                      >
                        <MdEdit size={16} className="text-primary" />
                      </div>
                      <div
                        className="flex p-1 rounded-md border border-border-primary cursor-pointer"
                        onClick={() => handleDeletePhase(phase)}
                      >
                        <IoClose size={16} className="text-red-500" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {editable && (
                <div
                  className="flex p-1 rounded-md border border-border-primary cursor-pointer"
                  onClick={() => setOpenModalPhase(true)}
                >
                  <HiOutlinePlusSm size={16} className="text-primary" />
                </div>
              )}
            </div>
          </div>
          {!editable && (
            <div className="flex justify-start items-start flex-col">
              <p>Gostaria de outra data?</p>
              <p>
                Você pode{' '}
                <span
                  className="text-six underline cursor-pointer"
                  onClick={() => {
                    setEditable(true)
                  }}
                >
                  personalizar clicando aqui.
                </span>
              </p>
            </div>
          )}
          <Button className="w-max font-bold" onClick={handleClickSubmit} disabled={isPending}>
            Proximo
          </Button>
        </div>
      </div>
    </div>
  )
}
