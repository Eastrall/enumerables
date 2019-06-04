import * as Linq from '../../src/internal/linq';

const array: Array<number> = [7, 4, 2, 5, 3];
let undefinedArray: Array<number>;
interface Person {
    firstName: string;
    lastName: string;
    age: number;
}

describe('last', () => {
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

    it('should throw an error when getting the last element not matching a predicate function', () => {
        expect(() => Linq.last(array, x => x < 0)).toThrow();
    });
});

describe('lastOrDefault', () => {
    it('should get the last element.', () => {
        const element = Linq.lastOrDefault(array);

        expect(element).toBeTruthy();
        expect(element).toEqual(array[array.length - 1]);
        expect(element).toEqual(3);
    });

    it('should throw an error when getting the last element of an undefined array.', () => {
        expect(() => Linq.lastOrDefault(undefinedArray)).toThrow();
    });

    it('should get an undefined value when getting the last element of an empty array.', () => {
        expect(Linq.lastOrDefault([])).not.toBeTruthy();
    });

    it('should get the last element matching a predicate function.', () => {
        const array: Array<Person> = [
            { firstName: 'John', lastName: 'Doe', age: 42 },
            { firstName: 'Jane', lastName: 'Doe', age: 38 },
            { firstName: 'Clark', lastName: 'Lawson', age: 38 }
        ];
        const element = Linq.lastOrDefault(array, x => x.age === 38);

        expect(element).toBeTruthy();
        expect(element).toEqual(array[array.length - 1]);
        expect(element.firstName).toEqual('Clark');
        expect(element.lastName).toEqual('Lawson');
        expect(element.age).toEqual(38);
    });

    it('should get an undefined value when getting the last element matching a predicate function.', () => {
        const array: Array<Person> = [
            { firstName: 'John', lastName: 'Doe', age: 42 },
            { firstName: 'Jane', lastName: 'Doe', age: 38 },
            { firstName: 'Clark', lastName: 'Lawson', age: 38 }
        ];

        expect(Linq.lastOrDefault(array, x => x.firstName === "James")).not.toBeTruthy();
    });
});