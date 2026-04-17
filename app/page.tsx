import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7EE] flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0E0E0E]">
          IA Portal
        </h1>
        <p className="text-xl text-[#6A6050]">
          Recursos, guías y herramientas para dominar la Inteligencia Artificial.
        </p>
        
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Link 
            href="/recursos/fluidez-en-ia"
            className="group block p-6 bg-white rounded-2xl border border-black/5 hover:border-black/20 transition-all hover:-translate-y-1 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-[#0E0E0E] mb-2 group-hover:text-[#FFD000] transition-colors">
              Fluidez en IA
            </h2>
            <p className="text-[#6A6050]">
              Evalúa tu nivel y descubre tu perfil de usuario de IA en este quiz interactivo.
            </p>
          </Link>
          
          {/* Espacio para futuros recursos */}
          <div className="p-6 bg-black/5 rounded-2xl border border-dashed border-black/20 flex items-center justify-center">
            <p className="text-[#6A6050] font-medium">Más recursos pronto...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
