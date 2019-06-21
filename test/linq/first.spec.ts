import * as Linq from '../../src/internal/linq';

const array: Array<number> = [7, 4, 2, 5, 3];
let undefinedArray: Array<number>;
interface Person {
    firstName: string;
    lastName: string;
    age: number;
}

describe('first', () => {
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
