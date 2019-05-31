interface Enumerable<T> extends Iterable<T> {}

interface Collection<T> extends Enumerable<T> {
    add(item: T): void
    elementAt(index: number): T
}

export class List<T> implements Collection<T>, Enumerable<T> {
    protected elements: Array<T>

    constructor() {
        this.elements = new Array<T>()
    }

    public add(item: T): void {
        this.elements.push(item)
    }

    public elementAt(index: number): T {
        if (index < 0 || index > this.elements.length) {
            throw new Error('')
        }

        return this.elements[index]
    }

    [Symbol.iterator]() {
        let cursor = 0
        let elements = this.elements

        return {
            next() {
                if (cursor < elements.length) {
                    return { done: false, value: elements[cursor++] }
                } else {
                    return { done: true, value: <any>undefined }
                }
            }
        }
    }
}
