import { Func } from '@lib/internal/types';

/**
 * Returns a number that represents how many elements in the specified sequence satisfy a condition.
 * @param source Native JavaScript array that contains elements to be tested and counted.
 * @param predicate A function to test each element for a condition.
 * @returns The number of elements in the input sequence.
 * @throws {Error} `source` is `undefined`.
 */
export function count<T>(source: Array<T>, predicate?: Func<T, boolean>): number {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    let count: number = 0;
    let length: number = source.length;

    if (!predicate) {
        return length;
    }

    for (let i = 0; i < length; ++i) {
        if (predicate(source[i])) {
            ++count;
        }    
    }

    return count;
}