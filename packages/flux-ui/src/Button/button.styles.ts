// packages/flux-ui/src/Button/button.styles.ts
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva("flux-button", {
  variants: {
    variant: {
      primary: "flux-button--primary",
      secondary: "flux-button--secondary",
      ghost: "flux-button--ghost",
      danger: "flux-button--danger",
    },
    size: {
      sm: "flux-button--sm",
      md: "flux-button--md",
      lg: "flux-button--lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
