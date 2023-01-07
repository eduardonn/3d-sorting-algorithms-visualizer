import create from 'zustand';

type StartAnimation = (algorithmOption: string) => void;

interface AnimationState {
  animSpeed: number;
  setAnimSpeed: (value: number) => void;
  handleSortButton: StartAnimation;
  setHandleSortButton: (animationCallback: StartAnimation) => void;
  handleRandomizeButton: () => void;
  setHandleRandomizeButton: (randomizeButtonCallback: () => void) => void;
}

export const useAnimationStore = create<AnimationState>(set => ({
  animSpeed: 1,
  setAnimSpeed: value => set(() => ({animSpeed: value})),
  handleSortButton: algorithmOption => { console.warn('startAnimation hasn\'t been set') },
  setHandleSortButton: animationCallback => set(() => ({
    handleSortButton: animationCallback,
  })),
  handleRandomizeButton: () => { console.warn('handleRandomizeButton hasn\'t been set') },
  setHandleRandomizeButton: randomizeButtonCallback => set(() => ({
    handleRandomizeButton: randomizeButtonCallback,
  })),
}));