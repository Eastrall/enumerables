export interface Enumerable<T> extends Iterable<T> {
    /**
     * Returns the number of elements in a sequence.
     */
    count(): number;

    /**
     * Returns a number that represents how many elements in the specified sequence satisfy a condition.
     * @param predicate A function to test each element for a condition.
     */
    count(predicate: (item: T) => boolean): number;

    /**
     * Returns the element at a specified index in a sequence.
     * @param index Zero-based index of the element to retrieve.
     */
    elementAt(index: number): T;

    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     * @param index Zero-based index of the element to retrieve.
     */
    elementAtOrDefault(index: number): T | undefined;

    /**
     * Returns the first element of a sequence.
     */
    first(): T;

    /**
     * Returns the first element in a sequence that satisfies a specified condition.
     * @param predicate A function to test each element for a condition.
     */
    first(predicate: (item: T) => boolean): T;

    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     */
    firstOrDefault(): T | undefined;

    /**
     * Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.
     * @param predicate A function to test each element for a condition.
     */
    firstOrDefault(predicate: (item: T) => boolean): T | undefined;
}
