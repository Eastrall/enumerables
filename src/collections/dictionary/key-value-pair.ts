/**
 * Defines a key/value pair that can be set or retrieved.
 */
export class KeyValuePair<TKey, TValue> {
    private readonly internalKey: TKey;
    private readonly internalValue: TValue;

    /**
     * Gets the key of the pair.
     */
    public get key(): TKey {
        return this.internalKey;
    }

    /**
     * Gets the value of the pair.
     */
    public get value(): TValue {
        return this.internalValue;
    }

    /**
     * Initializes a new instance of the `KeyValuePair<TKey, TValue>` structure with the specified key and value.
     * @param key The object defined in each key/value pair.
     * @param value The definition associated with `key`.
     */
    public constructor(key: TKey, value: TValue) {
        this.internalKey = key;
        this.internalValue = value;
    }
}