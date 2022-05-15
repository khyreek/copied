type ExclusiveUnion<T, U> = Record<
    Exclude<keyof (T & U), Extract<keyof T, keyof U>>,
    unknown
>;

type NonEmptyObject<T> = keyof T extends never ? never : T;

type NoOverlappingKeys<T extends object, M extends object> = Extract<
    keyof T,
    keyof M
> extends never // empty extract returns never
    ? Record<keyof (T & M), unknown>
    : never;

// custom array methods
interface Array<T> {
    /**
     * Given a filter prompt, return a new array with the left side
     * being an array of the values of the filter, and the right side
     * being an array of the values that did not pass the filter
     */
    splitFilter: (
        callback: (val: T, i?: number, arr?: T[]) => boolean
    ) => [passed: T[], failed: T[]];

    // testing
    bruh: () => void;
}

// meaning it can be converted to a number with + prefix operator
type UnariableString = string;

// groups of types
type NumberOrStringGeneric<T> = T extends number
    ? number
    : T extends string
    ? string
    : never;
type NumberOrString = string | number;

// prettier-ignore
type asdfhkwqei<A, B> = A extends number ? (B extends string ? number : never) : never;
