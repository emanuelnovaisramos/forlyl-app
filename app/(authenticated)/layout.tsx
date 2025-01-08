import { Nav } from '@/components/layout/nav'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Nav>{children}</Nav>
}
