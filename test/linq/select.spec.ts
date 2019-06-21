import * as Linq from '../../src/internal/linq';

const array: Array<number> = [7, 4, 2, 5, 3];
interface Person {
    name: string;
    age: number;
}

describe('select', () => {
    it('should throw an error when source array is undefined.', () => {
        expect(() => Linq.select(undefined, item => !item)).toThrow();
    });

    it('should throw an error when predicate is undefined.', () => {
        expect(() => Linq.select([], undefined)).toThrow();
    });

    it('should a simple array into a complex array.', () => {
        const complexArray: Array<Person> = Linq.select(array, item => ({ name: 'Person name ' + item, age: item }));

        expect(complexArray).toBeTruthy();
        expect(complexArray.length).toEqual(array.length);
        
        for (let i = 0; i < complexArray.length; ++i) {
            const complexElement: Person = complexArray[i];

            expect(complexElement).toBeTruthy();
            expect(complexElement.name).toEqual('Person name ' + array[i]);
            expect(complexElement.age).toEqual(array[i]);
        }
    });

    it('should map a complex array into a simple array.', () => {
        const complexArray: Array<Person> = [
            { name: 'John Doe', age: 42 },
            { name: 'Jane Doe', age: 38 },
            { name: 'James Smith', age: 28 },
            { name: 'Martha Miler', age: 30}
        ];

        const simpleArray: Array<string> = Linq.select(complexArray, item => `Hello ${item.name}!`);

        expect(simpleArray).toBeTruthy();
        expect(simpleArray.length).toEqual(complexArray.length);

        for (let i = 0; i < simpleArray.length; ++i) {
            const simpleElement: string = simpleArray[i];

            expect(simpleElement).toBeTruthy();
            expect(simpleElement).toEqual(`Hello ${complexArray[i].name}!`);
        }
    });

    it('should map a simple array into a complexe array using select index.', () => {
        interface ValueIndex {
            index: number;
            value: number;
        }

        const complexArray: Array<ValueIndex> = Linq.select(array, (item: number, index: number) => ({ value: item, index: index}));

        expect(complexArray).toBeTruthy();
        expect(complexArray.length).toEqual(array.length);
        
        for (let i = 0; i < complexArray.length; ++i) {
            const element: ValueIndex = complexArray[i];

            expect(element).toBeTruthy();
            expect(element.index).toEqual(i);
            expect(element.value).toEqual(array[i]);
        }
    });
});