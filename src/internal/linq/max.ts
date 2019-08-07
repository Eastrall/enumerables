import { Func } from "@lib/internal/types";

/**
 * Invokes a transform function on each element of a generic sequence and returns the maximum resulting value.
 * @param source Native JavaScript array.
 * @param selector A transform function to apply to each element.
 * @returns The maximum value in the sequence.
 * @throws If the input `source` is `undefined`.
 * @throws If the input `selector` is `undefined`.
 */
export function max<T>(source: Array<T>, selector: Func<T, number>): number {
    if (!source) {
        throw new Error('source array is undefined.');
    }
    
    const sourceLength: number = source.length;

    if (sourceLength === 0) {
        return 0;
    }

    if (!selector) {
        throw new Error('selector is undefined.');
    }

    let max: number = selector(source[0]);

    for (let i = 1; i < sourceLength; ++i) {
        const currentValue: number = selector(source[i]);

        if (currentValue > max) {
            max = currentValue;
        }
    }

    return max;
}