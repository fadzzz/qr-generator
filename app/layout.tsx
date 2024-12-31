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
        <script src="https://www.paypal.com/sdk/js?client-id=AZJMNaMGbxHGi1_tOKNtSugbpxsJT-VIwn56VOD5bq73he6GTTMbubUnbkJH0AvosMiE_2BuLrnQd0Ew&currency=CAD"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
