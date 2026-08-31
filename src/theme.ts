import { createTheme } from '@mui/material/styles';

/**
 * Design tokens extracted from the original Tailwind v4 implementation by
 * reading computed styles off the running page and the compiled stylesheet,
 * so these are measured values rather than approximations.
 *
 * Note: Tailwind v4's grey ramp is oklch-derived and differs from v3's
 * classic hex values (e.g. gray-700 is #364153, not #374151).
 */

const brand = {
  main: '#EA580C', // primary orange — decorative use only (logo, focus ring, icon circles)
  dark: '#C2410C', // text + CTA orange: 5.18:1 on white, passes WCAG AA
  darker: '#9A3412', // CTA hover: 7.31:1
  light: '#FB923C', // offset circle behind loan-type icons
} as const;

/**
 * #EA580C fails WCAG AA for text (3.56:1 against white, where 4.5 is
 * required) both as link colour and as the CTA background behind white
 * text. Text and the CTA therefore use brand.dark, which was already the
 * hover shade; hover steps down to brand.darker, already present in the
 * panel gradient. Decorative orange is unchanged — it carries no text and
 * clears the 3:1 non-text threshold.
 */

const grey = {
  50: '#F9FAFB',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DC',
  400: '#99A1AF',
  500: '#6A7282',
  600: '#4A5565',
  700: '#364153',
  800: '#1E2939',
  900: '#101828',
} as const;

export const surface = {
  page: '#F8F9FC', // right panel background
  field: '#F9FAFB', // resting input fill
} as const;

/** Tailwind shadow-sm / shadow-lg, verified against the compiled CSS. */
export const shadow = {
  sm: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
  lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
} as const;

/** Radii, in px. Tailwind: xl=12 2xl=16 3xl=24, plus a bespoke 32. */
export const radius = {
  field: 12,
  arrow: 16,
  card: 24,
  panel: 32,
} as const;

const fontFamily = "'Urbanist', ui-sans-serif, system-ui, sans-serif";

const theme = createTheme({
  // Tailwind's breakpoints, NOT MUI's defaults (600/900/1200/1536).
  // Overriding these keeps every responsive rule at its original threshold.
  breakpoints: {
    values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 },
  },

  palette: {
    primary: { main: brand.main, dark: brand.dark, light: brand.light, contrastText: '#FFFFFF' },
    // grey[400] failed AA (2.60 on white, 2.49 on the field fill); grey[500]
    // reaches 4.84 / 4.63 and is already used for the subtitle and footer.
    // (see placeholder + encryption-line overrides below)
    grey,
    text: { primary: grey[900], secondary: grey[500] },
    divider: grey[100],
    background: { default: surface.page, paper: '#FFFFFF' },
  },

  shape: { borderRadius: radius.field },

  typography: {
    fontFamily,
    // Tailwind's preflight sets line-height 1.5 globally; match it so text
    // metrics stay identical.
    h1: { fontSize: 32, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.5 },
    h2: { fontSize: 24, fontWeight: 400, letterSpacing: '0.025em', lineHeight: 1.375 },
    h3: { fontSize: 20, fontWeight: 700, lineHeight: 1.4 }, // Tailwind text-xl
    body1: { fontSize: 16, lineHeight: 1.5 },
    body2: { fontSize: 14, lineHeight: 1.5 },
    // lineHeight 1.5 matches Tailwind's preflight. MUI's default of 1.75
    // made the submit button 56px tall instead of 52px.
    button: { fontSize: 16, fontWeight: 500, textTransform: 'none', lineHeight: 1.5 },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { fontFamily, backgroundColor: '#FFFFFF' },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: true },
      styleOverrides: {
        root: { borderRadius: radius.field, textTransform: 'none', fontWeight: 500 },
        // MUI v9 removed colour-specific slots (containedPrimary); this app
        // has a single contained CTA, so scoping by variant is sufficient.
        contained: {
          boxShadow: shadow.sm,
          padding: '14px 16px',
          backgroundColor: brand.dark,
          '&:hover': { boxShadow: shadow.sm, backgroundColor: brand.darker },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: radius.field,
          backgroundColor: surface.field,
          transition: 'background-color .15s, box-shadow .15s, border-color .15s',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: grey[200], borderWidth: 1 },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: grey[200] },
          // Reproduces `focus:bg-white focus:border-[#EA580C] focus:ring-2`.
          // MUI thickens the outline to 2px on focus; Tailwind kept 1px and
          // added a separate ring, so hold the border at 1px and draw the
          // ring as a box-shadow instead.
          '&.Mui-focused': {
            backgroundColor: '#FFFFFF',
            boxShadow: `0 0 0 2px ${brand.main}`,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: brand.main, borderWidth: 1 },
          },
        },
        input: {
          // 13/17 rather than 12/16: MUI's notched outline is an absolutely
          // positioned fieldset that adds no layout height, so the original
          // 1px border is absorbed into the padding. Keeps the field at 50px
          // and the text at the same offset from the outer edge.
          padding: '13px 17px',
          fontSize: 16,
          lineHeight: 1.5,
          // MUI pins the input to height:1.4375em (23px), which overrides
          // line-height and left the field 1px short of the original 50px.
          height: '24px',
          color: grey[900],
          '&::placeholder': { color: grey[500], opacity: 1 }, // grey[400] was 2.49:1
        },
      },
    },

    MuiCheckbox: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          padding: 0,
          color: grey[300],
          '&.Mui-checked': { color: brand.main },
          // MUI's size="small" renders a 20px glyph; the original was
          // w-4 h-4 (16px). SvgIcon scales from font-size.
          '& svg': { fontSize: 16 },
        },
      },
    },

    MuiLink: {
      defaultProps: { underline: 'none' },
      styleOverrides: {
        root: { fontWeight: 500, '&:hover': { textDecoration: 'underline' } },
      },
    },
  },
});

export default theme;
