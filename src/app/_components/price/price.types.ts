import { ComponentBase } from "../types/component-base.type";

export type priceProps = Omit<ComponentBase, "isDisabled" | "variant"> & {
  price?: number;
  text?: string;
};
