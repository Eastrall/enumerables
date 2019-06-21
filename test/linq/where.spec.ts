import * as Linq from '../../src/internal/linq';

const array: Array<number> = [7, 4, 2, 5, 3];

describe('where', () => {
    it('should apply a filter with a single parameter predicate.', () => {
        const elements: Array<number> = Linq.where(array, item => item > 3);

        expect(elements).toBeTruthy();
        expect(elements.length).toEqual(3);
    });

    it('should apply a filter with multiple parameter predicate.', () => {
        const elements: Array<number> = Linq.where(array, (item: number, index: number) => item > 3 && index % 2 == 0);

        expect(elements).toBeTruthy();
        expect(elements.length).toEqual(1);
    });

    it('should apply a filter on an empty array and return an empty array.', () => {
        const elements: Array<number> = Linq.where(array, item => item > 10);

        expect(elements).toBeTruthy();
        expect(elements.length).toEqual(0);
        expect(elements).toEqual([]);
    });

    it('should throw an error when the source array is undefined.', () => {
        expect(() => Linq.where(undefined, item => !item)).toThrow();
    });

    it('should throw an error when the predicate is undefined', () => {
        expect(() => Linq.where(array, undefined)).toThrow();
    });
});