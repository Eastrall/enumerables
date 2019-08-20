/**
 * Encapsulates a method that has one parameter and returns a value of the type specified by the `TResult` parameter.
 * @typeparam T The type of the parameter of the method that this delegate encapsulates.
 * @typeparam TResult The type of the return value of the method that this delegate encapsulates.
 */
export type Func<T, TResult> = (item: T) => TResult;

/**
 * Encapsulates a method that has two parameters and returns a value of the type specified by the `TResult` parameter.
 * @typeparam T1 The type of the first parameter of the method that this delegate encapsulates.
 * @typeparam T2 The type of the second parameter of the method that this delegate encapsulates.
 * @typeparam TResult The type of the return value of the method that this delegate encapsulates.
 */
export type Func2<T1, T2, TResult> = (item1: T1, item2: T2) => TResult;

/**
 * Encapsulates a method that has three parameters and returns a value of the type specified by the `TResult` parameter.
 * @typeparam T1 The type of the first parameter of the method that this delegate encapsulates.
 * @typeparam T2 The type of the second parameter of the method that this delegate encapsulates.
 * @typeparam T3 The type of the thrid parameter of the method that this delegate encapsulates.
 * @typeparam TResult The type of the return value of the method that this delegate encapsulates.
 */
export type Func3<T1, T2, T3, TResult> = (item1: T1, item2: T2, item3: T3) => TResult;

/**
 * Encapsulates a method that has four parameters and returns a value of the type specified by the `TResult` parameter.
 * @typeparam T1 The type of the first parameter of the method that this delegate encapsulates.
 * @typeparam T2 The type of the second parameter of the method that this delegate encapsulates.
 * @typeparam T3 The type of the thrid parameter of the method that this delegate encapsulates.
 * @typeparam T4 The type of the fourth parameter of the method that this delegate encapsulates.
 * @typeparam TResult The type of the return value of the method that this delegate encapsulates.
 */
export type Func4<T1, T2, T3, T4, TResult> = (item1: T1, item2: T2, item3: T3, item4: T4) => TResult;

/**
 * Encapsulates a method that has four parameters and returns a value of the type specified by the `TResult` parameter.
 * @typeparam T1 The type of the first parameter of the method that this delegate encapsulates.
 * @typeparam T2 The type of the second parameter of the method that this delegate encapsulates.
 * @typeparam T3 The type of the thrid parameter of the method that this delegate encapsulates.
 * @typeparam T4 The type of the fourth parameter of the method that this delegate encapsulates.
 * @typeparam T5 The type of the fifth parameter of the method that this delegate encapsulates.
 * @typeparam TResult The type of the return value of the method that this delegate encapsulates.
 */
export type Func5<T1, T2, T3, T4, T5, TResult> = (item1: T1, item2: T2, item3: T3, item4: T4, item5: T5) => TResult;