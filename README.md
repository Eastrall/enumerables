# enumerables

[![Build Status](https://travis-ci.org/Eastrall/enumerables.svg?branch=master)](https://travis-ci.org/Eastrall/enumerables)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/da86db9f744e43028b549428c4ebedf3)](https://www.codacy.com/app/Eastrall/enumerables?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Eastrall/enumerables&amp;utm_campaign=Badge_Grade)
[![licence](https://img.shields.io/badge/licence-MIT-blue)](https://github.com/Eastrall/enumerables/blob/master/LICENSE)
[![codecov](https://codecov.io/gh/Eastrall/enumerables/branch/master/graph/badge.svg)](https://codecov.io/gh/Eastrall/enumerables)

`enumerables` is a TypeScript implementation of .NET collections and LINQ with **no external dependencies**.

This library provides collections such as `List<T>` and most of the LINQ methods, like `select`, `firstOrDefault`, `where`, `groupBy`, `orderBy` and much more.

## Installation

```
$ npm install enumerables
```

## Documentation

You can find the documentation of the library here: https://eastrall.github.io/enumerables/

## Usage

```ts
interface Person {
    firstName: string;
    lastName: string;
    age: number;
    country: string;
}

import { List, Enumerable } from 'enumerables';

const list = new List<Person>();

list.add({ firstName: 'John', lastName: 'Doe', age: 42, country: 'USA' });
list.add({ firstName: 'Jane', lastName: 'Doe', age: 38, country: 'USA' });
list.add({ firstName: 'James', lastName: 'Smith', age: 17, country: 'UK' });
list.add({ firstName: 'Marc', lastName: 'Dupont', age: 56, country: 'France' });

const majorsPeople: Enumerable<Person> = list.where(x => x.age > 18);

for (let people of majorsPeople) {
    console.log(`${people.firstName} ${people.lastName}: ${people.age}`);
    // Will display:
    // John Doe: 42
    // Jane Doe: 38
    // Marc Dupont: 56
}

// Chain methods

const minorsPeopleAges: Enumerable<number> = list.where(x => x < 18).select(x => x.age);

for (let peopleAge of minorsPeopleAges) {
    console.log(`${peopleAge}`); 
    // Will display: 
    // 17
}

// Group elements by a key

const groupedByCountry: Enumerable<Grouping<string, Person>> = list.groupBy(x => x.country);

for (let group of groupedByCountry) {
    console.log(`- '${group.key}':`);
    for (let person of group.elements) {
        console.log(`--- ${person.firstName} ${person.lastName}`);
    }
}

// Will display:
// - 'USA':
// --- John Doe
// --- Jane Doe
// - 'UK':
// --- James Smith
// - 'France':
// --- Marc Dupont

```