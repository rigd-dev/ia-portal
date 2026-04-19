'use client';

import { useQuizStore } from '../hooks/useQuizStore';
import LandingScreen from './LandingScreen';
import ScenarioScreen from './ScenarioScreen';
import FeedbackScreen from './FeedbackScreen';
import ResultsScreen from './ResultsScreen';
import EmailScreen from './EmailScreen';
import AnimatedBackground from './AnimatedBackground';
import { AnimatePresence, motion } from 'framer-motion';

// Simple opacity fade — no position offsets, no competing layout shifts
const FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: 'easeInOut' },
} as const;

// Each screen sits absolutely so entering/exiting screens stack without layout shift
const screenStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  overflowY: 'auto',
};

export default function QuizContainer() {
  const gameStatus = useQuizStore((state) => state.gameStatus);

  return (
    // AnimatedBackground lives HERE — outside AnimatePresence — so it never
    // unmounts/remounts during screen transitions. This eliminates the visual
    // "pop" caused by the orbs re-initializing on every screen change.
    <div className="quiz-dark-theme" style={{ position: 'relative', minHeight: '100vh' }}>
      <AnimatedBackground />

      <AnimatePresence mode="wait">
        {gameStatus === 'landing' && (
          <motion.div key="landing" style={screenStyle} {...FADE}>
            <LandingScreen />
          </motion.div>
        )}

        {gameStatus === 'playing' && (
          <motion.div key="playing" style={screenStyle} {...FADE}>
            <ScenarioScreen />
          </motion.div>
        )}

        {gameStatus === 'feedback' && (
          <motion.div key="feedback" style={screenStyle} {...FADE}>
            <FeedbackScreen />
          </motion.div>
        )}

        {gameStatus === 'results' && (
          <motion.div key="results" style={screenStyle} {...FADE}>
            <ResultsScreen />
          </motion.div>
        )}

        {gameStatus === 'email' && (
          <motion.div key="email" style={screenStyle} {...FADE}>
            <EmailScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
