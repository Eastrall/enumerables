import { List, Enumerable } from '../../src/enumerables';
import { Func2 } from '../../src/internal/types';
import { Grouping } from '../../src/interfaces/grouping';

interface Person {
    name: string;
    age: number;
    country?: string;
}

describe('List', () => {
    const arrayOfPersons: Array<Person> = [
        { name: 'John Doe', age: 42 },
        { name: 'Jane Doe', age: 56 },
        { name: 'James Smith', age: 26 },
        { name: 'Sarah Jones', age: 38 },
        { name: 'Peter Miller', age: 26 },
    ];

    function generateArrayOfNumbers(numberOfElements: number): Array<number> {
        return Array.from(Array(numberOfElements), (x, index) => index + 1);
    }

    function generateListOfNumbers(numberOfElements: number): List<number> {
        return new List<number>(generateArrayOfNumbers(numberOfElements));
    }

    describe('constructor', () => {
        it('should create an empty instance.', () => {
            const list = new List<number>();

            expect(list).toBeTruthy();
            expect(list.count()).toEqual(0);
        });

        it('should create a new instance with an existing array.', () => {
            const array: Array<number> = [0, 2, 1, 4, 5];
            const list = new List<number>(array);

            expect(list).toBeTruthy();
            expect(list.count()).toEqual(array.length);

            for (let i = 0; i < list.count(); ++i) {
                expect(list.elementAt(i)).toEqual(array[i]);
            }
        });
    })

    it('should iterate through the list using for..of statement', () => {
        const array: Array<number> = [0, 2, 1, 4, 5];
        const list = new List<number>(array);

        expect(list).toBeTruthy();

        let i: number = 0;
        for (const item of list) {
            expect(array[i++]).toEqual(item);
        }

        expect(i).toEqual(list.count());
    });

    it('should add a new item.', () => {
        const numberOfElements: number = 10;
        const list = new List<number>();

        for (let i = 0; i < numberOfElements; ++i) {
            list.add(i + 1);
        }

        expect(list.count()).toEqual(numberOfElements);

        for (let i = 0; i < numberOfElements; ++i) {
            expect(list.elementAt(i)).toEqual(i + 1);
        }
    });

    it('should clear the list', () => {
        const list: List<number> = generateListOfNumbers(10);

        expect(list.count()).toEqual(10);
        list.clear();
        expect(list.count()).toEqual(0);
    });

    describe('aggregate', () => {
        // This is the test case from 
        // https://docs.microsoft.com/fr-fr/dotnet/api/system.linq.enumerable.aggregate?view=netcore-2.2#System_Linq_Enumerable_Aggregate__1_System_Collections_Generic_IEnumerable___0__System_Func___0___0___0__
        it('should apply an accumulator over a string list.', () => {
            const sentence: string = 'the quick brown fox jumps over the lazy dog';
            const wordsArray: Array<string> = sentence.split(' ');
            const words: List<string> = new List<string>(wordsArray);

            const reversedSentence: string = words.aggregate((workingSentence, next) => next + ' ' + workingSentence);

            expect(reversedSentence).toEqual('dog lazy the over jumps fox brown quick the');
            expect(reversedSentence).toEqual(wordsArray.reverse().join(' '));
        });

        // This is the test case from
        // https://docs.microsoft.com/fr-fr/dotnet/api/system.linq.enumerable.aggregate?view=netcore-2.2#System_Linq_Enumerable_Aggregate__2_System_Collections_Generic_IEnumerable___0____1_System_Func___1___0___1__
        it('should apply an accumulator over a list using a seed value.', () => {
            const numbers: Array<number> = [4, 8, 8, 3, 9, 0, 7, 8, 2];
            const numbersList: List<number> = new List<number>(numbers);

            const evenNumbers: number = numbersList.aggregate(0, (total, next) => next % 2 === 0 ? total + 1 : total);

            expect(evenNumbers).toEqual(6);
        });

        // This is the test case from
        // https://docs.microsoft.com/fr-fr/dotnet/api/system.linq.enumerable.aggregate?view=netcore-2.2#System_Linq_Enumerable_Aggregate__3_System_Collections_Generic_IEnumerable___0____1_System_Func___1___0___1__System_Func___1___2__
        it('should apply an accumulator over a list using a seed value and result selector.', () => {
            const fruits: Array<string> = ['apple', 'mango', 'orange', 'passionfruit', 'grape'];
            const fruitsList: List<string> = new List<string>(fruits);

            const longestFruitName: string = fruitsList.aggregate('banana', (longest, next) => next.length > longest.length ? next : longest, x => x.toUpperCase());
        
            expect(longestFruitName).toEqual('PASSIONFRUIT');
        });

        it('should throw an error if the list is empty.', () => {
            const list: List<any> = new List<any>();

            expect(() => list.aggregate(x => x)).toThrow();
        });

        it('should throw an error if the accumulator function is undefined.', () => {
            const numbers: Array<number> = [4, 8, 8, 3, 9, 0, 7, 8, 2];
            const numbersList: List<number> = new List<number>(numbers);
            const accumulatorFunction: Func2<number, number, number> = undefined;

            expect(() => numbersList.aggregate(accumulatorFunction)).toThrow();
            expect(() => numbersList.aggregate(0, accumulatorFunction)).toThrow();
            expect(() => numbersList.aggregate(0, accumulatorFunction, x => x)).toThrow();
        });
    });

    describe('all', () => {
        const list: List<Person> = new List<Person>(arrayOfPersons);
        
        it('should throw an error if the matching predicate is undefined.', () => {
            const list: List<any> = new List<any>();

            expect(() => list.all(undefined)).toThrow();
        });

        it('should match every elements of array.', () => {
            expect(list.all(x => x.age < 100)).toEqual(true);
        });
        
        it('should not match every elements of array.', () => {
            expect(list.all(x => x.name.startsWith('John'))).toEqual(false);
        });
    });

    describe('any', () => {
        const list: List<Person> = new List<Person>(arrayOfPersons); 

        it('should return true if list contains elements.', () => {
            expect(list.any()).toEqual(true);
        });

        it('should return false if list doesnt contains elements.', () => {
            const emptyList: List<any> = new List<any>();

            expect(emptyList.any()).toEqual(false);
        });

        it('should return true if list contains elements matching a predicate function.', () => {
            expect(list.any(x => x.name.startsWith('J'))).toEqual(true);
        });

        it('should return false if list doesn\'t elements matching a predicate function.', () => {
            expect(list.any(x => x.age === 150)).toEqual(false);
        });
    });

    describe('concat', () => {
        const list: List<number> = new List<number>([1, 2, 3, 4, 5]);

        it('should throw an error is the elements to concat are undefined.', () => {
            expect(() => list.concat(undefined)).toThrow();
        });

        it('should concat a list with another list', () => {
            const listToConcat: List<number> = new List<number>([6, 7, 8]);
            const concatList: List<number> = list.concat(listToConcat);

            expect(concatList).toBeTruthy();
            expect(concatList.count()).toEqual(8);

            for (let i = 0; i < concatList.count(); ++i) {
                expect(concatList.elementAt(i)).toEqual(i + 1);
            }
        });

        it('should concat a list with another array.', () => {
            const concatList: List<number> = list.concat([6, 7, 8]);

            expect(concatList).toBeTruthy();
            expect(concatList.count()).toEqual(8);

            for (let i = 0; i < concatList.count(); ++i) {
                expect(concatList.elementAt(i)).toEqual(i + 1);
            }
        });
    });

    describe('count', () => {
        it('should count the number of elements.', () => {
            const numberOfElements: number = 10;
            const list: List<number> = generateListOfNumbers(numberOfElements);

            expect(list).toBeTruthy();
            expect(list.count()).toEqual(numberOfElements);
        });

        it('should count the number of elements matching a predicate function', () => {
            const numberOfElements: number = 10;
            const list: List<number> = generateListOfNumbers(numberOfElements);

            expect(list).toBeTruthy();
            expect(list.count(x => x > 7)).toEqual(3);
        });
    });

    describe('elementAt', () => {
        it('should get an element at a given index.', () => {
            const list: List<number> = generateListOfNumbers(10);

            expect(list).toBeTruthy();
            expect(list.elementAt(0)).toEqual(1);
            expect(list.elementAt(3)).toEqual(4);
            expect(() => list.elementAt(-1)).toThrow();
            expect(list.elementAtOrDefault(0)).toEqual(1);
            expect(list.elementAtOrDefault(3)).toEqual(4);
            expect(list.elementAtOrDefault(-1)).not.toBeTruthy();
        });
    });

    describe('first', () => {
        it('should get the first element.', () => {
            const array: Array<number> = generateArrayOfNumbers(10);
            const list: List<number> = new List<number>(array);

            expect(list).toBeTruthy();
            expect(array).toBeTruthy();
            expect(list.first()).toEqual(array[0]);
        });

        it('should throw an error when getting the first element.', () => {
            const list: List<number> = new List<number>();

            expect(list).toBeTruthy();
            expect(() => list.first()).toThrow();
        });

        it('should get the first element matching a predicate function.', () => {
            const list: List<number> = generateListOfNumbers(10);

            expect(list).toBeTruthy();
            expect(list.first(x => x > 5)).toEqual(6);
        });

        it('should throw an error when getting the first element not matching a predicate function.', () => {
            const list: List<number> = generateListOfNumbers(10);

            expect(list).toBeTruthy();
            expect(() => list.first(x => x > 20)).toThrow();
        });
    });

    describe('firstOrDefault', () => {
        it('should get the first element.', () => {
            const array: Array<number> = generateArrayOfNumbers(10);
            const list: List<number> = new List<number>(array);

            expect(list).toBeTruthy();
            expect(list.firstOrDefault()).toEqual(array[0]);
        });

        it('should get an undefined value when getting the first element of empty list.', () => {
            const list: List<number> = new List<number>();

            expect(list).toBeTruthy();
            expect(list.firstOrDefault()).not.toBeTruthy();
        });

        it('should get the first element matching a predicate function.', () => {
            const list: List<number> = generateListOfNumbers(10);

            expect(list).toBeTruthy();
            expect(list.firstOrDefault(x => x > 5)).toEqual(6);
        });

        it('should get an undefined value when getting the first element not matching a function predicate.', () => {
            const list: List<number> = generateListOfNumbers(10);

            expect(list).toBeTruthy();
            expect(list.firstOrDefault(x => x > 20)).not.toBeTruthy();
        });
    });

    describe('groupBy', () => {
        const arrayOfPersons: Array<Person> = [
            { name: 'John Doe', age: 42, country: 'USA' },
            { name: 'Jane Doe', age: 31, country: 'USA' },
            { name: 'Alberto Espinoza', age: 39, country: 'Mexico' },
            { name: 'Jean Dupont', age: 42, country: 'France' },
            { name: 'Julia Gomez', age: 43, country: 'Mexico' }
        ];
        const listOfPersons: List<Person> = new List<Person>(arrayOfPersons);

        it('should throw an error if the key selector is undefined.', () => {
            expect(() => listOfPersons.groupBy(undefined)).toThrow();
        });

        it('should group an array by a numeric key.', () => {
            const groupedArray: Enumerable<Grouping<number, Person>> = listOfPersons.groupBy((x: Person) => x.age);

            expect(groupedArray).toBeTruthy();
            expect(groupedArray.count()).toEqual(4);

            expect(groupedArray.elementAt(0).key).toEqual(42);
            expect(groupedArray.elementAt(0).elements.count()).toEqual(2);
            expect(groupedArray.elementAt(0).elements.elementAt(0)).toEqual(arrayOfPersons[0]);
            expect(groupedArray.elementAt(0).elements.elementAt(1)).toEqual(arrayOfPersons[3]);

            expect(groupedArray.elementAt(1).key).toEqual(31);
            expect(groupedArray.elementAt(1).elements.count()).toEqual(1);
            expect(groupedArray.elementAt(1).elements.elementAt(0)).toEqual(arrayOfPersons[1]);

            expect(groupedArray.elementAt(2).key).toEqual(39);
            expect(groupedArray.elementAt(2).elements.count()).toEqual(1);
            expect(groupedArray.elementAt(2).elements.elementAt(0)).toEqual(arrayOfPersons[2]);
            
            expect(groupedArray.elementAt(3).key).toEqual(43);
            expect(groupedArray.elementAt(3).elements.count()).toEqual(1);
            expect(groupedArray.elementAt(3).elements.elementAt(0)).toEqual(arrayOfPersons[4]);
        });
    });

    describe('last', () => {
        const array: Array<number> = generateArrayOfNumbers(10);
        const list = new List<number>(array);
        const emptyList = new List<number>();

        it('should get the last element of the list.', () => {
            expect(list.last()).toEqual(array[array.length - 1]);
        });

        it('should throw an error if the list is empty', () => {
            expect(() => emptyList.last()).toThrow();
        });

        it('should get the last element of the list matching a predicate function.', () => {
            expect(list.last(x => x > 5)).toEqual(array[array.length - 1]);
        });

        it('should throw an error if not elements match a predicate function.', () => {
            expect(() => list.last(x => x > 30)).toThrow();
            expect(() => emptyList.last(x => x > 30)).toThrow();
        });
    });

    describe('lastOrDefault', () => {
        const array: Array<number> = generateArrayOfNumbers(10);
        const list = new List<number>(array);
        const emptyList = new List<number>();

        it('should get the last element of collection.', () => {
            expect(list.lastOrDefault()).toEqual(array[array.length - 1]);
        });

        it('should get an undefined value if the list is empty.', () => {
            expect(emptyList.lastOrDefault()).toEqual(undefined);
        });

        it('should get the last element of list matching a predicate function', () => {
            expect(list.lastOrDefault(x => x > 5)).toEqual(array[array.length - 1]);
        });

        it('should get an undefined value if any elements of the list matches the predicate function.', () => {
            expect(list.lastOrDefault(x => x > 30)).toEqual(undefined);
        });
    });

    describe('max', () => {
        it('should get the maximum resulting value of the list of objects.', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);
            const maxAge: number = list.max(x => x.age);

            expect(list).toBeTruthy();
            expect(maxAge).toEqual(arrayOfPersons[1].age);
        });
        it('should get the maximum resulting value of a list of number', () => {
            const arrayOfNumbers = [0, 565, 9262, 45, 214, 2666];
            const list: List<number> = new List<number>(arrayOfNumbers);
            const maxNumber: number = list.max(x => x);

            expect(list).toBeTruthy();
            expect(maxNumber).toEqual(arrayOfNumbers[2]);
        });
        it('should throw an error if the predicate is undefined', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);

            expect(() => list.max(undefined)).toThrow();
        });
    });

    describe('min', () => {
        it('should get the minimum resulting value of the list of objects.', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);
            const maxAge: number = list.min(x => x.age);

            expect(list).toBeTruthy();
            expect(maxAge).toEqual(arrayOfPersons[2].age);
        });
        it('should get the minimum resulting value of a list of number', () => {
            const arrayOfNumbers = [0, 565, 9262, 45, 214, 2666];
            const list: List<number> = new List<number>(arrayOfNumbers);
            const maxNumber: number = list.min(x => x);

            expect(list).toBeTruthy();
            expect(maxNumber).toEqual(arrayOfNumbers[0]);
        });

        it('should throw an error if the predicate is undefined', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);

            expect(() => list.min(undefined)).toThrow();
        });
    });

    describe('order-by', () => {
        it('should order a list of objects based on a string key.', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);
            const sortedList: List<Person> = list.orderBy(x => x.name);

            expect(sortedList).toBeTruthy();
            expect(sortedList.count()).toEqual(5);
            expect(sortedList.elementAt(0)).toEqual(arrayOfPersons[2]);
            expect(sortedList.elementAt(1)).toEqual(arrayOfPersons[1]);
            expect(sortedList.elementAt(2)).toEqual(arrayOfPersons[0]);
            expect(sortedList.elementAt(3)).toEqual(arrayOfPersons[4]);
            expect(sortedList.elementAt(4)).toEqual(arrayOfPersons[3]);
        });

        it('should order a list of objects based on a number key.', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);
            const sortedList: List<Person> = list.orderBy(x => x.age);

            expect(sortedList).toBeTruthy();
            expect(sortedList.count()).toEqual(5);
            expect(sortedList.elementAt(0)).toEqual(arrayOfPersons[2]);
            expect(sortedList.elementAt(1)).toEqual(arrayOfPersons[4]);
            expect(sortedList.elementAt(2)).toEqual(arrayOfPersons[3]);
            expect(sortedList.elementAt(3)).toEqual(arrayOfPersons[0]);
            expect(sortedList.elementAt(4)).toEqual(arrayOfPersons[1]);
        });

        it('should throw an error if the order predicate is undefined', () => {
            const list: List<any> = new List<any>();

            expect(() => list.orderBy(undefined)).toThrow();
        });
    });

    describe('order-by-descending', () => {
        it('should order a list of objects based on a string key in a descending way.', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);
            const sortedList: List<Person> = list.orderByDescending(x => x.name);

            expect(sortedList).toBeTruthy();
            expect(sortedList.count()).toEqual(5);
            expect(sortedList.elementAt(0)).toEqual(arrayOfPersons[3]);
            expect(sortedList.elementAt(1)).toEqual(arrayOfPersons[4]);
            expect(sortedList.elementAt(2)).toEqual(arrayOfPersons[0]);
            expect(sortedList.elementAt(3)).toEqual(arrayOfPersons[1]);
            expect(sortedList.elementAt(4)).toEqual(arrayOfPersons[2]);
        });

        it('should order a list of objects based on a number key in a descending way.', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);
            const sortedList: List<Person> = list.orderByDescending(x => x.age);

            expect(sortedList).toBeTruthy();
            expect(sortedList.count()).toEqual(5);
            expect(sortedList.elementAt(0)).toEqual(arrayOfPersons[1]);
            expect(sortedList.elementAt(1)).toEqual(arrayOfPersons[0]);
            expect(sortedList.elementAt(2)).toEqual(arrayOfPersons[3]);
            expect(sortedList.elementAt(3)).toEqual(arrayOfPersons[2]);
            expect(sortedList.elementAt(4)).toEqual(arrayOfPersons[4]);
        });

        it('should throw an error if the order predicate is undefined', () => {
            const list = new List<any>();

            expect(() => list.orderByDescending(undefined)).toThrow();
        });
    });

    describe('select', () => {
        it('should throw an error if the predicate is undefined', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);

            expect(() => list.select(undefined)).toThrow();
        });

        it('should map a complex array into a simple array.', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);
            const simpleList: Enumerable<string> = list.select(x => `Hello ${x.name}! You are: ${x.age} years old.`);

            expect(simpleList).toBeTruthy();
            expect(list.count()).toEqual(simpleList.count());
    
            for (let i = 0; i < simpleList.count(); ++i) {
                const simpleElement: string = simpleList.elementAt(i);
    
                expect(simpleElement).toBeTruthy();
                expect(simpleElement).toEqual(`Hello ${list.elementAt(i).name}! You are: ${list.elementAt(i).age} years old.`);
            }
        });

        it('should map a simple array into a complex array.', () => {
            const list: List<number> = new List<number>([0, 6, 9, 7, 5]);
            const complexList: Enumerable<Person> = list.select(x => ({
                name: 'Person name: ' + x,
                age: x
            }) as Person);

            expect(complexList).toBeTruthy();
            expect(list.count()).toEqual(complexList.count());

            for (let i = 0; i < complexList.count(); ++i) {
                const complexElement: Person = complexList.elementAt(i);
    
                expect(complexElement).toBeTruthy();
                expect(complexElement.name).toEqual('Person name: ' + list.elementAt(i));
                expect(complexElement.age).toEqual(list.elementAt(i));
            }
        });
    });

    describe('where', () => {
        it('should throw an error if the predicate is undefined', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);

            expect(() => list.where(undefined)).toThrow();
        });

        it('should apply a filter with a single parameter predicate.', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);
            const elements: Enumerable<Person> = list.where((x: Person) => x.age > 40);
            
            expect(elements).toBeTruthy();
            expect(elements.count()).toEqual(2);
            expect(elements.elementAt(0)).toEqual(arrayOfPersons[0]);
            expect(elements.elementAt(1)).toEqual(arrayOfPersons[1]);
        });
    
        it('should apply a filter with multiple parameter predicate.', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);
            const elements: Enumerable<Person> = list.where((x: Person) => x.age > 10 && x.name.startsWith('J'));
            
            expect(elements).toBeTruthy();
            expect(elements.count()).toEqual(3);
            expect(elements.elementAt(0)).toEqual(arrayOfPersons[0]);
            expect(elements.elementAt(1)).toEqual(arrayOfPersons[1]);
            expect(elements.elementAt(2)).toEqual(arrayOfPersons[2]);
        });
    });

    describe('take', () => {
        it('should take a given number of elements of a list.', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);
            const elementsTaken = list.take(2);

            expect(elementsTaken).toBeTruthy();
            expect(elementsTaken.count()).toEqual(2);
            expect(elementsTaken.elementAt(0)).toEqual(arrayOfPersons[0]);
            expect(elementsTaken.elementAt(1)).toEqual(arrayOfPersons[1]);
        });
    });

    describe('takeLast', () => {
        it('should take a given number of elements of a list starting by the end.', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);
            const elementsTaken = list.takeLast(2);

            expect(elementsTaken).toBeTruthy();
            expect(elementsTaken.count()).toEqual(2);
            expect(elementsTaken.elementAt(0)).toEqual(arrayOfPersons[3]);
            expect(elementsTaken.elementAt(1)).toEqual(arrayOfPersons[4]);
        });
    });

    describe('contains', () => {
        const list: List<number> = generateListOfNumbers(10);

        it('should contains the element.', () => {
            expect(list.contains(1)).toEqual(true);
            expect(list.contains(7)).toEqual(true);
            expect(list.contains(9)).toEqual(true);
        });

        it('should not contains the element.', () => {
            expect(list.contains(-1)).toEqual(false);
            expect(list.contains(12)).toEqual(false);
            expect(list.contains(undefined)).toEqual(false);
        });
    });

    describe('indexOf', () => {
        const list: List<number> = generateListOfNumbers(10);

        it('should get the index of an element', () => {
            expect(list.indexOf(3)).toEqual(2);
            expect(list.indexOf(7)).toEqual(6);
            expect(list.indexOf(undefined)).toEqual(-1);
            expect(list.indexOf(-1)).toEqual(-1);
            expect(list.indexOf(12)).toEqual(-1);
        });
    });

    describe('insert', () => {
        it('should insert an element at a given position.', () => {
            const list: List<Person> = new List<Person>(arrayOfPersons);

            list.insert(1, { name: 'NewPerson', age: 42 });

            expect(list.count()).toEqual(arrayOfPersons.length + 1);
            expect(list.elementAt(1)).toEqual({ name: 'NewPerson', age: 42 });
        });
    });

    describe('remove', () => {
        const list: List<number> = generateListOfNumbers(10);

        it('should remove an element.', () => {
            const numberToRemove = 4;
            const removeResult: boolean = list.remove(numberToRemove);

            expect(removeResult).toEqual(true);
            expect(list.count()).toEqual(9);
            expect(list.indexOf(numberToRemove)).toEqual(-1);
        });

        it('should return false if element doesn\'t exists.', () => {
            expect(list.remove(12)).toEqual(false);
            expect(list.remove(-3)).toEqual(false);
        });
    });

    describe('removeAt', () => {
        const list: List<number> = generateListOfNumbers(10);

        it('should remove an element at a given index.', () => {
            list.removeAt(0);

            expect(list.first()).not.toEqual(1);
            expect(list.count()).toEqual(9);
            expect(list.indexOf(0)).toEqual(-1);
        });

        it('should throw an error if index is out of list bounds.', () => {
            expect(() => list.removeAt(-1)).toThrow();
            expect(() => list.removeAt(12)).toThrow();
        });
    });

    describe('toArray', () => {
        it('should return an array', () => {
            const list: List<number> = generateListOfNumbers(10);
            const array: Array<number> = list.toArray();

            expect(array).toBeInstanceOf(Array);
            expect(array.length).toEqual(list.count());
        });
    });

    describe('toString', () => {
        it('should return a string representation of a list.', () => {
            const list: List<number> = new List<number>([1, 2, 3, 4, 5]);

            expect(list.toString()).toEqual('1,2,3,4,5');
        });
    });
});
