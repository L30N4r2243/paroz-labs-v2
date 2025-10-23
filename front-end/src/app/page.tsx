"use client";

import { Inter, Poppins } from "next/font/google";
import { useState, useRef, useEffect } from "react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"] });

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full bg-blue/40 backdrop-blur-md z-30 ${inter.className}`}
      >
        <div className="max-w-[1920px] mx-auto flex justify-between items-center py-3 sm:py-4 lg:py-5 xl:py-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 text-white">
          {/* Logo textual */}
          <span className={`flex items-center ${poppins.className}`}>
            <img
              src="/image.png"
              alt=""
              className="w-20 h-auto xs:w-24 sm:w-28 md:w-32 lg:w-40 xl:w-48 2xl:w-56 object-contain"
            />
          </span>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-10 2xl:space-x-12 text-sm xl:text-base 2xl:text-lg">
            <a href="#inicio" className="hover:text-blue-400 transition-colors">
              Inicio
            </a>
            <a href="#servicios" className="hover:text-blue-400 transition-colors">
              Servicios
            </a>
            <a href="#nosotros" className="hover:text-blue-400 transition-colors">
              Nosotros
            </a>
            <a href="#contacto" className="hover:text-blue-400 transition-colors">
              Contacto
            </a>
          </nav>

          {/* Botón Hamburguesa Mobile */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Menú Mobile */}
        <nav
          className={`lg:hidden bg-black/95 backdrop-blur-md overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-64" : "max-h-0"
          }`}
        >
          <div className="flex flex-col space-y-4 px-4 py-6">
            <a
              href="#inicio"
              onClick={closeMenu}
              className="text-white hover:text-blue-400 transition-colors text-base sm:text-lg"
            >
              Inicio
            </a>
            <a
              href="#servicios"
              onClick={closeMenu}
              className="text-white hover:text-blue-400 transition-colors text-base sm:text-lg"
            >
              Servicios
            </a>
            <a
              href="#nosotros"
              onClick={closeMenu}
              className="text-white hover:text-blue-400 transition-colors text-base sm:text-lg"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              onClick={closeMenu}
              className="text-white hover:text-blue-400 transition-colors text-base sm:text-lg"
            >
              Contacto
            </a>
          </div>
        </nav>
      </header>

      {/* Contenido principal */}
      <main
        className={`min-h-screen bg-gradient-to-b from-blue to-[#2d4a53] flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 pt-20 sm:pt-24 md:pt-28 lg:pt-32 ${inter.className}`}
        id="inicio"
      >
        <div className="max-w-[1920px] w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 items-start">
            {/* Texto */}
            <div className="text-left text-white space-y-4 lg:space-y-6">
              <h1
                className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight tracking-tight ${poppins.className}`}
              >
                Escalamos tu negocio <br />
                con <span className="text-[#396477]">Software</span> <br />
                entendiendo tu <br />
                realidad.
              </h1>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                No hacemos solo código, creamos impacto.
              </p>
            </div>

            {/* Chatbot Embebido - Desktop */}
            <div className="hidden lg:block w-full">
              <EmbeddedChatbot />
            </div>
          </div>

          {/* Chatbot Embebido - Mobile/Tablet (debajo del texto) */}
          <div className="lg:hidden w-full mt-8 sm:mt-10 md:mt-12">
            <EmbeddedChatbot />
          </div>
        </div>
      </main>

      {/* Sección de iconos con Bootstrap Icons */}
      <section className="bg-gray-50 py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 2xl:py-28 text-center" id="servicios">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 2xl:gap-20">
          <div className="flex flex-col items-center text-gray-700 space-y-3 lg:space-y-4 xl:space-y-5">
            <i className="bi bi-award text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-[#1a2f38]"></i>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed max-w-md">
              Con más de 15 años en la industria del software, contamos con
              experiencia en todo el ciclo de desarrollo, brindando soluciones
              robustas y escalables.
            </p>
          </div>

          <div className="flex flex-col items-center text-gray-700 space-y-3 lg:space-y-4 xl:space-y-5">
            <i className="bi bi-people text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-[#1a2f38]"></i>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed max-w-md">
              Trabajamos en estrecha colaboración con nuestros clientes,
              entendiendo su negocio y necesidades para ofrecer resultados
              realmente efectivos.
            </p>
          </div>

          <div className="flex flex-col items-center text-gray-700 space-y-3 lg:space-y-4 xl:space-y-5">
            <i className="bi bi-rocket-takeoff text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-[#1a2f38]"></i>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed max-w-md">
              Diseñamos soluciones a medida que se adaptan perfectamente a cada
              cliente, maximizando el valor entregado y el impacto del producto
              final.
            </p>
          </div>
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-gray-900 mt-12 lg:mt-16 xl:mt-20 2xl:mt-24 px-4 sm:px-6">
          ¿Listo para impulsar tu empresa con nuestros servicios?
        </h2>
      </section>

      <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 text-gray-800" id="nosotros">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
          {/* Texto */}
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-[cursive] text-black">
              Nuestra Filosofía
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              Nos sentimos socios de quienes confían en nosotros, no simples ejecutores.
              Buscamos generar impacto real armando equipos de alto rendimiento que
              piensen junto al cliente, no por él. Creemos que la comprensión profunda
              del negocio es nuestra carta maestra: antes de escribir una sola línea de
              código, nos aseguramos de entender el "para qué".
            </p>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              Internamente trabajamos en squads ágiles y multidisciplinarios, lo que
              nos permite adaptarnos rápido, colaborar de forma eficiente y construir
              soluciones que funcionan desde el día uno.
            </p>
          </div>

          {/* Imagen */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/logo-sin-fondo.png"
              alt="Ilustración filosofía Paroz Labs"
              className="w-48 xs:w-56 sm:w-64 md:w-80 lg:w-96 xl:w-[420px] 2xl:w-[500px] object-contain"
            />
          </div>
        </div>

        {/* Subtítulo */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20 xl:mt-24 2xl:mt-28 px-4 space-y-6 lg:space-y-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold text-gray-900">
            ¿Te gustaría trabajar con nosotros?
          </h3>

          {/* Botón de LinkedIn */}
          <a
            href="https://www.linkedin.com/company/parozlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 lg:gap-3 bg-[#0A66C2] text-white font-medium px-5 sm:px-6 lg:px-8 xl:px-10 py-2.5 sm:py-3 lg:py-3.5 xl:py-4 rounded-lg hover:bg-[#084b92] transition text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
          >
            <i className="bi bi-linkedin text-xl sm:text-2xl lg:text-3xl xl:text-4xl bg-blue text-[#ffffff] rounded"></i>
            Seguinos en LinkedIn
          </a>
        </div>
      </section>

      {/* Sección de Contacto */}
<section className={`min-h-screen bg-[#1a2f38] flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 text-white ${inter.className}`} id="contacto">        <div className="max-w-[1920px] mx-auto w-full space-y-8 lg:space-y-12 xl:space-y-16">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 lg:mb-5">Contáctanos</h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed max-w-4xl">
              Estamos listos para ayudarte a llevar tu negocio al siguiente nivel.
              Ponte en contacto con nosotros y conversemos sobre tus necesidades tecnológicas.
            </p>
          </div>

          {/* Cuadros de contacto */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 2xl:gap-10">
            {/* Email */}
            <div className="bg-[#294152] p-5 sm:p-6 lg:p-7 xl:p-8 2xl:p-10 rounded-2xl flex flex-col items-center justify-center space-y-2 lg:space-y-3 hover:bg-[#345566] transition-colors">
              <i className="bi bi-envelope-fill text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white"></i>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold">Email</h3>
              <p className="text-gray-200 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-center break-all">hola@parozlabs.com</p>
            </div>

            {/* Agenda */}
            <div className="bg-[#294152] p-5 sm:p-6 lg:p-7 xl:p-8 2xl:p-10 rounded-2xl flex flex-col items-center justify-center space-y-2 lg:space-y-3 hover:bg-[#345566] transition-colors">
              <i className="bi bi-calendar-event-fill text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white"></i>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold">Agenda</h3>
              <p className="text-gray-200 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-center">Agenda una cita sin compromiso</p>
            </div>

            {/* LinkedIn */}
            <div className="bg-[#294152] p-5 sm:p-6 lg:p-7 xl:p-8 2xl:p-10 rounded-2xl flex flex-col items-center justify-center space-y-2 lg:space-y-3 hover:bg-[#345566] transition-colors">
              <i className="bi bi-linkedin text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white"></i>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold">LinkedIn</h3>
              <a
                href="https://www.linkedin.com/company/parozlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl"
              >
                Paroz Labs
              </a>
            </div>

            {/* Ubicación */}
            <div className="bg-[#294152] p-5 sm:p-6 lg:p-7 xl:p-8 2xl:p-10 rounded-2xl flex flex-col items-center justify-center space-y-2 lg:space-y-3 hover:bg-[#345566] transition-colors">
              <i className="bi bi-geo-alt-fill text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white"></i>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold">Ubicación</h3>
              <p className="text-gray-200 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl leading-relaxed text-center">
                Avenida España 263,<br />
                Ciudad de Mendoza,<br />
                Argentina
              </p>
            </div>
          </div>

          {/* Footer inferior */}
          <footer className="text-gray-400 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-center lg:text-left pt-8">
            © 2025 <span className="text-white font-semibold">Paroz Labs</span> — Todos los derechos reservados
          </footer>
        </div>
      </section>
    </>
  );
}

/// Función para formatear texto con **negritas**, enlaces y salto de línea antes de links
function formatMessageWithLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      // Es un enlace → agregar salto de línea antes
      return (
        <span key={`link-${i}`}>
          <br />
          <a
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline break-all"
          >
            {part}
          </a>
        </span>
      );
    } else {
      // Manejar **negritas**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const boldParts = part.split(boldRegex);

      return boldParts.map((boldPart, j) => {
        if (j % 2 === 1) {
          return (
            <strong key={`bold-${i}-${j}`} className="font-semibold text-[#1a2f38]">
              {boldPart}
            </strong>
          );
        } else {
          return <span key={`text-${i}-${j}`}>{boldPart}</span>;
        }
      });
    }
  });
}



