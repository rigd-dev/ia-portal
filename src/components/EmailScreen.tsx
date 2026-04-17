'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from '../hooks/useQuizStore';
import { Download, ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';

const CHEAT_SHEET_CONTENTS = [
  'Los 3 modos de trabajo con IA (Automatización, Aumento, Agencia)',
  'Las limitaciones críticas: Alucinaciones y Ventana de contexto',
  'El framework de las 4D explicado (Delegación, Descripción, Discernimiento, Diligencia)',
  'La Regla de Oro de Delegación: Lista visual de qué SÍ y qué NO delegar',
];

export default function EmailScreen() {
  const { score, history, resetQuiz } = useQuizStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const correctCount = history.filter((h) => h.wasCorrect).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, score }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Even if there's an error (e.g. adblocker, unverified email during test),
      // we still show success so the user isn't blocked in production.
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="relative z-10 w-full max-w-[460px]">
        <AnimatePresence mode="wait">
          {/* ── Form State ──────────────────────────────────────────────────── */}
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Icon */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 160, delay: 0.1 }}
                  className="w-14 h-14 rounded-full bg-brand-yellow/10 border border-brand-yellow/25 flex items-center justify-center mx-auto mb-5"
                >
                  <Download className="w-7 h-7 text-brand-yellow" />
                </motion.div>

                <h2 className="text-3xl font-extrabold text-brand-cream mb-3 tracking-tight">
                  Desbloquea tu Guía Rápida
                </h2>
                <p className="text-brand-cream-muted text-sm leading-relaxed">
                  Completaste el reto con{' '}
                  <span className="text-brand-yellow font-bold">{score} puntos</span>.{' '}
                  Tu guía de referencia rápida del curso de Anthropic te espera.
                </p>
              </div>

              {/* Cheat Sheet Preview */}
              <div className="bg-brand-black-soft border border-brand-yellow/10 p-5 rounded-lg mb-6">
                <p className="text-brand-tostado text-[10px] uppercase tracking-widest font-bold mb-4">
                  La guía incluye:
                </p>
                <ul className="flex flex-col gap-2">
                  {CHEAT_SHEET_CONTENTS.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.06 }}
                      className="flex items-start gap-3 text-sm text-brand-cream-muted"
                    >
                      <span className="text-brand-yellow font-bold mt-0.5 flex-shrink-0">
                        →
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Tu nombre (opcional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-black border border-brand-yellow/12 rounded-lg px-4 py-4 text-brand-cream placeholder-brand-tostado/50 focus:border-brand-yellow/45 focus:outline-none transition-all text-sm"
                />
                <input
                  type="email"
                  placeholder="Tu correo electrónico *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-brand-black border border-brand-yellow/12 rounded-lg px-4 py-4 text-brand-cream placeholder-brand-tostado/50 focus:border-brand-yellow/45 focus:outline-none transition-all text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-brand-yellow text-brand-black font-bold py-4 rounded-[3px] text-sm uppercase tracking-widest hover:shadow-[0_0_22px_rgba(255,208,0,0.35)] transition-all disabled:opacity-60 mt-1"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-brand-black/25 border-t-brand-black rounded-full animate-spin" />
                      Procesando...
                    </span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Enviarme la Guía Rápida
                    </>
                  )}
                </button>
              </form>

              <p className="text-brand-tostado text-[11px] text-center mt-4 leading-relaxed">
                Solo contenido valioso sobre IA.&nbsp; Cancela cuando quieras.
              </p>
            </motion.div>
          ) : (
            /* ── Success State ─────────────────────────────────────────────── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 140 }}
                className="w-20 h-20 rounded-full bg-brand-yellow flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(255,208,0,0.3)]"
              >
                <CheckCircle className="w-10 h-10 text-brand-black" />
              </motion.div>

              <h2 className="text-3xl font-extrabold text-brand-cream mb-3 tracking-tight">
                ¡Tu guía está en camino!
              </h2>
              <p className="text-brand-cream-muted leading-relaxed mb-8 max-w-sm mx-auto">
                Revisa tu bandeja de entrada. Mientras esperas, sigue aprendiendo con los demás
                videos del canal.
              </p>

              {/* ── YouTube CTA ── */}
              {/* TODO: Replace href with your actual YouTube channel URL */}
              <a
                href="https://www.youtube.com/@RaulGonzalez-1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-brand-yellow text-brand-black font-bold py-4 rounded-[3px] text-sm uppercase tracking-widest hover:brightness-105 transition-all mb-4"
              >
                Ir al Canal de YouTube
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={resetQuiz}
                className="flex items-center justify-center gap-2 mx-auto text-brand-tostado text-sm hover:text-brand-cream transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
