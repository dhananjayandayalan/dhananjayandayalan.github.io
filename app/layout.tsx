import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Dhananjayan D - Portfolio',
  description: 'Portfolio showcasing my work and experience',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 md:px-6 lg:px-8">
              {children}
            </main>
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
