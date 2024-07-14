import { createData } from "@/core/http-service/http-service";
import { SignIn } from "../_types/signin.types";
import { useMutation } from "@tanstack/react-query";

const signIn = (model: SignIn): Promise<void> => createData("/signin", model);

type useSignInOption = {
  onSuccess: () => void;
};

export const useSignIn = ({ onSuccess }: useSignInOption) => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess,
  });

  return { submit, isPending };
};
