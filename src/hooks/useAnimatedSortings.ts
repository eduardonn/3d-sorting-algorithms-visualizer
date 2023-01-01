// import { benchmark } from "./benchmark";

import { useAnimationStore } from "./useAnimationStore";

export const algorithmsList = [
  { name: 'insertion',    label: 'Insertion Sort' },
  { name: 'quick',        label: 'Quick Sort' },
  { name: 'selection',    label: 'Selection Sort' },
  { name: 'bubble',       label: 'Bubble Sort' },
  { name: 'bucket',       label: 'Bucket Sort' },
  { name: 'merge',        label: 'Merge Sort' },
];

type swapCallbackType = (a: number, b: number, durationMs: number) => Promise<void>;

export const useAnimatedSortings = (durationMs: number = 200) => {
  const [ animDuration ] = useAnimationStore(
    state => [ state.animDuration ]);
  
  console.log('in useAnimatedSortings');

  const quick = async (arr: Array<number>, swapCallback: swapCallbackType) => {
    const partition = async (arr: Array<number>, begin: number, end: number) => {
      if (begin >= end) return;

      let nextPivotIndex = begin;
      let pivotIndex = end;

      for (let i = begin; i < end; ++i) {
        if (arr[i] < arr[pivotIndex]) {
          await swap(arr, i, nextPivotIndex++, swapCallback);
        }
      }
      await swap(arr, pivotIndex, nextPivotIndex, swapCallback);

      partition(arr, begin, nextPivotIndex - 1);
      partition(arr, nextPivotIndex + 1, end);
    }

    const partitionRightToLeft = async (arr: Array<number>, begin: number, end: number) => {
      if (begin >= end) return;

      let nextPivotIndex = begin;
      let pivotIndex = end;

      for (let i = end - 1; i >= nextPivotIndex;) {
        if (arr[i] < arr[pivotIndex]) {
          await swap(arr, i, nextPivotIndex++, swapCallback);
        } else
          --i;
      }
      await swap(arr, pivotIndex, nextPivotIndex, swapCallback);

      await partitionRightToLeft(arr, begin, nextPivotIndex - 1);
      await partitionRightToLeft(arr, nextPivotIndex + 1, end);
    }

    await partition(arr, 0, arr.length - 1);
    // await this.partitionRightToLeft(arr, 0, arr.length - 1);

    return arr;
  }

  const swap = async (arr: Array<number>, a: number, b: number, swapCallback: swapCallbackType) => {
    if (a === b) return;

    await swapCallback(a, b, animDuration);
    [arr[a], arr[b]] = [arr[b], arr[a]];
  }

  const insertion = async (arr: Array<number>, swapCallback: swapCallbackType) => {
    let arrLength = arr.length;
    for (let i = 1; i < arrLength; ++i) {
      for (let j = i; j > 0; --j) {
        if (arr[j] < arr[j - 1]) {
          await swap(arr, j, j - 1, swapCallback);
        } else {
          break;
        }
      }
    }
  }

  const bubble = async (arr: Array<number>, swapCallback: swapCallbackType) => {
    let arrLength = arr.length;
    for (let i = 0; i < arrLength; ++i)
      for (let j = 0; j < arrLength - i - 1; ++j)
        if (arr[j] > arr[j + 1])
          await swap(arr, j, j + 1, swapCallback);
  }

  const selection = async (arr: Array<number>, swapCallback: swapCallbackType) => {
    let arrLength = arr.length;
    let minElement = Infinity;
    let minElementIndex;

    for (let i = 0; i < arrLength; ++i) {
      minElementIndex = i;
      minElement = arr[i];
      for (let j = i; j < arrLength; ++j) {
        if (arr[j] <= minElement) {
          minElement = arr[j];
          minElementIndex = j;
        }
      }
      await swap(arr, i, minElementIndex, swapCallback);
    }
  }

  return { insertion, quick, selection, bubble };
}

// export { algorithmsList, insertion, quick, selection, bubble }
