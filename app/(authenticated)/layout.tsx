'use client'

import { usePathname } from 'next/navigation'
import { Nav } from '@/components/layout/nav'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const withoutNavRoutes = ['/boas-vindas']

  const Content = withoutNavRoutes.includes(pathname) ? (
    children
  ) : (
    <Nav>{children}</Nav>
  )

  return Content
}
