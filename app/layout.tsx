import type { Metadata } from 'next'
import './globals.css'
import { Sora } from 'next/font/google'
import QueryProvider from '@/domains/queryProvider'
import { ToastProvider } from '@/domains/toasterProvider'
import { AuthProvider } from '@/contexts/authContext'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const sora = Sora({
  variable: '--font-primary',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
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
      <body className={`${sora.variable} min-h-screen`}>
        <QueryProvider>
          <ToastProvider>
            <AuthProvider>{children}</AuthProvider>
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
