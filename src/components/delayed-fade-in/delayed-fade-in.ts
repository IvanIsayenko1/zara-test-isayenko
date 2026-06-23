import { type ReactNode } from "react";

export type DelayedFadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};
