import { Enumerable } from '@lib/interfaces/enumerable';
import { Collection } from "@lib/interfaces/collection";
import { Grouping } from '@lib/interfaces/grouping';
import { Func, Func2 } from '@lib/internal/types';
import * as Linq from '@lib/internal/linq';

/**
 * Represents a strongly typed list of objects.
 */
export class List<T> implements Collection<T>, Enumerable<T> {
    protected elements: Array<T>;

    /**
     * Creates and initializes a new empty `List<T>` instance. 
     */
    constructor()
    /**
     * Creates and initializes a new `List<T>` that contains the elements copied from the specified `Array<T>`.
     * @param array The array whose elements are copied to the new list.
     */
    constructor(array: Array<T>)
    constructor(array?: Array<T>) {
        if (array) {
            this.elements = new Array<T>(...array);
        }
        else {
            this.elements = new Array<T>();
        }
    }

    /**
     * @inheritdoc 
     */
    public add(item: T): void {
        this.elements.push(item);
    }

    /**
     * @inheritdoc 
     */
    public aggregate(func: Func2<T, T, T>): T;
    /**
     * @inheritdoc 
     */
    public aggregate<TAccumulate>(seed: TAccumulate, func: Func2<TAccumulate, T, TAccumulate>): TAccumulate;
    /**
     * @inheritdoc 
     */
    public aggregate<TAccumulate, TResult>(seed: TAccumulate, func: Func2<TAccumulate, T, TAccumulate>, resultSelector: Func<TAccumulate, TResult>): TResult;
    public aggregate<TAccumulate, TResult>(funcOrSeed: Func2<T, T, T> | TAccumulate, func?: Func2<TAccumulate, T, TAccumulate>, resultSelector?: Func<TAccumulate, TResult>): T | TAccumulate | TResult {
        if (typeof (funcOrSeed) === 'function' && !func) {
            return Linq.aggregate<T>(this.elements, funcOrSeed as Func2<T, T, T>);
        }
        else {
            // Workaround for union types: https://github.com/microsoft/TypeScript/issues/14107#issuecomment-483995795
            return Linq.aggregate<T, TAccumulate, TResult>(this.elements, funcOrSeed as TAccumulate, func as any, resultSelector as any);
        }
    }

    /**
     * @inheritdoc 
     */
    public all(predicate: Func<T, boolean>): boolean {
        return Linq.all(this.elements, predicate);
    }

    /**
     * @inheritdoc 
     */
    public any(): boolean;
    /**
     * @inheritdoc 
     */
    public any(predicate: Func<T, boolean>): boolean;
    public any(predicate?: Func<T, boolean>): boolean {
        return predicate ? Linq.any(this.elements, predicate) : Linq.any(this.elements);
    }

    /**
     * @inheritdoc 
     */
    public append(element: T): Enumerable<T> {
        return new List<T>(Linq.append(this.elements, element));
    }
    
    /**
     * @inheritdoc 
     */
    public concat(elementsToConcat: Enumerable<T> | Array<T>): Enumerable<T> {
        const array: Array<T> = Linq.concat(this.elements, elementsToConcat instanceof Array ? elementsToConcat : elementsToConcat.toArray());
        
        return new List<T>(array);
    }

    /**
     * @inheritdoc 
     */
    public count(): number;
    /**
     * @inheritdoc 
     */
    public count(predicate: Func<T, boolean>): number;
    public count(predicate?: Func<T, boolean>): number {
        return predicate ? Linq.count(this.elements, predicate) : Linq.count(this.elements);
    }

    /**
     * @inheritdoc 
     */
    public elementAt(index: number): T {
        return Linq.elementAt(this.elements, index);
    }

    /**
     * @inheritdoc 
     */
    public elementAtOrDefault(index: number): T | undefined {
        return Linq.elementAtOrDefault(this.elements, index);
    }

    /**
     * @inheritdoc 
     */
    public first(): T;
    /**
     * @inheritdoc 
     */
    public first(predicate: Func<T, boolean>): T;
    public first(predicate?: Func<T, boolean>): T {
        return predicate ? Linq.first(this.elements, predicate) : Linq.first(this.elements);
    }

    /**
     * @inheritdoc 
     */
    public firstOrDefault(): T | undefined;
    /**
     * @inheritdoc 
     */
    public firstOrDefault(predicate: Func<T, boolean>): T | undefined;
    public firstOrDefault(predicate?: Func<T, boolean>): T | undefined {
        return predicate ? Linq.firstOrDefault(this.elements, predicate) : Linq.firstOrDefault(this.elements);
    }

