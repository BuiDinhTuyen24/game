import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Đừng Để Tiền Rơi - Stock Market',
  description: 'Netflix Stock Market Simulation Game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="bg-gray-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}