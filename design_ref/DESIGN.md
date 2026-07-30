---
name: Precision Fintech Systems
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#ad0033'
  on-tertiary: '#ffffff'
  tertiary-container: '#d22348'
  on-tertiary-container: '#ffecec'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000d'
  on-tertiary-fixed-variant: '#92002a'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  data-lg:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  data-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: '0'
  data-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is engineered for the high-stakes environment of fintech, specifically tailored for startup founders who demand immediate clarity and technical precision. The aesthetic is a fusion of **Minimalism** and **Modern SaaS** sensibilities, drawing inspiration from industry leaders like Stripe and Linear.

The brand personality is authoritative yet approachable, prioritizing functional density over decorative flair. The emotional response is one of "calm control"—achieved through expansive whitespace, rigorous alignment, and a sophisticated interplay between humanist sans-serif type and technical monospaced numerals. The UI feels like a high-performance instrument: reliable, fast, and transparent.

## Colors

The palette is anchored by a pristine **White (#FFFFFF)** background to maximize "breathability" and focus. **Slate-900 (#0F172A)** serves as the primary ink for text, providing high-contrast legibility.

**Blue-600 (#2563EB)** is the primary action color, used for CTA buttons, active states, and focus indicators. Functional signaling is handled by **Emerald-500 (#10B981)** for positive financial growth and profit, and **Rose-500 (#F43F5E)** for loss, alerts, or critical negative trends. Subtle shades of Slate (100-300) are reserved for borders and secondary text to maintain a hierarchy that emphasizes data over chrome.

## Typography

This design system utilizes a dual-font strategy to separate interface semantics from quantitative data. 

**Inter** is the primary typeface for all UI labels, navigation elements, and body copy. It is selected for its exceptional legibility and neutral, professional tone. **JetBrains Mono** is strictly reserved for numeric values, currency, and data tables. This monospaced choice ensures that numbers align perfectly in vertical columns, facilitating quick financial comparison and reducing cognitive load during audit-like tasks.

Headlines use tighter tracking (-0.01em to -0.02em) to appear more cohesive, while small labels use uppercase with slight letter spacing for a structured, architectural feel.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for dashboard views to maintain a consistent information density, transitioning to a fluid model for internal content areas. The standard container is capped at 1280px to prevent excessive line lengths on ultrawide monitors.

Spacing is based on a **4px base unit**. Generous internal padding (24px or 32px) within cards and sections is mandatory to evoke the high-end SaaS aesthetic. 
- **Desktop:** 12-column grid, 24px gutters, 40px outer margins.
- **Tablet:** 8-column grid, 16px gutters, 24px outer margins.
- **Mobile:** 4-column grid, 16px gutters, 16px outer margins. Content should stack vertically, with data tables converting to summary cards.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layering** rather than heavy borders. The background is `#FFFFFF`, and elevated elements like cards or modals use a multi-layered shadow for a soft, natural lift.

- **Level 0 (Surface):** `#FFFFFF` - The main canvas.
- **Level 1 (Cards/Inputs):** `#FFFFFF` with a 1px border of `#E2E8F0` and a subtle shadow (0 1px 3px rgba(15, 23, 42, 0.08)).
- **Level 2 (Popovers/Dropdowns):** A more pronounced shadow (0 10px 15px -3px rgba(15, 23, 42, 0.1)) to indicate clear separation from the data layer.
- **Interactive States:** On hover, cards should subtly lift by increasing shadow depth and slightly shifting the border color to a more saturated blue-gray.

## Shapes

The shape language is defined by **Rounded (0.5rem / 8px)** base corners for standard components like inputs and buttons. However, to achieve the specific "SaaS Dashboard" look requested, large containers and dashboard cards utilize a `rounded-xl` (1.5rem / 24px) or `rounded-lg` (1rem / 16px) corner radius.

This creates a friendly, modern silhouette that contrasts against the rigid, monospaced data inside. Buttons should remain at the standard `rounded-md` (8px) to maintain a sense of functional sturdiness.

## Components

### Buttons
Primary action buttons use a solid **Blue-600** background with white text. Secondary buttons use a white background with a **Slate-200** border. All buttons use 8px corner radius and Inter Semi-bold 14px.

### Cards
Dashboard cards are the primary container. They must feature a 16px corner radius, a 1px border in `#E2E8F0`, and 24px of internal padding. Titles should be Inter 14px Medium in Slate-500.

### Input Fields
Inputs use a white background, 8px corner radius, and a 1px Slate-200 border. On focus, the border transitions to Blue-600 with a 2px soft blue outer glow.

### Data Tables
Rows have a minimum height of 48px. Header labels are Inter 12px Bold/Caps. Cell data must use **JetBrains Mono** for numerical accuracy. Use a subtle `#F8FAFC` background on hover to highlight the active row.

### Chips/Badges
Small, low-profile badges for status. 
- **Success:** Emerald-50 background at 10% opacity with Emerald-600 text.
- **Critical:** Rose-50 background at 10% opacity with Rose-600 text.
- Roundedness should be set to full (pill) for status badges.

### Financial Sparklines
Use 2px stroke width. Emerald-500 for upward trends and Rose-500 for downward trends. No fill gradient unless specifically requested for "Area" charts.