// Componente de Chatbot Embebido para Desktop
function EmbeddedChatbot() {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "👋 ¡Hola! Soy la RozLab. ¿Cómo puedo ayudarte?",
      },
    ]);
  }, []);

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
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: message }]);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: message }],
        }),
      });

      const data = await res.json();
      const reply = data.message || "No hubo respuesta del servidor.";

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error("Error al conectar con el backend:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error al conectar con el servidor." },
      ]);
    }
  };

  return (
    <div className="w-full h-[22rem] lg:h-[26rem] xl:h-[26rem] 2xl:h-[36rem] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 relative lg:mt-0">
      {/* Logo de fondo */}
      <div 
        className="absolute inset-0 opacity-[0.4] pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/logo-sin-fondo.png')",
          backgroundSize: "80%",
          backgroundPosition: "center 30%"
        }}
      />

      {/* Mensajes */}
      <div
        ref={chatContainerRef}
        className="flex flex-col flex-1 overflow-y-auto px-4 sm:px-5 lg:px-6 xl:px-7 py-4 lg:py-5 space-y-3 lg:space-y-4 relative z-10"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] lg:max-w-xs xl:max-w-md 2xl:max-w-lg px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-sm ${
                msg.sender === "user"
                  ? "bg-[#1a2f38] text-white rounded-br-sm"
                  : "bg-white text-gray-800 rounded-bl-sm border border-gray-200 shadow-sm"
              }`}
            >
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl leading-relaxed whitespace-pre-wrap break-words" style={{ lineHeight: '1.8' }}>
                {formatMessageWithLinks(msg.text)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 sm:px-5 lg:px-6 xl:px-7 py-3 sm:py-4 bg-white border-t border-gray-200 relative z-10">
        <EmbeddedChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

// Input del chat embebido
function EmbeddedChatInput({ onSendMessage }: { onSendMessage: (msg: string) => void }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Escribe tu mensaje aquí..."
        className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1a2f38] focus:border-transparent placeholder:text-gray-500 text-xs sm:text-sm lg:text-base xl:text-lg"
      />
      <button
        onClick={(e) => handleSubmit(e as any)}
        className="bg-[#1a2f38] text-white rounded-br-sm rounded-full p-2 sm:p-2.5 lg:p-3 hover:bg-[#16232a] transition disabled:opacity-50 flex items-center justify-center"
        disabled={!input.trim()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>
    </div>
  );
}