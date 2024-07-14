"use client";
import { AuthCode } from "@/app/_components/auth-code";
import { AuthCodeRef } from "@/app/_components/auth-code/auth-code.types";
import { Button } from "@/app/_components/button";
import { Timer } from "@/app/_components/timer";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { useSendAuthCode } from "../_api/send-auth-code";
import { useNotificationState } from "@/store/notification.store";
import { TimerRef } from "@/app/_components/timer/timer.types";
import { useForm } from "react-hook-form";
import { VerifyUserModel } from "../_types/verify-user.type";
import { useFormState } from "react-dom";
import { sendAuthCodeAction, verify } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

const getTwoMinutesFromNow = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 120);
  return time;
};

const VerificationForm = ({ mobile }: { mobile: string }) => {
  const authCodeRef = useRef<AuthCodeRef>(null);
  const timerRef = useRef<TimerRef>(null);
  const [showResendCode, setShowResendCode] = useState<boolean>(false);
  const showNotification = useNotificationState(
    (state) => state.showNotification
  );
  const [formState, action] = useFormState(sendAuthCodeAction, null);
  const [verifyState, verifyAction] = useFormState(verify, undefined);
  const [isPending, startTransitoin] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (formState && !formState.isSuccess && formState.errors) {
      showNotification({
        message: formState.errors.detail!,
        type: "error",
      });
    } else if (formState && formState.isSuccess) {
      showNotification({
        type: "info",
        message: "کد تایید به شماره شما ارسال شد",
      });
      timerRef.current?.restart(getTwoMinutesFromNow());
    }
  }, [formState, showNotification]);

  useEffect(() => {
    if (verifyState && !verifyState?.isSuccess && verifyState.errors?.detail) {
      showNotification({
        type: "error",
        message: verifyState.errors?.detail,
      });
    } else if (verifyState?.isSuccess) {
      test();
    }
  }, [verifyState, showNotification]);

  const test = async () => {
    const fetchSession = await getSession();
    console.log("ssssssssss", fetchSession);

    router.push("/student/courses");
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isValid },
  } = useForm<VerifyUserModel>();

  const { submit } = useSendAuthCode({
    onSuccess: () => {
      showNotification({
        type: "info",
        message: "کد تایید به شماره شما ارسال شد",
      });
      timerRef.current?.restart(getTwoMinutesFromNow());
    },
    onError: () => {
      setShowResendCode(true);
    },
  });

  const resendAuthCode = () => {
    authCodeRef.current?.clear();
    setShowResendCode(false);
    authCodeRef.current?.clear();
    action(mobile);
  };

  register("code", { validate: (value: string) => (value ?? "").length === 5 });

  const onSubmit = (data: VerifyUserModel) => {
    data.username = mobile;
    startTransitoin(async () => {
      verifyAction(data);
    });
  };

  return (
    <>
      <h5 className="text-2xl">کد تایید</h5>
      <p className="mt-2">دنیای شگفت انگیز برنامه نویسی در انتظار شماست!</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 mt-10 flex-1"
      >
        <AuthCode
          className="mt-10"
          onChange={(value) => {
            setValue("code", value, { shouldValidate: true });
          }}
          autoFocus={true}
          ref={authCodeRef}
        />
        <Timer
          className="my-8"
          size="small"
          expiryTimestamp={getTwoMinutesFromNow()}
          showDays={false}
          showHours={false}
          onExpire={() => setShowResendCode(true)}
          ref={timerRef}
        />
        <Button
          isLink={true}
          onClick={resendAuthCode}
          isDisabled={!showResendCode}
        >
          ارسال مجدد کد تایید
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isPending}
          isDisabled={!isValid}
        >
          تایید و ادامه
        </Button>
        <div className="flex items-start gap-1 justify-center mt-auto">
          <span>برای اصلاح شماره موبایل</span>
          <Link href="/signin" className="text-primary">
            اینجا
          </Link>
          <span>کلیک کنید</span>
        </div>
      </form>
    </>
  );
};
export default VerificationForm;
