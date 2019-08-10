import { List } from '../../src/collections/list';

describe('List', () => {
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
});
