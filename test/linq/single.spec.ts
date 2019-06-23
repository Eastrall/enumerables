import * as Linq from '../../src/internal/linq';
import * as generators from '../generators';

describe('Linq', () => {
    const arraySingleElement: Array<number> = [42];
    const linearNumbers = generators.generateLinearNumbers(10);

    describe('single', () => {
        it('should get one and only *one* element of an array.', () => {
            expect(Linq.single(arraySingleElement)).toEqual(arraySingleElement[0]);
        });
    
        it('should get one and only *one* element of an array matching a predicate function.', () => {
            expect(Linq.single(linearNumbers, x => x >= 10)).toEqual(10);
        });
    
        it('should throw an error if source array is undefined.', () => {
            expect(() => Linq.single(undefined)).toThrow();
            expect(() => Linq.single(undefined, x => !x)).toThrow();
        });
    
        it('should throw an error if array is empty.', () => {
            expect(() => Linq.single([])).toThrow();
            expect(() => Linq.single([], x => !x)).toThrow();
        });
    
        it('should throw an error if array has more than one element.', () => {
            expect(() => Linq.single(linearNumbers)).toThrow();
        });
    
        it('should throw an error if more than one element matches a predicate function.', () => {
            expect(() => Linq.single(linearNumbers, x => x % 2 == 0)).toThrow();
        });
    
        it('should throw an error if no elements matches a predicate function.', () => {
            expect(() => Linq.single(linearNumbers, x => x > 12)).toThrow();
        });
    });
    
    describe('singleOrDefault', () => {
        it('should get one and only *one* element of an array.', () => {
            expect(Linq.singleOrDefault(arraySingleElement)).toEqual(arraySingleElement[0]);
        });

        it('should get one and only *one* element of an array matching a predicate function.', () => {
            expect(Linq.singleOrDefault(linearNumbers, x => x >= 10)).toEqual(10);
        });

        it('should throw an error if source array is undefined.', () => {
            expect(() => Linq.singleOrDefault(undefined)).toThrow();
            expect(() => Linq.singleOrDefault(undefined, x => !x)).toThrow();
        });

        it('should get an undefined value if source array is empty.', () => {
            expect(Linq.singleOrDefault([])).toEqual(undefined);
            expect(Linq.singleOrDefault([], x => !x)).toEqual(undefined);
        });

        it('should throw an error if source has more than one element.', () => {
            expect(() => Linq.singleOrDefault(linearNumbers)).toThrow();
        });

        it('should throw an error if more than one element matches a predicate function.', () => {
            expect(() => Linq.singleOrDefault(linearNumbers, x => x % 2 == 0)).toThrow();
        });

        it('should get an undefined value if no elements matches a predicate function.', () => {
            expect(Linq.singleOrDefault(linearNumbers, x => x > 12)).toEqual(undefined);
        });
    });
});
