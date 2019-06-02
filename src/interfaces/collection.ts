import { Enumerable } from './enumerable';

export interface Collection<T> extends Enumerable<T> {
    add(item: T): void;
}


