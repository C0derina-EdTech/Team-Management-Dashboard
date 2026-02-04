import { Geist, Geist_Mono } from "next/font/google"

import "@coderina-ams/ui/globals.css"
import { Providers } from "@/components/providers"
import type { Metadata } from 'next'
import { Toaster } from "@coderina-ams/ui/components/sonner"


export const metadata: Metadata = {
  title: 'Coderina EventHub - Discover & Register Events',
  description: 'Discover and register for upcoming events, programs, and workshops',
  creator: 'Dynage Technologies',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>
          <Toaster richColors theme="dark" position="top-right" />
          {children}
        </Providers>

      </body>
    </html>
  )
}
