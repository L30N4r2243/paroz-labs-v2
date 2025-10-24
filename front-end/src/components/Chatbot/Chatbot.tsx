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

// Función para detectar y convertir URLs en enlaces
function formatMessageWithLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 underline break-all"
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // 🔍 Detectar scroll para mostrar/ocultar el botón
  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el botón después de scrollear 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    if (chatContainerRef.current && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === "bot") {
        setTimeout(() => {
          if (chatContainerRef.current) {
            const container = chatContainerRef.current;
            const lastMessageElement = container.lastElementChild as HTMLElement;
            if (lastMessageElement) {
              const containerRect = container.getBoundingClientRect();
              const messageRect = lastMessageElement.getBoundingClientRect();
              const scrollOffset = messageRect.top - containerRect.top + container.scrollTop;
              container.scrollTo({ top: scrollOffset, behavior: "smooth" });
            }
          }
        }, 100);
      } else {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
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

  // No mostrar nada si no es visible (excepto en mobile)
  if (!isVisible) {
    return (
      <div className="md:hidden fixed bottom-5 right-5 z-50">
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

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Panel del chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
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
              className="flex flex-col flex-1 overflow-y-auto bg-gray-50 scroll-smooth p-4 space-y-3"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
                    }`}
                  >
                    <p 
                      className="text-sm whitespace-pre-wrap break-words" 
                      style={{ lineHeight: '1.8' }}
                    >
                      {formatMessageWithLinks(msg.text)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t p-3 bg-white">
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    
    </div>
  )
}