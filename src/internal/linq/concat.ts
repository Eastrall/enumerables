/**
 * Concatenates two sequences.
 * @param source The first native JavaScript `Array<TSource>` to concat.
 * @typeparam {TSource} The type of the elements of the input sequences.
 * @param elementsToConcat The second native JavaScript `Array<TSource>` to concat.
 * @returns An `Array<TSource>` that contains the concatenated elements of the two input sequences.
 * @throws {Error} `source` is `undefined`.
 * @throws {Error} `elementsToConcat` is `undefined`.
 */
export function concat<TSource>(source: Array<TSource>, elementsToConcat: Array<TSource>): Array<TSource> {
    if (!source) {
        throw new Error('source is undefined.');
    }

    if (!elementsToConcat) {
        throw new Error('elementsToConcat is undefined.');
    }

    return new Array<TSource>(...source, ...elementsToConcat);
}