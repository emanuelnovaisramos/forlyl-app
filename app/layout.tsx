import type { Metadata } from 'next'
import './globals.css'
import { Sora } from 'next/font/google'

const sora = Sora({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
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
        {children}
      </body>
    </html>
  )
}
