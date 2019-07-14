import * as Linq from '../../src/internal/linq';

interface Person {
    firstName: string;
    lastName: string;
    age: number;
}
const array: Array<Person> = [
    { firstName: 'John', lastName: 'Doe', age: 42 },
    { firstName: 'Jane', lastName: 'Doe', age: 47 },
    { firstName: 'James', lastName: 'Smith', age: 19 },
    { firstName: 'Clark', lastName: 'Amond', age: 84 },
    { firstName: 'Sam', lastName: 'Harrington', age: 37 }
];

describe('Linq', () => {
    describe('max', () => {
        it('should get the maximum value of an array.', () => {
            expect(Linq.max(array, x => x.age)).toEqual(84);
        });

        it('should throw an error when getting the maximum value of an undefined array.', () => {
            expect(() => Linq.max(undefined, x => 0)).toThrow();
        });

        it('should throw an error when getting the maximum value of an array without predicate.', () => {
            expect(() => Linq.max(array, undefined)).toThrow();
        });
        
        it('should return 0 when getting the maximum value from an empty array.', () => {
            expect(Linq.max([], undefined)).toEqual(0);
        });
    });
});
