import { cva, type VariantProps } from "class-variance-authority";

export const menuItemVariants = cva("flux-menu__item", {
  variants: {
    variant: {
      default: "",
      danger: "flux-menu__item--danger",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type MenuItemVariants = VariantProps<typeof menuItemVariants>;
