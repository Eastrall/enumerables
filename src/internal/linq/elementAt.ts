/**
 * Returns the element at a specified index in a sequence.
 * @param source Native JavaScript array to return an element from.
 * @param index Zero-based index of the element to retrieve.
 * @returns The element at the specified position in the source sequence.
 * @throws If the input `source` is `undefined`.
 * @throws If `index` is less than 0 or greater than or equal to the number of elements in `source`.
 */
export function elementAt<T>(source: Array<T>, index: number): T {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    if (index < 0 || index >= source.length) {
        throw new Error('index is less than 0 or greater than or equal to the number of elements in source.');
    }

    return source[index];
}

/**
 * Returns the element at a specified index in a sequence or a default value if the index is out of range.
 * @param source Native JavaScript array to return an element from.
 * @param index Zero-based index of the element to retrieve.
 * @returns `undefined` if the index is outside the bounds of the source sequence; otherwise, the element at the specified position in the source sequence.
 * @throws {Error} `source` is `undefined`.
 */
export function elementAtOrDefault<T>(source: Array<T>, index: number): T | undefined {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    return index < 0 || index >= source.length ? undefined : source[index];
}