import { Func } from "@lib/internal/types";

/**
 * Returns the last element of a sequence.
 * @param source Native JavaScript array.
 * @returns The value at the last position in the source sequence.
 * @throws If the input `source` is `undefined`.
 * @throws If the input `source` sequence is empty.
 */
export function last<T>(source: Array<T>): T;

/**
 * Returns the last element of a sequence.
 * @param source Native JavaScript array.
 * @param predicate A function to test each element for a condition.
 * @returns The last element in the sequence that passes the test in the specified predicate function.
 * @throws If the input `source` is `undefined`.
 * @throws If the input `source` sequence is empty.
 * @throws If no element satisfies the condition in `predicate`.
 */
export function last<T>(source: Array<T>, predicate: Func<T, boolean>): T;

export function last<T>(source: Array<T>, predicate?: Func<T, boolean>): T {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    if (source.length === 0) {
        throw new Error('The source array is empty.');
    }

    const lastElement = getLastElement(source, predicate);

    if (!lastElement) {
        throw new Error('No element satisfies the condition in predicate');
    }

    return lastElement;
}

/**
 * Returns the last element of a sequence, or a default value if no element is found.
 * @param source Native JavaScript array.
 * @returns `undefined` if the `source` sequence is empty; otherwise, the last element in the `Array<T>`.
 * @throws {Error}`source` is `undefined`.
 */
export function lastOrDefault<T>(source: Array<T>): T | undefined;

/**
 * Returns the last element of a sequence, or a default value if no element is found.
 * @param source Native JavaScript array.
 * @param predicate A function to test each element for a condition.
 * @returns `undefined` if the sequence is empty or if no elements pass the test in the predicate function; otherwise, the last element that passes the test in the predicate function.
 * @throws {Error} `source` is `undefined`.
 */
export function lastOrDefault<T>(source: Array<T>, predicate: Func<T, boolean>): T | undefined;

export function lastOrDefault<T>(source: Array<T>, predicate?: Func<T, boolean>): T | undefined {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    if (source.length === 0) {
        return undefined;
    }
    
    return getLastElement(source, predicate);
}

function getLastElement<T>(source: Array<T>, predicate?: Func<T, boolean>): T | undefined {
    const length = source.length;

    if (!predicate) {
        return source[length - 1];
    }

    for (let i = length - 1; i >= 0; --i) {
        const element: T = source[i];

        if (predicate(element)) {
            return element;
        }
    }

    return undefined;
}