import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LicenseDisc, ScanResult, UserProfile, AppSettings } from './types';

interface AppState {
  user: UserProfile | null;
  scanHistory: ScanResult[];
  settings: AppSettings;
  setUser: (user: UserProfile | null) => void;
  addScanResult: (result: ScanResult) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  clearHistory: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      scanHistory: [],
      settings: {
        theme: 'system',
        notifications: true,
        autoScan: true,
        saveHistory: true,
      },
      setUser: (user) => set({ user }),
      addScanResult: (result) =>
        set((state) => ({
          scanHistory: [result, ...state.scanHistory],
        })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      clearHistory: () => set({ scanHistory: [] }),
    }),
    {
      name: 'quicklic-storage',
    }
  )
);