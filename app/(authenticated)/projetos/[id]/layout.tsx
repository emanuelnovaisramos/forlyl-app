'use client'

import Link from 'next/link'
import { usePathname, useParams, useSearchParams } from 'next/navigation'

const routes = [
  { route: 'painel', name: 'Painel do projeto' },
  { route: 'tarefas?ver=quadro', name: 'Quadro de tarefas' },
  { route: 'tarefas?ver=cronograma', name: 'Cronograma' },
  { route: 'calendario', name: 'Calendário de posts' },
  { route: 'relatorios', name: 'Relatório de métricas' },
  { route: 'anuncios', name: 'Organizador de anúncios' },
]

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const params = useParams()
  const projectId = params?.id

  if (!projectId) return null

  return (
    <div className="flex w-full h-full relative overflow-hidden">
      <nav className="flex flex-col gap-7.5 px-7.5 py-10 min-w-[270px] bg-background-five">
        {routes.map(route => {
          const href = `/projetos/${projectId}/${route.route}`
          const [hrefPath, queryString] = href.split('?')
          const hrefQuery = queryString?.split('=')[1]

          const isActive =
            hrefPath === pathName &&
            (hrefQuery === undefined || hrefQuery === searchParams.get('ver'))

          return (
            <Link
              key={route.route}
              href={href}
              className={`${isActive ? 'font-bold' : ''} flex items-center gap-2`}
            >
              {route.name}
            </Link>
          )
        })}
      </nav>
      <main className="flex-1 h-full overflow-auto">
        {children}
      </main>
    </div>
  )
}
