import { Kanban } from '@/components/kanban/kanban'
import { PageHeader } from '@/components/layout/pageHeader'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Page() {
  return (
    <div className="flex flex-col gap-7.5">
      <div className="flex justify-between">
        <PageHeader pageTitle="Curso online abc" />
        <Button className="w-max min-w-max py-3 h-max font-bold">
          Adicionar tarefa
        </Button>
      </div>
      <div className="flex flex-col">
        <Tabs defaultValue="kanban">
          <TabsList>
            <TabsTrigger value="kanban">Quadros</TabsTrigger>
            <TabsTrigger value="password">Cronograma</TabsTrigger>
          </TabsList>
          <TabsContent value="kanban">
            <Kanban />
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
