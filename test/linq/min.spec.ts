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
    describe('min', () => {
        it('should get the minimum value of an array.', () => {
            expect(Linq.min(array, x => x.age)).toEqual(19);
        });

        it('should throw an error when getting the minimum value of an undefined array.', () => {
            expect(() => Linq.min(undefined, x => 0)).toThrow();
        });

        it('should throw an error when getting the minimum value of an array without predicate.', () => {
            expect(() => Linq.min(array, undefined)).toThrow();
        });
        
        it('should return 0 when getting the minimum value from an empty array.', () => {
            expect(Linq.min([], undefined)).toEqual(0);
        });
    });
});
