import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QR Code Generator',
  description: 'Generate QR codes for any URL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
