import { Func } from '@lib/internal/types';

/**
 * Computes the sum of the sequence of `number` values that are obtained by invoking a transform function on each element of the input sequence.
 * @param source Native JavaScript array.
 * @param selector A transform function to apply to each element.
 * @returns The sum of the projected values.
 * @throws If the `source` is `undefined`.
 * @throws If the `selector` is `undefined`.
 */
export function sum<T>(source: Array<T>, selector: Func<T, number>): number {
    if (!source) {
        throw new Error('source is undefined.');
    }

    if (!selector) {
        throw new Error('selector is undefined.');
    }

    const sourceArrayLength: number = source.length;
    let result: number = 0;

    for (let i = 0; i < sourceArrayLength; ++i) {
        result += selector(source[i]);
    }

    return result;
}