import * as Linq from '../../src/internal/linq';

const array: Array<number> = [7, 4, 2, 5, 3];

describe('Linq', () => {
    describe('take', () => {
        it('should return the X first elements of a sequence.', () => {
            expect(Linq.take(array, 0)).toEqual([]);
            expect(Linq.take(array, 3)).toEqual([7, 4, 2]);
            expect(Linq.take(array, 5)).toEqual([7, 4, 2, 5, 3]);
            expect(Linq.take(array, 10)).toEqual([7, 4, 2, 5, 3]);
        });

        it('should throw an error when the source is undefined.', () => {
            expect(() => Linq.take(undefined, 0)).toThrow();
        });

        it('should return an empty array if the count is less than 0.', () => {
            expect(Linq.take(array, -1)).toEqual([]);
        });
    });

    describe('takeLast', () => {
        it('should return the X last elements of a sequence.', () => {
            expect(Linq.takeLast(array, 0)).toEqual([]);
            expect(Linq.takeLast(array, 3)).toEqual([2, 5, 3]);
            expect(Linq.takeLast(array, 5)).toEqual([7, 4, 2, 5, 3]);
            expect(Linq.takeLast(array, 10)).toEqual([7, 4, 2, 5, 3]);
        });

        it('should throw an error when the source is undefined.', () => {
            expect(() => Linq.takeLast(undefined, 0)).toThrow();
        });

        it('should return an empty array if the count is less than 0.', () => {
            expect(Linq.takeLast(array, -1)).toEqual([]);
        });
    });
});