import React from "react";
import { createRoot } from "react-dom/client";
import { z } from "zod";
import * as Ariakit from "@ariakit/react";
import {
  Button,
  Link,
  SearchCombobox,
  Menu,
  MenuButton,
  MenuItem,
  MenuSeparator,
  useMenuStore,
} from "../packages/flux-ui/src";
import {
  FluxForm,
  FluxFormLabel,
  FluxFormInput,
  FluxFormError,
  FluxFormSubmit,
  FluxFormField,
  useFormStore,
} from "../packages/flux-ui/src";
import {
  FluxDialog,
  FluxDialogTrigger,
  FluxConfirmDialog,
  useDialogStore,
} from "../packages/flux-ui/src";
import {
  CommandPalette,
  type Command,
} from "../packages/flux-ui/src/CommandPalette";

// ========================================
// Next.js Link simulation
// ========================================
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
  { id: "1", label: "Alice Johnson", description: "Engineering · Frontend" },
  { id: "2", label: "Bob Smith", description: "Design · UI/UX" },
  { id: "3", label: "Carol Williams", description: "Engineering · Backend" },
  { id: "4", label: "David Chen", description: "Product · Strategy" },
  {
    id: "5",
    label: "Eva Martinez",
    description: "Engineering · Infrastructure",
  },
];

// ========================================
// Demo: Basic Menu
// ========================================
function BasicMenuDemo() {
  const menu = useMenuStore();
  const [lastAction, setLastAction] = React.useState<string | null>(null);

  return (
    <div>
      <MenuButton store={menu}>Actions</MenuButton>
      <Menu store={menu}>
        <MenuItem onClick={() => setLastAction("Edit")}>Edit</MenuItem>
        <MenuItem onClick={() => setLastAction("Duplicate")}>
          Duplicate
        </MenuItem>
        <MenuItem onClick={() => setLastAction("Share")}>Share</MenuItem>
        <MenuSeparator />
        <MenuItem variant="danger" onClick={() => setLastAction("Delete")}>
          Delete
        </MenuItem>
      </Menu>
      {lastAction && (
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.875rem",
            color: "#374151",
          }}
        >
          ✅ Action: <strong>{lastAction}</strong>
        </p>
      )}
    </div>
  );
}

// ========================================
// Demo: Nested Menu (Submenu)
// ========================================
function NestedMenuDemo() {
  const menu = useMenuStore();
  const submenu = useMenuStore({
    placement: "right-start",
  });
  const [lastAction, setLastAction] = React.useState<string | null>(null);

  return (
    <div>
      <MenuButton store={menu}>File</MenuButton>

      <Menu store={menu}>
        <MenuItem onClick={() => setLastAction("New File")}>New File</MenuItem>
        <MenuItem onClick={() => setLastAction("Save")}>Save</MenuItem>
        <MenuSeparator />

        {/* Submenu trigger: acts as MenuItem inside parent, MenuButton for submenu */}
        <Ariakit.MenuButton
          store={submenu}
          render={
            <Ariakit.MenuItem className="flux-menu__item flux-menu__item--submenu" />
          }
        >
          Open Recent
          <span className="flux-menu__item-arrow">▶</span>
        </Ariakit.MenuButton>

        <Ariakit.Menu store={submenu} className="flux-menu__popover" portal>
          <Ariakit.MenuItem
            className="flux-menu__item"
            onClick={() => {
              setLastAction("report-q3.pdf");
              menu.hide();
            }}
          >
            report-q3.pdf
          </Ariakit.MenuItem>
          <Ariakit.MenuItem
            className="flux-menu__item"
            onClick={() => {
              setLastAction("notes.txt");
              menu.hide();
            }}
          >
            notes.txt
          </Ariakit.MenuItem>
          <Ariakit.MenuItem
            className="flux-menu__item"
            onClick={() => {
              setLastAction("design-v2.fig");
              menu.hide();
            }}
          >
            design-v2.fig
          </Ariakit.MenuItem>
        </Ariakit.Menu>
      </Menu>

      {lastAction && (
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.875rem",
            color: "#374151",
          }}
        >
          ✅ Action: <strong>{lastAction}</strong>
        </p>
      )}
    </div>
  );
}

