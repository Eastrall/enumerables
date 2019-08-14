import * as Linq from '../../src/internal/linq';

describe('Linq', () => {
    describe('append', () => {
        it('should append an element at the end a sequence and return a new array.', () => {
            const arrayOfNumbers: Array<number> = [1, 2, 3, 4];
            const arrayOfNumbersAppend: Array<number> = Linq.append(arrayOfNumbers, 5);

            expect(arrayOfNumbersAppend).toBeTruthy();
            expect(arrayOfNumbersAppend.length).toEqual(5);
            expect(arrayOfNumbersAppend[0]).toEqual(1);
            expect(arrayOfNumbersAppend[1]).toEqual(2);
            expect(arrayOfNumbersAppend[2]).toEqual(3);
            expect(arrayOfNumbersAppend[3]).toEqual(4);
            expect(arrayOfNumbersAppend[4]).toEqual(5);
        });

        it('sould throw an error is source is undefined.', () => {
            expect(() => Linq.append(undefined, 0)).toThrow();
        });
    });
});