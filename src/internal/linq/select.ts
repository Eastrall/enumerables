import { Func, Func2 } from '@lib/internal/types';

/**
 * Projects each element of a sequence into a new form.
 * @param source Native JavaScript array.
 * @param selector A transform function to apply to each element.
 * @returns An `Array<T>` whose elements are the result of invoking the transform function on each element of `source`.
 * @throws {Error} `source` is `undefined`.
 * @throws {Error} `selector` is `undefined`.
 */
export function select<TSource, TResult>(source: Array<TSource>, selector: Func<TSource, TResult>): Array<TResult>

/**
 * Projects each element of a sequence into a new form by incorporating the element's index.
 * @param source Native JavaScript array.
 * @param selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
 * @returns An `Array<T>` whose elements are the result of invoking the transform function on each element of `source`.
 * @throws {Error} `source` is `undefined`.
 * @throws {Error} `selector` is `undefined`.
 */
export function select<TSource, TResult>(source: Array<TSource>, selector: Func2<TSource, number, TResult>): Array<TResult> 

export function select<TSource, TResult>(source: Array<TSource>, selector: Func<TSource, TResult> | Func2<TSource, number, TResult>): Array<TResult> {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    if (!selector) {
        throw new Error('selector is undefined.');
    }

    const resultArray = new Array<TResult>();
    const sourceArrayLength: number = source.length;

    for (let i = 0; i < sourceArrayLength; ++i) {
        resultArray.push(selector(source[i], i));
    }

    return resultArray;
}