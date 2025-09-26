export type Result<T, E = Error> = SuccessResult<T> | ErrorResult<E>;

export interface SuccessResult<T> {
  ok: true;
  data: T;
}

export interface ErrorResult<E> {
  ok: false;
  error: E;
}

export const success = <T>(data: T): SuccessResult<T> => ({
  ok: true,
  data,
});

export const failure = <E>(error: E): ErrorResult<E> => ({
  ok: false,
  error,
});
