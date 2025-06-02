
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
declare type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

declare type ExcludeMethods<T> =
    { [K in keyof T as (T[K] extends Function ? never : K)]: T[K] }