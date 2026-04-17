'use client';

import { useQuizStore } from '../hooks/useQuizStore';
import { SCENARIOS } from '../data/scenarios';
import { motion, Variants } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';

export default function FeedbackScreen() {
  const { history, lastPointsEarned, nextScenario, streak } = useQuizStore();

  const lastEntry = history[history.length - 1];
  // ⚠️ Look up scenario by the ID saved in the history entry — NOT by
  // currentScenarioIndex. nextScenario() increments the index and changes
  // gameStatus in one Zustand dispatch, so during the fade-out animation
  // currentScenarioIndex already points to the NEXT question, causing a
  // brief flash of the wrong feedback. scenarioId is stable across the transition.
  const scenario = SCENARIOS.find((s) => s.id === lastEntry?.scenarioId)!;
  const isCorrect = lastEntry?.wasCorrect ?? false;

  // ── For MC: find the correct answer text ─────────────────────────────────
  const correctMCAnswer =
    scenario.questionType === 'multiple-choice'
      ? scenario.answers.find((a) => a.isCorrect)
      : null;

  // ── Ordering detail ────────────────────────────────────────────────────────
  const renderOrderingDetail = () => {
    if (scenario.questionType !== 'ordering') return null;
    const userOrder = lastEntry?.userOrder ?? [];

    return (
      <div className="mt-5 pt-5 border-t border-white/8">
        <p className="text-[10px] uppercase tracking-widest font-bold mb-3 text-white/40">
          Orden correcto:
        </p>
        <div className="flex flex-col gap-2">
          {scenario.correctOrder.map((id, idx) => {
            const item = scenario.items.find((i) => i.id === id);
            const userPlacedId = userOrder[idx];
            const ok = userPlacedId === id;
            const userItem = scenario.items.find((i) => i.id === userPlacedId);

            return (
              <div key={id} className="flex items-center gap-3 text-sm">
                <span
                  className={`w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center flex-shrink-0 ${
                    ok
                      ? 'bg-brand-yellow text-brand-black'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {idx + 1}
                </span>
                <span className="text-xl">{item?.emoji}</span>
                <span className={ok ? 'text-brand-yellow font-bold' : 'text-brand-cream-muted'}>
                  {item?.text}
                </span>
                {!ok && userItem && (
                  <span className="text-rose-400/80 text-[10px] ml-auto flex items-center gap-1">
                    <X className="w-3 h-3" /> tú: {userItem.emoji} {userItem.text}
                  </span>
                )}
                {ok && <Check className="w-3 h-3 text-brand-yellow ml-auto" />}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Multi-select detail ────────────────────────────────────────────────────
  const renderMultiSelectDetail = () => {
    if (scenario.questionType !== 'multi-select') return null;
    const userSelected = lastEntry?.userMultiSelect ?? [];

    return (
      <div className="mt-5 pt-5 border-t border-white/8">
        <p className="text-[10px] uppercase tracking-widest font-bold mb-3 text-white/40">
          Respuestas correctas:
        </p>
        <div className="flex flex-col gap-2">
          {scenario.options.map((opt, idx) => {
            const label = String.fromCharCode(65 + idx);
            const wasSelected = userSelected.includes(opt.id);
            const isCorrectOpt = opt.isCorrect;
            const isWrongPick = wasSelected && !isCorrectOpt;
            const wasMissed = isCorrectOpt && !wasSelected;

            return (
              <div key={opt.id} className="flex items-start gap-3 text-sm">
                <span
                  className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center text-[9px] font-bold mt-0.5 ${
                    isCorrectOpt
                      ? 'bg-brand-yellow border-brand-yellow text-brand-black'
                      : isWrongPick
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                      : 'border-white/15 text-white/30'
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`leading-relaxed ${
                    isCorrectOpt
                      ? 'text-brand-cream font-medium'
                      : isWrongPick
                      ? 'text-rose-300/70'
                      : 'text-brand-cream-muted/40'
                  }`}
                >
                  {opt.text}
                  {wasMissed && (
                    <span className="ml-2 text-brand-yellow text-[10px] font-bold">
                      ← debías seleccionar
                    </span>
                  )}
                  {isWrongPick && (
                    <span className="ml-2 text-rose-400/80 text-[10px]">
                      (no era correcta)
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >

      {/* Tinted background glow — green or red */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isCorrect
            ? 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(34,197,94,0.07) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(239,68,68,0.07) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-[680px] w-full"
      >
        {/* ── Status Header ───────────────────────────────────────────────────── */}
        <div className="text-center mb-10">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 13, stiffness: 130, delay: 0.06 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isCorrect
                ? 'bg-brand-yellow shadow-[0_0_40px_rgba(255,208,0,0.35)]'
                : 'bg-rose-500/15 border-2 border-rose-500/30'
            }`}
          >
            {isCorrect ? (
              <Check className="w-10 h-10 text-brand-black stroke-[3]" />
            ) : (
              <X className="w-10 h-10 text-rose-400 stroke-[2.5]" />
            )}
          </motion.div>

          {/* Verdict */}
          <h2
            className={`text-5xl md:text-6xl font-extrabold tracking-tight mb-2 ${
              isCorrect ? 'text-brand-yellow' : 'text-rose-400'
            }`}
          >
            {isCorrect ? '¡Correcto!' : 'No exactamente.'}
          </h2>

          {/* Context line */}
          {isCorrect && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="text-brand-cream-muted text-base mb-4"
            >
              Dominas este concepto.
            </motion.p>
          )}
          {!isCorrect && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="text-brand-cream-muted text-base mb-4"
            >
              Aquí está lo que necesitas saber.
            </motion.p>
          )}

          {/* Points row */}
          <div className="flex items-center justify-center gap-4">
            <motion.span
              animate={isCorrect ? { scale: [1, 1.18, 1] } : {}}
              transition={{ duration: 0.42, delay: 0.28 }}
              className={`text-2xl font-black ${
                isCorrect ? 'text-brand-yellow' : 'text-brand-cream-muted/40'
              }`}
            >
              +{lastPointsEarned} PTS
            </motion.span>
            {streak > 1 && isCorrect && (
              <>
                <div className="h-5 w-px bg-brand-tostado/30" />
                <span className="text-brand-yellow text-sm font-bold">🔥 Racha {streak}</span>
              </>
            )}
          </div>
        </div>

        {/* ── Explanation Card ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.38 }}
          className={`border-l-[3px] p-7 md:p-9 mb-8 rounded-r-lg ${
            isCorrect
              ? 'bg-[#0d1f12] border-green-500'
              : 'bg-[#1f0d0d] border-rose-500'
          }`}
        >
          {/* Label */}
          <h3
            className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${
              isCorrect ? 'text-green-400' : 'text-rose-400'
            }`}
          >
            {isCorrect ? '✓ Por qué es correcto' : '✗ Por qué no era esa'}
          </h3>

          {/* Main explanation */}
          <p className="text-brand-cream-muted text-base leading-relaxed">
            {isCorrect ? scenario.correctExplanation : scenario.wrongExplanation}
          </p>

          {/* Wrong MC: show the correct answer */}
          {!isCorrect && correctMCAnswer && (
            <div className="mt-5 pt-5 border-t border-white/8">
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2">
                La respuesta correcta era:
              </p>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-brand-yellow/8 border border-brand-yellow/20">
                <Check className="w-4 h-4 text-brand-yellow mt-0.5 flex-shrink-0" />
                <p className="text-brand-cream text-sm leading-relaxed font-medium">
                  {correctMCAnswer.text}
                </p>
              </div>
            </div>
          )}

          {/* Type-specific detail */}
          {renderOrderingDetail()}
          {renderMultiSelectDetail()}

          {/* Related concept */}
          <div className="flex flex-col gap-1 border-t border-white/8 pt-5 mt-5">
            <span className="text-white/30 text-[10px] font-bold uppercase tracking-wider">
              Concepto clave del video:
            </span>
            <span className="text-brand-cream text-sm italic">{scenario.relatedConcept}</span>
          </div>
        </motion.div>

        {/* ── Next Button ─────────────────────────────────────────────────────── */}
        <div className="flex justify-center">
          <button
            onClick={nextScenario}
            className="group flex items-center gap-3 border-2 border-brand-yellow text-brand-yellow font-bold py-4 px-10 rounded-[3px] text-sm uppercase tracking-widest hover:bg-brand-yellow hover:text-brand-black transition-all"
          >
            Siguiente Escenario
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
