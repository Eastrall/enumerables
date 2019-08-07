import { Func } from '@lib/internal/types';

/**
 * Sorts the elements of a sequence in ascending order according to a key.
 * @param source A native JavaScript `Array<TSource>` of values to order.
 * @param keySelector A function to extract a key from an element.
 * @returns An `Array<TSource>` whose elements are sorted according to a key.
 * @throws {Error} `source` or `keySelector` is `undefined`.
 */
export function orderBy<TSource, TKey>(source: Array<TSource>, keySelector: Func<TSource, TKey>): Array<TSource> {
    if (!source) {
        throw new Error('source is undefined');
    }

    if (!keySelector) {
        throw new Error('keySelector is undefined');
    }

    const newArray = new Array<TSource>(...source);

    newArray.sort((a, b) => createComparer(a, b, keySelector));

    return newArray;
}

/**
 * Sorts the elements of a sequence in descending order by using a specified comparer.
 * @param source A native JavaScript `Array<TSource>` of values to order.
 * @param keySelector A function to extract a key from an element.
 * @returns An `Array<TSource>` whose elements are sorted in descending order according to a key.
 */
export function orderByDescending<TSource, TKey>(source: Array<TSource>, keySelector: Func<TSource, TKey>): Array<TSource> {
    if (!source) {
        throw new Error('source is undefined');
    }

    if (!keySelector) {
        throw new Error('keySelector is undefined');
    }

    const newArray = new Array<TSource>(...source);

    newArray.sort((a, b) => createComparer(a, b, keySelector, true));

    return newArray;
}

/**
 * Creates a new sorting comparer.
 * @param a First compared parameter.
 * @param b Second compared parameter.
 * @param keySelector Key selector.
 * @param isDescending Is descending.
 */
function createComparer<TSource, TKey>(a: TSource, b: TSource, keySelector: Func<TSource, TKey>, isDescending: boolean = false): number {
    if (keySelector(a) > keySelector(b)) {
        return isDescending ? -1 : 1;
    }
    else if (keySelector(a) < keySelector(b)) {
        return isDescending ? 1 : -1;
    }
    else {
        return 0;
    }
}