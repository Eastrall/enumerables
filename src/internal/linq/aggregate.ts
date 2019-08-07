import { Func, Func2 } from '@lib/internal/types';

/**
 * Applies an accumulator function over a sequence.
 * @param source An native JavaScript `Array<TSource>` to aggregate over.
 * @param func An accumulator function to be invoked on each element.
 * @typeparam TSource The type of the elements of `source`.
 * @returns The final accumulator value.
 * @throws {Error} `source` or `func` is `undefined`.
 */
export function aggregate<TSource>(source: Array<TSource>, func: Func2<TSource, TSource, TSource>): TSource;

/**
 * Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.
 * @param source An native JavaScript `Array<TSource>` to aggregate over.
 * @param seed The initial accumulator value.
 * @param func An accumulator function to be invoked on each element.
 * @returns The final accumulator value.
 * @throws {Error} `source` or `func` is `undefined`.
 */
export function aggregate<TSource, TAccumulate>(source: Array<TSource>, seed: TAccumulate, func: Func2<TAccumulate, TSource, TAccumulate>): TAccumulate;

/**
 * Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.
 * @param source An native JavaScript `Array<TSource>` to aggregate over.
 * @param seed The initial accumulator value.
 * @param func An accumulator function to be invoked on each element.
 * @param resultSelector A function to transform the final accumulator value into the result value.
 * @returns The transformed final accumulator value.
 * @throws {Error} `source` or `func` is `undefined`.
 */
export function aggregate<TSource, TAccumulate, TResult>(source: Array<TSource>, seed: TAccumulate, func: Func2<TAccumulate, TSource, TAccumulate>, resultSelector: Func<TAccumulate, TResult>): TResult;

export function aggregate<TSource, TAccumulate, TResult>(source: Array<TSource>, funcOrSeed: Func2<TSource, TSource, TSource> | TAccumulate, func?: Func2<TAccumulate, TSource, TAccumulate>, resultSelector?: Func<TAccumulate, TResult>): TSource | TAccumulate | TResult {
    if (!source) {
        throw new Error('source is undefined.');
    }

    const sourceLength: number = source.length;

    if (sourceLength === 0) {
        throw new Error('source contains no elements.');
    }

    let accumulator: TSource | TAccumulate;

    if (typeof(funcOrSeed) === 'function' && !func) {
        accumulator = source[0];
        const accumulatorFunction = funcOrSeed as Func2<TSource, TSource, TSource>;

        for (let i = 1; i < sourceLength; ++i) {
            accumulator = accumulatorFunction(accumulator, source[i]);
        }
    }
    else {
        accumulator = funcOrSeed as TAccumulate;
        const accumulatorFunction = func as Func2<TAccumulate, TSource, TAccumulate>;

        if (!accumulatorFunction) {
            throw new Error('func is undefined');
        }

        for (let i = 0; i < sourceLength; ++i) {
            accumulator = accumulatorFunction(accumulator, source[i]);
        }
    }

    return resultSelector ? resultSelector(accumulator as TAccumulate) : accumulator;
}
