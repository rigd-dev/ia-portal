import Link from 'next/link';
import Image from 'next/image';
import SubscriptionForm from '@/src/components/SubscriptionForm';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-cream selection:bg-brand-yellow/30">
      {/* Hero Section */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left space-y-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/60">Nuevo: 7-Day Challenge</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.95] text-brand-charcoal">
                Lanza tu <br />
                <span className="text-brand-gold italic font-garamond font-medium">Agencia IA</span> <br />
                en 7 días
              </h1>
              
              <p className="text-lg md:text-xl text-brand-charcoal/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Sin saber programar. Sin herramientas costosas. <br className="hidden md:block" />
                Construye tu propia infraestructura de negocios con el poder de Claude y las <span className="text-brand-charcoal font-bold underline decoration-brand-yellow decoration-2 underline-offset-4">4 Gemas del Infinito</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="#registro"
                  className="px-10 py-5 bg-brand-charcoal text-brand-cream font-bold rounded-2xl hover:bg-brand-gold transition-all hover:scale-105 shadow-xl w-full sm:w-auto text-center cursor-pointer"
                >
                  Empezar el Desafío Gratis
                </Link>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative z-10 animate-float">
                <Image 
                  src="/ai_infrastructure_hero_v2_clean_1776490650096.png" 
                  alt="AI Infrastructure Gems" 
                  width={800} 
                  height={800} 
                  className="rounded-3xl shadow-[0_40px_100px_-20px_rgba(26,26,26,0.15)] grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-yellow/20 blur-3xl rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-gold/10 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Gems Section */}
      <section className="py-32 border-t border-brand-charcoal/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-24 space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-charcoal">
              Las <span className="font-garamond italic font-medium">Gemas</span> del Infinito
            </h2>
            <p className="text-brand-charcoal/60 text-xl leading-relaxed">
              Olvida los $300 USD al mes en suscripciones. Esta es la infraestructura profesional que tú mismo vas a orquestar.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Conectar', desc: 'Hostinger: Tu base de operaciones y dominios.', icon: '🌐' },
              { title: 'Construir', desc: 'Vercel: Donde vive tu código y escala tu web.', icon: '⚡' },
              { title: 'Crear', desc: 'Claude: Tu empleado digital inteligente.', icon: '🧠' },
              { title: 'Optimizar', desc: 'Resend: El sistema nervioso de tu comunicación.', icon: '✉️' }
            ].map((gem, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-brand-charcoal/5 hover:border-brand-yellow transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1">
                <div className="text-5xl mb-8 opacity-80 group-hover:scale-110 transition-transform group-hover:opacity-100">{gem.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-brand-charcoal">{gem.title}</h3>
                <p className="text-brand-charcoal/50 leading-relaxed font-medium">{gem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registro" className="py-32 bg-brand-yellow/5 border-t border-brand-charcoal/5">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-8">
              <h2 className="text-5xl md:text-7xl font-extrabold leading-[0.9] text-brand-charcoal tracking-tighter">
                Deja de ser un usuario. <br />
                Sé el <span className="italic font-garamond font-medium">Arquitecto</span>.
              </h2>
              <p className="text-xl font-medium text-brand-charcoal/70 leading-relaxed">
                Únete a más de 1,000 personas que están construyendo el futuro sin pagar herramientas costosas. <br />
                <span className="text-brand-charcoal font-bold">Recibe la lección 1 hoy mismo.</span>
              </p>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <SubscriptionForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-brand-charcoal/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-black tracking-tighter text-brand-charcoal">IA PORTAL</div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-brand-charcoal/40">
            <Link href="/agencia" className="hover:text-brand-charcoal transition-colors uppercase tracking-widest">Agencia</Link>
            <Link href="/privacidad" className="hover:text-brand-charcoal transition-colors uppercase tracking-widest">Privacidad</Link>
          </div>
          <div className="text-brand-charcoal/30 text-xs font-bold uppercase tracking-widest">
            © 2026 Raúl González
          </div>
        </div>
      </footer>
    </div>
  );
}
