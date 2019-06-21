import * as Linq from '../../src/internal/linq';

const array: Array<number> = [7, 4, 2, 5, 3];
let undefinedArray: Array<number>;

describe('elementAt', () => {
    it('should get an element at a given index.', () => {
        const element = Linq.elementAt(array, 1);

        expect(element).toBeTruthy();
        expect(element).toEqual(array[1]);
        expect(element).toEqual(4);
    });

    it('should throw an error when getting an element out of bounds', () => {
        expect(() => Linq.elementAt(array, -1)).toThrow();
        expect(() => Linq.elementAt(array, -50)).toThrow();
        expect(() => Linq.elementAt(array, 10)).toThrow();
        expect(() => Linq.elementAt(array, 42)).toThrow();
    });

    it('should throw an error when input source array is undefined', () => {
        expect(() => Linq.elementAt(undefinedArray, 0)).toThrow();
    });
});

describe('elementAtOrDefault', () => {
    it('should get an element at a given index.', () => {
        const element = Linq.elementAtOrDefault(array, 1);

        expect(element).toBeTruthy();
        expect(element).toEqual(array[1]);
        expect(element).toEqual(4);
    });

    it('should get an undefined element when index is out of bounds.', () => {
        expect(Linq.elementAtOrDefault(array, -1)).toEqual(undefined);
        expect(Linq.elementAtOrDefault(array, 10)).toEqual(undefined);
    });

    it('should throw an error when input source array is undefined', () => {
        expect(() => Linq.elementAtOrDefault(undefinedArray, 0)).toThrow();
    });
});