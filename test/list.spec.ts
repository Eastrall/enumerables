import { List } from '../src/enumerables';

describe('List', () => {
    function generateListOfNumbers(numberOfElements: number): List<number> {
        const array = Array.from(Array(numberOfElements), (x, index) => index + 1);

        return new List<number>(array);
    }

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

    describe('first', () => {
        it('should get the first element.', () => {
            const list: List<number> = generateListOfNumbers(10);
    
            expect(list).toBeTruthy();
            expect(list.first()).toEqual(1);
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
            const list: List<number> = generateListOfNumbers(10);
    
            expect(list).toBeTruthy();
            expect(list.firstOrDefault()).toEqual(1);
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

    it('should iterate on all elements.', () => {
        let index: number = 0;
        const list: List<number> = generateListOfNumbers(10);

        expect(list).toBeTruthy();

        for (const item of list) {
            expect(item).toBeTruthy();
            expect(item).toEqual(list.elementAt(index));

            ++index;
        }
    });
});
