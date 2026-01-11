

// Utils
export type OmitOptional<T> = {
  [P in keyof T as Pick<T, P> extends Required<Pick<T, P>> ? P : never]: T[P];
};