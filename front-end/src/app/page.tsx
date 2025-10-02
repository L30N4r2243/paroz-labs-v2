export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-[#0a093d] flex items-center justify-center px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Texto */}
        <div className="text-left text-white">
          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
            Escalamos tu negocio <br />
            con <span className="text-blue-400">Software</span> <br />
            entendiendo tu <br />
            realidad.
          </h1>
        </div>

        {/* Imagen */}
        <div className="flex justify-center md:justify-end">
          {/* 👇 Aquí va tu imagen */}
          <img src="/logo-sin-fondo.png" alt="Logo Paroz Labs" className="w-72 md:w-96" />

        </div>
      </div>
    </main>
  )
}
