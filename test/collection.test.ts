import { List } from '../src/collection'

describe('Collection', () => {
    it('should create a new List instance', () => {
        const list = new List<number>()

        expect(list).toBeTruthy()
    })
})
