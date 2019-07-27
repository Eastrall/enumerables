import { Func } from '../types';

/**
 * Determines whether a sequence contains any elements.
 * @param source Native JavaScript array.
 * @returns `true` if the source sequence contains any elements; otherwise, `false`.
 * @throws {Error} `source` is `undefined`.
 */
export function any<T>(source: Array<T>): boolean;

/**
 * Determines whether any element of a sequence satisfies a condition.
 * @param source Native JavaScript array.
 * @param predicate A function to test each element for a condition.
 * @returns `true` if any elements in the source sequence pass the test in the specified predicate; otherwise, `false`.
 * @throws {Error} `source` is `undefined`.
 */
export function any<T>(source: Array<T>, predicate: Func<T, boolean>): boolean;

export function any<T>(source: Array<T>, predicate?: Func<T, boolean>): boolean {
    if (!source) {
        throw new Error('source is undefined.');
    }

    if (!predicate) {
        return source.length > 0;
    }

    const sourceArrayLength: number = source.length;

    for (let i = 0; i < sourceArrayLength; ++i) {
        if (predicate(source[i])) {
            return true;
        }
    }

    return false;
}