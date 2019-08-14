import * as Linq from '../../src/internal/linq';

interface Person {
    name: string;
    age: number;
    country: string;
}

describe('Linq', () => {
    describe('group-by', () => {
        const arrayOfPersons: Array<Person> = [
            { name: 'John Doe', age: 42, country: 'USA' },
            { name: 'Jane Doe', age: 31, country: 'USA' },
            { name: 'Alberto Espinoza', age: 39, country: 'Mexico' },
            { name: 'Jean Dupont', age: 42, country: 'France' },
            { name: 'Julia Gomez', age: 43, country: 'Mexico' }
        ];

        it('should throw an error if source is undefined.', () => {
            expect(() => Linq.groupBy(undefined, undefined)).toThrow();
        });

        it('should throw an error if the key selector is undefined.', () => {
            expect(() => Linq.groupBy([], undefined)).toThrow();
        });

        it('should group an array by a numeric key.', () => {
            const groupedArray = Linq.groupBy(arrayOfPersons, (x: Person) => x.age);

            expect(groupedArray).toBeTruthy();
            expect(groupedArray.length).toEqual(4);

            expect(groupedArray[0].key).toEqual(42);
            expect(groupedArray[0].elements.length).toEqual(2);
            expect(groupedArray[0].elements[0]).toEqual(arrayOfPersons[0]);
            expect(groupedArray[0].elements[1]).toEqual(arrayOfPersons[3]);

            expect(groupedArray[1].key).toEqual(31);
            expect(groupedArray[1].elements.length).toEqual(1);
            expect(groupedArray[1].elements[0]).toEqual(arrayOfPersons[1]);

            expect(groupedArray[2].key).toEqual(39);
            expect(groupedArray[2].elements.length).toEqual(1);
            expect(groupedArray[2].elements[0]).toEqual(arrayOfPersons[2]);
            
            expect(groupedArray[3].key).toEqual(43);
            expect(groupedArray[3].elements.length).toEqual(1);
            expect(groupedArray[3].elements[0]).toEqual(arrayOfPersons[4]);
        });

        it('should group an array by a string key.', () => {
            const groupedArray = Linq.groupBy(arrayOfPersons, (x: Person) => x.country);

            expect(groupedArray).toBeTruthy();
            expect(groupedArray.length).toEqual(3);

            expect(groupedArray[0].key).toEqual('USA');
            expect(groupedArray[0].elements.length).toEqual(2);
            expect(groupedArray[0].elements[0]).toEqual(arrayOfPersons[0]);
            expect(groupedArray[0].elements[1]).toEqual(arrayOfPersons[1]);

            expect(groupedArray[1].key).toEqual('Mexico');
            expect(groupedArray[1].elements.length).toEqual(2);
            expect(groupedArray[1].elements[0]).toEqual(arrayOfPersons[2]);
            expect(groupedArray[1].elements[1]).toEqual(arrayOfPersons[4]);

            expect(groupedArray[2].key).toEqual('France');
            expect(groupedArray[2].elements.length).toEqual(1);
            expect(groupedArray[2].elements[0]).toEqual(arrayOfPersons[3]);
        });

        it('should group an array by a string key and project into another format.', () => {
            const groupedArray = Linq.groupBy(arrayOfPersons, (x: Person) => x.country, (x: Person) => x.name.toUpperCase());

            expect(groupedArray).toBeTruthy();
            expect(groupedArray.length).toEqual(3);

            expect(groupedArray[0].key).toEqual('USA');
            expect(groupedArray[0].elements.length).toEqual(2);
            expect(groupedArray[0].elements[0]).toEqual(arrayOfPersons[0].name.toUpperCase());
            expect(groupedArray[0].elements[1]).toEqual(arrayOfPersons[1].name.toUpperCase());

            expect(groupedArray[1].key).toEqual('Mexico');
            expect(groupedArray[1].elements.length).toEqual(2);
            expect(groupedArray[1].elements[0]).toEqual(arrayOfPersons[2].name.toUpperCase());
            expect(groupedArray[1].elements[1]).toEqual(arrayOfPersons[4].name.toUpperCase());

            expect(groupedArray[2].key).toEqual('France');
            expect(groupedArray[2].elements.length).toEqual(1);
            expect(groupedArray[2].elements[0]).toEqual(arrayOfPersons[3].name.toUpperCase());
        });
    });
});