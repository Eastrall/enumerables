import { List } from '../src/enumerables';

describe('List collection', () => {
    it('should create an empty instance.', () => {
        const list = new List<number>();

        expect(list).toBeTruthy();
        expect(list.count()).toEqual(0);
    });

    it('should create a new instance with a defined size.', () => {
        const numberOfElements: number = 50;
        const list = new List<number>(numberOfElements);

        expect(list).toBeTruthy();
        expect(list.count()).toEqual(numberOfElements);
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

    it('should add an element to the list', () => {
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
})
