import * as React from "react";
import * as Ariakit from "@ariakit/react";
import "../tokens.css";
import "./command-palette.css";

export interface Command {
  id: string;
  label: string;
  category: "files" | "actions" | "navigation";
  description?: string;
  onAction: () => void;
}

export interface CommandPaletteProps {
  commands: Command[];
}

export function CommandPalette({ commands }: CommandPaletteProps) {
  const combobox = Ariakit.useComboboxStore({ defaultValue: "", open: true });
  const searchValue = Ariakit.useStoreState(combobox, "value");
  const [activeCategory, setActiveCategory] = React.useState<string>("all");

  const dialog = Ariakit.useDialogStore({
    setOpen(open) {
      if (!open) {
        combobox.setValue("");
        setActiveCategory("all");
      }
    },
  });

  const visibleCommands = commands.filter((cmd) => {
    const matchesSearch = cmd.label
      .toLocaleLowerCase()
      .includes(searchValue.toLocaleLowerCase());
    const matchesTab =
      activeCategory === "all" || cmd.category === activeCategory;

    return matchesSearch && matchesTab;
  });

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dialog.show();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dialog]);

  return (
    <Ariakit.Dialog store={dialog} portal className="flux-command-palette">
      <Ariakit.ComboboxProvider store={combobox}>
        <Ariakit.Combobox
          autoFocus
          autoSelect
          className="flux-command-palette__input"
          placeholder="Search commands..."
        />

        <Ariakit.TabProvider
          selectedId={activeCategory}
          setSelectedId={(id) => setActiveCategory(id ?? "all")}
        >
          <Ariakit.TabList className="flux-command-palette__tabs">
            <Ariakit.Tab id="all">All</Ariakit.Tab>
            <Ariakit.Tab id="files">Files</Ariakit.Tab>
            <Ariakit.Tab id="actions">Actions</Ariakit.Tab>
            <Ariakit.Tab id="navigation">Navigation</Ariakit.Tab>
          </Ariakit.TabList>
        </Ariakit.TabProvider>

        <Ariakit.ComboboxList className="flux-command-palette__list">
          {visibleCommands.length > 0 ? (
            visibleCommands.map((cmd) => (
              <Ariakit.ComboboxItem
                key={cmd.id}
                className="flux-command-palette__item"
                onClick={() => {
                  cmd.onAction();
                  dialog.hide();
                }}
              >
                <span className="flux-command-palette__item-label">
                  {cmd.label}
                </span>
                {cmd.description && (
                  <span className="flux-command-palette__item-description">
                    {cmd.description}
                  </span>
                )}
              </Ariakit.ComboboxItem>
            ))
          ) : (
            <div className="flux-command-palette__empty">No results</div>
          )}
        </Ariakit.ComboboxList>
      </Ariakit.ComboboxProvider>
    </Ariakit.Dialog>
  );
}
