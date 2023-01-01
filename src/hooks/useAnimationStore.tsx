import create from 'zustand';

type StartAnimation = (algorithmOption: string) => void;

interface AnimationState {
  animDuration: number;
  setAnimDuration: (value: number) => void;
  startAnimation: StartAnimation;
  setStartAnimation: (animationCallback: StartAnimation) => void;
}

export const useAnimationStore = create<AnimationState>(set => ({
  animDuration: 750,
  setAnimDuration: value => set(() => ({animDuration: value})),
  startAnimation: algorithmOption => { console.warn('startAnimation hasn\'t been set') },
  setStartAnimation: animationCallback => set(() => ({
    startAnimation: animationCallback,
  }))
}));