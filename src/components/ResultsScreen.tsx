'use client';

import { useQuizStore } from '../hooks/useQuizStore';
import { SCENARIOS } from '../data/scenarios';
import { motion, Variants } from 'framer-motion';
import { RotateCcw, ExternalLink, CheckCircle2 } from 'lucide-react';

// ── Compute the real maximum score (perfect run with full streak bonus) ────────
// Simulates answering every question correctly with a growing streak so the
// displayed denominator always matches what is actually achievable.
function computeMaxScore(): number {
  let total = 0;
  let streak = 0;
  for (const scenario of SCENARIOS) {
    const streakMult = streak === 1 ? 1.2 : streak >= 2 ? 1.5 : 1.0;
    total += Math.round(100 * scenario.scoringMultiplier * streakMult);
    streak++;
  }
  return total; // 1 270 with the current 6 scenarios
}

const MAX_SCORE = computeMaxScore();

// ── Level config: different accent color + copy per score tier ────────────────
function getLevelConfig(accuracy: number) {
  if (accuracy >= 83)
    return {
      emoji: '🏆',
      level: 'Experto',
      accentColor: '#FFD000',
      glowColor: 'rgba(255,208,0,0.10)',
      borderColor: 'rgba(255,208,0,0.28)',
      badgeBg: 'rgba(255,208,0,0.08)',
      topPercent: 20,
      headline: '¡Dominas la Fluidez en IA!',
      subtext:
        'Completaste el reto con una puntuación de élite. Estás en el top 20% de quienes lo intentaron.',
      pdfHook: 'Lo ganaste. Ahora tenlo siempre a la mano 👇',
    };
  if (accuracy >= 67)
    return {
      emoji: '⭐',
      level: 'Avanzado',
      accentColor: '#818CF8',
      glowColor: 'rgba(129,140,248,0.10)',
      borderColor: 'rgba(129,140,248,0.28)',
      badgeBg: 'rgba(129,140,248,0.08)',
      topPercent: 35,
      headline: 'Muy cerca del nivel experto.',
      subtext:
        'Top 35% — tienes la base sólida. Un par de conceptos más y llegas a la cima.',
      pdfHook: 'La guía cubre exactamente lo que te faltó 👇',
    };
  if (accuracy >= 50)
    return {
      emoji: '📈',
      level: 'Intermedio',
      accentColor: '#FB923C',
      glowColor: 'rgba(251,146,60,0.10)',
      borderColor: 'rgba(251,146,60,0.28)',
      badgeBg: 'rgba(251,146,60,0.08)',
      topPercent: 60,
      headline: 'Buen punto de partida.',
      subtext:
        'Ya tienes la base. La guía te ayuda a consolidar los conceptos que todavía no están del todo claros.',
      pdfHook: 'La guía fue diseñada exactamente para este momento 👇',
    };
  return {
    emoji: '💡',
    level: 'Principiante',
    accentColor: '#4ADE80',
    glowColor: 'rgba(74,222,128,0.10)',
    borderColor: 'rgba(74,222,128,0.28)',
    badgeBg: 'rgba(74,222,128,0.08)',
    topPercent: 100,
    headline: 'Esto es solo el comienzo.',
    subtext:
      'Todos los expertos empezaron exactamente donde estás tú. Lo importante es que lo intentaste — ahora toca aprender.',
    pdfHook: 'Empieza con la guía — es el mejor punto de entrada 👇',
  };
}

const PDF_CONTENTS = [
  'Los 3 modos de trabajo con IA (Automatización, Aumento, Agencia)',
  'Las limitaciones críticas: Alucinaciones y Ventana de contexto',
  'El framework de las 4D explicado (Delegación, Descripción, Discernimiento, Diligencia)',
  'La Regla de Oro de Delegación: Lista visual de qué SÍ y qué NO delegar',
];

