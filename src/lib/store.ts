import { create } from 'zustand';

export type PageView = 'home' | 'listing' | 'detail';

interface AppState {
  currentPage: PageView;
  selectedPropertyId: string | null;
  isAdvisorOpen: boolean;
  isMobileMenuOpen: boolean;
  searchQuery: string;
  setPage: (page: PageView) => void;
  selectProperty: (id: string | null) => void;
  toggleAdvisor: () => void;
  setAdvisorOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchQuery: (q: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'home',
  selectedPropertyId: null,
  isAdvisorOpen: false,
  isMobileMenuOpen: false,
  searchQuery: '',
  setPage: (page) => set({ currentPage: page }),
  selectProperty: (id) => set({ selectedPropertyId: id, currentPage: id ? 'detail' : 'home' }),
  toggleAdvisor: () => set((s) => ({ isAdvisorOpen: !s.isAdvisorOpen })),
  setAdvisorOpen: (open) => set({ isAdvisorOpen: open }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setSearchQuery: (q) => set({ searchQuery: q }),
}));
