import * as Linq from '../../src/internal/linq';
import * as generators from '../generators';

describe('Linq', () => {
    const persons: Array<generators.Person> = [
        { firstName: 'John', lastName: 'Doe', age: 34, country: '' },
        { firstName: 'Jane', lastName: 'Doe', age: 36, country: '' },
        { firstName: 'James', lastName: 'Smith', age: 14, country: '' },
    ];

    describe('sum', () => {
        it('should sum a number property of an array.', () => {
            expect(Linq.sum(persons, x => x.age)).toEqual(84);
        });

        it('should throw an error if source array is undefined.', () => {
            expect(() => Linq.sum(undefined, _ => 0)).toThrow();
        });

        it('should throw an error if selector is undefined.', () => {
            expect(() => Linq.sum(persons, undefined)).toThrow();
        });
    });
});
