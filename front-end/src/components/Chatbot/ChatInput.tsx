"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import useAutosize from "@/hooks/useAutosize"
import { ArrowUp } from "lucide-react"

interface ChatInputProps {
  // tu onSendMessage puede ser async (por eso Promise<any>)
  onSendMessage: (message: string) => Promise<any> | void
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const controls = useAnimation()

  // ajusta el alto según el contenido
  useAutosize(textareaRef, message)

  // foco inicial
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  // si termina la "carga" (respuesta), aseguramos foco
  useEffect(() => {
    if (!loading) textareaRef.current?.focus()
  }, [loading])

  const handleSend = async () => {
    if (!message.trim() || loading) return

    const textToSend = message.trim()

    setLoading(true)

    // limpiamos el textarea inmediatamente y volvemos a enfocar.
    // NO deshabilitamos el textarea para evitar perder foco.
    setMessage("")
    requestAnimationFrame(() => {
      const el = textareaRef.current
      if (el) {
        el.focus()
        // caret al final (en este caso value = "" pero lo dejo por si cambias)
        el.selectionStart = el.selectionEnd = el.value.length
      }
    })

    // animación de rebote al botón
    controls.start({
      y: [0, -10, 3, 0],
      transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
    })

    try {
      await onSendMessage(textToSend)
    } catch (err) {
      console.error("Error en onSendMessage:", err)
    } finally {
      setLoading(false)
      // asegurar foco cuando termina todo
      requestAnimationFrame(() => textareaRef.current?.focus())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex gap-2 items-end">
      <textarea
        ref={textareaRef}
        placeholder="Escribe tu mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        className="flex-1 resize-none border rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-40 overflow-y-auto"
        // <- NO disabled aquí, así siempre podés escribir
      />

      <motion.button
        animate={controls}
        onClick={handleSend}
        whileTap={{ scale: 0.96 }}
        disabled={loading || !message.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Enviar mensaje"
      >
        {loading ? "..." : <ArrowUp className="w-4 h-4" />}
      </motion.button>
    </div>
  )
}
