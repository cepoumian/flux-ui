import * as React from "react";
import * as Ariakit from "@ariakit/react";
import {
  comboboxInputVariants,
  ComboboxInputVariants,
} from "./search-combobox.styles";
import "../tokens.css";
import "./search-combobox.css";

export interface SearchComboboxItem {
  id: string;
  label: string;
  description?: string;
}

export interface SearchComboboxProps extends ComboboxInputVariants {
  items: SearchComboboxItem[];
  placeholder?: string;
  onSelect?: (item: SearchComboboxItem) => void;
}

export const SearchCombobox = React.forwardRef<
  HTMLInputElement,
  SearchComboboxProps
>(function SearchCombobox({ items, placeholder, onSelect, size }, ref) {
  const [search, setSearch] = React.useState("");

  const matches = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Ariakit.ComboboxProvider value={search} setValue={setSearch}>
      <div className="flux-combobox">
        <Ariakit.Combobox
          ref={ref}
          placeholder={placeholder}
          className={comboboxInputVariants({ size })}
        />
        <Ariakit.ComboboxPopover className="flux-combobox__popover">
          {matches.length > 0 ? (
            matches.map((item) => (
              <Ariakit.ComboboxItem
                key={item.id}
                value={item.label}
                className="flux-combobox__item"
                onClick={() => onSelect?.(item)}
              >
                <span className="flux-combobox__item-label">{item.label}</span>
                {item.description && (
                  <span className="flux-combobox__item-description">
                    {item.description}
                  </span>
                )}
              </Ariakit.ComboboxItem>
            ))
          ) : (
            <div className="flux-combobox__empty">No results</div>
          )}
        </Ariakit.ComboboxPopover>
      </div>
    </Ariakit.ComboboxProvider>
  );
});
