import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import ClientLoader from '@/components/ClientLoader'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Jaswant Soni | Frontend Developer',
  description: 'Portfolio of Jaswant Soni - Frontend / React Developer | MERN Stack | EdTech',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <ClientLoader>
          {children}
        </ClientLoader>
        <Toaster />
      </body>
    </html>
  )
}
