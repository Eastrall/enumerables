/**
 * Appends a value to the end of the sequence.
 * @param source A native JavaScript array of values.
 * @param element The value to append to `source`.
 * @returns A new sequence that ends with `element`.
 * @throws {Error} `source` is `undefined`.
 */
export function append<TSource>(source: Array<TSource>, element: TSource): Array<TSource> {
    if (!source) {
        throw new Error('source is undefined.');
    }

    return new Array<TSource>(...source, element);
}