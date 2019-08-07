/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param source A native `Array<TSource>` to return elements from.
 * @param count The number of elements to skip before returning the remaining elements.
 * @returns An `Array<TSource>` that contains the elements that occur after the specified index in the input sequence.
 * @throws {Error} `source` is `undefined`.
 */
export function skip<TSource>(source: Array<TSource>, count: number): Array<TSource> {
    if (!source) {
        throw new Error('source is undefined.');
    }

    if (count <= 0) {
        return source;
    }

    const sourceArrayLength: number = source.length;
    const newArray: Array<TSource> = new Array<TSource>();

    if (sourceArrayLength <= count) {
        return newArray;
    }

    for (let i: number = count; i < sourceArrayLength; ++i) {
        newArray.push(source[i]);
    }

    return newArray;
}