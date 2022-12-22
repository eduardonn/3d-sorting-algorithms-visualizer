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
  elements: createRandomArray(0, 10, 10),
  setArrayElements: elements => set(_ => ({ elements })),
  arraySettings: {
    amountElements: 10,
    minElement: 0,
    maxElement: 10,
  },
  setArraySettings: settings => { 
    set(
      state => ({ arraySettings: { ...state.arraySettings, ...settings } })
    )
  },
}))