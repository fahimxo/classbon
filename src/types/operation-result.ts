import { Problem } from "./http-errors.interface";

export type OperationResult<T> = {
  isSuccess: boolean;
  errors?: Problem;
  result?: T;
};
