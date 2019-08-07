/**
 * Inverts the order of the elements in a sequence.
 * @param source A native JavaScript `Array<TSource>` of values to reverse.
 * @returns An `Array<TSource>` whose elements correspond to those of the input sequence in reverse order.
 * @throws {Error} `source` is `undefined`.
 */
export function reverse<TSource>(source: Array<TSource>): Array<TSource> {
    if (!source) {
        throw new Error('source is undefined.');
    }

    let sourceArrayLength: number = source.length;
    const reversedArray: Array<TSource> = new Array<TSource>(sourceArrayLength);

    for (let i = 0; i < sourceArrayLength; ++i) {
        reversedArray[i] = source[sourceArrayLength - i - 1];
    }

    return reversedArray;
}