'use client';

import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export default function GuiaPDF() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4; margin: 0; }
          body, html { 
            background-color: #FAF7EE !important; 
            margin: 0; 
            padding: 0;
          }
          * { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          .page-break { break-after: page; }
        }
      `}} />
      <div className="min-h-screen bg-brand-black flex flex-col items-center py-10 print:bg-brand-cream print:py-0 print:block">
      
      {/* Botón flotante para imprimir (se oculta al imprimir) */}
      <button 
        onClick={() => window.print()}
        className="fixed top-6 right-6 z-50 bg-brand-yellow text-brand-black font-bold py-3 px-6 rounded shadow-lg print:hidden hover:scale-105 transition-transform"
      >
        🖨️ Guardar como PDF
      </button>

      {/* ── PÁGINA 1 ────────────────────────────────────────────────────────── */}
      <div className="bg-brand-cream text-brand-black-soft w-[210mm] min-h-[297mm] p-12 shadow-2xl mb-10 print:shadow-none print:mb-0 print:w-[210mm] print:h-[297mm] print:min-h-0 relative overflow-hidden page-break">
        
        {/* Decoración superior */}
        <div className="absolute top-0 left-0 w-full h-3 bg-brand-black" />
        <div className="absolute top-3 left-0 w-full h-1 bg-brand-yellow" />

        <div className="flex justify-between items-end mb-12 mt-6 border-b-2 border-brand-black/10 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold font-sora text-brand-black mb-2 tracking-tight">
              Fluidez en IA
            </h1>
            <p className="text-brand-tostado uppercase tracking-widest text-sm font-bold">
              Guía Rápida de Referencia
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-brand-yellow text-brand-black text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-widest">
              Basado en Anthropic
            </span>
          </div>
        </div>

        {/* Sección: Los 3 Modos de Trabajo */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold font-sora text-brand-black mb-6 flex items-center gap-3">
            <span className="text-brand-yellow">01.</span> Los 3 Modos de Trabajo
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg border border-brand-black/5 shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-brand-black">Automatización</h3>
              <p className="text-sm text-brand-tostado leading-relaxed mb-3">
                Tareas repetitivas con resultados predecibles. Tú sabes exactamente lo que quieres.
              </p>
              <div className="bg-brand-black/5 p-3 rounded text-xs font-mono text-brand-black-soft">
                Ej: "Formatea estos datos en una tabla con 3 columnas."
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-brand-black/5 shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-brand-black">Aumento</h3>
              <p className="text-sm text-brand-tostado leading-relaxed mb-3">
                Colaboración estratégica. Rebotar ideas para llegar a un resultado que no lograrías solo.
              </p>
              <div className="bg-brand-black/5 p-3 rounded text-xs font-mono text-brand-black-soft">
                Ej: "Tengo esta idea suelta. Hazme preguntas para estructurarla."
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-brand-black/5 shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-brand-black">Agencia</h3>
              <p className="text-sm text-brand-tostado leading-relaxed mb-3">
                Delegar objetivos a un sistema autónomo que toma decisiones con herramientas.
              </p>
              <div className="bg-brand-black/5 p-3 rounded text-xs font-mono text-brand-black-soft">
                Ej: "Revisa mis correos, clasifícalos y responde los frecuentes."
              </div>
            </div>
          </div>
        </div>

        {/* Sección: Limitaciones Críticas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold font-sora text-brand-black mb-6 flex items-center gap-3">
            <span className="text-brand-yellow">02.</span> Reglas y Limitaciones Críticas
          </h2>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="border-l-4 border-brand-yellow pl-5">
              <h3 className="font-bold text-brand-black mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-brand-yellow" />
                Alucinaciones
              </h3>
              <p className="text-sm text-brand-tostado leading-relaxed">
                La IA predice palabras, no busca hechos en una base de datos. Puede inventar nombres, fechas o citas legales con total confianza. <strong className="text-brand-black">Nunca asumas precisión absoluta en datos críticos sin verificar.</strong>
              </p>
            </div>
            <div className="border-l-4 border-[#818CF8] pl-5">
              <h3 className="font-bold text-brand-black mb-2">Ventana de Contexto</h3>
              <p className="text-sm text-brand-tostado leading-relaxed">
                Es la "memoria de trabajo" del modelo. Cuando se llena, la IA empieza a ignorar tus instrucciones iniciales. <strong className="text-brand-black">Solución: No corrijas en el mismo chat. Abre uno nuevo y limpio.</strong>
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ── PÁGINA 2 ────────────────────────────────────────────────────────── */}
      <div className="bg-brand-cream text-brand-black-soft w-[210mm] min-h-[297mm] p-12 shadow-2xl print:shadow-none print:w-[210mm] print:h-[297mm] print:min-h-0 relative overflow-hidden">
        
        {/* Decoración superior */}
        <div className="absolute top-0 left-0 w-full h-3 bg-brand-black" />
        <div className="absolute top-3 left-0 w-full h-1 bg-brand-yellow" />

        <div className="mb-10 mt-6">
          <h2 className="text-2xl font-bold font-sora text-brand-black mb-6 flex items-center gap-3">
            <span className="text-brand-yellow">03.</span> El Framework de las 4D
          </h2>
          
          <div className="flex flex-col gap-5">
            {/* D1 */}
            <div className="flex gap-6 bg-white p-6 rounded-xl border border-brand-black/5">
              <div className="w-12 h-12 rounded-full bg-[#4A90E2]/10 flex items-center justify-center flex-shrink-0 text-[#4A90E2] font-black text-xl">D1</div>
              <div>
                <h3 className="font-bold text-xl text-brand-black mb-2">Delegación</h3>
                <p className="text-sm text-brand-tostado leading-relaxed">Antes de abrir la IA, abre tu cerebro. Define qué problema vas a resolver y qué herramienta es mejor. Recuerda: eres experto primero, delegador después.</p>
              </div>
            </div>
            
            {/* D2 */}
            <div className="flex gap-6 bg-white p-6 rounded-xl border border-brand-black/5">
              <div className="w-12 h-12 rounded-full bg-[#9B59B6]/10 flex items-center justify-center flex-shrink-0 text-[#9B59B6] font-black text-xl">D2</div>
              <div>
                <h3 className="font-bold text-xl text-brand-black mb-2">Descripción (Prompt Engineering)</h3>
                <p className="text-sm text-brand-tostado leading-relaxed mb-3">La IA no lee mentes. Define las 3P: <strong>Producto</strong> (qué quieres), <strong>Proceso</strong> (cómo abordarlo), y <strong>Desempeño</strong> (tono/actitud).</p>
                <div className="bg-brand-black/5 rounded p-3 text-xs flex gap-4">
                  <span className="font-bold text-brand-black">Técnicas:</span>
                  <span className="text-brand-tostado">1. Dar contexto | 2. Mostrar ejemplos | 3. Dividir en pasos | 4. Pedirle que piense primero</span>
                </div>
              </div>
            </div>

            {/* D3 */}
            <div className="flex gap-6 bg-white p-6 rounded-xl border border-brand-black/5">
              <div className="w-12 h-12 rounded-full bg-[#E67E22]/10 flex items-center justify-center flex-shrink-0 text-[#E67E22] font-black text-xl">D3</div>
              <div>
                <h3 className="font-bold text-xl text-brand-black mb-2">Discernimiento</h3>
                <p className="text-sm text-brand-tostado leading-relaxed">Nunca aceptes el primer resultado a ciegas. Evalúa la calidad, detecta fallos lógicos y pide ajustes. El verdadero trabajo con IA ocurre en este bucle de iteración.</p>
              </div>
            </div>

            {/* D4 */}
            <div className="flex gap-6 bg-white p-6 rounded-xl border border-brand-black/5">
              <div className="w-12 h-12 rounded-full bg-[#27AE60]/10 flex items-center justify-center flex-shrink-0 text-[#27AE60] font-black text-xl">D4</div>
              <div>
                <h3 className="font-bold text-xl text-brand-black mb-2">Diligencia</h3>
                <p className="text-sm text-brand-tostado leading-relaxed">A la IA no la pueden despedir, a ti sí. Eres el responsable final ético y profesional de todo lo que produces y firmas con IA.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección: Checklist */}
        <div>
          <h2 className="text-xl font-bold font-sora text-brand-black mb-6 flex items-center gap-3">
            <span className="text-brand-yellow">04.</span> Regla de Oro de Delegación
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border-t-4 border-[#27AE60] shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#27AE60]" />
                SÍ Delegar
              </h3>
              <ul className="text-sm text-brand-tostado space-y-3">
                <li className="flex items-start gap-2"><span className="text-brand-black font-bold">·</span> Borradores iniciales de documentos</li>
                <li className="flex items-start gap-2"><span className="text-brand-black font-bold">·</span> Lluvia de ideas y ángulos creativos</li>
                <li className="flex items-start gap-2"><span className="text-brand-black font-bold">·</span> Resumen de textos largos</li>
                <li className="flex items-start gap-2"><span className="text-brand-black font-bold">·</span> Tareas técnicas repetitivas (formateo)</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border-t-4 border-red-500 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                NO Delegar
              </h3>
              <ul className="text-sm text-brand-tostado space-y-3">
                <li className="flex items-start gap-2"><span className="text-brand-black font-bold">·</span> Contratación o evaluación de personas</li>
                <li className="flex items-start gap-2"><span className="text-brand-black font-bold">·</span> Datos financieros sin verificar</li>
                <li className="flex items-start gap-2"><span className="text-brand-black font-bold">·</span> Estrategia final de negocio</li>
                <li className="flex items-start gap-2"><span className="text-brand-black font-bold">·</span> Juicio moral o decisiones éticas</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-12 opacity-50">
          <p className="text-xs font-bold tracking-widest uppercase text-brand-tostado">youtube.com/@RaulGonzalez-1</p>
        </div>

      </div>
    </div>
    </>
  );
}
