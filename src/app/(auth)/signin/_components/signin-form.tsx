"use client";
import { Button } from "@/app/_components/button";
import { useForm } from "react-hook-form";
import { SignIn } from "../_types/signin.types";
import { TextInput } from "@/app/_components/form-input";
import { useSignIn } from "../_api/signin";
import { useRouter } from "next/navigation";
import { useNotificationState } from "@/store/notification.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../_types/signin.schema";
import { signInAction } from "@/actions/auth";
import { useFormState } from "react-dom";
import { useEffect, useTransition } from "react";

const SignInForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  });

  const [formState, action] = useFormState(signInAction, null);
  const [isPending, startTransitoin] = useTransition();

  const showNotification = useNotificationState(
    (state) => state.showNotification
  );

  useEffect(() => {
    if (formState && !formState.isSuccess && formState.errors) {
      showNotification({
        message: formState.errors.detail!,
        type: "error",
      });
    } else if (formState && formState.isSuccess) {
      console.log(formState.result);
      router.push(`/verify?mobile=${getValues("mobile")}`);
      showNotification({
        message: "کد تایید به شماره شما ارسال شد",
        type: "info",
      });
    }
  }, [formState, showNotification]);

  const router = useRouter();

  const { submit } = useSignIn({
    onSuccess: () => {
      router.push(`/verify?mobile=${getValues("mobile")}`);
      showNotification({
        message: "کد تایید به شماره شما ارسال شد",
        type: "info",
      });
    },
  });

  const onSubmit = (data: SignIn) => {
    startTransitoin(async () => {
      await action(data.mobile);
    });
  };

  return (
    <>
      <h5 className="text-2xl">ورود | ثبت نام</h5>
      <p className="mt-2">دنیای شگفت انگیز برنامه نویسی در انتظار شماست!</p>
      <form
        className="flex flex-col gap-6 mt-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput<SignIn>
          name="mobile"
          register={register}
          errors={errors}
          placeholder="شماره موبایل"
          maxLength={11}
        />
        <p>
          استفاده از کلاسبن به معنای پذیرش قوانین و مقررات این پلتفرم آموزشی است
        </p>

        <Button type="submit" variant="primary" isLoading={isPending}>
          تایید و دریافت کد
        </Button>
      </form>
    </>
  );
};
export default SignInForm;
