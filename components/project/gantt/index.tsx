'use client'

import { useEffect, useRef, useState } from 'react'
import './styles.scss'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import 'dhtmlx-gantt'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { FaArrowLeft } from 'react-icons/fa6'
import { LuCalendar, LuUser } from 'react-icons/lu'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { PiSpinnerBold } from 'react-icons/pi'
import Image from 'next/image'

export const GanttChart = () => {
  const ganttContainer = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const [openSidebar, setOpenSidebar] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gantt = (window as any).gantt
    if (!ganttContainer.current) return

    gantt.attachEvent('onTaskClick', function () {
      //const task = gantt.getTask(id)
      setOpenSidebar(true)
      return true
    })

    gantt.config.drag_links = false
    gantt.config.drag_move = false
    gantt.config.drag_resize = false
    gantt.config.drag_progress = false
    gantt.config.lightbox = null
    gantt.config.columns = []

    const today = new Date()
    const addDays = (date: Date, days: number) => {
      const copy = new Date(date)
      copy.setDate(copy.getDate() + days)
      return copy
    }

    gantt.locale = {
      date: {
        month_full: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ],
        month_short: [
          'Jan',
          'Fev',
          'Mar',
          'Abr',
          'Mai',
          'Jun',
          'Jul',
          'Ago',
          'Set',
          'Out',
          'Nov',
          'Dez',
        ],
        day_full: [
          'Domingo',
          'Segunda-feira',
          'Terça-feira',
          'Quarta-feira',
          'Quinta-feira',
          'Sexta-feira',
          'Sábado',
        ],
        day_short: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      },
      labels: {
        new_task: 'Nova tarefa',
        dhx_cal_today_button: 'Hoje',
        day_tab: 'Dia',
        week_tab: 'Semana',
        month_tab: 'Mês',
        section_description: 'Descrição',
        section_time: 'Período',
        section_type: 'Tipo',
        icon_save: 'Salvar',
        icon_cancel: 'Cancelar',
        icon_details: 'Detalhes',
        icon_edit: 'Editar',
        icon_delete: 'Excluir',
        confirm_closing: 'Tem certeza que deseja fechar?',
        confirm_deleting: 'Tem certeza que deseja excluir?',
        progress: 'Progresso',
      },
    }

    const tasks = [
      {
        id: 1,
        text: 'Projeto Principal',
        start_date: today,
        end_date: addDays(today, 15),
        progress: 0,
      },
      {
        id: 2,
        text: 'Planejamento',
        start_date: addDays(today, 0),
        end_date: addDays(today, 3),
        progress: 0,
      },
      {
        id: 3,
        text: 'Design',
        start_date: addDays(today, 3),
        end_date: addDays(today, 7),
        progress: 0,
      },
      {
        id: 4,
        text: 'Desenvolvimento Frontend',
        start_date: addDays(today, 4),
        end_date: addDays(today, 6),
        progress: 0,
      },
      {
        id: 5,
        text: 'Desenvolvimento Backend',
        start_date: addDays(today, 4),
        end_date: addDays(today, 12),
        progress: 0,
      },
      {
        id: 6,
        text: 'Testes',
        start_date: addDays(today, 12),
        end_date: addDays(today, 15),
        progress: 0,
      },
      {
        id: 7,
        text: 'Deploy',
        start_date: addDays(today, 15),
        end_date: addDays(today, 16),
        progress: 0,
      },
      {
        id: 8,
        text: 'Documentação',
        start_date: addDays(today, 5),
        end_date: addDays(today, 14),
        progress: 0,
      },
      {
        id: 9,
        text: 'Task entre meses',
        start_date: new Date(today.getFullYear(), today.getMonth(), 25),
        end_date: new Date(today.getFullYear(), today.getMonth() + 1, 5),
        progress: 0,
      },
    ]

    gantt.init(ganttContainer.current)
    gantt.parse({ data: tasks })

    const rowHeight = gantt.config.row_height || 30
    const totalHeight = tasks.length * rowHeight + 52
    ganttContainer.current.style.height = `${totalHeight}px`

    return () => {
      gantt.clearAll()
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setOpenSidebar(false)
      }
    }

    if (openSidebar) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openSidebar])

  return (
    <div className="w-full">
      <Drawer
        open={openSidebar}
        onOpenChange={setOpenSidebar}
        direction="right"
      >
        <DrawerContent
          ref={drawerRef}
          className="flex bg-transparent border-none justify-start items-end h-full"
        >
          <div className="flex flex-col w-full p-7.5 gap-7.5 items-start max-w-[700px] bg-white h-full">
            <div className="flex items-center gap-7.5">
              <FaArrowLeft
                size={24}
                className="cursor-pointer"
                onClick={() => setOpenSidebar(false)}
              />
              <h3 className="text-2xl">Criativos de Captação</h3>
            </div>
            <div className="flex gap-5 flex-col">
              <div className="flex items-center gap-2">
                <div className="flex items-center min-w-[200px] text-third text-sm gap-4">
                  <LuCalendar size={18} />
                  Responsável
                </div>
                <p className="text-sm flex items-center gap-1">
                  30 de novembro de 2024 <IoIosArrowRoundForward size={16} /> 5
                  de novembro de 2024
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center min-w-[200px] text-third text-sm gap-4">
                  <LuUser size={18} />
                  Responsável
                </div>
                <p className="text-sm">Gustavo Ferreira</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center min-w-[200px] text-third text-sm gap-4">
                  <PiSpinnerBold size={18} />
                  Status
                </div>
                <div className="text-sm bg-done p-1 rounded-md">Feito</div>
              </div>
            </div>
            <div className="border-t w-full border-border-primary">
              <div className="flex gap-2 items-start py-2.5">
                <div className="relative gap-2 h-6 w-6 overflow-hidden rounded-full">
                  <Image
                    src={'/user-avatar-example.png'}
                    alt={'user'}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <textarea
                  className="bg-none placeholder:text-four h-auto max-h-[300px] outline-none focus:outline-none rounded-none text-sm border-none p-0 w-full resize-none"
                  placeholder="Adicionar um comentário"
                  rows={1}
                />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <div ref={ganttContainer} className="w-full h-full gantt" />
    </div>
  )
}
