# Partner Portal — Session Log

## 2026-08-31 — Tailwind → MUI migration (**merged to `main`**)

**Goal:** rebuild the sign-up screen on MUI instead of Tailwind, preserving the
design exactly, and fix the broken tablet layout.

**Decisions taken (Pranav):**
- Full swap to MUI — remove Tailwind entirely, not a hybrid.
- Match the existing design exactly rather than adopt Material defaults.
- Fix the tablet layout rather than faithfully reproduce the broken one.

### Commits
| SHA | Task | What |
|---|---|---|
| `4a2ece3` | 2 | MUI 9.4.0 + Emotion; committed the previously-missing lockfile |
| `233d65c` | 3 | Declared `@types/react` / `@types/react-dom` |
| `a8b6871` | 4 | `src/theme.ts` + ThemeProvider (no CssBaseline yet) |
| `df1eec2` | 5 | Rewrote `App.tsx` in MUI; fixed responsive layout |
| `047e1c4` | 6 | Removed Tailwind, added CssBaseline |
| `71d2d6a` | 7 | Checkbox 20px -> 16px (audit finding) |
| `bd29833` | — | All text contrast raised to WCAG AA |
| `f82df32` | — | README corrected to match the code |

### Merged
PR #1 <https://github.com/pranavadityaneti/Partner-Portal/pull/1> merged
2026-08-31 12:54 UTC as merge commit `646205d`. A **merge commit, not a squash**
— the individual messages carry the reasoning (why the font import broke, why
`primary.main` is decorative-only, why input padding is 13/17) and squashing
would have flattened it.

`main` went from `a603bdb` to `646205d` (12 commits). The
`feat/mui-migration` branch was left on the remote as a safety net, not deleted.

**Post-merge verification on a clean checkout of `main`** (deleted
`node_modules` and `dist` first): `npm ci` from the committed lockfile
succeeded with 0 vulnerabilities — which validates the lockfile that the repo
previously lacked; `tsc --noEmit` and `npm run build` both exit 0; 9/9 rendered
checks pass (Urbanist loads, docH 1071, input 50px, button 52px, CTA
rgb(194,65,12), checkbox 16px, panel 640px, header 80px, footer 64px).

**Deploy status unknown.** The repo has no CI, no `vercel.json` and no
`.vercel`, but a Vercel project can be linked entirely through the dashboard
with nothing in the repo — so whether this merge triggered a production deploy
could not be determined from here. Check the Vercel dashboard.

### Findings worth remembering
1. **`tsc --noEmit` was a no-op for React.** No `@types/react` was installed and
   tsconfig has neither `strict` nor `noImplicitAny`, so TS typed every React
   import as `any` and exited 0 while checking nothing. Fixed in `233d65c`;
   verified with a deliberate-error probe.
2. **Urbanist never loaded.** The Google Fonts `@import` sat after
   `@import "tailwindcss"`, so the browser discarded it per spec. The app ran on
   the system fallback while the README advertised Urbanist. Fixed as a
   side-effect of removing Tailwind (`047e1c4`).
3. **The responsive bug spanned 768–1279px, not just 768px.** Phone field was
   32px wide at 768px and 69px at 1024px. 1024px was *worse* than 900px.
4. **MUI v9 API changes** caught by the typecheck: `Stack` no longer accepts
   `alignItems`/`justifyContent` as props (use `sx`); `Checkbox` uses
   `slotProps`, not `inputProps`.
5. **Tailwind v4's grey ramp is oklch-derived** and differs from v3
   (`gray-700` = `#364153`, not `#374151`). Tokens were measured, not recalled.

### Bundle
| | baseline | after | delta |
|---|---|---|---|
| JS (gzip) | 108.48 kB | 163.04 kB | +54.56 |
| CSS (gzip) | 4.57 kB | 0.11 kB | −4.46 |
| **Total** | **113.42 kB** | **163.52 kB** | **+50.10 (+44%)** |

### Task 7 — adversarial audit (done)
Verified good: all 5 labels wired via htmlFor/id; checkbox `id` lands on the
real input; all 13 interactive elements keyboard-reachable; arrow buttons have
aria-labels; no horizontal overflow at 320px; **production console completely
clean** (zero errors/warnings); Urbanist loads; 8/8 layout metrics match.

Fixed during audit (`71d2d6a`): checkbox rendered 20px (MUI size="small")
against the original's 16px.

False alarm worth recording: the input focus ring looked broken in every
measurement AND in screenshots. It is correct. The Browser pane does not
composite, so CSS transitions never advance, and background-color/box-shadow
were frozen at their start values. Border-color changed instantly because it
sits on a descendant with no transition. Re-measured with `transition: none`
and the cascade is right. **When auditing CSS in this pane, disable transitions
before measuring.**

This bit twice: post-merge, the testimonial card screenshotted blank. The text
was in the DOM at `opacity: 0` with its transform frozen mid-flight — the same
non-compositing pane stalling a motion animation, not a regression. Verify
animated UI by reading the DOM, never from a screenshot of this pane.

### Contrast + README (done, after the audit)
- `bd29833` — all four AA failures fixed using colours already in the design:
  CTA and links #EA580C -> #C2410C (3.56 -> 5.18); encryption line and
  placeholders #99A1AF -> #6A7282 (2.60/2.49 -> 4.84/4.63). CTA hover steps to
  #9A3412. **`primary.main` is now decorative-only** (logo, focus ring, icon
  circles); text and the CTA use `primary.dark`. Keep that split.
  Verified 8/8 text elements pass AA; document height unchanged (1071px).
  MUI v9 removed colour-specific slots, so the override targets `contained`,
  not `containedPrimary`.
- `f82df32` — README rewritten; it had claimed React 18 + Tailwind + Framer
  Motion and an "OTP-based authentication flow" that does not exist.

### Open threads — pre-existing, NOT fixed (need a decision)
- Heading order: `h2` (panel) precedes `h1` (form) in the DOM.
- Inputs have no `name` and no `autocomplete` — form data will not serialise
  and browser autofill will not engage.
- No `prefers-reduced-motion` handling: the loan marquee loops forever and
  testimonials auto-advance every 5s.
- Page `<title>` is still "My Google AI Studio App".
- README states "React 18" and "Tailwind CSS" — both now wrong.
- Two hardcoded hex values remain in App.tsx (`#101828` OffsetIcon, `#99A1AF`
  search icon). lucide takes a colour string, not a theme token, so these will
  not follow palette changes.
- Vite warns the JS chunk exceeds 500 kB (single chunk, no code splitting).

### Other open threads
- Form is still non-functional — no input state, no validation, "Get OTP" does
  nothing. Out of scope for the migration; separate decision.
- `tsconfig.json` has `strict` off. Turning it on would harden the project but
  may surface pre-existing errors.
- Dead deps untouched: `@google/genai`, `express`, `dotenv`, `autoprefixer`.
