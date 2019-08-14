import { Func, Func2 } from "@lib/internal/types";
import { Grouping } from "./grouping";

export interface Enumerable<T> extends Iterable<T> {
    /**
     * Applies an accumulator function over a sequence.
     * @param func An accumulator function to be invoked on each element.
     * @returns The final accumulator value.
     * @throws {Error} `source` or `func` is `undefined`.
     */
    aggregate(func: Func2<T, T, T>): T;

    /**
     * Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.
     * @param seed The initial accumulator value.
     * @param func An accumulator function to be invoked on each element.
     * @returns The final accumulator value.
     * @throws {Error} `source` or `func` is `undefined`.
     */
    aggregate<TAccumulate>(seed: TAccumulate, func: Func2<TAccumulate, T, TAccumulate>): TAccumulate;

    /**
     * Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.
     * @param seed The initial accumulator value.
     * @param func An accumulator function to be invoked on each element.
     * @param resultSelector A function to transform the final accumulator value into the result value.
     * @returns The transformed final accumulator value.
     * @throws {Error} `source` or `func` is `undefined`.
     */
    aggregate<TAccumulate, TResult>(seed: TAccumulate, func: Func2<TAccumulate, T, TAccumulate>, resultSelector: Func<TAccumulate, TResult>): TResult;

    /**
     * Determines whether all elements of a sequence satisfy a condition.
     * @param predicate A function to test each element for a condition.
     * @returns `true` if every element of the source sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, `false`.
     * @throws {Error} `source` is `undefined`.
     * @throws {Error} no element satisfies the condition in `predicate`.
     */
    all(predicate: Func<T, boolean>): boolean;

    /**
     * Determines whether a sequence contains any elements.
     * @returns `true` if the source sequence contains any elements; otherwise, `false`.
     * @throws {Error} `source` is `undefined`.
     */
    any(): boolean;

    /**
     * Determines whether any element of a sequence satisfies a condition.
     * @param predicate A function to test each element for a condition.
     * @returns `true` if any elements in the source sequence pass the test in the specified predicate; otherwise, `false`.
     * @throws {Error} `source` is `undefined`.
     */
    any(predicate: Func<T, boolean>): boolean;

    /**
     * Appends a value to the end of the sequence.
     * @param element The value to append to `source`.
     * @returns A new sequence that ends with `element`.
     */
    append(element: T): Enumerable<T>;

    /**
     * Concatenates two sequences.
     * @param elementsToConcat An `Enumerable<T>` or a native JavaScript `Array<TSource>` to concat.
     * @returns An `Array<TSource>` that contains the concatenated elements of the two input sequences.
     * @throws {Error} `elementsToConcat` is `undefined`.
     */
    concat(elementsToConcat: Enumerable<T> | Array<T>): Enumerable<T>;

    /**
     * Returns a number that represents how many elements in the specified sequence.
     * @returns The number of elements in the input sequence.
     * @throws {Error} `source` is `undefined`.
     */
    count(): number;

    /**
     * Returns a number that represents how many elements in the specified sequence satisfy a condition.
     * @param predicate A function to test each element for a condition.
     * @returns The number of elements in the input sequence.
     * @throws {Error} `source` is `undefined`.
     */
    count(predicate: Func<T, boolean>): number;

    /**
     * Returns the element at a specified index in a sequence.
     * @param index Zero-based index of the element to retrieve.
     * @returns The element at the specified position in the source sequence.
     * @throws {Error} `source` is `undefined`.
     * @throws {Error} `index` is less than 0 or greater than or equal to the number of elements in `source`.
     */
    elementAt(index: number): T;

    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     * @param index Zero-based index of the element to retrieve.
     * @returns `undefined` if the index is outside the bounds of the source sequence; otherwise, the element at the specified position in the source sequence.
     * @throws {Error} `source` is `undefined`.
     */
    elementAtOrDefault(index: number): T | undefined;

    /**
     * Returns the first element of a sequence.
     * @returns The first element in the specified sequence.
     * @throws {Error} `source` is `undefined`.
     * @throws {Error} `source` sequence is empty.
     */
    first(): T;

    /**
     * Returns the first element in a sequence that satisfies a specified condition.
     * @param predicate A function to test each element for a condition.
     * @returns The first element in the sequence that passes the test in the specified predicate function.
     * @throws {Error} `source` is `undefined`.
     * @throws {Error} `source` sequence is empty.
     * @throws {Error} no element satisfies the condition in `predicate`.
     */
    first(predicate: Func<T, boolean>): T;

    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     * @returns `undefined` if `source` is empty; otherwise, the first element in `source`.
     * @throws {Error} `source` is `undefined`.
     */
    firstOrDefault(): T | undefined;

    /**
     * Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.
     * @param predicate A function to test each element for a condition.
     * @returns `undefined` if `source` is empty or if no element passes the test specified by `predicate`; otherwise, the first element in `source` that passes the test specified by `predicate`.
     * @throws {Error} `source` is `undefined`.
     */
    firstOrDefault(predicate: Func<T, boolean>): T | undefined;

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     * @param keySelector A function to extract the key for each element.
     * @returns An `Enumerable<Grouping<TKey, TSource>>` where each `Grouping<TKey, TSource>` object contains a sequence of objects and a key.
     * @throws {Error} `keySelector` is `undefined`.
     */
    groupBy<TKey>(keySelector: Func<T, TKey>): Enumerable<Grouping<TKey, T>>;

