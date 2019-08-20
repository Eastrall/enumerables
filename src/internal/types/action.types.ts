/**
 * Encapsulates a method that has a single parameter and does not return a value.
 * @typeparam T The type of the parameter of the method that this delegate encapsulates.
 */
export type Action<T> = (item: T) => void;

/**
 * Encapsulates a method that has two parameters and does not return a value.
 * @typeparam T1 The type of the first parameter of the method that this delegate encapsulates.
 * @typeparam T2 The type of the second parameter of the method that this delegate encapsulates.
 */
export type Action2<T1, T2> = (item: T1, item2: T2) => void;

/**
 * Encapsulates a method that has three parameters and does not return a value.
 * @typeparam T1 The type of the first parameter of the method that this delegate encapsulates.
 * @typeparam T2 The type of the second parameter of the method that this delegate encapsulates.
 * @typeparam T3 The type of the thrid parameter of the method that this delegate encapsulates.
 */
export type Action3<T1, T2, T3> = (item: T1, item2: T2, item3: T3) => void;

/**
 * Encapsulates a method that has four parameters and does not return a value.
 * @typeparam T1 The type of the first parameter of the method that this delegate encapsulates.
 * @typeparam T2 The type of the second parameter of the method that this delegate encapsulates.
 * @typeparam T3 The type of the thrid parameter of the method that this delegate encapsulates.
 * @typeparam T4 The type of the fourth parameter of the method that this delegate encapsulates.
 */
export type Action4<T1, T2, T3, T4> = (item: T1, item2: T2, item3: T3, item4: T4) => void;

/**
 * Encapsulates a method that has five parameters and does not return a value.
 * @typeparam T1 The type of the first parameter of the method that this delegate encapsulates.
 * @typeparam T2 The type of the second parameter of the method that this delegate encapsulates.
 * @typeparam T3 The type of the thrid parameter of the method that this delegate encapsulates.
 * @typeparam T4 The type of the fourth parameter of the method that this delegate encapsulates.
 * @typeparam T5 The type of the fifth parameter of the method that this delegate encapsulates.
 */
export type Action5<T1, T2, T3, T4, T5> = (item: T1, item2: T2, item3: T3, item4: T4, item5: T5) => void;