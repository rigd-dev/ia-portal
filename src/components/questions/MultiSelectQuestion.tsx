'use client';

import { useQuizStore } from '../../hooks/useQuizStore';
import { MultiSelectScenario } from '../../data/scenarios';
import { motion, Variants } from 'framer-motion';

interface Props {
  scenario: MultiSelectScenario;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.35 } },
};

export default function MultiSelectQuestion({ scenario }: Props) {
  const { selectedMultipleIds, toggleMultiSelect } = useQuizStore();
  const count = selectedMultipleIds.length;

  return (
    <div className="max-w-[600px] mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-brand-tostado text-[10px] uppercase tracking-[0.2em] font-bold">
          {scenario.instruction}
        </p>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-brand-yellow text-[11px] font-bold"
          >
            {count} seleccionada{count !== 1 ? 's' : ''}
          </motion.span>
        )}
      </div>

      {/* Options */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3"
      >
        {scenario.options.map((option, index) => {
          const label = String.fromCharCode(65 + index);
          const isSelected = selectedMultipleIds.includes(option.id);

          return (
            <motion.button
              key={option.id}
              variants={itemVariants}
              onClick={() => toggleMultiSelect(option.id)}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              className={`
                relative w-full min-h-[72px] text-left p-5 rounded-lg transition-all border group
                ${
                  isSelected
                    ? 'bg-brand-yellow/5 border-brand-yellow/50 text-brand-cream shadow-[0_0_18px_rgba(255,208,0,0.07)]'
                    : 'bg-brand-black-soft border-brand-yellow/10 text-brand-cream-muted hover:border-brand-yellow/28'
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

              <p className="pl-6 pr-10 text-sm md:text-base font-medium leading-relaxed">
                {option.text}
              </p>

              {/* Checkbox */}
              <div
                className={`
                  absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0
                  ${isSelected ? 'bg-brand-yellow border-brand-yellow' : 'border-brand-yellow/20 group-hover:border-brand-yellow/40'}
                `}
              >
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 240 }}
                    className="text-brand-black text-[10px] font-black leading-none"
                  >
                    ✓
                  </motion.span>
                )}
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
