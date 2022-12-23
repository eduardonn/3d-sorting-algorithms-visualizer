// import { benchmark } from "./benchmark";
        
const algorithmsList = [
    { name: 'insertion',    label: 'Insertion Sort' },
    { name: 'quick',        label: 'Quick Sort' },
    { name: 'selection',    label: 'Selection Sort' },
    { name: 'bubble',       label: 'Bubble Sort' },
    { name: 'bucket',       label: 'Bucket Sort' }
];

/**
 * Implements sorting algorithms and executes callback
 * functions at every action performed (e.g. swapping elements)
 * @param swapCallback called at every swap
 */
class AnimatedSorter {
    constructor(swapCallback) {
        this.swapCallback = swapCallback;
    }

    async quick(arr) {
        await this.partition(arr, 0, arr.length - 1);
        // await this.partitionRightToLeft(arr, 0, arr.length - 1);

        return arr;
    }

    async partition(arr, begin, end) {
        if (begin >= end) return;

        let nextPivotIndex = begin;
        let pivotIndex = end;

        for (let i = begin; i < end; ++i) {
            if (arr[i] < arr[pivotIndex]) {
                await this.swap(arr, i, nextPivotIndex++);
            }
        }
        await this.swap(arr, pivotIndex, nextPivotIndex);

        this.partition(arr, begin, nextPivotIndex - 1);
        this.partition(arr, nextPivotIndex + 1, end);
    }

    async partitionRightToLeft(arr, begin, end) {
        if (begin >= end) return;

        let nextPivotIndex = begin;
        let pivotIndex = end;

        for (let i = end - 1; i >= nextPivotIndex;) {
            if (arr[i] < arr[pivotIndex]) {
                await this.swap(arr, i, nextPivotIndex++);
            } else
                --i;
        }
        await this.swap(arr, pivotIndex, nextPivotIndex);

        await this.partitionRightToLeft(arr, begin, nextPivotIndex - 1);
        await this.partitionRightToLeft(arr, nextPivotIndex + 1, end);
    }

    async swap(arr, a, b) {
        await this.swapCallback(a, b);
        [arr[a], arr[b]] = [arr[b], arr[a]];
    }

    async insertion(arr) {
        let arrLength = arr.length;
        for (let i = 1; i < arrLength; ++i) {
            for (let j = i; j > 0; --j) {
                if (arr[j] < arr[j - 1]) {
                    await this.swap(arr, j, j - 1);
                } else {
                    break;
                }
            }
        }
    }

    async bubble(arr) {
        let arrLength = arr.length;
        for (let i = 0; i < arrLength; ++i) {
            for (let j = 0; j < arrLength - i - 1; ++j) {
                if (arr[j] > arr[j + 1]) {
                    await this.swap(arr, j, j + 1);
                }
            }
        }
    }

    async selection(arr) {
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
            await this.swap(arr, i, minElementIndex);
        }
    }
}

export { AnimatedSorter, algorithmsList }
