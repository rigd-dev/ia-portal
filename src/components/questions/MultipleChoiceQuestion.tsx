'use client';

import { useQuizStore } from '../../hooks/useQuizStore';
import { MultipleChoiceScenario } from '../../data/scenarios';
import { motion, Variants } from 'framer-motion';

interface Props {
  scenario: MultipleChoiceScenario;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.35 } },
};

export default function MultipleChoiceQuestion({ scenario }: Props) {
  const { selectedAnswerId, selectAnswer } = useQuizStore();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-3 max-w-[600px] mx-auto w-full"
    >
      {scenario.answers.map((answer, index) => {
        const label = String.fromCharCode(65 + index); // A B C D
        const isSelected = selectedAnswerId === answer.id;

        return (
          <motion.button
            key={answer.id}
            variants={itemVariants}
            onClick={() => selectAnswer(answer.id)}
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
            className={`
              relative w-full min-h-[72px] text-left p-5 rounded-lg transition-all border group
              ${
                isSelected
                  ? 'bg-brand-yellow/5 border-brand-yellow/50 text-brand-cream shadow-[0_0_18px_rgba(255,208,0,0.08)]'
                  : 'bg-brand-black-soft border-brand-yellow/10 text-brand-cream-muted hover:border-brand-yellow/28 hover:bg-brand-black-soft/80'
              }
            `}
          >
            {/* Letter label */}
            <span
              className={`
                absolute left-3 top-3 text-[9px] font-bold uppercase tracking-wider transition-colors
                ${isSelected ? 'text-brand-yellow' : 'text-brand-tostado group-hover:text-brand-yellow/50'}
              `}
            >
              {label}
            </span>

            <p className="pl-6 text-sm md:text-base font-medium leading-relaxed">
              {answer.text}
            </p>

            {/* Check indicator */}
            {isSelected && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 14, stiffness: 200 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-brand-yellow flex items-center justify-center"
              >
                <span className="text-brand-black text-[10px] font-black leading-none">
                  ✓
                </span>
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
