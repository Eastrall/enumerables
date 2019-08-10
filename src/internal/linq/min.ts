import { Func } from "@lib/internal/types";

/**
 * Invokes a transform function on each element of a generic sequence and returns the minimum resulting value.
 * @param source Native JavaScript array.
 * @param selector A transform function to apply to each element.
 * @returns The minimum value in the sequence.
 * @throws {Error} `source` is `undefined`.
 * @throws {Error} `selector` is `undefined`.
 */
export function min<T>(source: Array<T>, selector: Func<T, number>): number {
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

    let min: number = selector(source[0]);

    for (let i = 1; i < sourceLength; ++i) {
        const currentValue: number = selector(source[i]);

        if (currentValue < min) {
            min = currentValue;
        }
    }

    return min;
}