export default function ResultsScreen() {
  const { score, history, resetQuiz, goToEmail } = useQuizStore();

  const correctCount = history.filter((h) => h.wasCorrect).length;
  const accuracy = Math.round((correctCount / SCENARIOS.length) * 100);
  const bestStreak = history.reduce(
    (acc, curr) => {
      acc.current = curr.wasCorrect ? acc.current + 1 : 0;
      acc.best = Math.max(acc.best, acc.current);
      return acc;
    },
    { current: 0, best: 0 }
  ).best;

  const lvl = getLevelConfig(accuracy);

  const stats = [
    { label: 'Precisión', value: `${accuracy}%` },
    { label: 'Correctas', value: `${correctCount} / ${SCENARIOS.length}` },
    { label: 'Mejor racha', value: String(bestStreak) },
    { label: 'Nivel', value: lvl.level },
  ];



  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 overflow-x-hidden">

      {/* ── Level-specific top glow ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 45% at 50% 0%, ${lvl.glowColor} 0%, transparent 70%)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-[720px] w-full"
      >

        {/* ── Level badge ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08, type: 'spring', damping: 14, stiffness: 160 }}
          className="flex justify-center mb-6"
        >
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest border"
            style={{
              color: lvl.accentColor,
              backgroundColor: lvl.badgeBg,
              borderColor: lvl.borderColor,
            }}
          >
            <span>{lvl.emoji}</span>
            {lvl.level}
          </span>
        </motion.div>

        {/* ── Score hero ───────────────────────────────────────────────────── */}
        <div className="text-center mb-8">
          <motion.p
            initial={{ scale: 0.78, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.12, type: 'spring', damping: 16, stiffness: 110 }}
            className="font-black leading-none tracking-tighter"
            style={{
              fontSize: 'clamp(80px, 18vw, 148px)',
              color: lvl.accentColor,
              textShadow: `0 0 80px ${lvl.glowColor}`,
            }}
          >
            {score}
          </motion.p>
          <p className="text-brand-tostado text-sm mt-1">
            de {MAX_SCORE} puntos posibles
          </p>
        </div>

        {/* ── Headline + subtext ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8 px-2"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-cream mb-2 tracking-tight">
            {lvl.headline}
          </h2>
          <p className="text-brand-cream-muted text-base leading-relaxed max-w-lg mx-auto">
            {lvl.subtext}
          </p>
        </motion.div>

        {/* ── Stats row ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 + i * 0.06 }}
              className="flex flex-col items-center p-4 rounded-lg border"
              style={{
                borderColor: 'rgba(255,255,255,0.06)',
                backgroundColor: 'rgba(28,28,28,0.6)',
              }}
            >
              <span className="text-brand-tostado text-[9px] uppercase tracking-widest font-bold mb-2">
                {stat.label}
              </span>
              <span className="text-brand-cream text-xl font-bold">{stat.value}</span>
            </motion.div>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            PDF SELL SECTION
            The goal: make the guide feel like a real reward, not an afterthought.
        ════════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="rounded-xl border mb-6 overflow-hidden"
          style={{ borderColor: lvl.borderColor }}
        >
          {/* Header strip */}
          <div
            className="px-6 py-4 flex items-center gap-3"
            style={{ backgroundColor: lvl.badgeBg, borderBottom: `1px solid ${lvl.borderColor}` }}
          >
            <span className="text-2xl">🎁</span>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-0.5"
                style={{ color: lvl.accentColor }}
              >
                Tu recompensa desbloqueada
              </p>
              <p className="text-brand-cream font-extrabold text-lg leading-tight">
                Guía Rápida de Fluidez en IA
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-5" style={{ backgroundColor: 'rgba(14,14,14,0.6)' }}>
            <p className="text-brand-cream-muted text-sm leading-relaxed mb-5">
              Una referencia visual de <strong className="text-brand-cream">2 páginas</strong> con
              todo lo del curso resumido. El tipo de hoja que imprimes y pegas junto a la pantalla —
              o guardas en el celular — para consultarla cada vez que usas IA.
            </p>

            {/* Content list */}
            <ul className="flex flex-col gap-2.5 mb-5">
              {PDF_CONTENTS.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.44 + i * 0.07 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <CheckCircle2
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    style={{ color: lvl.accentColor }}
                  />
                  <span className="text-brand-cream-muted">{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* Hook line */}
            <p className="text-center text-brand-cream font-bold text-base">{lvl.pdfHook}</p>
          </div>
        </motion.div>

        {/* ── Primary CTA: pulsing ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52 }}
          className="mb-4"
        >
          <motion.button
            onClick={goToEmail}
            animate={{
              boxShadow: [
                `0 0 0px ${lvl.glowColor}`,
                `0 0 36px ${lvl.accentColor}55`,
                `0 0 0px ${lvl.glowColor}`,
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
            whileHover={{ scale: 1.02, filter: 'brightness(1.05)' }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-3 font-black py-5 px-10 rounded-[3px] text-sm uppercase tracking-widest transition-all cursor-pointer"
            style={{
              backgroundColor: lvl.accentColor,
              color: '#0E0E0E',
            }}
          >
            Quiero mi Guía — Es Gratis →
          </motion.button>
          <p className="text-brand-tostado text-xs text-center mt-3">
            Solo tu nombre y correo. Sin spam. Llega en minutos.
          </p>
        </motion.div>

        {/* ── Secondary CTAs ───────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">

          <button
            onClick={resetQuiz}
            className="flex items-center justify-center gap-2 border border-brand-cream/8 text-brand-tostado font-bold py-3 px-7 rounded-[3px] text-sm uppercase tracking-wider hover:border-brand-cream/20 hover:text-brand-cream-muted transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reintentar
          </button>
        </div>

        {/* ── Back to video ────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-2 pb-6">
          <p className="text-brand-cream-muted text-sm">
            ¿Quieres profundizar? Mira el video completo.
          </p>
          {/* TODO: Replace href with your actual YouTube video URL */}
          <a
            href="https://www.youtube.com/@RaulGonzalez-1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest border-b pb-1 transition-all"
            style={{
              color: lvl.accentColor,
              borderColor: `${lvl.accentColor}55`,
            }}
          >
            Ver video en YouTube
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
