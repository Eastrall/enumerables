import * as Linq from '../../src/internal/linq';
import { Func2 } from '../../src/internal/types';

describe('Linq', () => {
    describe('aggregate', () => {

        // This is the test case from 
        // https://docs.microsoft.com/fr-fr/dotnet/api/system.linq.enumerable.aggregate?view=netcore-2.2#System_Linq_Enumerable_Aggregate__1_System_Collections_Generic_IEnumerable___0__System_Func___0___0___0__
        it('should apply an accumulator over a string sequence', () => {
            const sentence: string = 'the quick brown fox jumps over the lazy dog';
            const words: Array<string> = sentence.split(' ');

            const reversedSentence: string = Linq.aggregate(words, (workingSentence, next) => next + ' ' + workingSentence);

            expect(reversedSentence).toEqual('dog lazy the over jumps fox brown quick the');
            expect(reversedSentence).toEqual(words.reverse().join(' '));
        });

        // This is the test case from
        // https://docs.microsoft.com/fr-fr/dotnet/api/system.linq.enumerable.aggregate?view=netcore-2.2#System_Linq_Enumerable_Aggregate__2_System_Collections_Generic_IEnumerable___0____1_System_Func___1___0___1__
        it('should apply an accumulator over a sequence using a seed value.', () => {
            const numbers: Array<number> = [4, 8, 8, 3, 9, 0, 7, 8, 2];
            const evenNumbers: number = Linq.aggregate(numbers, 0, (total, next) => next % 2 === 0 ? total + 1 : total);

            expect(evenNumbers).toEqual(6);
        });

        // This is the test case from
        // https://docs.microsoft.com/fr-fr/dotnet/api/system.linq.enumerable.aggregate?view=netcore-2.2#System_Linq_Enumerable_Aggregate__3_System_Collections_Generic_IEnumerable___0____1_System_Func___1___0___1__System_Func___1___2__
        it('should apply an accumulator over a sequence using a seed value and result selector.', () => {
            const fruits: Array<string> = ['apple', 'mango', 'orange', 'passionfruit', 'grape'];
            const longestFruitName: string = Linq.aggregate(fruits, 'banana', (longest, next) => next.length > longest.length ? next : longest, x => x.toUpperCase());
        
            expect(longestFruitName).toEqual('PASSIONFRUIT');
        });
        
        it('should throw an error is input source collection is undefined', () => {
            const array: Array<object> = undefined;

            expect(() => Linq.aggregate(array, x => x)).toThrow();
        });

        it('should throw an error if the input source collection is empty.', () => {
            const array: Array<object> = [];

            expect(() => Linq.aggregate(array, x => x)).toThrow();
        });

        it('should throw an error if the accumulator function is undefined.', () => {
            const numbers: Array<number> = [4, 8, 8, 3, 9, 0, 7, 8, 2];
            const accumulatorFunction: Func2<number, number, number> = undefined;

            expect(() => Linq.aggregate(numbers, accumulatorFunction)).toThrow();
            expect(() => Linq.aggregate(numbers, 0, accumulatorFunction)).toThrow();
            expect(() => Linq.aggregate(numbers, 0, accumulatorFunction, x => x)).toThrow();
        });
    });
});