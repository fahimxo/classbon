import React from "react";
import { TextInputProps } from "./text-input.types";
import { FieldValues, get } from "react-hook-form";
import { Textbox } from "../../textbox";

const TextInput = <TFormValues extends FieldValues>({
  name,
  register,
  rules,
  errors,
  variant,
  ...rest
}: TextInputProps<TFormValues>) => {
  const error = get(errors, name);
  const hasError = !!error;
  return (
    <div>
      <Textbox
        {...register(name, rules)}
        {...(hasError ? { variant: "error" } : { variant: variant })}
        {...rest}
      />
      {hasError && <p className="mt-2 text-error text-xs">{error?.message}</p>}
    </div>
  );
};

export default TextInput;
