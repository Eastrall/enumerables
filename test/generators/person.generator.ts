import * as faker from 'faker';

export interface Person {
    firstName: string;
    lastName: string;
    age: number;
    country: string;
}

/**
 * Generates a random person.
 */
export function generatePerson(): Person {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.random.number(100),
        country: faker.address.country()
    }
}

/**
 * Generates an array of persons.
 * @param count Number of persons to generate.
 */
export function generatePersons(count: number): Array<Person> {
    const array = new Array<Person>();

    for (let i = 0; i < count; ++i) {
        array.push(generatePerson());
    }

    return array;
}