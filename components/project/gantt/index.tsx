'use client'

import { useEffect, useRef } from 'react'
import './styles.scss'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import 'dhtmlx-gantt'

export const GanttChart = () => {
  const ganttContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gantt = (window as any).gantt
    if (!ganttContainer.current) return

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
    const totalHeight = tasks.length * rowHeight + 51
    ganttContainer.current.style.height = `${totalHeight}px`

    return () => {
      gantt.clearAll()
    }
  }, [])

  return (
    <div className="w-full">
      <div ref={ganttContainer} className="w-full h-full gantt" />
    </div>
  )
}
