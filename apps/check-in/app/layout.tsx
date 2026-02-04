import { Geist, Geist_Mono } from "next/font/google"

import "@coderina-ams/ui/globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@coderina-ams/ui/components/sonner"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: 'CheckIn - Coderina EventHub',
  description: 'Discover and register for upcoming events, programs, and workshops',
  creator: 'Dynage Technologies',
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

          {children}</Providers>
      </body>
    </html>
  )
}
