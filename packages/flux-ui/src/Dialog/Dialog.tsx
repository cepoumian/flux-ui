import * as React from "react";
import * as Ariakit from "@ariakit/react";
import { Button, ButtonProps } from "../Button";
import { type ButtonVariants } from "../Button/button.styles";
import "../tokens.css";
import "./dialog.css";
import clsx from "clsx";

// Re-export so consumers don't need to import Ariakit directly
export { useDialogStore } from "@ariakit/react";

// ─── FluxDialogTrigger ───────────────────────────────────────────────────────────────
export interface FluxDialogTriggerProps extends ButtonProps {
  store: Ariakit.DialogStore;
}

export const FluxDialogTrigger = React.forwardRef<
  HTMLButtonElement,
  FluxDialogTriggerProps
>(function FluxDialogTrigger(
  { store, variant = "primary", size, className, children, ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={className}
      onClick={store.show}
      {...props}
    >
      {children}
    </Button>
  );
});

// ─── FluxDialog ───────────────────────────────────────────────────────────────

export interface FluxDialogProps extends Ariakit.DialogProps {
  heading: string;
  description?: string;
}

export const FluxDialog = React.forwardRef<HTMLDivElement, FluxDialogProps>(
  function FluxDialog(
    { store, heading, description, className, children, ...props },
    ref,
  ) {
    return (
      <Ariakit.Dialog
        store={store}
        ref={ref}
        portal
        backdrop={<div className="flux-dialog-backdrop" />}
        className={clsx("flux-dialog", className)}
        {...props}
      >
        <Ariakit.DialogHeading className="flux-dialog__heading">
          {heading}
        </Ariakit.DialogHeading>

        {description && (
          <Ariakit.DialogDescription className="flux-dialog__description">
            {description}
          </Ariakit.DialogDescription>
        )}
        {children}
      </Ariakit.Dialog>
    );
  },
);

export interface FluxConfirmDialogProps {
  store: Ariakit.DialogStore;
  title: string;
  description?: string;
  confirmLabel?: string;
  confirmVariant?: ButtonVariants["variant"];
  cancelLabel?: string;
  onConfirm: () => void;
}

export function FluxConfirmDialog({
  store,
  title,
  description,
  confirmLabel = "Confirm",
  confirmVariant = "primary",
  cancelLabel = "Cancel",
  onConfirm,
}: FluxConfirmDialogProps) {
  return (
    <FluxDialog store={store} heading={title} description={description}>
      <div className="flux-dialog__actions">
        <Button variant="secondary" onClick={store.hide}>
          {cancelLabel}
        </Button>
        <Button
          variant={confirmVariant}
          onClick={() => {
            onConfirm();
            store.hide();
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </FluxDialog>
  );
}
