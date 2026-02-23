import { cva, type VariantProps } from "class-variance-authority";

export const comboboxInputVariants = cva("flux-combobox__input", {
  variants: {
    size: {
      sm: "flux-combobox__input--sm",
      md: "flux-combobox__input--md",
      lg: "flux-combobox__input--lg",
    },
  },
  defaultVariants: { size: "md" },
});

export type ComboboxInputVariants = VariantProps<typeof comboboxInputVariants>;
