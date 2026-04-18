import Link from 'next/link';
import Image from 'next/image';
import SubscriptionForm from '@/src/components/SubscriptionForm';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-cream selection:bg-brand-yellow/30">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 text-center lg:text-left space-y-12">
              <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-yellow"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/80">Para futuros arquitectos digitales</span>
              </div>
              
              <h1 className="text-6xl md:text-[5.5rem] font-extrabold tracking-tight leading-[0.9] text-brand-charcoal">
                Deja de <br />
                <span className="text-brand-gold italic font-garamond font-medium">pagar renta</span> <br />
                por tu negocio.
              </h1>
              
              <p className="text-xl md:text-2xl text-brand-charcoal/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Construye tu propia <span className="text-brand-charcoal font-bold">Agencia de Infraestructura IA</span> en 7 días. Sin "tasas SaaS" de $300/mes y sin escribir una sola línea de código complejo.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                <Link 
                  href="#registro"
                  className="px-12 py-6 bg-brand-charcoal text-brand-cream font-bold rounded-2xl hover:bg-brand-gold transition-all hover:scale-105 shadow-2xl w-full sm:w-auto text-center cursor-pointer text-lg"
                >
                  Unirme al Desafío Gratis
                </Link>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-sm font-bold text-brand-charcoal">7 Días. 7 Lecciones.</span>
                  <span className="text-xs text-brand-charcoal/50 font-medium italic font-garamond">Inicia hoy mismo.</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative z-10 animate-float">
                <Image 
                  src="/ai_infrastructure_hero_v2_clean_1776490650096.png" 
                  alt="AI Infrastructure Gems" 
                  width={850} 
                  height={850} 
                  className="rounded-[3rem] shadow-[0_50px_120px_-30px_rgba(26,26,26,0.2)] grayscale-[0.1] hover:grayscale-0 transition-all duration-1000"
                  priority
                />
              </div>
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand-yellow/15 blur-[100px] rounded-full"></div>
              <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-brand-gold/10 blur-[100px] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-32 bg-brand-charcoal text-brand-cream relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              ¿Estás construyendo sobre <br />
              <span className="text-brand-yellow font-garamond italic font-medium">terreno rentado?</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-12 text-left pt-8">
              <div className="space-y-4">
                <div className="text-brand-yellow text-3xl font-black">01</div>
                <h3 className="text-xl font-bold">La Tasa SaaS</h3>
                <p className="text-brand-cream/60 leading-relaxed font-medium">
                  Pagando suscripciones de $97, $197 o $297 al mes por herramientas que nunca serán tuyas.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-brand-yellow text-3xl font-black">02</div>
                <h3 className="text-xl font-bold">La Caja Negra</h3>
                <p className="text-brand-cream/60 leading-relaxed font-medium">
                  Si la plataforma decide cambiar sus reglas o subir precios, tu negocio desaparece en un click.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-brand-yellow text-3xl font-black">03</div>
                <h3 className="text-xl font-bold">Complejidad Fake</h3>
                <p className="text-brand-cream/60 leading-relaxed font-medium">
                  Te hacen creer que necesitas un equipo de ingenieros cuando solo necesitas las herramientas correctas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Gems Section */}
      <section className="py-40 border-t border-brand-charcoal/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-32 space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-charcoal leading-[0.9]">
              El Manifiesto del <br />
              <span className="font-garamond italic font-medium text-brand-gold">Arquitecto Digital</span>
            </h2>
            <p className="text-brand-charcoal/60 text-2xl leading-relaxed max-w-2xl font-medium">
              No se trata de usar IA. Se trata de ser el dueño de la infraestructura que la hace funcionar.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Fundación', 
                desc: 'Hostinger: Tu búnker digital. Dominio y hosting que tú controlas al 100%.', 
                icon: '🌐',
                label: 'Soberanía'
              },
              { 
                title: 'Capa Visual', 
                desc: 'Vercel: Despliegue profesional en segundos. Tu cara al mundo, ultra rápida.', 
                icon: '⚡',
                label: 'Velocidad'
              },
              { 
                title: 'Cerebro', 
                desc: 'Claude: Tu socio estratégico. Delegación real, no simples prompts.', 
                icon: '🧠',
                label: 'Inteligencia'
              },
              { 
                title: 'Sistema Nervioso', 
                desc: 'Resend: Comunicación sin fricción. Notificaciones y CRM que escalan contigo.', 
                icon: '✉️',
                label: 'Conexión'
              }
            ].map((gem, i) => (
              <div key={i} className="p-12 rounded-[3rem] bg-white border border-brand-charcoal/5 hover:border-brand-yellow transition-all group shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
                <div className="text-xs font-black uppercase tracking-widest text-brand-charcoal/30 mb-8">{gem.label}</div>
                <div className="text-6xl mb-10 opacity-80 group-hover:scale-110 transition-transform group-hover:opacity-100">{gem.icon}</div>
                <h3 className="text-3xl font-bold mb-6 text-brand-charcoal tracking-tight">{gem.title}</h3>
                <p className="text-brand-charcoal/50 leading-relaxed font-medium text-lg">{gem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Roadmap Section */}
      <section className="py-32 bg-brand-yellow/5 border-y border-brand-charcoal/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-charcoal">
              7 Días para tu <span className="font-garamond italic font-medium">Independencia</span>
            </h2>
            <p className="text-brand-charcoal/60 text-xl font-medium">Un correo al día. Un paso a la vez.</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              "El Mindset del Arquitecto: Por qué el No-Code te está limitando.",
              "Tu Búnker Digital: Configuración pro de Hostinger + Vercel.",
              "El Socio Invisible: Claude como tu CTO de marca blanca.",
              "Integración CRM: Capturando valor con Resend sin morir en el intento.",
              "Flujos de Automatización: El fin de las tareas manuales.",
              "Escalabilidad: Cómo clonar este sistema para tus clientes.",
              "El Gran Salto: Lanzamiento y monetización de tu infraestructura."
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/50 border border-brand-charcoal/5 hover:border-brand-yellow/50 transition-all group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-charcoal text-brand-cream flex items-center justify-center font-black text-sm">0{i+1}</div>
                <div className="text-lg font-bold text-brand-charcoal/80 group-hover:text-brand-charcoal transition-colors">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registro" className="py-40 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 space-y-10">
              <h2 className="text-5xl md:text-[5rem] font-extrabold leading-[0.85] text-brand-charcoal tracking-tighter">
                Construye el futuro. <br />
                <span className="italic font-garamond font-medium text-brand-gold">Sé el dueño</span> <br />
                de los planos.
              </h2>
              <p className="text-2xl font-medium text-brand-charcoal/60 leading-relaxed">
                Únete a la nueva generación de emprendedores que no dependen de plataformas cerradas. <br />
                <span className="text-brand-charcoal font-bold underline decoration-brand-yellow underline-offset-8">La Lección 1 llega a tu inbox al instante.</span>
              </p>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <SubscriptionForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-brand-charcoal/5 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-3xl font-black tracking-tighter text-brand-charcoal">IA PORTAL</div>
            <p className="text-brand-charcoal/40 text-sm font-medium max-w-xs text-center md:text-left">
              Capacitando a la nueva ola de arquitectos de infraestructura digital.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-sm font-bold text-brand-charcoal/60 uppercase tracking-[0.2em]">
            <Link href="/agencia" className="hover:text-brand-gold transition-colors">Agencia</Link>
            <Link href="/privacidad" className="hover:text-brand-gold transition-colors">Privacidad</Link>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="text-brand-charcoal/30 text-[10px] font-black uppercase tracking-[0.3em]">
              © 2026 Raúl González
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
