// import { benchmark } from "./benchmark";

type AlgorithmsList = Array<{
  name: string;
  label: string;
}>

export type SwapCallback = (a: number, b: number, speedMultiplier: number) => Promise<unknown>;
export type SetColorCallback = (index: number, color: number, speedMultiplier?: number) => Promise<unknown>;
export type ResetColorCallback = (index: number, speedMultiplier?: number) => Promise<unknown>;

/**
 * To add a new sorting technique, just add it to the array and
 * implement a method with the same name in AnimatedSorter.
 * The button is added automatically to the UI.
*/ 
export const algorithmsList: AlgorithmsList = [
  { name: 'insertion',      label: 'Insertion Sort' },
  { name: 'quick',          label: 'Quick Sort' },
  { name: 'selection',      label: 'Selection Sort' },
  { name: 'bubble',         label: 'Bubble Sort' },
  // TODO: Implement
  // { name: 'bucket',    label: 'Bucket Sort' },
  // { name: 'merge',     label: 'Merge Sort' },
];

const colors = [0x5555DD, 0x55DD55, 0xDD5555];

const getColor = (index: number) => {
  const color = colors[index];
  return color ? color : Math.random() * 0xEEEEEE;
}

/**
 * Implements sorting algorithms and executes callback
 * functions at every action performed (e.g. swapping elements)
 * @param swapCallback called at every swap
 * @param setElementColor called to change element's color
 * @param resetElementColor called to reset element's color
 */
export class AnimatedSorter {
  swapCallback: SwapCallback;
  setElementColor: SetColorCallback;
  resetElementColor: ResetColorCallback;
  shouldStop: ((value: unknown) => void) | null;
  isRunning: boolean;

  constructor(
    swapCallback: SwapCallback,
    setElementColor: SetColorCallback,
    resetElementColor: ResetColorCallback) {
    this.swapCallback = swapCallback;
    this.setElementColor = setElementColor;
    this.resetElementColor = resetElementColor;
    this.shouldStop = null;
    this.isRunning = false;
  }

  async insertion(arr: number[]) {
    this.isRunning = true;

    let arrLength = arr.length;
    for (let i = 1; i < arrLength; ++i) {
      for (let j = i; j > 0; --j) {
        this.setElementColor(j, getColor(0));
        if (this.checkShouldStop(arr)) return;
        await this.setElementColor(j - 1, getColor(0), .5);
        if (this.checkShouldStop(arr)) return;

        if (arr[j] < arr[j - 1]) {
          await this.swap(arr, j, j - 1);
          if (this.checkShouldStop(arr)) return;
          this.resetElementColor(j);
          await this.resetElementColor(j - 1, .3);
          if (this.checkShouldStop(arr)) return;
      } else {
          this.resetElementColor(j);
          await this.resetElementColor(j - 1, .3);
          if (this.checkShouldStop(arr)) return;
          break;
        }
      }
    }
    this.isRunning = false;
  }

  async quick(arr: number[]) {
    this.isRunning = true;
    
    await this.partition(arr, 0, arr.length - 1);
    // await this.partitionRightToLeft(arr, 0, arr.length - 1);

    this.resetAllElementsColor(arr);

    this.isRunning = false;

    return arr;
  }

  private async partition(arr: number[], begin: number, end: number): Promise<unknown> {
    if (begin >= end) return;

    const partitionColor = getColor(-1);
    for (let i = begin; i <= end; ++i) {
      this.setElementColor(i, partitionColor);
    }

    let nextPivotIndex = begin;
    let pivotIndex = end;
    this.setElementColor(pivotIndex, getColor(2));

    for (let i = begin; i < end; ++i) {
      await this.setElementColor(i, getColor(0), 0.5);
      if (this.checkShouldStop(arr)) return;
      if (arr[i] < arr[pivotIndex]) {
        await this.swap(arr, i, nextPivotIndex);
        this.setElementColor(nextPivotIndex, partitionColor);
        ++nextPivotIndex;
      } else
        this.setElementColor(i, partitionColor);

      if (this.checkShouldStop(arr)) return;
    }
    await this.swap(arr, pivotIndex, nextPivotIndex);
    if (this.checkShouldStop(arr)) return;
    await this.resetElementColor(nextPivotIndex);
    if (this.checkShouldStop(arr)) return;

    return Promise.all([
      this.partition(arr, begin, nextPivotIndex - 1).then(() => {
        for (let i = begin; i < nextPivotIndex; ++i) {
          this.resetElementColor(i);
        }
      }),
      this.partition(arr, nextPivotIndex + 1, end)
    ]);
  }

