"use client";

import { Inter, Poppins } from "next/font/google";
import { useState } from "react";

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
        className={`fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md z-50 ${inter.className}`}
      >
        <div className="max-w-8xl mx-auto flex justify-between items-center py-4 px-4 md:px-8 text-white">
          {/* Logo textual */}
          <span className={`flex items-center ${poppins.className}`}>
            <img
              src="/image.png"
              alt=""
              className="w-24 h-auto sm:w-32 md:w-40 lg:w-48 object-contain"
            />
          </span>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex space-x-8">
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
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
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
          className={`md:hidden bg-black/95 backdrop-blur-md overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-64" : "max-h-0"
          }`}
        >
          <div className="flex flex-col space-y-4 px-4 py-6">
            <a
              href="#inicio"
              onClick={closeMenu}
              className="text-white hover:text-blue-400 transition-colors text-lg"
            >
              Inicio
            </a>
            <a
              href="#servicios"
              onClick={closeMenu}
              className="text-white hover:text-blue-400 transition-colors text-lg"
            >
              Servicios
            </a>
            <a
              href="#nosotros"
              onClick={closeMenu}
              className="text-white hover:text-blue-400 transition-colors text-lg"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              onClick={closeMenu}
              className="text-white hover:text-blue-400 transition-colors text-lg"
            >
              Contacto
            </a>
          </div>
        </nav>
      </header>

      {/* Contenido principal */}
      <main
        className={`min-h-screen bg-gradient-to-b from-black to-[#0a093d] flex items-center justify-start px-6 md:px-16 pt-24 ${inter.className}`}
        id="inicio"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Texto */}
          <div className="text-left text-white">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight ${poppins.className}`}
            >
              Escalamos tu negocio <br />
              con <span className="text-blue-900">Software</span> <br />
              entendiendo tu <br />
              realidad.
            </h1>
            <p className="text-gray-300 mt-4 md:mt-6 text-base md:text-lg lg:text-xl">
              No hacemos solo código, creamos impacto.
            </p>
          </div>

          {/* Imagen a la derecha */}
          <div className="flex w-full justify-center md:justify-end mt-8 md:mt-0 md:pr-10">
            <img
              src="/logo-sin-fondo.png"
              alt="Logo Paroz Labs"
              className="w-64 sm:w-80 md:w-96 lg:w-[480px] object-contain md:absolute md:right-6 md:top-1/2 md:transform md:-translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
      </main>

      {/* Sección de iconos con Bootstrap Icons */}
      <section className="bg-gray-50 py-12 md:py-16 text-center" id="servicios">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div className="flex flex-col items-center text-gray-700">
            <i className="bi bi-award text-4xl md:text-5xl mb-3 md:mb-4 text-blue-600"></i>
            <p className="text-sm md:text-base">
              Con más de 15 años en la industria del software, contamos con
              experiencia en todo el ciclo de desarrollo, brindando soluciones
              robustas y escalables.
            </p>
          </div>

          <div className="flex flex-col items-center text-gray-700">
            <i className="bi bi-people text-4xl md:text-5xl mb-3 md:mb-4 text-blue-600"></i>
            <p className="text-sm md:text-base">
              Trabajamos en estrecha colaboración con nuestros clientes,
              entendiendo su negocio y necesidades para ofrecer resultados
              realmente efectivos.
            </p>
          </div>

          <div className="flex flex-col items-center text-gray-700">
            <i className="bi bi-rocket-takeoff text-4xl md:text-5xl mb-3 md:mb-4 text-blue-600"></i>
            <p className="text-sm md:text-base">
              Diseñamos soluciones a medida que se adaptan perfectamente a cada
              cliente, maximizando el valor entregado y el impacto del producto
              final.
            </p>
          </div>
        </div>

        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mt-12 md:mt-16 px-4">
          ¿Listo para impulsar tu empresa con nuestros servicios?
        </h2>
      </section>

      <section className="bg-white py-12 md:py-20 text-gray-800" id="nosotros">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Texto */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-[cursive] text-black">
              Nuestra Filosofía
            </h2>
            <p className="text-gray-700 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
              Nos sentimos socios de quienes confían en nosotros, no simples ejecutores.
              Buscamos generar impacto real armando equipos de alto rendimiento que
              piensen junto al cliente, no por él. Creemos que la comprensión profunda
              del negocio es nuestra carta maestra: antes de escribir una sola línea de
              código, nos aseguramos de entender el "para qué".
            </p>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              Internamente trabajamos en squads ágiles y multidisciplinarios, lo que
              nos permite adaptarnos rápido, colaborar de forma eficiente y construir
              soluciones que funcionan desde el día uno.
            </p>
          </div>

          {/* Imagen */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/logo-sin-fondo.png"
              alt="Ilustración filosofía Paroz Labs"
              className="w-64 sm:w-80 md:w-96 lg:w-[420px] object-contain"
            />
          </div>
        </div>

        {/* Subtítulo */}
        <div className="text-center mt-12 md:mt-16 px-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-6 md:mb-8">
            ¿Te gustaría trabajar con nosotros?
          </h3>

          {/* Botón de LinkedIn */}
          <a
            href="https://www.linkedin.com/company/parozlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0A66C2] text-white font-medium px-5 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-[#084b92] transition text-sm md:text-base"
          >
            <i className="bi bi-linkedin text-xl md:text-2xl bg-blue text-[#ffffff] rounded"></i>
            Seguinos en LinkedIn
          </a>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section className={`min-h-screen bg-gradient-to-b from-black to-[#0a093d] flex items-center justify-start px-4 md:px-6 lg:px-16 pt-24 text-white ${inter.className}`} id="contacto">
        <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Contáctanos</h2>
          <p className="text-gray-300 mb-8 md:mb-12 text-sm md:text-base lg:text-lg">
            Estamos listos para ayudarte a llevar tu negocio al siguiente nivel.
            Ponte en contacto con nosotros y conversemos sobre tus necesidades tecnológicas.
          </p>

          {/* Cuadros de contacto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Email */}
            <div className="bg-[#294152] p-5 md:p-6 rounded-2xl flex flex-col items-center justify-center">
              <i className="bi bi-envelope-fill text-2xl md:text-3xl mb-2 md:mb-3 text-white"></i>
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Email</h3>
              <p className="text-gray-200 text-sm md:text-base text-center">hola@parozlabs.com</p>
            </div>

            {/* Agenda */}
            <div className="bg-[#294152] p-5 md:p-6 rounded-2xl flex flex-col items-center justify-center">
              <i className="bi bi-calendar-event-fill text-2xl md:text-3xl mb-2 md:mb-3 text-white"></i>
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Agenda</h3>
              <p className="text-gray-200 text-sm md:text-base text-center">Agenda una cita sin compromiso</p>
            </div>

            {/* LinkedIn */}
            <div className="bg-[#294152] p-5 md:p-6 rounded-2xl flex flex-col items-center justify-center">
              <i className="bi bi-linkedin text-2xl md:text-3xl mb-2 md:mb-3 text-white"></i>
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">LinkedIn</h3>
              <a
                href="https://www.linkedin.com/company/parozlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline text-sm md:text-base"
              >
                Paroz Labs
              </a>
            </div>

            {/* Ubicación */}
            <div className="bg-[#294152] p-5 md:p-6 rounded-2xl flex flex-col items-center justify-center">
              <i className="bi bi-geo-alt-fill text-2xl md:text-3xl mb-2 md:mb-3 text-white"></i>
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Ubicación</h3>
              <p className="text-gray-200 text-xs md:text-sm leading-relaxed text-center">
                Avenida España 263,<br />
                Ciudad de Mendoza,<br />
                Argentina
              </p>
            </div>
          </div>

          {/* Footer inferior */}
          <footer className="mt-8 md:mt-12 text-gray-400 text-xs md:text-sm text-center md:text-left">
            © 2025 <span className="text-white font-semibold">Paroz Labs</span> — Todos los derechos reservados
          </footer>
        </div>
      </section>
    </>
  );
}