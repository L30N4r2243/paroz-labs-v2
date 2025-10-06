import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["200", "300"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export default function ChatMessages() {
return (
<div className={`space-y-2 ${inter.className}`}>
<div
className={`bg-gray-200 text-gray-800 p-2 rounded-lg max-w-[75%] ${poppins.className}`}
>
👋 ¡Hola! Soy la IA de Paroz Labs. ¿Cómo puedo ayudarte? </div> </div>
);
}
