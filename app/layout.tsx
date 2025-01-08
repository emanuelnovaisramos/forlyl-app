import type { Metadata } from 'next'
import './globals.scss'
import { Sora } from 'next/font/google'

const sora = Sora({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Forlyl',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${sora.className} min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
