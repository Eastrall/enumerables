export interface Enumerable<T> extends Iterable<T> {
    count(): number;

    elementAt(index: number): T;

    elementAtOrDefault(index: number): T | undefined;

    firstOrDefault(): T | undefined;

    firstOrDefault(predicate: (item: T) => boolean): T | undefined;
}