// ========================================
// Demo: Disabled Items
// ========================================
function DisabledItemsDemo() {
  const menu = useMenuStore();

  return (
    <div>
      <MenuButton store={menu}>Edit</MenuButton>
      <Menu store={menu}>
        <MenuItem onClick={() => alert("Undo!")}>Undo</MenuItem>
        <MenuItem disabled>Redo (disabled)</MenuItem>
        <MenuSeparator />
        <MenuItem onClick={() => alert("Cut!")}>Cut</MenuItem>
        <MenuItem onClick={() => alert("Copy!")}>Copy</MenuItem>
        <MenuItem disabled>Paste (disabled)</MenuItem>
      </Menu>
    </div>
  );
}

// ========================================
// Demo: Settings Form
// ========================================

const settingsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  role: z.enum(["viewer", "editor", "admin"], {
    message: "Please select a valid role",
  }),
});

function SettingsForm() {
  const [saved, setSaved] = React.useState(false);

  const form = useFormStore({
    defaultValues: {
      name: "",
      email: "",
      role: "viewer",
    },
  });

  form.useValidate(() => {
    const result = settingsSchema.safeParse(form.getState().values);

    if (!result.success) {
      for (const issue of result.error.issues) {
        form.setError(issue.path[0] as string, issue.message);
      }
    }
  });

  form.useSubmit(() => {
    console.log("Submitted!", form.getState().values);
    setSaved(true);
  });

  if (saved) {
    return <p>✅ Settings saved!</p>;
  }

  return (
    <FluxForm store={form}>
      {/* name field */}
      <FluxFormField>
        <FluxFormLabel name={form.names.name}>Name</FluxFormLabel>
        <FluxFormInput name={form.names.name} type="text" />
        <FluxFormError name={form.names.name} />
      </FluxFormField>
      {/* email field */}
      <FluxFormField>
        <FluxFormLabel name={form.names.email}>Email</FluxFormLabel>
        <FluxFormInput name={form.names.email} type="email" />
        <FluxFormError name={form.names.email} />
      </FluxFormField>
      {/* role field — native select via render prop */}
      <FluxFormField>
        <FluxFormLabel name={form.names.role}>Role</FluxFormLabel>
        <FluxFormInput name={form.names.role} render={<select />}>
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </FluxFormInput>
        <FluxFormError name={form.names.role} />
      </FluxFormField>
      {/* submit button */}
      <FluxFormSubmit variant="primary" size="lg">
        Save Settings
      </FluxFormSubmit>
    </FluxForm>
  );
}

// ========================================
// Demo: Dialog
// ========================================
function DialogDemo() {
  const infoDialog = useDialogStore();
  const confirmDialog = useDialogStore();
  const [deleted, setDeleted] = React.useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Basic dialog */}
      <div>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            marginBottom: "0.75rem",
          }}
        >
          <strong>Basic dialog</strong> — opens, traps focus, closes on Escape
          or backdrop click
        </p>
        <FluxDialogTrigger store={infoDialog} variant="secondary">
          Open dialog
        </FluxDialogTrigger>
        <FluxDialog
          store={infoDialog}
          heading="Welcome to Flux UI"
          description="This dialog traps focus inside and restores it to the trigger when closed."
        >
          <div className="flux-dialog__actions">
            <Button variant="primary" onClick={infoDialog.hide}>
              Got it
            </Button>
          </div>
        </FluxDialog>
      </div>

      {/* Confirm dialog */}
      <div>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            marginBottom: "0.75rem",
          }}
        >
          <strong>Confirm dialog</strong> — destructive action pattern
        </p>
        {deleted ? (
          <p style={{ fontSize: "0.875rem", color: "#374151" }}>
            ✅ Item deleted
          </p>
        ) : (
          <>
            <FluxDialogTrigger store={confirmDialog} variant="danger">
              Delete item
            </FluxDialogTrigger>
            <FluxConfirmDialog
              store={confirmDialog}
              title="Delete item?"
              description="This action cannot be undone. The item will be permanently removed."
              confirmLabel="Delete"
              confirmVariant="danger"
              onConfirm={() => setDeleted(true)}
            />
          </>
        )}
      </div>
    </div>
  );
}

// ========================================
// Demo: Command Palette
// ========================================

