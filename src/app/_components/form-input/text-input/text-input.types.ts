import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { TextBoxProps } from "../../textbox/textbox.types";

export type TextInputProps<TFromValues extends FieldValues> = Omit<
  TextBoxProps,
  "name"
> & {
  register: UseFormRegister<TFromValues>;
  name: Path<TFromValues>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<TFromValues, FieldError>>;
};
