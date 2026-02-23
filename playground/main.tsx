import React from "react";
import { createRoot } from "react-dom/client";
import { Button, Link, SearchCombobox } from "../packages/flux-ui/src";

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
// SearchCombobox Test Data
// ========================================
const TEAM_MEMBERS = [
  {
    id: "1",
    label: "Alice Johnson",
    description: "Engineering · Frontend",
  },
  {
    id: "2",
    label: "Bob Smith",
    description: "Design · UI/UX",
  },
  {
    id: "3",
    label: "Carol Williams",
    description: "Engineering · Backend",
  },
  {
    id: "4",
    label: "David Chen",
    description: "Product · Strategy",
  },
  {
    id: "5",
    label: "Eva Martinez",
    description: "Engineering · Infrastructure",
  },
];

// ========================================
// Main App
// ========================================
function App() {
  const [selectedMember, setSelectedMember] = React.useState<string | null>(
    null,
  );

  return (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <h1
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "2rem" }}
      >
        Flux UI Playground
      </h1>

      {/* SearchCombobox Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
          }}
        >
          SearchCombobox
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            marginBottom: "1rem",
          }}
        >
          Search for a team member by name. Try typing "eng" or "al".
        </p>

        <SearchCombobox
          items={TEAM_MEMBERS}
          placeholder="Search team members..."
          onSelect={(item) => setSelectedMember(item.label)}
        />

        {selectedMember && (
          <p
            style={{
              marginTop: "0.75rem",
              fontSize: "0.875rem",
              color: "#374151",
            }}
          >
            ✅ Selected: <strong>{selectedMember}</strong>
          </p>
        )}
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #e5e7eb",
          marginBottom: "2rem",
        }}
      />

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
        </div>

        <p style={{ marginTop: "1rem" }}>
          Check out the{" "}
          <Link href="/guide" variant="inline">
            complete guide
          </Link>{" "}
          for details.
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
          Router Integration (render prop)
        </h2>
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
        </div>
      </div>

      <div
        style={{
          padding: "1rem",
          backgroundColor: "#fef3c7",
          borderRadius: "0.5rem",
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
