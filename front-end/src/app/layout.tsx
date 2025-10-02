import "./globals.css"
import type { Metadata } from "next"
import Chatbot from "../components/Chatbot/Chatbot"

export const metadata: Metadata = {
  title: "Paroz Labs",
  description: "Renovación Web con IA Conversacional",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  )
}
