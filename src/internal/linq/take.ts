/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 * @param source Native JavaScript array.
 * @param count The number of elements to return.
 * @returns An Array<T> that contains the specified number of elements from the start of the input sequence.
 */
export function take<T>(source: Array<T>, count: number): Array<T> {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    const amountToTake: number = Math.min(count, source.length);
    const result = new Array<T>();

    for (let i = 0; i < amountToTake; ++i) {
        result.push(source[i]);
    }

    return result;
}

/**
 * Returns a specified number of contiguous elements from the end of a sequence.
 * @param source Native JavaScript array.
 * @param count The number of elements to return.
 * @returns An Array<T> that contains the specified number of elements from the end of the input sequence.
 */
export function takeLast<T>(source: Array<T>, count: number): Array<T> {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    const sourceLength: number = source.length;
    const startIndex: number = Math.max(0, sourceLength - count);
    const result = new Array<T>();

    for (let i = startIndex; i < sourceLength; ++i) {
        result.push(source[i]);
    }

    return result;
}