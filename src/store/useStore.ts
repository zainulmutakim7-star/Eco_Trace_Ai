// src/store/useStore.ts
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Activity, WasteReport, Challenge, UserData } from '@/lib/types';
import { calculateEcoScore } from '@/lib/ecoScore';

export type StoreState = {
  user: UserData;
  activities: Activity[];
  wasteReports: WasteReport[];
  challenges: Challenge[];
  leaderboard: any[]; // keep simple for now
  ecoScore: number;
  // actions
  addActivity: (activity: Activity) => void;
  addWasteReport: (report: WasteReport) => void;
  toggleChallengeJoin: (id: string) => void;
  updateChallengeProgress: (id: string, progress: number) => void;
  recalculateScore: () => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: { name: 'Pengguna', points: 0 },
      activities: [],
      wasteReports: [],
      challenges: [],
      leaderboard: [],
      ecoScore: 0,
      addActivity: (activity) =>
        set((state) => {
          const newActivities = [...state.activities, activity];
          return { activities: newActivities };
        }),
      addWasteReport: (report) =>
        set((state) => {
          const newReports = [...state.wasteReports, report];
          const newPoints = state.user.points + 10; // simple points per report
          return {
            wasteReports: newReports,
            user: { ...state.user, points: newPoints },
          };
        }),
      toggleChallengeJoin: (id) =>
        set((state) => {
          const updated = state.challenges.map((c) =>
            c.id === id ? { ...c, joined: !c.joined } : c
          );
          return { challenges: updated };
        }),
      updateChallengeProgress: (id, progress) =>
        set((state) => {
          const updated = state.challenges.map((c) =>
            c.id === id ? { ...c, progress } : c
          );
          return { challenges: updated };
        }),
      recalculateScore: () => {
        const { activities, wasteReports, challenges, user } = get();
        const score = calculateEcoScore({ activities, wasteReports, challenges, points: user.points });
        set({ ecoScore: score });
      },
    }),
    {
      name: 'ecotrace-store', // key in localStorage
      getStorage: () => localStorage,
    }
  )
);
