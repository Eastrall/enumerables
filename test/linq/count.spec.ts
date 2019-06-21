import * as Linq from '../../src/internal/linq';

describe('Linq', () => {
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
});