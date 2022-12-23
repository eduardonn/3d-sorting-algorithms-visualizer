import create from 'zustand'
import { createRandomArray } from '../utils';

interface ArraySettings {
  amountElements: number;
  minElement: number;
  maxElement: number;
}

interface ArrayState {
  elements: Array<number>;
  setArrayElements: (elements: Array<number>) => void;
  arraySettings: ArraySettings;
  setArraySettings: (settings: ArraySettings) => void;
}

export const useArrayStore = create<ArrayState>(set => ({
  elements: createRandomArray(1, 10, 10),
  setArrayElements: elements => set(_ => ({ elements })),
  arraySettings: {
    amountElements: 10,
    minElement: 1,
    maxElement: 10,
  },
  setArraySettings: settings => { 
    set(
      state => ({
        elements: createRandomArray(
          settings.minElement || state.arraySettings.minElement,
          settings.maxElement || state.arraySettings.maxElement,
          settings.amountElements || state.arraySettings.amountElements,
        ),
        arraySettings: { ...state.arraySettings, ...settings },
      })
    )
  },
}))