import create from 'zustand';
import { AnimatedSorter } from '../utils/animatedSortings';

type StartAnimation = (algorithmOption: keyof AnimatedSorter) => void;

interface AnimationState {
  animDuration: number;
  startAnimation: StartAnimation;
  setStartAnimation: (animationCallback: StartAnimation) => void;
}

export const useAnimationStore = create<AnimationState>(set => ({
  animDuration: 200,
  startAnimation: algorithmOption => { console.log ('startAnimation hasn\'t been set') },
  setStartAnimation: animationCallback => set(() => ({
    startAnimation: animationCallback,
  }))
}));