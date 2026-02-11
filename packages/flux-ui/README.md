# @flux-ui/react

Accessible React components built on Ariakit primitives.

## Installation

```bash
npm install @flux-ui/react
```

**Note:** This package is currently in development and not published to npm.

## Usage

```tsx
import { Button } from "@flux-ui/react";

function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}
```

## Components

### Button

Accessible button component with variants and sizes.

**Props:**

- `variant` - "primary" | "secondary" | "ghost" | "danger" (default: "primary")
- `size` - "sm" | "md" | "lg" (default: "md")
- `isLoading` - boolean (shows loading spinner)
- All native button props (onClick, disabled, etc.)

**Example:**

```tsx
<Button variant="primary" size="lg" onClick={() => console.log("clicked")}>
  Primary Button
</Button>

<Button variant="danger" isLoading>
  Loading...
</Button>
```

## Theming

Flux UI uses CSS variables for theming. Override tokens in your CSS:

```css
:root {
  --flux-color-bg-primary: #7c3aed; /* Purple instead of blue */
  --flux-radius-md: 1rem; /* More rounded corners */
}
```

See [tokens.css](./src/tokens.css) for all available design tokens.

## Documentation

For full documentation and examples, see the [main README](../../README.md).

```

#### 3. LICENSE
```

MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
