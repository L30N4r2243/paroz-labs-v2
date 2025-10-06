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
      <head>
        {/* ✅ Agregá el link de Bootstrap Icons aquí */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
        />
      </head>
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  )
}
