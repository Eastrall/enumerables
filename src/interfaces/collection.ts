import { Enumerable } from './enumerable';

export interface Collection<T> extends Enumerable<T> {
    add(item: T): void;

    clear(): void;

    contains(item: T): boolean;

    indexOf(item: T): number;

    insert(index: number, item: T): void;

    remove(item: T): boolean;

    removeAt(index: number): void;

    toArray(): Array<T>;
}
