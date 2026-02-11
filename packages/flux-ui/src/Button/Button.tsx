import * as React from "react";
import * as Ariakit from "@ariakit/react";
import { buttonVariants, type ButtonVariants } from "./button.styles";
import "../tokens.css";
import "./button.css";

export interface ButtonProps extends Ariakit.ButtonProps, ButtonVariants {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant, size, isLoading, children, ...props },
    ref,
  ) {
    return (
      <Ariakit.Button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="flux-button__spinner">⏳</span>
            {children}
          </>
        ) : (
          children
        )}
      </Ariakit.Button>
    );
  },
);
