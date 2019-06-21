import { Enumerable } from './enumerable';

/**
 * Defines methods to manipulate a generic collection.
 */
export interface Collection<T> extends Enumerable<T> {
    /**
     * Adds an object at the end of the collection.
     * @param item The object to be added at the end of the collection.
     */
    add(item: T): void;

    /**
     * Removes all elements from the collection.
     */
    clear(): void;

    /**
     * Determines whether the collection contains a specific value.
     * @param item The object to locate in the collection.
     * @returns True if the item is found in the collection; false otherwise.
     */
    contains(item: T): boolean;

    /**
     * Searches for the specified object and returns the zero-based index of the first occurrence within the entire collection.
     * @param item The object to locate in the collection.
     * @returns The zero-based index of the first occurrence of item within the entire collection; otherwise, -1.
     */
    indexOf(item: T): number;

    /**
     * Inserts an element into the collection at the specified index.
     * @param index The zero-based index at which item should be inserted.
     * @param item The object to insert. The value can be null for reference types.
     * @throws Error when the index is less than 0 or index is grather than the collection count.
     */
    insert(index: number, item: T): void;

    /**
     * Removes the first occurrence of a specific object from the collection.
     * @param item The object to remove from the collection.
     * @returns true if item is successfully removed; otherwise, false. This method also returns false if the item was not found.
     */
    remove(item: T): boolean;

    /**
     * Removes the element at the specified index of the collection.
     * @param index The zero-based index of the element to remove.
     * @throws Error when the index is less than 0 or index is grather than the collection count.
     */
    removeAt(index: number): void;

    /**
     * Copies the elements of the collection into a new Array.
     */
    toArray(): Array<T>;
}
