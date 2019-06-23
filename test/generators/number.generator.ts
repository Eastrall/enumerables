import * as faker from 'faker';

export function generateLinearNumbers(count: number): Array<number> {
    const array = new Array<number>();

    for (let i = 0; i < count; ++i) {
        array.push(i + 1);
    }

    return array;
}

export function generateRandomNumbers(count: number): Array<number> {
    const array = new Array<number>();

    for (let i = 0; i < count; ++i) {
        array.push(faker.random.number());
    }
    
    return array;
}