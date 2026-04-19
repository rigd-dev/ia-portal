'use client';

import { useQuizStore } from '../hooks/useQuizStore';
import { motion, Variants } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6 } },
};

const FOUR_DS = [
  { d: 'Delegación', color: '#4A90E2', bg: '#4A90E215' },
  { d: 'Descripción', color: '#9B59B6', bg: '#9B59B615' },
  { d: 'Discernimiento', color: '#E67E22', bg: '#E67E2215' },
  { d: 'Diligencia', color: '#27AE60', bg: '#27AE6015' },
];

export default function LandingScreen() {
  const startQuiz = useQuizStore((state) => state.startQuiz);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden p-6">

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-[640px] w-full px-2"
      >
        {/* Course badge */}
        <motion.div variants={item} className="mb-8">
          <span className="inline-flex items-center gap-2 text-[10px] text-brand-tostado uppercase tracking-[0.28em] font-bold border border-brand-tostado/25 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow inline-block" />
            Basado en el curso oficial de Anthropic
          </span>
        </motion.div>

        {/* Headline block */}
        <div className="flex items-start gap-5 mb-10">
          <motion.div
            variants={item}
            className="w-[3px] bg-brand-yellow flex-shrink-0 rounded-full"
            style={{ height: 148 }}
          />
          <div>
            <motion.h1
              variants={item}
              className="text-[52px] md:text-[72px] font-extrabold text-brand-cream leading-[0.92] tracking-tight mb-5"
            >
              Prueba tu
              <br />
              <span className="text-brand-yellow">Fluidez en IA</span>
            </motion.h1>
            <motion.p
              variants={item}
              className="text-lg md:text-xl text-brand-cream-muted leading-relaxed max-w-md"
            >
              Ya viste el video. Ahora veamos si realmente sabes aplicar estos conceptos en el mundo real.
            </motion.p>
          </div>
        </div>

        {/* 4D pill row */}
        <motion.div variants={item} className="flex flex-wrap gap-2 mb-10">
          {FOUR_DS.map(({ d, color, bg }) => (
            <span
              key={d}
              className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border"
              style={{
                color,
                borderColor: `${color}35`,
                backgroundColor: bg,
              }}
            >
              {d}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          variants={item}
          onClick={startQuiz}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="bg-brand-yellow text-brand-black font-bold py-4 px-12 rounded-[3px] text-sm uppercase tracking-widest hover:shadow-[0_0_32px_rgba(255,208,0,0.35)] transition-all"
        >
          Iniciar Desafío
        </motion.button>

        {/* Footer meta */}
        <motion.p
          variants={item}
          className="mt-8 text-[11px] text-brand-tostado uppercase tracking-[0.22em] font-medium"
        >
          ~3 minutos &nbsp;·&nbsp; 6 escenarios &nbsp;·&nbsp; Para principiantes
        </motion.p>
      </motion.div>
    </div>
  );
}
