# CSS & Theming Cleanup Plan

A collaborative checklist for cleaning up and improving CSS/theming in the blog-next-js project.

**Current Issues Identified:**
- Multiple CSS files with overlapping gradient/color definitions
- Hardcoded colors scattered across 20+ components (pink-400, gray-800, green-600, etc.)
- No systematic theme switching (currently hardcoded to "dark")
- Mixed styling approaches (CSS classes + Tailwind + inline colors)

---

## Phase 1: Audit & Consolidate Styles ✅ COMPLETE
- [x] **AUDIT**: Inventory all hardcoded colors in components (`text-pink-400`, `bg-gray-800`, etc.)
- [x] **CONSOLIDATE**: Extract color palette from both CSS and component usage
- [x] **DECIDE**: Keep Tailwind as primary approach, use CSS variables for theme colors
- [x] **CLEAN**: Remove unused CSS (`landing.css` - appears to have light theme styles)
- [x] **MERGE**: Consolidate gradient definitions from `globals.css` and `landing-dark.css`
- [x] **CENTRALIZE**: Define semantic color mapping in `tailwind.config.js` (use daisyUI colors)
- [x] **ORGANIZE**: Keep `loader.css` and `prism-atom-dark.css` as-is (specialized functionality)

## Phase 2: Implement DaisyUI Theme System ⚡ IN PROGRESS
- [x] **INSTALL**: Add daisyUI Tailwind plugin
- [x] **CONFIGURE**: Enable daisyUI in `tailwind.config.js` with selected themes
- [x] **SELECT**: Choose 2 themes from daisyUI's 29+ presets (e.g., `dark` and `light`, or `dracula` and `corporate`)
- [x] **IMPLEMENT**: Simple theme switching with `data-theme` attribute (admin/dev control)
- [ ] **REPLACE**: Update `landing-dark.css` classes to use daisyUI semantic colors
- [ ] **CONFIGURE**: Set default theme in app configuration
- [x] **REMOVE**: Take out hardcoded `className="dark"` from `index.tsx`

## Phase 3: Refactor Component Colors ✅ COMPLETE
- [x] **SEMANTIC**: Replace hardcoded colors with daisyUI semantic classes (e.g., `text-primary`, `bg-base-100`)
- [x] **SYSTEMATIC**: Update all 20+ components with hardcoded colors found in audit
- [x] **CONSISTENT**: Ensure all gradients use the same color variables ✅ (consolidated in globals.css)
- [x] **CLEAN**: Remove component-specific color classes that duplicate theme colors ✅ (removed unused landing.css)

## Phase 4: Theme Selection & Refinement
- [ ] **EXPLORE**: Test different daisyUI theme combinations to find perfect fit
- [ ] **CUSTOMIZE**: Fine-tune chosen themes if needed (modify specific colors)
- [ ] **TOGGLE**: Implement simple admin theme switching (no user persistence)
- [ ] **DEFAULT**: Set blog default theme
- [ ] **GLOBAL**: Ensure theme changes apply to all visitors

## Phase 5: Polish & Maintain
- [ ] **TEST**: Verify theme switching works across all pages/components
- [ ] **PERFORMANCE**: Check for theme flashing/hydration issues
- [ ] **CLEANUP**: Remove any remaining unused CSS
- [ ] **DOCUMENT**: Add theme usage documentation
- [ ] **LINT**: Add CSS/theme linting rules if needed

---

**Recommended Approach**: Use daisyUI for professional color themes! Since you prefer not to choose colors manually, daisyUI's 29+ preset themes will give you beautiful, professionally designed palettes. Simply pick 2 themes you like (e.g., "dark" + "corporate" or "dracula" + "winter") and you're done!