  private async partitionRightToLeft(arr: number[], begin: number, end: number): Promise<unknown> {
    if (begin >= end) return;

    let nextPivotIndex = begin;
    let pivotIndex = end;

    for (let i = end - 1; i >= nextPivotIndex;) {
      if (arr[i] < arr[pivotIndex]) {
        if (this.checkShouldStop(arr)) return;
        await this.swap(arr, i, nextPivotIndex++);
      } else
        --i;
    }
    if (this.checkShouldStop(arr)) return;
    await this.swap(arr, pivotIndex, nextPivotIndex);

    return Promise.all([
      this.partitionRightToLeft(arr, begin, nextPivotIndex - 1),
      this.partitionRightToLeft(arr, nextPivotIndex + 1, end)
    ]);
  }

  async bubble(arr: number[]) {
    this.isRunning = true;
    
    let arrLength = arr.length;
    for (let i = 0; i < arrLength; ++i) {
      for (let j = 0; j < arrLength - i - 1; ++j) {
        this.setElementColor(j, getColor(0));
        await this.setElementColor(j + 1, getColor(0), .5);
        if (this.checkShouldStop(arr)) return;
        if (arr[j] > arr[j + 1]) {
          await this.swap(arr, j, j + 1);
          if (this.checkShouldStop(arr)) return;
        }
        this.resetElementColor(j);
        await this.resetElementColor(j + 1, .5);
        if (this.checkShouldStop(arr)) return;
      }
    }

    this.isRunning = false;
  }

  async selection(arr: number[]) {
    this.isRunning = true;
    
    let arrLength = arr.length;
    let minElement = Infinity;
    let minElementIndex;

    for (let i = 0; i < arrLength; ++i) {
      minElementIndex = i;
      minElement = arr[i];
      await this.setElementColor(minElementIndex, getColor(1), .3);
      if (this.checkShouldStop(arr)) return;

      for (let j = i + 1; j < arrLength; ++j) {
        await this.setElementColor(j, getColor(0));
        if (this.checkShouldStop(arr)) return;
        if (arr[j] < minElement) {
          this.resetElementColor(minElementIndex);
          await this.setElementColor(j, getColor(1));
          if (this.checkShouldStop(arr)) return;
          minElement = arr[j];
          minElementIndex = j;
        } else
          this.resetElementColor(j);
      }
      await this.swap(arr, i, minElementIndex);
      if (this.checkShouldStop(arr)) return;
      this.resetElementColor(i, .3);
      await this.resetElementColor(minElementIndex, .3);
    }

    this.isRunning = false;
  }

  private async swap(arr: number[], a: number, b: number) {
    if (a === b) return;

    await this.swapCallback(a, b, 1);
    [arr[a], arr[b]] = [arr[b], arr[a]];
  }

  private resetAllElementsColor(arr: number[]) {
    for (let i = 0; i <= arr.length - 1; ++i) {
      this.resetElementColor(i);
    }
  }

  private checkShouldStop(arr: number[]) {
    if (this.shouldStop) {
      this.isRunning = false;
      this.resetAllElementsColor(arr);
      const resolve = this.shouldStop; 
      this.shouldStop = null;
      resolve(null);
      return true;
    }

    return false;
  }

  async stop() {
    if (this.isRunning)
      return new Promise((res) => this.shouldStop = res);
    else
      return;
  }
}
