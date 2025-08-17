'use client'
import { PageHeader } from '@/components/layout/pageHeader'
import { GanttChart } from '@/components/project/gantt'
import { Kanban } from '@/components/project/kanban/kanban'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const view = searchParams.get('ver')
  const [tabValue, setTabValue] = useState(view || 'quadro')

  useEffect(() => {
    if (view) {
      setTabValue(view)
    }
  }, [view])

  const handleTabChange = (value: string) => {
    setTabValue(value)
    const params = new URLSearchParams(window.location.search)
    params.set('ver', value)
    router.replace(`${window.location.pathname}?${params.toString()}`)
  }

  return (
    <div className="flex w-full flex-col gap-7.5 p-7.5">
      <div className="flex justify-between">
        <PageHeader pageTitle="Curso online abc" />
        <Button className="w-max min-w-max py-3 h-max font-bold">
          Adicionar tarefa
        </Button>
      </div>
      <div className="flex flex-col">
        <Tabs value={tabValue} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="quadro">Quadros</TabsTrigger>
            <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
          </TabsList>
          <TabsContent value="quadro">
            <Kanban />
          </TabsContent>
          <TabsContent value="cronograma">
            <GanttChart />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
