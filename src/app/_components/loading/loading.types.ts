import { ComponentBase } from "../types/component-base.type";

export type loadingProps = Omit<ComponentBase, "isDisabled"> & {
  type?: "spinner" | "ring";
};
