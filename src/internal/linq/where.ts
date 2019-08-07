import { Func, Func2 } from '@lib/internal/types';

/**
 * Filters a sequence of values based on a predicate.
 * @param source Native JavaScript array to filter.
 * @param predicate A function to test each element for a condition.
 * @returns An Array<T> that contains elements from the input sequence that satisfy the condition.
 * @throws If the input `source` is `undefined`.
 * @throws If the input `predicate` is `undefined`.
 */
export function where<T>(source: Array<T>, predicate: Func<T, boolean>): Array<T>;

/**
 * Filters a sequence of values based on a predicate. Each element's index is used in the logic of the predicate function.
 * @param source Native JavaScript array to filter.
 * @param predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 * @returns An Array<T> that contains elements from the input sequence that satisfy the condition.
 * @throws If the input `source` is `undefined`.
 * @throws If the input `predicate` is `undefined`.
 */
export function where<T>(source: Array<T>, predicate: Func2<T, number, boolean>): Array<T>;

export function where<T>(source: Array<T>, predicate: Func<T, boolean> | Func2<T, number, boolean>): Array<T> {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    if (!predicate) {
        throw new Error('predicate is undefined.');
    }

    const array = new Array<T>();
    const sourceArrayLength: number = source.length;

    for (let i = 0; i < sourceArrayLength; ++i) {
        const element: T = source[i];

        if (predicate(element, i)) {
            array.push(element);
        }
    }

    return array;
}