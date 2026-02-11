# Contributing to Flux UI

This is a learning project. While contributions are welcome, please note this is primarily an educational endeavor.

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run playground: `npm run playground`
4. Make changes to components in `packages/flux-ui/src/`

## Component Guidelines

All components should:

- Use Ariakit primitives as a foundation
- Follow accessibility best practices
- Use design tokens from `tokens.css`
- Include TypeScript types
- Forward refs properly
- Accept all native HTML props

## Code Style

- Use named functions in `forwardRef`
- Prefer `interface` over `type`
- Import CSS in component files
- Use semantic variable names

## Questions?

Open an issue or discussion!
