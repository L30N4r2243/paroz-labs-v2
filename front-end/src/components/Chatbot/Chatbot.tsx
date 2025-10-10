"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowUp } from "lucide-react"
import ChatMessages from "./ChatMessages"
import ChatInput from "./ChatInput"

interface Message {
  sender: "user" | "bot"
  text: string
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // 👋 Mensaje inicial al abrir el chat
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "👋 ¡Hola! Soy la IA de Paroz Labs. ¿Cómo puedo ayudarte?",
        },
      ])
    }
  }, [open])

  // 🧩 Scroll automático al final al agregar mensajes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    setMessages((prev) => [...prev, { sender: "user", text: message }])

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: message }],
        }),
      })

      const data = await res.json()
      console.log(data)
      const reply = data.message || "No hubo respuesta del servidor."

      setMessages((prev) => [...prev, { sender: "bot", text: reply }])
    } catch (err) {
      console.error("Error al conectar con el backend:", err)
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error al conectar con el servidor." },
      ])
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Panel del chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mb-3 w-80 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 bg-blue-800 text-white">
              <h2 className="font-semibold">Paroz Labs AI</h2>
              <button onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Contenedor general con scroll (único) */}
            <div
              ref={chatContainerRef}
              className="flex flex-col flex-1 overflow-y-auto bg-gray-50 scroll-smooth"
            >
              <ChatMessages messages={messages} />
            </div>

            {/* Input */}
            <div className="border-t p-3 bg-white">
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`transition-all duration-300 shadow-lg ${
          open
            ? "h-14 w-14 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
            : "flex items-center gap-3 px-4 py-2 bg-[#0a093d] text-white rounded-full hover:bg-[#14126d]"
        }`}
      >
        {open ? (
          <X size={26} />
        ) : (
          <>
            <div className="bg-white rounded-full p-1 w-8 h-8 flex items-center justify-center">
              <img
                src="/logo-sin-fondo.png"
                alt="Logo Paroz Labs"
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="font-medium text-sm whitespace-nowrap">
              Paroz Labs AI
            </span>
            <ArrowUp size={18} className="ml-1" />
          </>
        )}
      </motion.button>
    </div>
  )
}
