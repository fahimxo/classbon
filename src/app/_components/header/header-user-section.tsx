"use client";
import { logOut } from "@/actions/auth";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loading } from "../loading";

const HeaderUserSection = () => {
  const { data: session, status } = useSession();
  const [logOutState, action] = useFormState(logOut, undefined);
  const router = useRouter();

  useEffect(() => {
    if (logOutState?.isSuccess) {
      const fetchSession = async () => await getSession();
      fetchSession();
      router.push("/");
    }
  }, [logOutState, router]);

  let authContent: ReactNode;

  if (status === "loading") {
    authContent = null;
  } else if (session?.user) {
    authContent = (
      <div>
        <>
          <p>{session.user.mobile}</p>
          <form action={action as () => void}>
            <LogOutButton />
          </form>
        </>
      </div>
    );
  } else {
    authContent = <Link href={"/signin"}>ورود یا ثبت نام</Link>;
  }

  return authContent;
};

export default HeaderUserSection;

const LogOutButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="text-error flex justify-center items-center"
    >
      خروج از حساب
      {pending && <Loading size="tiny" />}
    </button>
  );
};
