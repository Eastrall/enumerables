/**
 * Returns the element at a specified index in a sequence.
 * @param source Native JavaScript array to return an element from.
 * @param index Zero-based index of the element to retrieve.
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
 */
export function elementAtOrDefault<T>(source: Array<T>, index: number): T | undefined {
    if (!source) {
        throw new Error('source array is undefined.');
    }
    
    return index < 0 || index >= source.length ? undefined : source[index];
}

/**
 * Returns the first element of a sequence.
 * @param source Native JavaScript array.
 */
export function first<T>(source: Array<T>): T

/**
 * Returns the first element in a sequence that satisfies a specified condition.
 * @param source Native JavaScript array.
 * @param predicate A function to test each element for a condition.
 */
export function first<T>(source: Array<T>, predicate: (item: T) => boolean): T;

export function first<T>(source: Array<T>, predicate?: (item: T) => boolean): T {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    if (source.length == 0) {
        throw new Error('The source array is empty.');
    }

    if (predicate) {
        let length: number = source.length;

        for (let i = 0; i < length; ++i) {
            if (predicate(source[i])) {
                return source[i];
            }
        }

        throw new Error('No element satisfies the condition in predicate');
    }

    return elementAt(source, 0);
}

/**
 * Returns the first element of a sequence, or a default value if the sequence contains no elements.
 * @param source Native JavaScript array.
 */
export function firstOrDefault<T>(source: Array<T>): T | undefined;

/**
 * Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.
 * @param source Native JavaScript array.
 * @param predicate A function to test each element for a condition.
 */
export function firstOrDefault<T>(source: Array<T>, predicate: (item: T) => boolean): T | undefined;

export function firstOrDefault<T>(source: Array<T>, predicate?: (item: T) => boolean): T | undefined {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    if (predicate) {
        let length: number = source.length;

        for (let i = 0; i < length; ++i) {
            if (predicate(source[i])) {
                return source[i];
            }
        }

        return undefined;
    }

    return source.length > 0 ? source[0] : undefined;
}