"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Navigation } from '@/components/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

            <div className="relative flex min-h-screen flex-col">

              <Navigation />

              <div className="flex-1">{children}</div>
              
            </div>
          
        </ThemeProvider>

      </body>
    </html>
  )
}
