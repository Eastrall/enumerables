import { Enumerable } from './enumerable';
import { Collection } from "./collection";

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
        if (index < 0 || index >= this.elements.length) {
            throw new Error('index is less than 0 or greater than or equal to the number of elements in source.');
        }
        return this.elements[index];
    }

    public elementAtOrDefault(index: number): T | undefined {
        return index < 0 || index >= this.elements.length ? undefined : this.elements[index];
    }

    public firstOrDefault(): T | undefined;
    public firstOrDefault(predicate: (item: T) => boolean): T | undefined;
    public firstOrDefault(predicate?: (item: T) => boolean): T | undefined {
        if (predicate) {
            let elementsLength: number = this.elements.length;

            for (let i = 0; i < elementsLength; ++i) {
                if (predicate(this.elements[i])) {
                    return this.elements[i];
                }
            }
        }

        return this.elementAtOrDefault(0);
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
