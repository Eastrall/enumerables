import * as Linq from '../../src/internal/linq';

describe('Linq', () => {
    describe('concat', () => {
        it('should throw an error is the source is undefined.', () => {
            expect(() => Linq.concat(undefined, [])).toThrow();
        });

        it('should throw an error if elements to concat is undefined.', () => {
            expect(() => Linq.concat([], undefined)).toThrow();
        });

        it('should concat two sequences.', () => {
            const firstArray: Array<number> = [1, 2, 3, 4];
            const secondArray: Array<number> = [5, 6, 7];
            const concatArray: Array<number> = Linq.concat(firstArray, secondArray);

            expect(concatArray).toBeTruthy();
            expect(concatArray.length).toEqual(7);
            
            for (let i = 0; i < concatArray.length; ++i) {
                expect(concatArray[i]).toEqual(i + 1);
            }
        });
    });
});