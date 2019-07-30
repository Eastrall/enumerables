import { Enumerable } from '../interfaces/enumerable';
import { Collection } from "../interfaces/collection";
import { Func, Func2 } from '../internal/types';
import * as Linq from '../internal/linq';

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

    /* @inheritdoc */
    public add(item: T): void {
        this.elements.push(item);
    }

    /* @inheritdoc */
    public count(): number;
    public count(predicate: Func<T, boolean>): number;
    public count(predicate?: Func<T, boolean>): number {
        return predicate ? Linq.count(this.elements, predicate) : Linq.count(this.elements);
    }

    /* @inheritdoc */
    public elementAt(index: number): T {
        return Linq.elementAt(this.elements, index);
    }

    /* @inheritdoc */
    public elementAtOrDefault(index: number): T | undefined {
        return Linq.elementAtOrDefault(this.elements, index);
    }

    /* @inheritdoc */
    public first(): T;
    public first(predicate: Func<T, boolean>): T;
    public first(predicate?: Func<T, boolean>): T {
        return predicate ? Linq.first(this.elements, predicate) : Linq.first(this.elements);
    }

    /* @inheritdoc */
    public firstOrDefault(): T | undefined;
    public firstOrDefault(predicate: Func<T, boolean>): T | undefined;
    public firstOrDefault(predicate?: Func<T, boolean>): T | undefined {
        return predicate ? Linq.firstOrDefault(this.elements, predicate) : Linq.firstOrDefault(this.elements);
    }

    /* @inheritdoc */
    public last(): T;
    public last(predicate: Func<T, boolean>): T;
    public last(predicate?: Func<T, boolean>): T {
        return predicate ? Linq.last(this.elements, predicate) : Linq.last(this.elements);
    }

    /* @inheritdoc */
    public lastOrDefault(): T | undefined
    public lastOrDefault(predicate: Func<T, boolean>): T | undefined;
    public lastOrDefault(predicate?: Func<T, boolean>): T | undefined {
        return predicate ? Linq.lastOrDefault(this.elements, predicate) : Linq.lastOrDefault(this.elements);
    }

    /* @inheritdoc */
    // public select<TResult>(selector: Func<T, TResult>): Enumerable<TResult>;
    // public select<TResult>(selector: Func2<T, number, TResult>): Enumerable<TResult>;
    public select<TResult>(selector: Func<T, TResult> | Func2<T, number, TResult>): Enumerable<TResult> {
        return new List<TResult>(Linq.select<T, TResult>(this.elements, selector));
    }

    /* @inheritdoc */
    // public where(predicate: Func<T, boolean>): Enumerable<T>;
    // public where(predicate: Func2<T, number, boolean>): Enumerable<T>;
    public where(predicate: Func<T, boolean> | Func2<T, number, boolean>): Enumerable<T> {
        return new List<T>(Linq.where(this.elements, predicate));
    }

    /* @inheritdoc */
    public take(count: number): Enumerable<T> {
        return new List<T>(Linq.take(this.elements, count));
    }

    /* @inheritdoc */
    public takeLast(count: number): Enumerable<T> {
        return new List<T>(Linq.takeLast(this.elements, count));
    }

    /* @inheritdoc */
    public clear(): void {
        this.elements = [];
    }

    /* @inheritdoc */
    public contains(item: T): boolean {
        return this.indexOf(item) !== -1;
    }

    /* @inheritdoc */
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

    /* @inheritdoc */
    public insert(index: number, item: T): void {
        this.elements.splice(index, 0, item);
    }

    /* @inheritdoc */
    public remove(item: T): boolean {
        const index: number = this.indexOf(item);

        if (index < 0) {
            return false;
        }

        this.removeAt(index);

        return true;
    }

    /* @inheritdoc */
    public removeAt(index: number): void {
        if (index < 0 || index > this.elements.length) {
            throw new Error('index was out of bound.');
        }

        this.elements.splice(index, 1);
    }

    /* @inheritdoc */
    public toArray(): Array<T> {
        return new Array<T>(...this.elements);
    }

    /**
     * Interates over the collection.
     */
    public [Symbol.iterator](): Iterator<T> {
        let cursor: number = 0;
        const elements = this.elements;
        const elementsLength = this.elementAt.length;

        return {
            next: function() {
                return {
                    done: cursor < elementsLength,
                    value: cursor < elementsLength ? elements[cursor++] : undefined as any
                }
                // if (cursor < elementsLength) {
                //     return { done: false, value: elements[cursor++] };
                // }
                // else {
                //     return { done: true, value: undefined as any };
                // }
            }.bind(this)
        };
    }
}
