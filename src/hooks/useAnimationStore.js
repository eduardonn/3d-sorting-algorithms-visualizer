import create from 'zustand';

export const useAnimationStore = create(set => ({
  animDuration: 200,
}));