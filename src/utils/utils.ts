/**
 * Creates a random array with the specified parameters
 * @param minElement minimum value in the array 
 * @param maxElement maximum value in the array
 * @param numElements length of the array
*/
export function createRandomArray(minElement: number, maxElement: number, numElements: number): Array<number> {
    return Array(numElements).fill(null).map((_, __) => {
        return Math.random() * (maxElement - minElement + 1) - minElement;
    });
}