"use client"

interface Message {
  sender: "user" | "bot"
  text: string
}

interface ChatMessagesProps {
  messages: Message[]
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-3">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`${
            msg.sender === "user"
              ? "self-end bg-blue-600 text-white"
              : "self-start bg-gray-300 text-black"
          } px-4 py-2 rounded-lg max-w-[80%] text-sm leading-snug`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  )
}
