import { Enumerable } from '../interfaces/enumerable';
import { Collection } from "../interfaces/collection";
import * as Linq from '../internal/linq';

export class List<T> implements Collection<T>, Enumerable<T> {
    protected elements: Array<T>;

    constructor();
    constructor(count: number);
    constructor(array: Array<T>);
    constructor(countOrArray?: number | Array<T> | undefined) {
        if (typeof countOrArray === "number") {
            this.elements = new Array<T>(countOrArray as number);
        }
        else if (typeof countOrArray === "object") {
            this.elements = new Array<T>(...countOrArray as Array<T>);
        }
        else {
            this.elements = new Array<T>();
        }
    }

    public add(item: T): void {
        this.elements.push(item);
    }

    public count(): number {
        return this.elements.length;
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
        if (predicate) {
            return Linq.first(this.elements, predicate);
        }

        return Linq.first(this.elements);
    }

    public firstOrDefault(): T | undefined;
    public firstOrDefault(predicate: (item: T) => boolean): T | undefined;
    public firstOrDefault(predicate?: (item: T) => boolean): T | undefined {
        if (predicate) {
            return Linq.firstOrDefault(this.elements, predicate);
        }

        return Linq.firstOrDefault(this.elements);
    }

    [Symbol.iterator](): Iterator<T> {
        let cursor = 0;
        let elements = this.elements;
        let elementsLength = this.elementAt.length;

        return {
            next(): IteratorResult<T> {
                if (cursor < elementsLength) {
                    return { done: false, value: elements[cursor++] };
                }
                else {
                    return { done: true, value: <any>undefined };
                }
            }
        };
    }
}
