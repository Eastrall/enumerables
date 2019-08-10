import { Func } from "@lib/internal/types";

/**
 * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
 * @param source Native JavaScript array.
 * @returns The single element of the input sequence.
 * @throws {Error} `source` is `undefined`.
 * @throws {Error} input sequence is empty.
 * @throws {Error} input sequence contains more than one element.
 */
export function single<T>(source: Array<T>): T;

/**
 * Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists.
 * @param source Native JavaScript array.
 * @param predicate A function to test an element for a condition.
 * @returns The single element of the input sequence that satisfies a condition.
 * @throws {Error} `source` is `undefined`.
 * @throws {Error} sequence is empty.
 * @throws {Error} more than one element satisfies the condition in `predicate`.
 * @throws {Error} no element satisfies the condition in `predicate`.
 */
export function single<T>(source: Array<T>, predicate: Func<T, boolean>): T;
export function single<T>(source: Array<T>, predicate?: Func<T, boolean>): T {
    if (!source) {
        throw new Error('source is undefined');
    }

    const sourceArrayLength: number = source.length;

    if (sourceArrayLength === 0) {
        throw new Error('source is empty.');
    }
    
    if (predicate) {
        for (let i = 0; i < sourceArrayLength; ++i) {
            if (predicate(source[i])) {
                const element: T = source[i];
                
                for (i = i + 1; i < sourceArrayLength; ++i) {
                    if (predicate(source[i])) {
                        throw new Error('more than one element satisfies the condition in predicate.');
                    }
                }

                return element;
            }
        }

        throw new Error('no element satisfies the condition in predicate.');
    }
    else {
        if (sourceArrayLength > 1) {
            throw new Error('source contains more than one element.');
        }
    
        return source[0];
    }
}

/**
 * Returns the only element of a sequence, or an `undefined` if the sequence is empty; this method throws an exception if there is more than one element in the sequence.
 * @param source Native JavaScript array.
 * @returns The single element of the input sequence, or `undefined` if the sequence contains no elements.
 * @throws {Error} `source` is `undefined`.
 * @throws {Error} sequence contains more than one element.
 */
export function singleOrDefault<T>(source: Array<T>): T | undefined;

/**
 * Returns the only element of a sequence that satisfies a specified condition or an `undefined` value if no such element exists; this method throws an exception if more than one element satisfies the condition.
 * @param source Native JavaSript array.
 * @param predicate A function to test an element for a condition.
 * @returns The single element of the input sequence that satisfies the condition, or `undefined` if no such element is found.
 * @throws {Error} `source` is `undefined`.
 * @throws {Error} more than one element satisfies the condition in `predicate`.
 * 
 */
export function singleOrDefault<T>(source: Array<T>, predicate: Func<T, boolean>): T | undefined;
export function singleOrDefault<T>(source: Array<T>, predicate?: Func<T, boolean>): T | undefined {
    if (!source) {
        throw new Error('source is undefined');
    }

    const sourceArrayLength: number = source.length;
    
    if (sourceArrayLength === 0) {
        return undefined;
    }

    if (predicate) {
        for (let i = 0; i < sourceArrayLength; ++i) {
            if (predicate(source[i])) {
                const element: T = source[i];
                
                for (i = i + 1; i < sourceArrayLength; ++i) {
                    if (predicate(source[i])) {
                        throw new Error('more than one element satisfies the condition in predicate.');
                    }
                }

                return element;
            }
        }

        return undefined;
    }
    else {
        if (sourceArrayLength > 1) {
            throw new Error('source contains more than one element.');
        }
    
        return source[0];
    }
}