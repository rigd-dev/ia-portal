'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuizStore } from '../../hooks/useQuizStore';
import { OrderingScenario } from '../../data/scenarios';
import { Reorder, useDragControls, motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';

interface Props {
  scenario: OrderingScenario;
}

// Fisher-Yates shuffle (runs once per scenario mount)
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Item = OrderingScenario['items'][number];

function DraggableItem({ item, index }: { item: Item; index: number }) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className="select-none list-none"
      whileDrag={{
        scale: 1.02,
        boxShadow: '0 8px 32px rgba(255,208,0,0.18)',
        zIndex: 50,
      }}
      transition={{ duration: 0.18 }}
    >
      <div className="flex items-center gap-4 min-h-[64px] px-4 py-3 rounded-lg border border-brand-yellow/20 bg-brand-black-soft cursor-default hover:border-brand-yellow/35 transition-colors">
        {/* Position number */}
        <span className="w-8 h-8 rounded-full bg-brand-yellow text-brand-black text-sm font-black flex items-center justify-center flex-shrink-0">
          {index + 1}
        </span>

        {/* Emoji + label */}
        <span className="text-xl flex-shrink-0">{item.emoji}</span>
        <span className="text-brand-cream font-bold text-base flex-1 leading-snug">
          {item.text}
        </span>

        {/* Drag handle */}
        <div
          className="touch-none cursor-grab active:cursor-grabbing p-1 text-brand-tostado/50 hover:text-brand-tostado transition-colors flex-shrink-0"
          onPointerDown={(e) => controls.start(e)}
        >
          <GripVertical className="w-5 h-5" />
        </div>
      </div>
    </Reorder.Item>
  );
}

export default function OrderingQuestion({ scenario }: Props) {
  const { setOrder } = useQuizStore();

  // Shuffle items once on mount
  const shuffledItems = useMemo(
    () => shuffle([...scenario.items]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scenario.id]
  );

  const [items, setItems] = useState<Item[]>(shuffledItems);

  // Always sync order to store (all items are always placed)
  useEffect(() => {
    setOrder(items.map((i) => i.id));
  }, [items, setOrder]);

  return (
    <div className="max-w-[560px] mx-auto w-full">
      <p className="text-brand-tostado text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
        {scenario.instruction}
      </p>
      <p className="text-brand-tostado/60 text-xs mb-6 flex items-center gap-1.5">
        <GripVertical className="w-3 h-3 inline" />
        Arrastra por el asa para reordenar
      </p>

      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="flex flex-col gap-3"
        style={{ listStyle: 'none', padding: 0, margin: 0 }}
      >
        {items.map((item, index) => (
          <DraggableItem key={item.id} item={item} index={index} />
        ))}
      </Reorder.Group>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-brand-tostado/40 text-[11px] text-center mt-6"
      >
        El orden actual se enviará al verificar
      </motion.p>
    </div>
  );
}
