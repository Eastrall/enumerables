import * as Linq from '../../src/internal/linq';

describe('Linq', () => {
    describe('skip', () => {
        it('should skip a given amount of elements.', () => {
            const amountToSkip: number = 3;
            const arrayOfObjects: Array<any> = [4, 6, 2, 9, 29, 37, 32];
            const array: Array<any> = Linq.skip(arrayOfObjects, amountToSkip);            

            expect(array).toBeTruthy();
            expect(array.length).toEqual(4);
            expect(array[0]).toEqual(9);
            expect(array[1]).toEqual(29);
            expect(array[2]).toEqual(37);
            expect(array[3]).toEqual(32);
        });

        it('should return the same array if skip amount is zero.', () => {
            const arrayOfObjects: Array<any> = [4, 6, 2, 9, 29, 37, 32];
            const array: Array<any> = Linq.skip(arrayOfObjects, 0);

            expect(array).toBeTruthy();
            expect(array.length).toEqual(arrayOfObjects.length);
            expect(array).toEqual(arrayOfObjects);
        });

        it('should return an empty array if skip amount is grather than array size.', () => {
            const arrayOfObjects: Array<any> = [4, 6, 2, 9];
            const array: Array<any> = Linq.skip(arrayOfObjects, 5);

            expect(array).toBeTruthy();
            expect(array.length).toEqual(0);
        });

        it('should throw an error is source array is undefined.', () => {
            const array: Array<any> = undefined;

            expect(() => Linq.skip(array, 2)).toThrow();
        });
    });
});