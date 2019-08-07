import { Func } from '@lib/internal/types';

/**
 * Determines whether all elements of a sequence satisfy a condition.
 * @param source Native JavaScript array.
 * @param predicate A function to test each element for a condition.
 * @returns `true` if every element of the source sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, `false`.
 * @throws If the input `source` is `undefined`.
 * @throws If no element satisfies the condition in `predicate`.
 */
export function all<T>(source: Array<T>, predicate: Func<T, boolean>): boolean {
    if (!source) {
        throw new Error('source is undefined.');
    }

    if (!predicate) {
        throw new Error('predicate is undefined.');
    }

    const sourceArrayLength: number = source.length;

    for (let i = 0; i < sourceArrayLength; ++i) {
        if (predicate(source[i]) === false) {
            return false;
        }
    }
    
    return true;
}