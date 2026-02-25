import * as React from "react";
import * as Ariakit from "@ariakit/react";
import { clsx } from "clsx";
import { menuItemVariants, MenuItemVariants } from "./menu.styles";
import "../tokens.css";
import "./menu.css";

// Re-export the store hook so consumers don't need to import Ariakit directly
export { useMenuStore } from "@ariakit/react";

// MenuButton
export interface MenuButtonProps extends Ariakit.MenuButtonProps {}

export const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButton({ className, children, ...props }, ref) {
    return (
      <Ariakit.MenuButton
        ref={ref}
        className={clsx("flux-menu__button", className)}
        {...props}
      >
        {children}
      </Ariakit.MenuButton>
    );
  },
);

// Menu (the popover)
export interface MenuProps extends Ariakit.MenuProps {}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(function Menu(
  { className, children, ...props },
  ref,
) {
  return (
    <Ariakit.Menu
      ref={ref}
      className={clsx("flux-menu__popover", className)}
      {...props}
    >
      {children}
    </Ariakit.Menu>
  );
});

// MenuItem
export interface MenuItemProps
  extends Ariakit.MenuItemProps, MenuItemVariants {}

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  function MenuItem({ className, variant, children, ...props }, ref) {
    return (
      <Ariakit.MenuItem
        ref={ref}
        className={menuItemVariants({ variant, className })}
        {...props}
      >
        {children}
      </Ariakit.MenuItem>
    );
  },
);

// MenuSeparator
export interface MenuSeparatorProps extends Ariakit.MenuSeparatorProps {}

export const MenuSeparator = React.forwardRef<
  HTMLHRElement,
  MenuSeparatorProps
>(function MenuSeparator({ className, ...props }, ref) {
  return (
    <Ariakit.MenuSeparator
      ref={ref}
      className={clsx("flux-menu__separator", className)}
      {...props}
    />
  );
});
