import { Enumerable } from '../interfaces/enumerable';
import { Collection } from "../interfaces/collection";
import * as Linq from '../internal/linq';

export class List<T> implements Collection<T>, Enumerable<T> {
    protected readonly elements: Array<T>;

    constructor(array?: Array<T>) {
        if (array) {
            this.elements = new Array<T>(...array);
        }
        else {
            this.elements = new Array<T>();
        }
    }

    public add(item: T): void {
        this.elements.push(item);
    }

    public count(): number;
    public count(predicate: (item: T) => boolean): number;
    public count(predicate?: (item: T) => boolean): number {
        return predicate ? Linq.count(this.elements, predicate) : Linq.count(this.elements);
    }

    public elementAt(index: number): T {
        return Linq.elementAt(this.elements, index);
    }

    public elementAtOrDefault(index: number): T | undefined {
        return Linq.elementAtOrDefault(this.elements, index);
    }

    public first(): T;
    public first(predicate: (item: T) => boolean): T;
    public first(predicate?: any): T {
        return predicate ? Linq.first(this.elements, predicate) : Linq.first(this.elements);
    }

    public firstOrDefault(): T | undefined;
    public firstOrDefault(predicate: (item: T) => boolean): T | undefined;
    public firstOrDefault(predicate?: (item: T) => boolean): T | undefined {
        return predicate ? Linq.firstOrDefault(this.elements, predicate) : Linq.firstOrDefault(this.elements);
    }

    [Symbol.iterator](): Iterator<T> {
        let cursor: number = 0;
        let elements = this.elements;
        let elementsLength = this.elementAt.length;

        return {
            next(): IteratorResult<T> {
                if (cursor < elementsLength) {
                    return { done: false, value: elements[cursor++] };
                }
                else {
                    return { done: true, value: undefined as any };
                }
            }
        };
    }
}
