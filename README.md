# Flux UI

A production-ready, accessible component library built on [Ariakit](https://ariakit.org/) primitives.

## 🚧 Status

**In Development** - This project is not yet ready for production use.

## 📦 Project Structure

```
flux-ui/
├── packages/
│   └── flux-ui/          # Main component library
│       ├── src/          # Component source code
│       └── dist/         # Build output (generated)
└── playground/           # Development playground
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm 7+

### Setup

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run playground for development
npm run playground
```

## 📚 Components

### Currently Available

- **Button** - Accessible button with variants (primary, secondary, ghost, danger) and sizes (sm, md, lg)

### Coming Soon

- Link
- SearchCombobox
- Menu
- Form components
- Dialog
- CommandPalette

## 🎨 Design System

Flux UI uses a token-based design system with CSS variables. See `src/tokens.css` for the complete design token reference.

## 🏗️ Built With

- [React](https://react.dev/) - UI framework
- [Ariakit](https://ariakit.org/) - Accessible component primitives
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [class-variance-authority](https://cva.style/) - Variant management

## 📄 License

MIT

## 🙏 Acknowledgments

- [Ariakit](https://ariakit.org/) for the amazing accessible component primitives
- The React community for best practices and patterns
