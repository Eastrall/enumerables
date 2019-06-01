export interface Enumerable<T> extends Iterable<T> {
    count(): number;

    elementAt(index: number): T;

    elementAtOrDefault(index: number): T | undefined;

    first(): T;

    first(predicate: (item: T) => boolean): T;

    firstOrDefault(): T | undefined;

    firstOrDefault(predicate: (item: T) => boolean): T | undefined;
}
