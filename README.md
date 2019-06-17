# enumerables

[![Build Status](https://travis-ci.org/Eastrall/enumerables.svg?branch=master)](https://travis-ci.org/Eastrall/enumerables)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/da86db9f744e43028b549428c4ebedf3)](https://www.codacy.com/app/Eastrall/enumerables?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Eastrall/enumerables&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/Eastrall/enumerables/branch/master/graph/badge.svg)](https://codecov.io/gh/Eastrall/enumerables)

`enumerables` is a TypeScript implementation of .NET collections and LINQ.


## Available collections

- List

## Install

No package yet.

```
$> npm i ...
```

## Usage

```ts
interface Person {
    firstName: string;
    lastName: string;
    age: number;
}

import { List, Enumerable } from 'enumerables';

const list = new List<Person>();

list.add({ firstName: 'John', lastName: 'Doe', age: 42});
list.add({ firstName: 'Jane', lastName: 'Doe', age: 38});
list.add({ firstName: 'James', lastName: 'Smith', age: 17});

const majorsPeople: Enumerable<Person> = list.where(x => x.age > 18);

for (let people of majorsPeople) {
    console.log(`${people.firstName} ${people.lastName}: ${people.age}`);
    // Will display:
    // John Doe: 42
    // Jane Doe: 38
}

const minorsPeopleAges: Enumerable<number> = list.where(x => x < 18).select(x => x.age);

for (let peopleAge of minorsPeopleAges) {
    console.log(`${peopleAge}`); 
    // Will display: 
    // 17
}

```

