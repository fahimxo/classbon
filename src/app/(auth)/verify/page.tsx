import React from "react";
import VerificationForm from "./_components/verification-form";

function Verify({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <VerificationForm mobile={searchParams["mobile"] as string} />
    </div>
  );
}

export default Verify;
