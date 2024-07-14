import { ReactNode } from "react";

export type AccordionType = {
  id: number;
  title: string;
  content: string | ReactNode;
};
