import { Func, Func2 } from "../internal/types";

export interface Enumerable<T> extends Iterable<T> {
    /**
     * Returns a number that represents how many elements in the specified sequence.
     * @returns The number of elements in the input sequence.
     * @throws If the input `source` is `undefined`.
     */
    count(): number;

    /**
     * Returns a number that represents how many elements in the specified sequence satisfy a condition.
     * @param predicate A function to test each element for a condition.
     * @returns The number of elements in the input sequence.
     * @throws If the input `source` is `undefined`.
     */
    count(predicate: Func<T, boolean>): number;

    /**
     * Returns the element at a specified index in a sequence.
     * @param index Zero-based index of the element to retrieve.
     * @returns The element at the specified position in the source sequence.
     * @throws If the input `source` is `undefined`.
     * @throws If `index` is less than 0 or greater than or equal to the number of elements in `source`.
     */
    elementAt(index: number): T;

    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     * @param index Zero-based index of the element to retrieve.
     * @returns `undefined` if the index is outside the bounds of the source sequence; otherwise, the element at the specified position in the source sequence.
     * @throws If the input `source` is `undefined`.
     */
    elementAtOrDefault(index: number): T | undefined;

    /**
     * Returns the first element of a sequence.
     * @returns The first element in the specified sequence.
     * @throws If the input `source` is `undefined`.
     * @throws If the input `source` sequence is empty.
     */
    first(): T;

    /**
     * Returns the first element in a sequence that satisfies a specified condition.
     * @param predicate A function to test each element for a condition.
     * @returns The first element in the sequence that passes the test in the specified predicate function.
     * @throws If the input `source` is `undefined`.
     * @throws If the input `source` sequence is empty.
     * @throws If no element satisfies the condition in `predicate`.
     */
    first(predicate: Func<T, boolean>): T;

    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     * @returns `undefined` if `source` is empty; otherwise, the first element in `source`.
     * @throws If the input `source` is `undefined`.
     */
    firstOrDefault(): T | undefined;

    /**
     * Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.
     * @param predicate A function to test each element for a condition.
     * @returns `undefined` if `source` is empty or if no element passes the test specified by `predicate`; otherwise, the first element in `source` that passes the test specified by `predicate`.
     * @throws If the input `source` is `undefined`.
     */
    firstOrDefault(predicate: Func<T, boolean>): T | undefined;

    /**
     * Returns the last element of a sequence.
     * @returns The value at the last position in the source sequence.
     * @throws If the input `source` is `undefined`.
     * @throws If the input `source` sequence is empty.
     */
    last(): T;

    /**
     * Returns the last element of a sequence.
     * @param predicate A function to test each element for a condition.
     * @returns The last element in the sequence that passes the test in the specified predicate function.
     * @throws If the input `source` is `undefined`.
     * @throws If the input `source` sequence is empty.
     * @throws If no element satisfies the condition in `predicate`.
     */
    last(predicate: Func<T, boolean>): T;

    /**
     * Returns the last element of a sequence, or a default value if no element is found.
     * @returns `undefined` if the `source` sequence is empty; otherwise, the last element in the `Array<T>`.
     * @throws If the input `source` is `undefined`.
     */
    lastOrDefault(): T | undefined;

    /**
     * Returns the last element of a sequence, or a default value if no element is found.
     * @param predicate A function to test each element for a condition.
     * @returns `undefined` if the sequence is empty or if no elements pass the test in the predicate function; otherwise, the last element that passes the test in the predicate function.
     * @throws If the input `source` is `undefined`.
     */
    lastOrDefault(predicate: Func<T, boolean>): T | undefined;

    /**
     * Projects each element of a sequence into a new form.
     * @param selector A transform function to apply to each element.
     * @returns An `Enumerable<T>` whose elements are the result of invoking the transform function on each element of `source`.
     * @throws If the input `source` is `undefined`.
     * @throws If the input `selector` is `undefined`.
     */
    select<TResult>(selector: Func<T, TResult>): Enumerable<TResult>;

    /**
     * Projects each element of a sequence into a new form by incorporating the element's index.
     * @param selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
     * @returns An `Enumerable<T>` whose elements are the result of invoking the transform function on each element of `source`.
     * @throws If the input `source` is `undefined`.
     * @throws If the input `selector` is `undefined`.
     */
    select<TResult>(selector: Func2<T, number, TResult>): Enumerable<TResult>;

    /**
     * Filters a sequence of values based on a predicate.
     * @param predicate A function to test each element for a condition.
     * @returns An `Enumerable<T>` that contains elements from the input sequence that satisfy the condition.
     * @throws If the input `source` is `undefined`.
     * @throws If the input `predicate` is `undefined`.
     */
    where(predicate: Func<T, boolean>): Enumerable<T>;

    /**
     * Filters a sequence of values based on a predicate. Each element's index is used in the logic of the predicate function.
     * @param predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
     * @returns An `Enumerable<T>` that contains elements from the input sequence that satisfy the condition.
     * @throws If the input `source` is `undefined`.
     * @throws If the input `predicate` is `undefined`.
     */
    where(predicate: Func2<T, number, boolean>): Enumerable<T>;

    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     * @param count The number of elements to return.
     * @returns An `Enumerable<T>` that contains the specified number of elements from the start of the input sequence.
     * @throws If the input `source` is `undefined`.
     */
    take(count: number): Enumerable<T>;

    /**
     * Returns a specified number of contiguous elements from the end of a sequence.
     * @param count The number of elements to return.
     * @returns An `Enumerable<T>` that contains the specified number of elements from the end of the input sequence.
     * @throws If the input `source` is `undefined`.
     */
    takeLast(count: number): Enumerable<T>;

    /**
     * Creates an array from a Enumerable<T>.
     * @returns An array that contains the elements from the input sequence. 
     */
    toArray(): Array<T>;
}
