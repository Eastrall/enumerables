import * as Linq from '../src/internal/linq';

describe('Linq', () => {
    interface Person {
        firstName: string;
        lastName: string;
        age: number;
    }

    describe('count', () => {
        const array: Array<number> = [7, 4, 2, 5, 3];
        let undefinedArray: Array<number>;

        it('should get the number of elements of the array', () => {
            expect(Linq.count(array)).toEqual(array.length);
            expect(Linq.count([])).toEqual(0);
        });

        it('should get the number of elements matching the predicate function', () => {
            expect(Linq.count(array, x => x > 5)).toEqual(1);
        });

        it('should throw an error when input source is undefined.', () => {
            expect(() => Linq.count(undefinedArray)).toThrow();
        });
    });

    describe('elementAt', () => {
        const array: Array<number> = [7, 4, 2, 5, 3];
        let undefinedArray: Array<number>;
        
        it('should get an element at a given index.', () => {
            const element = Linq.elementAt(array, 1);

            expect(element).toBeTruthy();
            expect(element).toEqual(array[1]);
            expect(element).toEqual(4);
        });

        it('should throw an error when getting an element out of bounds', () => {
            expect(() => Linq.elementAt(array, -1)).toThrow();
            expect(() => Linq.elementAt(array, -50)).toThrow();
            expect(() => Linq.elementAt(array, 10)).toThrow();
            expect(() => Linq.elementAt(array, 42)).toThrow();
        });

        it('should throw an error when input source array is undefined', () => {
            expect(() => Linq.elementAt(undefinedArray, 0)).toThrow();
        });
    });

    describe('elementAtOrDefault', () => {
        const array: Array<number> = [7, 4, 2, 5, 3];
        let undefinedArray: Array<number>;

        it('should get an element at a given index.', () => {
            const element = Linq.elementAtOrDefault(array, 1);

            expect(element).toBeTruthy();
            expect(element).toEqual(array[1]);
            expect(element).toEqual(4);
        });

        it('should get an undefined element when index is out of bounds.', () => {
            expect(Linq.elementAtOrDefault(array, -1)).toEqual(undefined);
            expect(Linq.elementAtOrDefault(array, 10)).toEqual(undefined);
        });

        it('should throw an error when input source array is undefined', () => {
            expect(() => Linq.elementAtOrDefault(undefinedArray, 0)).toThrow();
        });
    });

    describe('first', () => {
        const array: Array<number> = [7, 4, 2, 5, 3];
        let undefinedArray: Array<number>;

        it('should get the first element of an array', () => {
            const element = Linq.first(array);

            expect(element).toBeTruthy();
            expect(element).toEqual(array[0]);
            expect(element).toEqual(7);
        });

        it('should throw an error when getting first element of undefined array', () => {
            expect(() => Linq.first(undefinedArray)).toThrow();
        });

        it('should throw an error when getting first element of empty array', () => {
            expect(() => Linq.first([])).toThrow();
        });

        it('should get the first element matching the predicate', () => {
            const array: Array<Person> = [
                { firstName: 'John', lastName: 'Doe', age: 42 },
                { firstName: 'Jane', lastName: 'Doe', age: 38 }
            ];
            const element = Linq.first(array, x => x.age > 40);

            expect(element).toBeTruthy();
            expect(element).toEqual(array[0]);
            expect(element.firstName).toEqual('John');
            expect(element.lastName).toEqual('Doe');
            expect(element.age).toEqual(42);
        });

        it('should throw an error when getting the first element not matching the predicate', () => {
            const array: Array<Person> = [
                { firstName: 'John', lastName: 'Doe', age: 42 },
                { firstName: 'Jane', lastName: 'Doe', age: 38 }
            ];
            
            expect(() => Linq.first(array, x => x.firstName === 'Clark')).toThrow();
        });
    });

    describe('firstOrDefault', () => {
        const array: Array<number> = [7, 4, 2, 5, 3];
        let undefinedArray: Array<number>;

        it('should get the first element of an array', () => {
            const element = Linq.firstOrDefault(array);

            expect(element).toBeTruthy();
            expect(element).toEqual(array[0]);
            expect(element).toEqual(7);
        });

        it('should throw an error when getting first element of undefined array', () => {
            expect(() => Linq.firstOrDefault(undefinedArray)).toThrow();
        });

        it('should get an undefined value when getting first element of empty array', () => {
            expect(Linq.firstOrDefault([])).not.toBeTruthy();
        });

        it('should get the first element matching the predicate', () => {
            const array: Array<Person> = [
                { firstName: 'John', lastName: 'Doe', age: 42 },
                { firstName: 'Jane', lastName: 'Doe', age: 38 }
            ];
            const element = Linq.firstOrDefault(array, x => x.age > 40);

            expect(element).toBeTruthy();
            expect(element).toEqual(array[0]);
            expect(element.firstName).toEqual('John');
            expect(element.lastName).toEqual('Doe');
            expect(element.age).toEqual(42);
        });

        it('should get an undefined value when getting the first element not matching the predicate', () => {
            const array: Array<Person> = [
                { firstName: 'John', lastName: 'Doe', age: 42 },
                { firstName: 'Jane', lastName: 'Doe', age: 38 }
            ];
            
            expect(Linq.firstOrDefault(array, x => x.firstName === 'Clark')).not.toBeTruthy();
        });
    });

    describe('last', () => {
        const array: Array<number> = [7, 4, 2, 5, 3];
        let undefinedArray: Array<number>;

        it('should get the last element.', () => {
            const element = Linq.last(array);

            expect(element).toBeTruthy();
            expect(element).toEqual(array[array.length - 1]);
            expect(element).toEqual(3);
        });

        it('should throw an error when getting the last element of an undefined array.', () => {
            expect(() => Linq.last(undefinedArray)).toThrow();
        });

        it('should throw an error when getting the last element of an empty array.', () => {
            expect(() => Linq.last([])).toThrow();
        });

        it('should get the last element matching a predicate function.', () => {
            const element = Linq.last(array, x => x > 5);

            expect(element).toBeTruthy();
            expect(element).toEqual(7);
        });
    });

    describe('lastOrDefault', () => {
        // TODO
    });
});