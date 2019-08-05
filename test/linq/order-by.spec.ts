import * as Linq from '../../src/internal/linq';

describe('Linq', () => {
    const array = [
        { name: 'John Doe', age: 42 },
        { name: 'Jane Doe', age: 56 },
        { name: 'James Smith', age: 26 },
        { name: 'Sarah Jones', age: 38 },
        { name: 'Peter Miller', age: 26 },
    ];

    describe('order by', () => {
        it('should order an array of objects based on a string key.', () => {
            const sortedArray = Linq.orderBy(array, x => x.name);

            expect(sortedArray).toBeTruthy();
            expect(sortedArray.length).toEqual(5);
            expect(sortedArray[0]).toEqual(array[2]);
            expect(sortedArray[1]).toEqual(array[1]);
            expect(sortedArray[2]).toEqual(array[0]);
            expect(sortedArray[3]).toEqual(array[4]);
            expect(sortedArray[4]).toEqual(array[3]);
        });

        it('should order an array of objects based on a number key.', () => {
            const sortedArray = Linq.orderBy(array, x => x.age);

            expect(sortedArray).toBeTruthy();
            expect(sortedArray.length).toEqual(5);
            expect(sortedArray[0]).toEqual(array[2]);
            expect(sortedArray[1]).toEqual(array[4]);
            expect(sortedArray[2]).toEqual(array[3]);
            expect(sortedArray[3]).toEqual(array[0]);
            expect(sortedArray[4]).toEqual(array[1]);
        });

        it('should order an array of numbers', () => {
            const arrayOfNumbers = [0, 4, 2, 5, -1, 0];
            const sortedArrayOfNumbers = Linq.orderBy(arrayOfNumbers, x => x);
            
            expect(sortedArrayOfNumbers).toBeTruthy();
            expect(sortedArrayOfNumbers.length).toEqual(6);
            expect(sortedArrayOfNumbers[0]).toEqual(-1);
            expect(sortedArrayOfNumbers[1]).toEqual(0);
            expect(sortedArrayOfNumbers[2]).toEqual(0);
            expect(sortedArrayOfNumbers[3]).toEqual(2);
            expect(sortedArrayOfNumbers[4]).toEqual(4);
            expect(sortedArrayOfNumbers[5]).toEqual(5);
        });

        it('should order an array of strings', () => {
            const arrayOfStrings = ['hello', 'TypeScript', 'little', 'world'];
            const sortedArrayOfString = Linq.orderBy(arrayOfStrings, x => x);

            expect(sortedArrayOfString).toBeTruthy();
            expect(sortedArrayOfString.length).toEqual(4);
            expect(sortedArrayOfString[0]).toEqual('TypeScript'); // Because of ASCII values
            expect(sortedArrayOfString[1]).toEqual('hello');
            expect(sortedArrayOfString[2]).toEqual('little');
            expect(sortedArrayOfString[3]).toEqual('world');
        });

        it('should throw an error if input array source is undefined.', () => {
            const undefinedArray: Array<any> = undefined;

            expect(() => Linq.orderBy(undefinedArray, x => x)).toThrow();
        });

        it('should throw an error if key selector is undefined.', () => {
            const array: Array<any> = new Array<any>();

            expect(() => Linq.orderBy(array, undefined)).toThrow();
        });
    });

    describe('order by descending', () => {
        it('should order an array of objects based on a string key in a descending way.', () => {
            const sortedArray = Linq.orderByDescending(array, x => x.name);

            expect(sortedArray).toBeTruthy();
            expect(sortedArray.length).toEqual(5);
            expect(sortedArray[0]).toEqual(array[3]);
            expect(sortedArray[1]).toEqual(array[4]);
            expect(sortedArray[2]).toEqual(array[0]);
            expect(sortedArray[3]).toEqual(array[1]);
            expect(sortedArray[4]).toEqual(array[2]);
        });

        it('should order an array of objects based on a number key in a descending way.', () => {
            const sortedArray = Linq.orderByDescending(array, x => x.age);

            expect(sortedArray).toBeTruthy();
            expect(sortedArray.length).toEqual(5);
            expect(sortedArray[0]).toEqual(array[1]);
            expect(sortedArray[1]).toEqual(array[0]);
            expect(sortedArray[2]).toEqual(array[3]);
            expect(sortedArray[3]).toEqual(array[2]);
            expect(sortedArray[4]).toEqual(array[4]);
        });

        it('should order an array of numbers in a descending way.', () => {
            const arrayOfNumbers = [0, 4, 2, 5, -1, 0];
            const sortedArrayOfNumbers = Linq.orderByDescending(arrayOfNumbers, x => x);
            
            expect(sortedArrayOfNumbers).toBeTruthy();
            expect(sortedArrayOfNumbers.length).toEqual(6);
            expect(sortedArrayOfNumbers[0]).toEqual(5);
            expect(sortedArrayOfNumbers[1]).toEqual(4);
            expect(sortedArrayOfNumbers[2]).toEqual(2);
            expect(sortedArrayOfNumbers[3]).toEqual(0);
            expect(sortedArrayOfNumbers[4]).toEqual(0);
            expect(sortedArrayOfNumbers[5]).toEqual(-1);
        });

        it('should order an array of strings in a descending way.', () => {
            const arrayOfStrings = ['hello', 'TypeScript', 'little', 'world'];
            const sortedArrayOfString = Linq.orderByDescending(arrayOfStrings, x => x);

            expect(sortedArrayOfString).toBeTruthy();
            expect(sortedArrayOfString.length).toEqual(4);
            expect(sortedArrayOfString[0]).toEqual('world'); 
            expect(sortedArrayOfString[1]).toEqual('little');
            expect(sortedArrayOfString[2]).toEqual('hello');
            expect(sortedArrayOfString[3]).toEqual('TypeScript'); // Because of ASCII values
        });

        it('should throw an error if input array source is undefined.', () => {
            const undefinedArray: Array<any> = undefined;

            expect(() => Linq.orderByDescending(undefinedArray, x => x)).toThrow();
        });

        it('should throw an error if key selector is undefined.', () => {
            const array: Array<any> = new Array<any>();

            expect(() => Linq.orderByDescending(array, undefined)).toThrow();
        });
    });
});