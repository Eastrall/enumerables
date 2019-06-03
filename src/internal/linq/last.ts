import { Func } from "../types";

/**
 * Returns the last element of a sequence.
 * @param source Native JavaScript array.
 */
export function last<T>(source: Array<T>): T;

/**
 * Returns the last element of a sequence.
 * @param source Native JavaScript array.
 * @param predicate A function to test each element for a condition.
 */
export function last<T>(source: Array<T>, predicate: Func<T, boolean>): T;

export function last<T>(source: Array<T>, predicate?: Func<T, boolean>): T {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    if (source.length === 0) {
        throw new Error('The source array is empty.');
    }

    if (!predicate) {
        return source[source.length - 1];
    }

    let length: number = source.length;

    for (let i = length - 1; i >= 0; --i) {
        const element: T = source[i];

        if (predicate(element)) {
            return element;
        }
    }

    throw new Error('No element satisfies the condition in predicate');
}

/**
 * Returns the last element of a sequence, or a default value if no element is found.
 * @param source Native JavaScript array.
 */
export function lastOrDefault<T>(source: Array<T>): T | undefined;

/**
 * Returns the last element of a sequence, or a default value if no element is found.
 * @param source Native JavaScript array.
 * @param predicate A function to test each element for a condition.
 */
export function lastOrDefault<T>(source: Array<T>, predicate: Func<T, boolean>): T | undefined;

export function lastOrDefault<T>(source: Array<T>, predicate?: Func<T, boolean>): T | undefined {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    if (source.length === 0) {
        return undefined;
    }
    
    if (!predicate) {
        return source[source.length - 1];
    }

    let length = source.length;

    for (let i = length - 1; i >= 0; --i) {
        const element: T = source[i];

        if (predicate(element)) {
            return element;
        }
    }

    return undefined;
}