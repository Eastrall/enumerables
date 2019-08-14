import { Enumerable } from "./enumerable";

/**
 * Represents a collection of elements that have a common key.
 */
export interface Grouping<TKey, TSource> {
    /**
     * Gets the key of the grouping.
     */
    key: TKey;

    /**
     * Gets the elements of the grouping.
     */
    elements: Enumerable<TSource>;
}