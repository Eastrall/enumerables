import * as Linq from '../../src/internal/linq';

describe('Linq', () => {
    describe('any', () => {
        const fruits: Array<string> = ['apple', 'mango', 'orange', 'passionfruit', 'grape'];

        it('should return true if array contains elements.', () => {
            expect(Linq.any(fruits)).toBeTruthy();
            expect(Linq.any(fruits)).toEqual(true);
        });
    
        it('should return false if array is empty.', () => {
            expect(Linq.any([])).not.toBeTruthy();
            expect(Linq.any([])).toEqual(false);
        });
    
        it('should return true if array contains elements matching a predicate function.', () => {
            expect(Linq.any(fruits, x => x.startsWith('app'))).toBeTruthy();
            expect(Linq.any(fruits, x => x.startsWith('app'))).toEqual(true);
        });
    
        it('should return false if array doesn\'t elements matching a predicate function.', () => {
            expect(Linq.any(fruits, x => x.length > 42)).not.toBeTruthy();
            expect(Linq.any(fruits, x => x.length > 42)).toEqual(false);
        });
    
        it('should throw an error if source is undefined.', () => {
            expect(() => Linq.any(undefined)).toThrow();
            expect(() => Linq.any(undefined, x => !x)).toThrow();
        });
    });
});
