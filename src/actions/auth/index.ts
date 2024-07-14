"use server";

import { signInSchema } from "@/app/(auth)/signin/_types/signin.schema";
import { serverActionWrapper } from "../server-action-wrapper";
import { createData } from "@/core/http-service/http-service";
import { SignIn } from "@/app/(auth)/signin/_types/signin.types";
import { OperationResult } from "@/types/operation-result";
import {
  SendAuthCode,
  VerifyUserModel,
} from "@/app/(auth)/verify/_types/verify-user.type";
import { Problem } from "@/types/http-errors.interface";
import { AuthorizeError, signIn, signOut } from "@/auth";

export const signInAction = async (
  formState: OperationResult<string> | null,
  mobile: string
) => {
  //   const validateDate = signInSchema.safeParse({ mobile });
  //   if (!validateDate.success) {
  //     console.log("errror");
  //     return {
  //       message: "خطا در ارتباط با سرور",
  //     };
  //   } else {
  return serverActionWrapper<string>(
    async () => await createData<SignIn, string>("/signin", { mobile })
  );
  //   }
};

export const sendAuthCodeAction = async (
  formState: OperationResult<string> | null,
  mobile: string
) => {
  return serverActionWrapper<string>(
    async () =>
      await createData<SendAuthCode, string>("/send-auth-code", { mobile })
  );
};

export const verify = async (
  prevState: OperationResult<void> | undefined,
  model: VerifyUserModel
) => {
  try {
    const user = await signIn("credentials", {
      username: model.username,
      code: model.code,
      redirect: false,
    });
    return {
      isSuccess: true,
    } satisfies OperationResult<void>;
  } catch (error) {
    if (error instanceof AuthorizeError) {
      return {
        isSuccess: false,
        errors: error.problem!,
      } satisfies OperationResult<void>;
    }
    throw new Error("");
  }
};

export const logOut = async (state: OperationResult<void> | undefined) => {
  try {
    const user = await signOut({
      redirect: false,
    });
    return {
      isSuccess: true,
    } satisfies OperationResult<void>;
  } catch (error) {
    throw new Error("");
  }
};
