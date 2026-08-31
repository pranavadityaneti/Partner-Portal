# Partner Portal

Sign-up and verification screen for Partner Portal. Apply for a loan in minutes
and get funds in your account within 48 hours.

> **Status:** this is a UI implementation only. The form is presentational —
> inputs hold no state, nothing is validated, and **"Get OTP" does not yet do
> anything**. There is no backend, no authentication and no OTP flow.

## Features
- **Responsive split-panel layout** — testimonial panel on wide screens,
  full-width form on tablet and mobile.
- **Animated testimonial carousel** — auto-advances every 5s, with manual
  previous/next controls.
- **Animated loan-type marquee** — continuously scrolling category strip.
- **Accessible by default** — labels associated with their inputs, accessible
  names on icon-only buttons, and all text meeting WCAG AA contrast (4.5:1).
- **Typography** — Urbanist, a geometric sans.

## Tech Stack
- React 19
- TypeScript
- Vite 6
- MUI 9 (`@mui/material`) with Emotion
- Motion (`motion/react`) for animation
- Lucide React (icons)

## Getting Started

Requires Node 18+.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server (http://localhost:3000):
   ```bash
   npm run dev
   ```

3. Type-check:
   ```bash
   npm run lint
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
  main.tsx     App entry — ThemeProvider + CssBaseline
  App.tsx      The entire screen (single component)
  theme.ts     MUI theme: palette, typography, radii, component overrides
  index.css    Google Fonts import for Urbanist
```

### Theming

All design tokens live in `src/theme.ts` — palette, typography scale, the four
corner radii and per-component overrides. Change colours and spacing there
rather than in `App.tsx`.

Two things in the theme are deliberate and worth knowing before you edit it:

- **Breakpoints are 640 / 768 / 1024 / 1280**, not MUI's defaults
  (600/900/1200/1536). Changing them will shift every responsive rule.
- **`primary.main` (`#EA580C`) is for decorative use only** — the logo, focus
  ring and icon circles. It fails WCAG AA for text (3.56:1). Text and the
  primary CTA use `primary.dark` (`#C2410C`, 5.18:1). Keep that split when
  adding new UI.

## Known gaps

- The form is non-functional; inputs have no `name` or `autoComplete`
  attributes, so form data will not serialise and browser autofill will not
  engage.
- Animations do not honour `prefers-reduced-motion`.
- `@google/genai`, `express`, `dotenv` and `autoprefixer` are unused
  dependencies left over from the original scaffold.
