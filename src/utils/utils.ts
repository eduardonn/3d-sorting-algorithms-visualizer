/**
 * Creates a random array with the specified parameters
 * @param minElement minimum value in the array 
 * @param maxElement maximum value in the array
 * @param numElements length of the array
*/
export function createRandomArray(
    minElement: number = 0,
    maxElement: number = 10,
    numElements: number = 10): Array<number> {
  return Array(numElements).fill(null).map(() => {
    return Math.random() * (maxElement - minElement) + minElement;
  });
}