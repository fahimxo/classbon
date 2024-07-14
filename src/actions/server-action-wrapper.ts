import { Problem } from "@/types/http-errors.interface";
import { OperationResult } from "@/types/operation-result";

export const serverActionWrapper = async <T>(
  action: () => Promise<T>
): Promise<OperationResult<T>> => {
  try {
    const result = await action();
    return {
      isSuccess: true,
      result,
    };
  } catch (error) {
    const err = error as Problem;
    return {
      isSuccess: false,
      errors: err,
    };
  }
  throw new Error("خطای ناشناخته");
};
