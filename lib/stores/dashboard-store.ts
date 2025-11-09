import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DayStatus = 'locked' | 'current' | 'completed' | 'in-progress';

export interface LessonProgress {
  totalCards: number;
  viewedCards: number;
  completedActivities: number;
}

export interface DashboardState {
  // Journey Progress
  currentDay: number;
  completedDays: number[];
  inProgressDays: Map<number, LessonProgress>;
  totalDays: number;
  streakCount: number;

  // Actions
  completeDay: (dayNumber: number) => void;
  updateLessonProgress: (dayNumber: number, progress: LessonProgress) => void;
  getDayStatus: (dayNumber: number) => DayStatus;
  unlockNextDay: () => void;
  resetProgress: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentDay: 1,
      completedDays: [],
      inProgressDays: new Map(),
      totalDays: 30, // 30-day journey
      streakCount: 0,

      // Complete a day
      completeDay: (dayNumber: number) => {
        set((state) => {
          const newCompletedDays = [...state.completedDays, dayNumber];
          const newInProgressDays = new Map(state.inProgressDays);
          newInProgressDays.delete(dayNumber);

          return {
            completedDays: newCompletedDays,
            inProgressDays: newInProgressDays,
            currentDay: dayNumber + 1,
            streakCount: state.streakCount + 1,
          };
        });
      },

      // Update progress for a day's lessons
      updateLessonProgress: (dayNumber: number, progress: LessonProgress) => {
        set((state) => {
          const newInProgressDays = new Map(state.inProgressDays);
          newInProgressDays.set(dayNumber, progress);

          return {
            inProgressDays: newInProgressDays,
          };
        });
      },

      // Get status of a specific day - all days are accessible
      getDayStatus: (dayNumber: number): DayStatus => {
        const state = get();

        if (state.completedDays.includes(dayNumber)) {
          return 'completed';
        }

        if (dayNumber === state.currentDay) {
          return state.inProgressDays.has(dayNumber) ? 'in-progress' : 'current';
        }

        if (state.inProgressDays.has(dayNumber)) {
          return 'in-progress';
        }

        // All days are accessible, return 'current' for未完成 days
        return 'current';
      },

      // Unlock next day (called after completion)
      unlockNextDay: () => {
        set((state) => ({
          currentDay: Math.min(state.currentDay + 1, state.totalDays),
        }));
      },

      // Reset all progress
      resetProgress: () => {
        set({
          currentDay: 1,
          completedDays: [],
          inProgressDays: new Map(),
          streakCount: 0,
        });
      },
    }),
    {
      name: 'dashboard-storage',
      // Convert Map to array for localStorage
      partialize: (state) => ({
        currentDay: state.currentDay,
        completedDays: state.completedDays,
        inProgressDays: Array.from(state.inProgressDays.entries()),
        totalDays: state.totalDays,
        streakCount: state.streakCount,
      }),
      // @ts-ignore - Restore Map from array
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.inProgressDays)) {
          state.inProgressDays = new Map(state.inProgressDays);
        }
      },
    }
  )
);
