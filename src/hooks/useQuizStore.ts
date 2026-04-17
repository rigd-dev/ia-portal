import { create } from 'zustand';
import { SCENARIOS } from '../data/scenarios';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type GameStatus = 'landing' | 'playing' | 'feedback' | 'results' | 'email';

export interface HistoryEntry {
  scenarioId: string;
  wasCorrect: boolean;
  points: number;
  // Saved answer state for feedback screen display
  userOrder?: string[];
  userMultiSelect?: string[];
}

interface QuizState {
  currentScenarioIndex: number;
  score: number;
  streak: number;
  history: HistoryEntry[];
  isComplete: boolean;
  gameStatus: GameStatus;

  // Per-question answer state
  selectedAnswerId: string | null;   // multiple-choice
  currentOrder: string[];            // ordering
  selectedMultipleIds: string[];     // multi-select

  lastPointsEarned: number;

  // Actions
  startQuiz: () => void;
  selectAnswer: (answerId: string) => void;
  setOrder: (order: string[]) => void;
  toggleMultiSelect: (id: string) => void;
  checkAnswer: () => void;
  nextScenario: () => void;
  resetQuiz: () => void;
  goToEmail: () => void;
}

// ─── Store ─────────────────────────────────────────────────────────────────────

export const useQuizStore = create<QuizState>((set, get) => ({
  currentScenarioIndex: 0,
  score: 0,
  streak: 0,
  history: [],
  isComplete: false,
  gameStatus: 'landing',
  selectedAnswerId: null,
  currentOrder: [],
  selectedMultipleIds: [],
  lastPointsEarned: 0,

  // ── Actions ──────────────────────────────────────────────────────────────────

  startQuiz: () =>
    set({
      gameStatus: 'playing',
      currentScenarioIndex: 0,
      score: 0,
      streak: 0,
      history: [],
      isComplete: false,
      selectedAnswerId: null,
      currentOrder: [],
      selectedMultipleIds: [],
      lastPointsEarned: 0,
    }),

  selectAnswer: (answerId) => set({ selectedAnswerId: answerId }),

  setOrder: (order) => set({ currentOrder: order }),

  toggleMultiSelect: (id) =>
    set((state) => ({
      selectedMultipleIds: state.selectedMultipleIds.includes(id)
        ? state.selectedMultipleIds.filter((x) => x !== id)
        : [...state.selectedMultipleIds, id],
    })),

  checkAnswer: () => {
    const {
      currentScenarioIndex,
      selectedAnswerId,
      currentOrder,
      selectedMultipleIds,
      streak,
      score,
    } = get();

    const scenario = SCENARIOS[currentScenarioIndex];
    let isCorrect = false;

    if (scenario.questionType === 'multiple-choice') {
      const answer = scenario.answers.find((a) => a.id === selectedAnswerId);
      isCorrect = answer?.isCorrect ?? false;

    } else if (scenario.questionType === 'ordering') {
      isCorrect =
        currentOrder.length === scenario.correctOrder.length &&
        currentOrder.every((id, idx) => id === scenario.correctOrder[idx]);

    } else if (scenario.questionType === 'multi-select') {
      const correctIds = scenario.options
        .filter((o) => o.isCorrect)
        .map((o) => o.id)
        .sort();
      const userIds = [...selectedMultipleIds].sort();
      isCorrect =
        correctIds.length === userIds.length &&
        correctIds.every((id, idx) => id === userIds[idx]);
    }

    // Scoring
    let points = 0;
    const newStreak = isCorrect ? streak + 1 : 0;

    if (isCorrect) {
      const diffMult = scenario.scoringMultiplier;
      let streakMult = 1.0;
      if (streak === 1) streakMult = 1.2;
      else if (streak >= 2) streakMult = 1.5;
      points = Math.round(100 * diffMult * streakMult);
    }

    // Save answer state in history so feedback screen can display it
    const historyEntry: HistoryEntry = {
      scenarioId: scenario.id,
      wasCorrect: isCorrect,
      points,
      ...(scenario.questionType === 'ordering' && { userOrder: [...currentOrder] }),
      ...(scenario.questionType === 'multi-select' && {
        userMultiSelect: [...selectedMultipleIds],
      }),
    };

    set((state) => ({
      gameStatus: 'feedback',
      score: score + points,
      streak: newStreak,
      lastPointsEarned: points,
      history: [...state.history, historyEntry],
    }));
  },

  nextScenario: () => {
    const { currentScenarioIndex } = get();
    if (currentScenarioIndex >= SCENARIOS.length - 1) {
      set({ gameStatus: 'results', isComplete: true });
    } else {
      set({
        currentScenarioIndex: currentScenarioIndex + 1,
        gameStatus: 'playing',
        selectedAnswerId: null,
        currentOrder: [],
        selectedMultipleIds: [],
      });
    }
  },

  goToEmail: () => set({ gameStatus: 'email' }),

  resetQuiz: () =>
    set({
      currentScenarioIndex: 0,
      score: 0,
      streak: 0,
      history: [],
      isComplete: false,
      gameStatus: 'landing',
      selectedAnswerId: null,
      currentOrder: [],
      selectedMultipleIds: [],
      lastPointsEarned: 0,
    }),
}));
