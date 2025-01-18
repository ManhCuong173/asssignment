import { BoxProps } from "components/Box/types";
import { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement>, BoxProps {
  borderBackground?: string;
  background?: string;
  isDisabled?: boolean;
}
