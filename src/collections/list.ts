import { Enumerable } from '../interfaces/enumerable';
import { Collection } from "../interfaces/collection";
import * as Linq from '../internal/linq';
import { Func, Func2 } from '../internal/types';

export class List<T> implements Collection<T>, Enumerable<T> {
    protected elements: Array<T>;

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
    public count(predicate: Func<T, boolean>): number;
    public count(predicate?: Func<T, boolean>): number {
        return predicate ? Linq.count(this.elements, predicate) : Linq.count(this.elements);
    }

    public elementAt(index: number): T {
        return Linq.elementAt(this.elements, index);
    }

    public elementAtOrDefault(index: number): T | undefined {
        return Linq.elementAtOrDefault(this.elements, index);
    }

    public first(): T;
    public first(predicate: Func<T, boolean>): T;
    public first(predicate?: Func<T, boolean>): T {
        return predicate ? Linq.first(this.elements, predicate) : Linq.first(this.elements);
    }

    public firstOrDefault(): T | undefined;
    public firstOrDefault(predicate: Func<T, boolean>): T | undefined;
    public firstOrDefault(predicate?: Func<T, boolean>): T | undefined {
        return predicate ? Linq.firstOrDefault(this.elements, predicate) : Linq.firstOrDefault(this.elements);
    }

    public last(): T;
    public last(predicate: Func<T, boolean>): T;
    public last(predicate?: Func<T, boolean>): T {
        return predicate ? Linq.last(this.elements, predicate) : Linq.last(this.elements);
    }

    public lastOrDefault(): T | undefined
    public lastOrDefault(predicate: Func<T, boolean>): T | undefined;
    public lastOrDefault(predicate?: Func<T, boolean>): T | undefined {
        return predicate ? Linq.lastOrDefault(this.elements, predicate) : Linq.lastOrDefault(this.elements);
    }

    public select<TResult>(selector: Func<T, TResult>): Enumerable<TResult>;
    public select<TResult>(selector: Func2<T, number, TResult>): Enumerable<TResult>;
    public select<TResult>(selector: Func<T, TResult> | Func2<T, number, TResult>): Enumerable<TResult> {
        return new List<TResult>(Linq.select<T, TResult>(this.elements, selector));
    }

    public where(predicate: Func<T, boolean>): Enumerable<T>;
    public where(predicate: Func2<T, number, boolean>): Enumerable<T>;
    public where(predicate: Func<T, boolean> | Func2<T, number, boolean>): Enumerable<T> {
        return new List<T>(Linq.where(this.elements, predicate));
    }

    public take(count: number): Enumerable<T> {
        return new List<T>(Linq.take(this.elements, count));
    }

    public takeLast(count: number): Enumerable<T> {
        return new List<T>(Linq.takeLast(this.elements, count));
    }

    public clear(): void {
        this.elements = [];
    }

    public contains(item: T): boolean {
        if (item) {
            const length: number = this.elements.length;

            for (let i = 0; i < length; ++i) {
                if (this.elements[i] === item) {
                    return true;
                }
            }
        }

        return false;
    }

    public indexOf(item: T): number {
        if (item) {
            const length: number = this.elements.length;

            for (let i = 0; i < length; ++i) {
                if (this.elements[i] === item) {
                    return i;
                }
            }
        }

        return -1;
    }

    public insert(index: number, item: T): void {
        this.elements.splice(index, 0, item);
    }

    public remove(item: T): boolean {
        if (this.elements.length == 0) {
            return false;
        }

        const index: number = this.indexOf(item);

        if (index < 0) {
            return false;
        }

        this.removeAt(index);

        return true;
    }

    public removeAt(index: number): void {
        this.elements.splice(index, 1);
    }

    public toArray(): Array<T> {
        return new Array<T>(...this.elements);
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
