import { Func2 } from '../types';

/**
 * Applies an accumulator function over a sequence.
 * @param source An native JavaScript Array<TSource> to aggregate over.
 * @param func An accumulator function to be invoked on each element.
 * @typeparam TSource The type of the elements of `source`.
 * @template [[TSource]] The type of the elements of `source`.
 * @returns The final accumulator value.
 * @throws {CustomError} `source` or `func` is `undefined`.
 */
export function aggregate<TSource>(source: Array<TSource>, func: Func2<TSource, TSource, TSource>): TSource | undefined {
    if (!source) {
        throw new Error('source is undefined.');
    }

    if (!func) {
        throw new Error('func is undefined.');
    }

    const sourceLength: number = source.length;

    source.push
    if (sourceLength == 0) {
        throw new Error('source contains no elements.');
    }

    let accumulator: TSource = source[0];

    for (let i = 1; i < sourceLength; ++i) {
        accumulator = func(accumulator, source[i]);
    }

    return accumulator;
}

export class CustomError extends Error {
    constructor(text: string) {
        super(text);
    }
}