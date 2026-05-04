---
name: Technical Precision
colors:
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#44474d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#75777e'
  outline-variant: '#c4c6ce'
  surface-tint: '#4d5f7d'
  primary: '#000615'
  on-primary: '#ffffff'
  primary-container: '#0b1f3a'
  on-primary-container: '#7587a7'
  inverse-primary: '#b5c7ea'
  secondary: '#30628d'
  on-secondary: '#ffffff'
  secondary-container: '#9fceff'
  on-secondary-container: '#245882'
  tertiary: '#0b0600'
  on-tertiary: '#ffffff'
  tertiary-container: '#2a1d00'
  on-tertiary-container: '#a88124'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b5c7ea'
  on-primary-fixed: '#071c36'
  on-primary-fixed-variant: '#364764'
  secondary-fixed: '#cfe5ff'
  secondary-fixed-dim: '#9ccbfc'
  on-secondary-fixed: '#001d33'
  on-secondary-fixed-variant: '#104a74'
  tertiary-fixed: '#ffdea0'
  tertiary-fixed-dim: '#eec05e'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#fcf8fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.05'
    letterSpacing: -0.02em
  headline-h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-large:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-main:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  technical-data:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  technical-label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-page: 48px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

The design system for Alventor is rooted in the concepts of engineering rigor and industrial excellence. The visual language is **Corporate / Modern** with a strong infusion of **Minimalism**. It aims to evoke a sense of absolute control, reliability, and international reach. 

The aesthetic avoids "marketing fluff," opting instead for a technical atmosphere that mimics high-end instrumentation. Whitespace is used not just for aesthetics, but as a functional tool to separate complex data streams. The interface should feel like a high-performance tool in the hands of an expert: silent, efficient, and precise.

## Colors

The palette is anchored by **Navy Alventor**, providing a deep, authoritative foundation. **Technical White** serves as the primary canvas, ensuring a high-contrast, clean environment that facilitates readability. 

**Steel Blue** and **Engineering Gold** are utilized for technical accents, hierarchy, and premium call-outs. Functional colors are reserved strictly for system status and data validation. Carbon is the primary color for body text to reduce eye strain while maintaining maximum legibility against the light background.

## Typography

This design system employs a unified typeface strategy using **Inter**. Inter is used for all narrative, structural, and technical elements; its neutral, geometric proportions suggest modern industrial efficiency and clarity.

Headlines should maintain tight line spacing and slight negative letter-spacing to feel "locked-in" and sturdy. Technical labels and data points use medium to bold weights of Inter to ensure they are always legible, often paired with subtle dividers to emphasize a tabular, organized feel.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy to maintain structural integrity across international viewports. A 12-column grid is standard, with generous 48px page margins that frame the content like a technical drawing.

Spacing is based on a 4px baseline, ensuring all elements align with mathematical precision. Use large gaps between major sections to prevent information density from becoming overwhelming. Content should be grouped logically into "data modules" that can be easily scanned.

## Elevation & Depth

To maintain a sober and technical feel, the design system avoids heavy shadows. Depth is primarily communicated through **Tonal Layers** and **Low-Contrast Outlines**.

- **Level 0 (Background):** Technical White.
- **Level 1 (Cards/Modules):** Container surfaces with a 1px border in a very light grey or Steel Blue at 10% opacity.
- **Level 2 (Active States):** Subtle Engineering Gold accents or hair-line borders.
- **Interaction:** Shadows are only used on floating menus or modals, employing a very soft, diffused Navy tint with 5% opacity to avoid a "heavy" digital feel.

## Shapes

The shape language is **Rounded (0.5rem)**. This rounding takes the edge off the industrial aesthetic, providing a modern, professional feel without losing the structural integrity of the brand. This level of roundedness (variable level 2) is applied consistently to buttons, inputs, and cards to suggest precision manufacturing.

## Components

### Buttons
Primary buttons use **Navy Alventor** with white text. Secondary buttons use a Steel Blue outline. Button shapes are consistent with the `roundedness: 2` variable (0.5rem). For high-level technical actions, an **Engineering Gold** accent may be used on the hover state.

### Technical Chips
Data tags and status indicators utilize **Inter** in semi-bold weights. They are styled with light background tints of their respective functional colors (e.g., light red for alerts) and a 1px border.

### Input Fields
Fields are defined by a subtle 1px outline in a neutral grey. Labels use the `technical-label` typography style, positioned above the field for maximum clarity. The corner radius is consistent at 0.5rem.

### Cards
Cards are flat, defined by a 1px border (#E5E7EB) rather than shadows. They should contain clear internal gutters and use the technical grid to organize data points, maintaining a corner radius of 0.5rem (DEFAULT) or 1rem (lg) for larger containers.

### Additional Components
- **Data Tables:** High-density grids using Inter for numerical values, featuring sticky headers and row-hover highlights in Steel Blue (5% opacity).
- **Status Bars:** Slim, linear indicators used at the top of cards to show progress or health metrics using Engineering Gold.