// Sample commands data
const COMMANDS: Command[] = [
  {
    id: "1",
    label: "New File",
    category: "files",
    description: "Create a new file",
    onAction: () => alert("New File"),
  },
  {
    id: "2",
    label: "Open File",
    category: "files",
    description: "Open an existing file",
    onAction: () => alert("Open File"),
  },
  {
    id: "3",
    label: "Save",
    category: "actions",
    description: "Save current file",
    onAction: () => alert("Save"),
  },
  {
    id: "4",
    label: "Delete",
    category: "actions",
    description: "Delete selected item",
    onAction: () => alert("Delete"),
  },
  {
    id: "5",
    label: "Go to Dashboard",
    category: "navigation",
    onAction: () => alert("Dashboard"),
  },
  {
    id: "6",
    label: "Go to Settings",
    category: "navigation",
    onAction: () => alert("Settings"),
  },
];

// Temporary wrapper with a button trigger (until Cmd+K is wired)
function CommandPaletteDemo() {
  const dialog = Ariakit.useDialogStore();

  return (
    <div>
      <Button variant="secondary" onClick={dialog.show}>
        Open Command Palette{" "}
        <kbd style={{ marginLeft: "0.5rem", fontSize: "0.75rem" }}>⌘K</kbd>
      </Button>
      {/* Temporarily passing the store down so the button can open it */}
      <CommandPalette commands={COMMANDS} /* dialogStore={dialog} */ />
    </div>
  );
}

// ========================================
// Main App
// ========================================
function App() {
  const [selectedMember, setSelectedMember] = React.useState<string | null>(
    null,
  );

  return (
    <div style={{ padding: "2rem", maxWidth: "640px" }}>
      <h1
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "2rem" }}
      >
        Flux UI Playground
      </h1>

      {/* ── COMMAND PALETTE ── */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "1.25rem",
          }}
        >
          Command Palette
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            marginBottom: "1rem",
          }}
        >
          Press <kbd>⌘K</kbd> to open
        </p>
        <CommandPalette commands={COMMANDS} />
      </section>

      {/* ── DIALOG ── */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "1.25rem",
          }}
        >
          Dialog
        </h2>
        <DialogDemo />
      </section>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #e5e7eb",
          marginBottom: "2.5rem",
        }}
      />

      {/* ── SETTINGS FORM ── */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "1.25rem",
          }}
        >
          Settings Form
        </h2>
        <SettingsForm />
      </section>

      {/* ── MENU SECTION ── */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "1.25rem",
          }}
        >
          Menu
        </h2>

        {/* Basic */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              marginBottom: "0.75rem",
            }}
          >
            <strong>Basic menu</strong> — items, separator, danger variant
          </p>
          <BasicMenuDemo />
        </div>

        {/* Nested */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              marginBottom: "0.75rem",
            }}
          >
            <strong>Nested submenu</strong> — hover or arrow-key into "Open
            Recent"
          </p>
          <NestedMenuDemo />
        </div>

        {/* Disabled */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              marginBottom: "0.75rem",
            }}
          >
            <strong>Disabled items</strong> — arrow keys skip over them
            automatically
          </p>
          <DisabledItemsDemo />
        </div>
      </section>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #e5e7eb",
          marginBottom: "2.5rem",
        }}
      />

      {/* ── SEARCH COMBOBOX ── */}
      <section style={{ marginBottom: "2.5rem" }}>
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
          Try typing "eng" or "al"
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
      </section>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #e5e7eb",
          marginBottom: "2.5rem",
        }}
      />

      {/* ── BUTTONS ── */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "0.75rem",
          }}
        >
          Button
        </h2>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="primary" isLoading>
            Loading
          </Button>
        </div>
      </section>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #e5e7eb",
          marginBottom: "2.5rem",
        }}
      />

      {/* ── LINKS ── */}
      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "0.75rem",
          }}
        >
          Link
        </h2>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <Link href="/about" variant="primary">
            About Page (Primary)
          </Link>
          <Link href="https://ariakit.org" variant="primary">
            Ariakit Docs (External)
          </Link>
          <Link href="/dashboard" variant="subtle">
            Dashboard (Subtle)
          </Link>
          <Link
            href="/products"
            variant="primary"
            render={<NextLink href="/products" />}
          >
            Products (with render prop)
          </Link>
        </div>
        <p style={{ marginTop: "1rem" }}>
          Check out the{" "}
          <Link href="/guide" variant="inline">
            complete guide
          </Link>{" "}
          for details.
        </p>
      </section>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
