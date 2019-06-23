import * as Linq from '../../src/internal/linq';
import * as generators from '../generators';

describe('Linq', () => {
    describe('any', () => {
        it('should return true if array contains elements.', () => {
    
        });
    
        it('should return false if array is empty.', () => {
    
        });
    
        it('should return true if array contains elements matching a predicate function.', () => {
            
        });
    
        it('should return false if array doesn\'t elements matching a predicate function.', () => {
    
        });
    
        it('should throw an error if source is undefined.', () => {
            expect(() => Linq.any(undefined)).toThrow();
            expect(() => Linq.any(undefined, x => !x)).toThrow();
        });
    });
});
