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
      <head>
        <script src="https://www.paypal.com/sdk/js?client-id=Ab0sCYKHsN6ag8_8PauA21Jh420ezr1kvN6PgcVDuiYpfpBIX2xLDcMkU1xfRRv6n8eDXr5TyGNbiqAi&currency=CAD"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
