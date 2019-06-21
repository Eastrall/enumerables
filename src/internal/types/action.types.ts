export type Action<T> = (item: T) => void;
export type Action2<T1, T2> = (item: T1, item2: T2) => void;
export type Action3<T1, T2, T3> = (item: T1, item2: T2, item3: T3) => void;
export type Action4<T1, T2, T3, T4> = (item: T1, item2: T2, item3: T3, item4: T4) => void;
export type Action5<T1, T2, T3, T4, T5> = (item: T1, item2: T2, item3: T3, item4: T4, item5: T5) => void;