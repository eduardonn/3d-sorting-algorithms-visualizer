import create from 'zustand'
import { createRandomArray } from '../utils';

export interface ArraySettings {
  numElements: number;
  minElement: number;
  maxElement: number;
}

export interface OptionalArraySettings {
  numElements?: number;
  minElement?: number;
  maxElement?: number;
}

interface ArrayStore {
  elements: Array<number>;
  setArrayElements: (elements: Array<number>) => void;
  arraySettings: ArraySettings;
  setArraySettings: (settings: OptionalArraySettings) => void;
  randomizeArrayElements: () => void;
}

export const useArrayStore = create<ArrayStore>(set => ({
  elements: createRandomArray(1, 10, 10),
  setArrayElements: elements => set(_ => ({ elements })),
  arraySettings: {
    numElements: 10,
    minElement: 1,
    maxElement: 10,
  },
  randomizeArrayElements: () => set(state => ({
    elements: createRandomArray(
      state.arraySettings.minElement,
      state.arraySettings.maxElement,
      state.arraySettings.numElements
    )
  })),
  setArraySettings: settings => {
    set(state => ({
      elements: createRandomArray(
        settings.minElement || state.arraySettings.minElement,
        settings.maxElement || state.arraySettings.maxElement,
        settings.numElements || state.arraySettings.numElements,
      ),
      arraySettings: { ...state.arraySettings, ...settings },
    })
    )
  },
}))