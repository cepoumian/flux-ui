import * as React from "react";
import * as Ariakit from "@ariakit/react";
import "../tokens.css";
import "./link.css";
import { linkVariants, type LinkVariants } from "./link.styles";

function isExternalUrl(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//")
  );
}

export interface LinkProps extends Ariakit.RoleProps<"a">, LinkVariants {
  href: string;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link({ href, variant, children, className, ...props }, ref) {
    const isExternal = isExternalUrl(href);

    return (
      <Ariakit.Role.a
        ref={ref}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={linkVariants({ variant, className })}
        {...props}
      >
        {children}
        {isExternal && (
          <span
            className="flux-link__external-icon"
            aria-label="(opens in new tab)"
          >
            {" ↗"}
          </span>
        )}
      </Ariakit.Role.a>
    );
  },
);
