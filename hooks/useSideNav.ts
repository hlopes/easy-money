import { create } from 'zustand';

type SideNavState = {
  isOpen: boolean;
  toggle(): void;
  open(): void;
  close(): void;
};

const useSideNav = create<SideNavState>((set) => ({
  isOpen: false,
  toggle: () =>
    set((state: { isOpen: boolean }) => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useSideNav;
