import Link from 'next/link';
import Image from 'next/image';
import SubscriptionForm from '@/src/components/SubscriptionForm';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Nuevo: 7-Day Challenge</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                Lanza tu <span className="text-amber-400">Agencia IA</span> en 7 días
              </h1>
              
              <p className="text-xl text-neutral-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Sin saber programar. Sin herramientas costosas. Construye tu propia infraestructura de negocios con el poder de Claude y las "4 Gemas del Infinito".
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="#registro"
                  className="px-8 py-4 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-all hover:scale-105 shadow-[0_0_20px_rgba(251,191,36,0.3)] w-full sm:w-auto text-center"
                >
                  Empezar el Desafío Gratis
                </Link>
                <Link 
                  href="/recursos/fluidez-en-ia"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all w-full sm:w-auto text-center"
                >
                  Test de Fluidez IA
                </Link>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative z-10 animate-float">
                <Image 
                  src="/hero-gems.png" 
                  alt="AI Infrastructure Gems" 
                  width={600} 
                  height={600} 
                  className="rounded-3xl shadow-2xl border border-white/10"
                  priority
                />
              </div>
              <div className="absolute -inset-4 bg-amber-400/20 blur-3xl rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Gems Section */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Las Gemas del Infinito</h2>
            <p className="text-neutral-400 text-lg">
              Olvida los $300 USD al mes en suscripciones. Esta es la infraestructura profesional que tú mismo vas a orquestar.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Conectar', desc: 'Hostinger: Tu base de operaciones y dominios.', icon: '🌐' },
              { title: 'Construir', desc: 'Vercel: Donde vive tu código y escala tu web.', icon: '⚡' },
              { title: 'Crear', desc: 'Claude: Tu empleado digital inteligente.', icon: '🧠' },
              { title: 'Optimizar', desc: 'Resend: El sistema nervioso de tu comunicación.', icon: '✉️' }
            ].map((gem, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-amber-400/30 transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{gem.icon}</div>
                <h3 className="text-xl font-bold mb-3">{gem.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{gem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registro" className="py-24 bg-amber-400 text-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Deja de ser un usuario de IA. Sé un Arquitecto.
              </h2>
              <p className="text-xl font-medium opacity-80">
                Únete a más de 1,000 personas que están construyendo el futuro sin pagar herramientas costosas. Recibe la lección 1 hoy mismo.
              </p>
            </div>
            
            <div className="flex-1 w-full">
              <SubscriptionForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-black tracking-tighter">IA PORTAL</div>
          <div className="text-neutral-500 text-sm">
            © 2026 Raúl González. Todos los derechos reservados.
          </div>
          <div className="flex space-x-6 text-sm text-neutral-400">
            <Link href="/agencia" className="hover:text-amber-400 transition-colors">Agencia</Link>
            <Link href="/privacidad" className="hover:text-amber-400 transition-colors">Privacidad</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
