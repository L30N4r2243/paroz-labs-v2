"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import ChatMessages from "./ChatMessages"
import ChatInput from "./ChatInput"

export default function Chatbot() {
  const [open, setOpen] = useState(false)

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
            <div className="flex justify-between items-center px-4 py-3 bg-blue-600 text-white">
              <h2 className="font-semibold">Paroz Labs AI 🤖</h2>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <ChatMessages />
            </div>

            {/* Input */}
            <div className="border-t p-3 bg-white">
              <ChatInput />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante (cambia de icono según estado) */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
      >
        {open ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  )
}
