import { createData } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";

const sendAuthCode = (mobile: string): Promise<any> => {
  return createData("send-auth-code", { mobile });
};

type SendAuthCodeOption = {
  onSuccess: () => void;
  onError?: () => void;
};

export const useSendAuthCode = ({ onSuccess, onError }: SendAuthCodeOption) => {
  const { mutate: submit } = useMutation({
    mutationFn: sendAuthCode,
    onSuccess,
    onError,
  });
  return { submit };
};
