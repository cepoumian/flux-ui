import { cva, type VariantProps } from "class-variance-authority";

export const linkVariants = cva("flux-link", {
  variants: {
    variant: {
      primary: "flux-link--primary",
      subtle: "flux-link--subtle",
      inline: "flux-link--inline",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type LinkVariants = VariantProps<typeof linkVariants>;
