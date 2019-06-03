/**
 * Returns a number that represents how many elements in the specified sequence satisfy a condition.
 * @param source Native JavaScript array that contains elements to be tested and counted.
 * @param predicate A function to test each element for a condition.
 */
export function count<T>(source: Array<T>, predicate?: (item: T) => boolean): number {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    let count: number = 0;
    let length: number = source.length;

    if (!predicate) {
        return length;
    }

    for (let i = 0; i < length; ++i) {
        if (predicate(source[i])) {
            ++count;
        }    
    }

    return count;
}

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

    if (source.length === 0) {
        throw new Error('The source array is empty.');
    }

    if (!predicate) {
        return elementAt(source, 0);
    }

    let length: number = source.length;

    for (let i: number = 0; i < length; ++i) {
        const element: T = source[i];

        if (predicate(element)) {
            return element;
        }
    }

    throw new Error('No element satisfies the condition in predicate');
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

    if (!predicate) {
        return source.length > 0 ? source[0] : undefined;
    }

    let length: number = source.length;

    for (let i: number = 0; i < length; ++i) {
        const element: T = source[i];

        if (predicate(element)) {
            return element;
        }
    }

    return undefined;
}

/**
 * Returns the last element of a sequence.
 * @param source Native JavaScript array.
 */
export function last<T>(source: Array<T>): T;

/**
 * Returns the last element of a sequence.
 * @param source Native JavaScript array.
 * @param predicate A function to test each element for a condition.
 */
export function last<T>(source: Array<T>, predicate: (item: T) => boolean): T;

export function last<T>(source: Array<T>, predicate?: (item: T) => boolean): T {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    if (source.length === 0) {
        throw new Error('The source array is empty.');
    }

    if (!predicate) {
        return source[source.length - 1];
    }

    let length: number = source.length;

    for (let i = length - 1; i >= 0; --i) {
        const element: T = source[i];

        if (predicate(element)) {
            return element;
        }
    }

    throw new Error('No element satisfies the condition in predicate');
}

/**
 * Returns the last element of a sequence, or a default value if no element is found.
 * @param source Native JavaScript array.
 */
export function lastOrDefault<T>(source: Array<T>): T | undefined;

/**
 * Returns the last element of a sequence, or a default value if no element is found.
 * @param source Native JavaScript array.
 * @param predicate A function to test each element for a condition.
 */
export function lastOrDefault<T>(source: Array<T>, predicate: (item: T) => boolean): T | undefined;

export function lastOrDefault<T>(source: Array<T>, predicate?: (item: T) => boolean): T | undefined {
    if (!source) {
        throw new Error('source array is undefined.');
    }

    if (source.length === 0) {
        return undefined;
    }
    
    if (!predicate) {
        return source[source.length - 1];
    }

    for (let i = length - 1; i >= 0; --i) {
        const element: T = source[i];

        if (predicate(element)) {
            return element;
        }
    }

    return undefined;
}