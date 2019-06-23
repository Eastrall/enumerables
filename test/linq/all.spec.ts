import * as Linq from '../../src/internal/linq';
import * as generators from '../generators';

describe('Linq', () => {
    describe('all', () => {
        const array: Array<generators.Person> = generators.generatePersons(10);
    
        it('should match every elements of array.', () => {
            expect(Linq.all(array, x => x.age <= 100)).toEqual(true);
        });
        
        it('should not match every elements of array.', () => {
            expect(Linq.all(array, x => x.firstName.startsWith("John Undefined"))).toEqual(false);
        });
    
        it('should throw an exception if source is undefined.', () => {
            expect(() => Linq.all(undefined, x => !x)).toThrow();
        });
    
        it('should throw an exception if predicate is undefined.', () => {
            expect(() => Linq.all([], undefined)).toThrow();
        });
    });
});
