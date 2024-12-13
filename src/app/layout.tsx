import type { Metadata } from "next"
import localFont from "next/font/local"
import MainMenu from "@/components/shared/MainMenu"
import { ThemeModeScript } from "flowbite-react"
import Providers from "@/components/shared/Providers"
import dynamic from "next/dynamic"
import "./globals.css"

const TostifyDynamic = dynamic(() => import("@/components/shared/Tostify"), { ssr: true })
const ScreenSizeOverlayDynamic = dynamic(() => import("screen-size-overlay").then((module) => module.ScreenSizeOverlay))

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Recipes",
  description: "Recipes App",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Providers>
          <header className="bg-gray-200 dark:bg-gray-600 text-white p-2">
            <MainMenu />
          </header>

          <main className="flex-grow p-4">{children}</main>
          <footer className="bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-white p-4 text-center text-balance">
            © 2024 Все права защищены
          </footer>
        </Providers>
        <TostifyDynamic />
        {process.env.NODE_ENV === "development" && <ScreenSizeOverlayDynamic />}
      </body>
    </html>
  )
}
