'use client';

import { motion, Variants } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(#FFD00004 1px, transparent 1px),
            linear-gradient(90deg, #FFD00004 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Floating orb — top left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 560,
          height: 560,
          left: '5%',
          top: '-10%',
          background:
            'radial-gradient(circle, rgba(255,208,0,0.055) 0%, transparent 68%)',
          filter: 'blur(72px)',
        }}
        animate={{ x: [0, 35, -18, 0], y: [0, -28, 22, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating orb — bottom right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 380,
          height: 380,
          right: '-5%',
          bottom: '5%',
          background:
            'radial-gradient(circle, rgba(255,208,0,0.04) 0%, transparent 68%)',
          filter: 'blur(56px)',
        }}
        animate={{ x: [0, -30, 14, 0], y: [0, 22, -26, 0] }}
        transition={{
          duration: 20,
          delay: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating orb — center right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 260,
          height: 260,
          left: '62%',
          top: '55%',
          background:
            'radial-gradient(circle, rgba(255,208,0,0.03) 0%, transparent 68%)',
          filter: 'blur(44px)',
        }}
        animate={{ x: [0, 18, -12, 0], y: [0, -14, 10, 0] }}
        transition={{
          duration: 18,
          delay: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
