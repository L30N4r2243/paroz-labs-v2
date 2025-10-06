import { useState } from "react"

export default function ChatInput() {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (!message.trim()) return
    alert("Mensaje enviado: " + message) // 🚀 después se conecta al backend
    setMessage("")
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Escribe tu mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-1 border rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
      >
        ➤
      </button>
    </div>
  )
}