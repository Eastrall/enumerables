import { Func } from '@lib/internal/types';
import * as Linq from '@lib/internal/linq/aggregate';

type GroupingResult<TKey, TSource> = {
    key: TKey,
    elements: Array<TSource>
};

/**
 * Groups the elements of a sequence according to a specified key selector function.
 * @param source A native JavaScript `Array<T>` whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @returns An `Array<GroupingResult<TKey, TSource>>` where each `GroupingResult<TKey, TSource>` object contains a sequence of objects and a key.
 * @throws {Error} `source` is `undefined`.
 * @throws {Error} `keySelector` is `undefined`.
 */
export function groupBy<TKey, TSource>(source: Array<TSource>, keySelector: Func<TSource, TKey>): Array<GroupingResult<TKey, TSource>>;

/**
 * 
 * @param source A native JavaScript `Array<T>` whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param elementSelector A function to map each source element to an element in the `GroupingResult<TKey, TElement>`.
 * @returns An `Array<GroupingResult<TKey, TElement>>` where each `GroupingResult<TKey, TElement>` object contains a collection of objects of type `TElement` and a key.
 * @throws {Error} `source` is `undefined`.
 * @throws {Error} `keySelector` is `undefined`.
 */
export function groupBy<TKey, TSource, TElement>(source: Array<TSource>, keySelector: Func<TSource, TKey>, elementSelector: Func<TSource, TElement>): Array<GroupingResult<TKey, TElement>>;

export function groupBy<TKey, TSource, TElement>(source: Array<TSource>, keySelector: Func<TSource, TKey>, elementSelector?: Func<TSource, TElement>): Array<GroupingResult<TKey, TSource | TElement>> {
    if (!source) {
        throw new Error('source is undefined.');
    }

    if (!keySelector) {
        throw new Error('keySelector is undefined.');
    }

    const result = Linq.aggregate(source, [], (groups: Array<GroupingResult<TKey, TSource | TElement>>, nextItem: TSource) => {
        const key: TKey = keySelector(nextItem);
        const element: TSource | TElement = elementSelector ? elementSelector(nextItem) : nextItem;
        const keyElements: GroupingResult<TKey, TSource | TElement> | undefined = groups.find(x => x.key === key);

        if (!keyElements) {
            groups.push({
                key: key,
                elements: new Array<TSource | TElement>(...[element])
            });
        }
        else {
            keyElements.elements.push(element);
        }

        return groups;
    });

    return result;
}