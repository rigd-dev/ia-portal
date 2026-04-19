'use client';

import { useQuizStore } from '../hooks/useQuizStore';
import { SCENARIOS } from '../data/scenarios';
import { motion, Variants } from 'framer-motion';
import MultipleChoiceQuestion from './questions/MultipleChoiceQuestion';
import OrderingQuestion from './questions/OrderingQuestion';
import MultiSelectQuestion from './questions/MultiSelectQuestion';

const DIFFICULTY_CONFIG = {
  easy: { label: 'Fácil', dots: '●●○○○', color: 'text-green-400 border-green-400/30' },
  medium: { label: 'Medio', dots: '●●●○○', color: 'text-brand-yellow border-brand-yellow/30' },
  hard: { label: 'Difícil', dots: '●●●●○', color: 'text-red-400 border-red-400/30' },
};

const QUESTION_TYPE_BADGE: Record<string, { label: string } | null> = {
  'multiple-choice': null,
  ordering: { label: '↕ Ordenar' },
  'multi-select': { label: '✓ Selección múltiple' },
};

export default function ScenarioScreen() {
  const {
    currentScenarioIndex,
    selectedAnswerId,
    currentOrder,
    selectedMultipleIds,
    checkAnswer,
    streak,
  } = useQuizStore();

  const scenario = SCENARIOS[currentScenarioIndex];
  const progress = ((currentScenarioIndex + 1) / SCENARIOS.length) * 100;
  const diffCfg = DIFFICULTY_CONFIG[scenario.difficulty];
  const typeBadge = QUESTION_TYPE_BADGE[scenario.questionType];

  // Compute submit readiness per question type
  const isReady = (() => {
    if (scenario.questionType === 'multiple-choice') return selectedAnswerId !== null;
    if (scenario.questionType === 'ordering')
      return currentOrder.length === scenario.items.length;
    if (scenario.questionType === 'multi-select') return selectedMultipleIds.length > 0;
    return false;
  })();

  return (
    <div className="relative min-h-screen bg-brand-black flex flex-col overflow-hidden">

      {/* ── Progress Bar ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full h-[5px] bg-[#1C1C1C] flex-shrink-0">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-brand-yellow shadow-[0_0_10px_rgba(255,208,0,0.5)]"
        />
      </div>

      <main className="relative z-10 flex-1 flex flex-col max-w-[960px] mx-auto w-full p-6 md:p-12 lg:p-16">
        {/* ── Header Row ─────────────────────────────────────────────────────── */}
        <div className="flex justify-between items-start mb-10 flex-shrink-0">
          <div>
            <p className="text-brand-tostado text-xs font-bold uppercase tracking-[0.2em]">
              Escenario {currentScenarioIndex + 1} de {SCENARIOS.length}
            </p>
            {streak > 0 && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-brand-yellow text-[11px] font-bold mt-1"
              >
                🔥 Racha: {streak}
              </motion.p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {typeBadge && (
              <span className="text-brand-tostado text-[10px] font-bold uppercase tracking-wider border border-brand-tostado/25 px-2 py-1 rounded">
                {typeBadge.label}
              </span>
            )}
            <span
              className={`text-[10px] font-bold tracking-[0.18em] px-2 py-1 border rounded ${diffCfg.color}`}
            >
              {diffCfg.dots} {diffCfg.label.toUpperCase()}
            </span>
          </div>
        </div>

        {/* ── Scenario Content ────────────────────────────────────────────────── */}
        {/* No entry animation here — the outer AnimatePresence wrapper already
            fades this whole screen in. A second opacity animation here was
            causing the "two pages flashing" effect. */}
        <div className="mb-10 flex-shrink-0">
          <div className="pl-5 border-l-2 border-brand-yellow/20">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-cream leading-tight mb-4 tracking-tight">
              {scenario.title}
            </h2>
            <p className="text-base md:text-lg text-brand-cream-muted leading-relaxed max-w-2xl">
              {scenario.description}
            </p>
          </div>
        </div>

        {/* ── Question Component ──────────────────────────────────────────────── */}
        <div className="flex-1">
          {scenario.questionType === 'multiple-choice' && (
            <MultipleChoiceQuestion key={scenario.id} scenario={scenario} />
          )}
          {scenario.questionType === 'ordering' && (
            <OrderingQuestion key={scenario.id} scenario={scenario} />
          )}
          {scenario.questionType === 'multi-select' && (
            <MultiSelectQuestion key={scenario.id} scenario={scenario} />
          )}
        </div>

        {/* ── Submit Button ───────────────────────────────────────────────────── */}
        <div className="mt-10 flex justify-center flex-shrink-0">
          <button
            onClick={checkAnswer}
            disabled={!isReady}
            className={`
              w-full max-w-[560px] py-4 rounded-[3px] font-bold text-sm uppercase tracking-widest transition-all
              ${
                isReady
                  ? 'bg-brand-yellow text-brand-black hover:shadow-[0_0_22px_rgba(255,208,0,0.32)] cursor-pointer'
                  : 'bg-brand-yellow/18 text-brand-black/25 cursor-not-allowed'
              }
            `}
          >
            Verificar Respuesta
          </button>
        </div>
      </main>
    </div>
  );
}
