import { Func } from '@lib/internal/types';

/**
 * Returns the first element of a sequence.
 * @param source Native JavaScript array.
 * @returns The first element in the specified sequence.
 * @throws {Error} `source` is `undefined`.
 * @throws {Error} `source` sequence is empty.
 */
export function first<T>(source: Array<T>): T

/**
 * Returns the first element in a sequence that satisfies a specified condition.
 * @param source Native JavaScript array.
 * @param predicate A function to test each element for a condition.
 * @returns The first element in the sequence that passes the test in the specified predicate function.
 * @throws {Error} `source` is `undefined`.
 * @throws {Error} `source` sequence is empty.
 * @throws {Error} no element satisfies the condition in `predicate`.
 */
export function first<T>(source: Array<T>, predicate: Func<T, boolean>): T;

export function first<T>(source: Array<T>, predicate?: Func<T, boolean>): T {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    if (source.length === 0) {
        throw new Error('The source array is empty.');
    }

    const firstElement = getFirstElement(source, predicate);

    if (!firstElement) {
        throw new Error('No element satisfies the condition in predicate');
    }

    return firstElement;
}

/**
 * Returns the first element of a sequence, or a default value if the sequence contains no elements.
 * @param source Native JavaScript array.
 * @returns `undefined` if `source` is empty; otherwise, the first element in `source`.
 * @throws {Error} `source` is `undefined`.
 */
export function firstOrDefault<T>(source: Array<T>): T | undefined;

/**
 * Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.
 * @param source Native JavaScript array.
 * @param predicate A function to test each element for a condition.
 * @returns `undefined` if `source` is empty or if no element passes the test specified by `predicate`; otherwise, the first element in `source` that passes the test specified by `predicate`.
 * @throws {Error} `source` is `undefined`.
 */
export function firstOrDefault<T>(source: Array<T>, predicate: Func<T, boolean>): T | undefined;

export function firstOrDefault<T>(source: Array<T>, predicate?: Func<T, boolean>): T | undefined {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    return getFirstElement(source, predicate);
}

/**
 * Returns the first element of the sequence.
 * @param source Native JavaScript array.
 * @param predicate A function to test each element for a condition.
 */
function getFirstElement<T>(source: Array<T>, predicate?: Func<T, boolean>): T | undefined {
    if (!predicate) {
        return source.length > 0 ? source[0] : undefined;
    }

    const length: number = source.length;

    for (let i: number = 0; i < length; ++i) {
        const element: T = source[i];

        if (predicate(element)) {
            return element;
        }
    }

    return undefined;
}