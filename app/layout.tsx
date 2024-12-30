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
        <script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
