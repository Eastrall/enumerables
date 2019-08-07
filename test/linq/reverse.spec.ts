import * as Linq from '../../src/internal/linq';

describe('Linq', () => {
    describe('reverse', () => {
        it('should reverse an array of strings.', () => {
            const arrayOfStrings: Array<string> = ['t', 'y', 'p', 'e', 's', 'c', 'r', 'i', 'p', 't'];
            const reversedArrayOfStrings: Array<string> = Linq.reverse(arrayOfStrings);

            expect(reversedArrayOfStrings).toBeTruthy();
            expect(reversedArrayOfStrings.length).toEqual(arrayOfStrings.length);

            let length: number = arrayOfStrings.length;
            for (let i = 0; i < length; ++i) {
                expect(reversedArrayOfStrings[i]).toEqual(arrayOfStrings[length - i - 1]);
            }
        });

        it('should reverse an array of numbers.', () => {
            const arrayOfNumbers: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7];
            const reversedArrayOfNumbers: Array<number> = Linq.reverse(arrayOfNumbers);

            expect(reversedArrayOfNumbers).toBeTruthy();
            expect(reversedArrayOfNumbers.length).toEqual(arrayOfNumbers.length);

            let length: number = arrayOfNumbers.length;
            for (let i = 0; i < length; ++i) {
                expect(reversedArrayOfNumbers[i]).toEqual(arrayOfNumbers[length - i - 1]);
            }
        });

        it('should reverse an array of objects.', () => {
            const arrayOfObjects: Array<any> = [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Doe' },
                { id: 3, name: 'James Smith' },
            ];
            const reversedArrayOfObjects: Array<any> = Linq.reverse(arrayOfObjects);

            expect(reversedArrayOfObjects).toBeTruthy();
            expect(reversedArrayOfObjects.length).toEqual(arrayOfObjects.length);

            let length: number = arrayOfObjects.length;
            for (let i = 0; i < length; ++i) {
                const objectFromOriginalArray = arrayOfObjects[length - i - 1];
                const objectFromReversedArray = reversedArrayOfObjects[i];

                expect(objectFromReversedArray.id).toEqual(objectFromOriginalArray.id);
                expect(objectFromReversedArray.name).toEqual(objectFromOriginalArray.name);
            }
        });

        it('should try to reverse an empty array.', () => {
            const emptyArray: Array<any> = new Array<any>();
            const emptyReversedArray: Array<any> = Linq.reverse(emptyArray);

            expect(emptyReversedArray).toBeTruthy();
            expect(emptyReversedArray.length).toEqual(0);
        });

        it('should throw an error if source array is undefined.', () => {
            const array: Array<any> = undefined;

            expect(() => Linq.reverse(array)).toThrow();
        });
    });
});