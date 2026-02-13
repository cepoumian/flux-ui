// playground/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Button, Link } from "../packages/flux-ui/src";

interface NextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: React.ReactNode;
}

function NextLink({ href, children, ...props }: NextLinkProps) {
  return (
    <a
      {...props}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        console.log(`🚀 Next.js Navigation to: ${href}`);
        alert(`Would navigate to: ${href}`);
      }}
    >
      {children}
    </a>
  );
}

// ========================================
// Main App
// ========================================
function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Flux UI Playground
      </h1>

      {/* Buttons Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
          }}
        >
          Buttons
        </h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>

      {/* Links Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
          }}
        >
          Links - All Variants
        </h2>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <Link href="/about" variant="primary">
            About Page (Primary)
          </Link>

          <Link href="https://ariakit.org" variant="primary">
            Ariakit Docs (External - see arrow)
          </Link>

          <Link href="/dashboard" variant="subtle">
            Dashboard (Subtle)
          </Link>

          <Link href="/privacy" variant="subtle">
            Privacy Policy (Subtle)
          </Link>
        </div>

        <p style={{ marginTop: "1rem" }}>
          Check out the{" "}
          <Link href="/guide" variant="inline">
            complete guide
          </Link>{" "}
          for details. (Inline variant in text)
        </p>
      </div>

      {/* Router Integration Section */}
      <div
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          backgroundColor: "#f0f9ff",
          borderRadius: "0.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
          }}
        >
          🚀 Router Integration (render prop)
        </h2>
        <p
          style={{
            marginBottom: "1rem",
            fontSize: "0.875rem",
            color: "#374151",
          }}
        >
          These links use the <code>render</code> prop to integrate with a
          simulated Next.js router. Click them to see the console log!
        </p>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <Link
            href="/products"
            variant="primary"
            render={<NextLink href="/products" />}
          >
            Products Page (with render prop)
          </Link>

          <Link
            href="/settings"
            variant="subtle"
            render={<NextLink href="/settings" />}
          >
            Settings (subtle + router)
          </Link>

          <p>
            Navigate to{" "}
            <Link
              href="/docs/api"
              variant="inline"
              render={<NextLink href="/docs/api" />}
            >
              API documentation
            </Link>{" "}
            to learn more. (inline + router)
          </p>
        </div>
      </div>

      {/* Open Console Message */}
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#fef3c7",
          borderRadius: "0.5rem",
          marginTop: "1rem",
        }}
      >
        <p style={{ fontSize: "0.875rem" }}>
          💡 <strong>Tip:</strong> Open your browser console (F12) and click the
          router integration links above!
        </p>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
