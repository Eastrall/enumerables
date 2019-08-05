import { Func } from '../types';

export function orderBy<TSource, TKey>(source: Array<TSource>, keySelector: Func<TSource, TKey>): Array<TSource> {
    if (!source) {
        throw new Error('source is undefined');
    }

    if (!keySelector) {
        throw new Error('keySelector is undefined');
    }

    const newArray = new Array<TSource>(...source);

    newArray.sort((a, b) => {
        if (keySelector(a) > keySelector(b)) {
            return 1;
        }
        else if (keySelector(a) < keySelector(b)) {
            return -1;
        }
        else {
            return 0;
        }
    });

    return newArray;
}

export function orderByDescending<TSource, TKey>(source: Array<TSource>, keySelector: Func<TSource, TKey>): Array<TSource> {
    if (!source) {
        throw new Error('source is undefined');
    }

    if (!keySelector) {
        throw new Error('keySelector is undefined');
    }

    const newArray = new Array<TSource>(...source);

    newArray.sort((a, b) => {
        if (keySelector(a) > keySelector(b)) {
            return -1;
        }
        else if (keySelector(a) < keySelector(b)) {
            return 1;
        }
        else {
            return 0;
        }
    });

    return newArray;
}