    /**
     * @inheritdoc 
     */
    public groupBy<TKey>(keySelector: Func<T, TKey>): Enumerable<Grouping<TKey, T>>;
    /**
     * @inheritdoc 
     */
    public groupBy<TKey, TElement>(keySelector: Func<T, TKey>, elementSelector: Func<T, TElement>): Enumerable<Grouping<TKey, TElement>>;
    public groupBy<TKey, TElement>(keySelector: Func<T, TKey>, elementSelector?: Func<T, TElement>): Enumerable<Grouping<TKey, T | TElement>> {
        if (!keySelector) {
            throw new Error('keySelector is undefined.');
        }

        const result = Linq.aggregate(this.elements, new List<Grouping<TKey, T | TElement>>(), (groups: List<Grouping<TKey, T | TElement>>, next: T) => {
            const key: TKey = keySelector(next);
            const element: T | TElement = elementSelector ? elementSelector(next) : next;
            const keyElements: Grouping<TKey, T | TElement> | undefined = groups.firstOrDefault(x => x.key === key);

            if (!keyElements) {
                groups.add({
                    key: key,
                    elements: new List<T | TElement>([element]),
                });
            }
            else {
                keyElements.elements = keyElements.elements.append(element);
            }

            return groups;
        });

        return result;
    }

    /**
     * @inheritdoc 
     */
    public last(): T;
    /**
     * @inheritdoc 
     */
    public last(predicate: Func<T, boolean>): T;
    public last(predicate?: Func<T, boolean>): T {
        return predicate ? Linq.last(this.elements, predicate) : Linq.last(this.elements);
    }

    /**
     * @inheritdoc 
     */
    public lastOrDefault(): T | undefined
    /**
     * @inheritdoc 
     */
    public lastOrDefault(predicate: Func<T, boolean>): T | undefined;
    public lastOrDefault(predicate?: Func<T, boolean>): T | undefined {
        return predicate ? Linq.lastOrDefault(this.elements, predicate) : Linq.lastOrDefault(this.elements);
    }

    /**
     * @inheritdoc 
     */
    public max(selector: Func<T, number>): number {
        return Linq.max(this.elements, selector);
    }

    /**
     * @inheritdoc 
     */
    public min(selector: Func<T, number>): number {
        return Linq.min(this.elements, selector);
    }

    /**
     * @inheritdoc 
     */
    public orderBy<TKey>(keySelector: Func<T, TKey>): Enumerable<T> {
        return new List<T>(Linq.orderBy(this.elements, keySelector));
    }
    
    /**
     * @inheritdoc 
     */
    public orderByDescending<TKey>(keySelector: Func<T, TKey>): Enumerable<T> {
        return new List<T>(Linq.orderByDescending(this.elements, keySelector));
    }

    /**
     * @inheritdoc 
     */
    public select<TResult>(selector: Func<T, TResult>): Enumerable<TResult>;
    /**
     * @inheritdoc 
     */
    public select<TResult>(selector: Func2<T, number, TResult>): Enumerable<TResult>;
    public select<TResult>(selector: Func<T, TResult> | Func2<T, number, TResult>): Enumerable<TResult> {
        return new List<TResult>(Linq.select<T, TResult>(this.elements, selector));
    }

    /**
     * @inheritdoc 
     */
    public where(predicate: Func<T, boolean>): Enumerable<T>;
    /**
     * @inheritdoc 
     */
    public where(predicate: Func2<T, number, boolean>): Enumerable<T>;
    public where(predicate: Func<T, boolean> | Func2<T, number, boolean>): Enumerable<T> {
        return new List<T>(Linq.where(this.elements, predicate));
    }

    /**
     * @inheritdoc 
     */
    public take(count: number): Enumerable<T> {
        return new List<T>(Linq.take(this.elements, count));
    }

    /**
     * @inheritdoc 
     */
    public takeLast(count: number): Enumerable<T> {
        return new List<T>(Linq.takeLast(this.elements, count));
    }

    /**
     * @inheritdoc 
     */
    public clear(): void {
        this.elements = [];
    }

    /**
     * @inheritdoc 
     */
    public contains(item: T): boolean {
        return this.indexOf(item) !== -1;
    }

    /**
     * @inheritdoc 
     */
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

    /**
     * @inheritdoc 
     */
    public insert(index: number, item: T): void {
        this.elements.splice(index, 0, item);
    }

    /**
     * @inheritdoc 
     */
    public remove(item: T): boolean {
        const index: number = this.indexOf(item);

        if (index < 0) {
            return false;
        }

        this.removeAt(index);

        return true;
    }

    /**
     * @inheritdoc 
     */
    public removeAt(index: number): void {
        if (index < 0 || index > this.elements.length) {
            throw new Error('index was out of bound.');
        }

        this.elements.splice(index, 1);
    }

    /**
     * @inheritdoc 
     */
    public toArray(): Array<T> {
        return new Array<T>(...this.elements);
    }

    /**
     * @inheritdoc 
     */
    public toString(): string {
        return `[ ${this.elements.join(', ')} ]`;
    }

    /**
     * Provides the mechanism to tnterate over the current collection.
     */
    public [Symbol.iterator](): Iterator<T> {
        let cursor: number = 0;
        const elements = this.elements;
        const elementsLength = elements.length;

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