    /**
     * 
     * @param source A native JavaScript `Array<T>` whose elements to group.
     * @param keySelector A function to extract the key for each element.
     * @param elementSelector A function to map each source element to an element in the `Grouping<TKey, TElement>`.
     * @returns An `Enumerable<Grouping<TKey, TElement>>` where each `Grouping<TKey, TElement>` object contains a collection of objects of type `TElement` and a key.
     * @throws {Error} `keySelector` is `undefined`.
     */
    groupBy<TKey, TElement>(keySelector: Func<T, TKey>, elementSelector: Func<T, TElement>): Enumerable<Grouping<TKey, TElement>>;

    /**
     * Returns the last element of a sequence.
     * @returns The value at the last position in the source sequence.
     * @throws {Error} `source` is `undefined`.
     * @throws {Error} `source` sequence is empty.
     */
    last(): T;

    /**
     * Returns the last element of a sequence.
     * @param predicate A function to test each element for a condition.
     * @returns The last element in the sequence that passes the test in the specified predicate function.
     * @throws {Error} `source` is `undefined`.
     * @throws {Error} `source` sequence is empty.
     * @throws {Error} no element satisfies the condition in `predicate`.
     */
    last(predicate: Func<T, boolean>): T;

    /**
     * Returns the last element of a sequence, or a default value if no element is found.
     * @returns `undefined` if the `source` sequence is empty; otherwise, the last element in the `Array<T>`.
     * @throws {Error} `source` is `undefined`.
     */
    lastOrDefault(): T | undefined;

    /**
     * Returns the last element of a sequence, or a default value if no element is found.
     * @param predicate A function to test each element for a condition.
     * @returns `undefined` if the sequence is empty or if no elements pass the test in the predicate function; otherwise, the last element that passes the test in the predicate function.
     * @throws {Error} `source` is `undefined`.
     */
    lastOrDefault(predicate: Func<T, boolean>): T | undefined;

    /**
     * Invokes a transform function on each element of a generic sequence and returns the maximum resulting value.
     * @param selector A transform function to apply to each element.
     * @returns The maximum value in the sequence.
     * @throws {Error} `source` is `undefined`.
     * @throws {Error} `selector` is `undefined`.
     */
    max(selector: Func<T, number>): number;

    /**
     * Invokes a transform function on each element of a generic sequence and returns the minimum resulting value.
     * @param selector A transform function to apply to each element.
     * @returns The minimum value in the sequence.
     * @throws {Error} `source` is `undefined`.
     * @throws {Error} `selector` is `undefined`.
     */
    min(selector: Func<T, number>): number;

    /**
     * Sorts the elements of a sequence in ascending order according to a key.
     * @param keySelector A function to extract a key from an element.
     * @returns An `Enumerable<T>` whose elements are sorted according to a key.
     * @throws {Error} `source` or `keySelector` is `undefined`.
     */
    orderBy<TKey>(keySelector: Func<T, TKey>): Enumerable<T>;

    /**
     * Sorts the elements of a sequence in descending order by using a specified comparer.
     * @param keySelector A function to extract a key from an element.
     * @returns An `Enumerable<T>` whose elements are sorted in descending order according to a key.
     */
    orderByDescending<TKey>(keySelector: Func<T, TKey>): Enumerable<T>;

    /**
     * Projects each element of a sequence into a new form.
     * @param selector A transform function to apply to each element.
     * @returns An `Enumerable<T>` whose elements are the result of invoking the transform function on each element of `source`.
     * @throws {Error} `source` is `undefined`.
     * @throws {Error} `selector` is `undefined`.
     */
    select<TResult>(selector: Func<T, TResult>): Enumerable<TResult>;

    /**
     * Projects each element of a sequence into a new form by incorporating the element's index.
     * @param selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
     * @returns An `Enumerable<T>` whose elements are the result of invoking the transform function on each element of `source`.
     * @throws {Error} `source` is `undefined`.
     * @throws {Error} `selector` is `undefined`.
     */
    select<TResult>(selector: Func2<T, number, TResult>): Enumerable<TResult>;

    /**
     * Filters a sequence of values based on a predicate.
     * @param predicate A function to test each element for a condition.
     * @returns An `Enumerable<T>` that contains elements from the input sequence that satisfy the condition.
     * @throws {Error} `source` is `undefined`.
     * @throws {Error} `predicate` is `undefined`.
     */
    where(predicate: Func<T, boolean>): Enumerable<T>;

    /**
     * Filters a sequence of values based on a predicate. Each element's index is used in the logic of the predicate function.
     * @param predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
     * @returns An `Enumerable<T>` that contains elements from the input sequence that satisfy the condition.
     * @throws {Error} `source` is `undefined`.
     * @throws {Error} `predicate` is `undefined`.
     */
    where(predicate: Func2<T, number, boolean>): Enumerable<T>;

    /**
     * Returns a specified number of contiguous elements from the start of a sequence.
     * @param count The number of elements to return.
     * @returns An `Enumerable<T>` that contains the specified number of elements from the start of the input sequence.
     * @throws {Error} `source` is `undefined`.
     */
    take(count: number): Enumerable<T>;

    /**
     * Returns a specified number of contiguous elements from the end of a sequence.
     * @param count The number of elements to return.
     * @returns An `Enumerable<T>` that contains the specified number of elements from the end of the input sequence.
     * @throws {Error} `source` is `undefined`.
     */
    takeLast(count: number): Enumerable<T>;

    /**
     * Creates an array from an `Enumerable<T>`.
     * @returns An array that contains the elements from the input sequence. 
     */
    toArray(): Array<T>;

    /**
     * Display the content of the `Enumerable<T>`.
     */
    toString(): string;
}
