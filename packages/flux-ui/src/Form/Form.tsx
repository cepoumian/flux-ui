import * as React from "react";
import * as Ariakit from "@ariakit/react";
import { buttonVariants, type ButtonVariants } from "../Button/button.styles";
import "../tokens.css";
import "./form.css";
import clsx from "clsx";

// Re-export so consumers don't need to import Ariakit directly
export { useFormStore } from "@ariakit/react";

// ─── FluxForm ───────────────────────────────────────────────────────────────

export interface FluxFormProps extends Ariakit.FormProps {}

export const FluxForm = React.forwardRef<HTMLFormElement, FluxFormProps>(
  function FluxForm({ className, children, ...props }, ref) {
    return (
      <Ariakit.Form
        ref={ref}
        className={clsx("flux-form", className)}
        {...props}
      >
        {children}
      </Ariakit.Form>
    );
  },
);

// ─── FluxFormLabel ──────────────────────────────────────────────────────────

export interface FluxFormLabelProps extends Ariakit.FormLabelProps {}

export const FluxFormLabel = React.forwardRef<
  HTMLLabelElement,
  FluxFormLabelProps
>(function FluxFormLabel({ className, children, ...props }, ref) {
  return (
    <Ariakit.FormLabel
      ref={ref}
      className={clsx("flux-form__label", className)}
      {...props}
    >
      {children}
    </Ariakit.FormLabel>
  );
});

// ─── FluxFormInput ──────────────────────────────────────────────────────────

export interface FluxFormInputProps extends Ariakit.FormInputProps {}

export const FluxFormInput = React.forwardRef<
  HTMLInputElement,
  FluxFormInputProps
>(function FluxFormInput({ className, ...props }, ref) {
  return (
    <Ariakit.FormInput
      ref={ref}
      className={clsx("flux-form__input", className)}
      {...props}
    />
  );
});

// ─── FluxFormError ──────────────────────────────────────────────────────────

export interface FluxFormErrorProps extends Ariakit.FormErrorProps {}

export const FluxFormError = React.forwardRef<
  HTMLParagraphElement,
  FluxFormErrorProps
>(function FluxFormError({ className, ...props }, ref) {
  return (
    <Ariakit.FormError
      ref={ref}
      className={clsx("flux-form__error", className)}
      {...props}
    />
  );
});
// ─── FluxFormSubmit ─────────────────────────────────────────────────────────

export interface FluxFormSubmitProps
  extends Ariakit.FormSubmitProps, ButtonVariants {}

export const FluxFormSubmit = React.forwardRef<
  HTMLButtonElement,
  FluxFormSubmitProps
>(function FluxFormSubmit(
  { className, variant, size, children, ...props },
  ref,
) {
  return (
    <Ariakit.FormSubmit
      ref={ref}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {children}
    </Ariakit.FormSubmit>
  );
});

// ─── FluxFormField ──────────────────────────────────────────────────────────
export interface FluxFormFieldProps {
  children: React.ReactNode;
  className?: string;
}

export function FluxFormField({ children, className }: FluxFormFieldProps) {
  return <div className={clsx("flux-form__field", className)}>{children}</div>;
}
