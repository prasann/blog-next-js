# DaisyUI Migration Plan

## Overview
Migrate from scattered Tailwind utilities and react-syntax-highlighter to a clean DaisyUI-based design system with rehype-prism-plus for code highlighting.

---

## Phase 1: Install Dependencies & Setup DaisyUI

### 1.1 Install DaisyUI
```bash
npm install daisyui@latest
```

### 1.2 Update tailwind.config.js
- Add DaisyUI to plugins array
- Configure themes (choose dark/light themes or create custom)
- Remove custom typography configuration (DaisyUI will handle it)
- Keep only essential custom colors if needed

**Changes:**
```js
plugins: [
  require("@tailwindcss/typography"),
  require("daisyui"),
],
daisyui: {
  themes: ["night", "winter"], // or custom theme
  darkTheme: "night",
  base: true,
  styled: true,
  utils: true,
}
```

### 1.3 Test DaisyUI Installation
- Create a test page with DaisyUI components
- Verify theme switching works (if multi-theme)
- Confirm build completes without errors

---

## Phase 2: Migrate to rehype-prism-plus

### 2.1 Install rehype-prism-plus
```bash
npm install rehype-prism-plus
npm uninstall react-syntax-highlighter @types/react-syntax-highlighter
```

### 2.2 Update RenderMarkdown.tsx
- Import `rehype-prism-plus`
- Add to rehypePlugins array after rehypeRaw
- Configure options (ignoreMissing: true, showLineNumbers: false by default)

**File:** `src/components/RenderMarkdown.tsx`

### 2.3 Simplify CustomComponentsForMarkdown.tsx
- Remove entire `code()` function (rehype-prism-plus handles it)
- Keep custom `p()` function for images
- Add DaisyUI classes to other elements:
  - `blockquote` → `alert` component
  - `table` → `table table-zebra`
  - `a` → `link link-primary`

**File:** `src/components/utils/CustomComponentsForMarkdown.tsx`

### 2.4 Add Prism Theme CSS
- Download or CDN link prism theme (prism-night-owl for dark, prism-one-light for light)
- Add to `src/styles/` directory
- Import in globals.css or _app.tsx

**Files to create:**
- `src/styles/prism/prism-night-owl.css`
- `src/styles/prism/prism-one-light.css` (optional for light theme)

### 2.5 Add Line Number & Highlight Styles
- Add rehype-prism-plus required CSS to globals.css
- Customize colors to match DaisyUI theme
- Add DaisyUI mockup-code styling for code blocks

**File:** `src/styles/globals.css`

---

## Phase 3: Add Copy-to-Clipboard Functionality

### 3.1 Create CodeBlock Component
- Create wrapper component for `<pre>` elements
- Add copy button with state management
- Style with DaisyUI button classes
- Add hover effects and copied state feedback

**File to create:** `src/components/CodeBlock.tsx`

### 3.2 Integrate CodeBlock into CustomComponentsForMarkdown
- Add `pre()` function that wraps children in CodeBlock
- Preserve className and other props
- Extract language from className for display

**File:** `src/components/utils/CustomComponentsForMarkdown.tsx`

### 3.3 Add Copy Button Styling
- Position button absolutely in top-right
- Add group hover effects
- Style with DaisyUI button variants
- Add icon (optional - can use text or FontAwesome)

---

## Phase 4: Migrate Layout Components to DaisyUI

### 4.1 Update Navigation/Header
- Replace custom classes with DaisyUI `navbar`
- Use `navbar-start`, `navbar-center`, `navbar-end`
- Update button styles to `btn` variants
- Ensure responsive menu works with DaisyUI

**Files to check:**
- `src/components/layout/*`

### 4.2 Update Footer
- Replace custom footer styles with DaisyUI `footer` component
- Use footer sections and typography classes

**Files to check:**
- `src/components/layout/*`

### 4.3 Create Theme Toggle (Optional)
- Add theme switcher using DaisyUI themes
- Use `data-theme` attribute toggling
- Save preference to localStorage
- Add toggle button to navbar

---

## Phase 5: Migrate Blog Components

### 5.1 Update BlogCard Component
- Replace custom card styles with DaisyUI `card`
- Use `card-body`, `card-title`, `card-actions`
- Update hover effects with DaisyUI utilities
- Apply appropriate image handling with `figure`

**File:** `src/components/BlogCard.tsx`

### 5.2 Update PostListItem Component
- Use DaisyUI `card` with `compact` variant
- Replace category tags with `badge` component
- Update spacing with DaisyUI utilities

**File:** `src/components/PostListItem.tsx`

### 5.3 Update GitHubCard Component
- Apply DaisyUI `card` styling
- Use `stat` component for numbers if applicable
- Update icon styling

**File:** `src/components/GitHubCard.tsx`

### 5.4 Update Content Component (Post Display)
- Wrap in DaisyUI `article` with proper spacing
- Replace custom category tags with `badge badge-primary`
- Use DaisyUI `divider` component
- Update header styling with DaisyUI typography

**File:** `src/components/posts/Content.tsx`

### 5.5 Update Engage Component
- Replace custom button styles with DaisyUI `btn` variants
- Update hover effects
- Use DaisyUI link styles

**File:** `src/components/posts/Engage.tsx`

### 5.6 Update FooterCard Component
- Apply DaisyUI card styling
- Update internal spacing and typography

**File:** `src/components/posts/FooterCard.tsx`

---

## Phase 6: Clean Up Global Styles

### 6.1 Update globals.css
- Remove custom `.prose` overrides (DaisyUI handles it)
- Remove custom color utility classes
- Remove custom button/card styles
- Keep only:
  - Font imports
  - Prism theme imports
  - Code block specific styles
  - Essential resets

**File:** `src/styles/globals.css`

### 6.2 Update tailwind.config.js
- Remove custom typography theme extensions
- Remove custom color definitions (use DaisyUI theme colors)
- Remove custom animation utilities (use DaisyUI)
- Keep only truly unique customizations

**File:** `tailwind.config.js`

### 6.3 Clean Up CSS Files
- Review `landing.css` - migrate necessary styles to DaisyUI utilities
- Review `landing-dark.css` - migrate or remove (DaisyUI themes handle this)
- Review `loader.css` - migrate to DaisyUI loading components
- Delete unused CSS files

**Files:**
- `src/styles/landing.css`
- `src/styles/landing-dark.css`
- `src/styles/loader.css`

### 6.4 Remove Prism Old Theme
- Delete `src/styles/prism/themes/prism-atom-dark.css`
- Confirm no imports reference it

---

## Phase 7: Update Prose Styling for Markdown

### 7.1 Configure DaisyUI Prose
- Wrap markdown content in `prose` with DaisyUI theme
- Use `prose-lg` or `prose-xl` for better readability
- Add `max-w-none` to allow full width
- Apply dark mode variants

**File:** `src/components/posts/Content.tsx`

### 7.2 Style Markdown Elements with DaisyUI
- Headings: Use DaisyUI typography scale
- Links: Apply `link link-primary` or `link link-hover`
- Lists: Style with DaisyUI list classes if needed
- Tables: Already handled in CustomComponentsForMarkdown
- Blockquotes: Already handled in CustomComponentsForMarkdown

### 7.3 Test All Markdown Features
- Verify inline code rendering
- Verify fenced code blocks with syntax highlighting
- Verify line numbers work with `showLineNumbers`
- Verify line highlighting works with `{1,3-4}`
- Verify diff blocks work with `diff-js`
- Verify images render correctly
- Verify tables render correctly
- Verify blockquotes render correctly

---

## Phase 8: Update Background & Container Styles

### 8.1 Replace Custom Background Classes
- Remove `.dark-background` and `.light-background`
- Use DaisyUI theme background colors
- Apply `bg-base-100`, `bg-base-200`, `bg-base-300` as needed

**Files:**
- All component files using custom background classes
- `src/styles/globals.css`

### 8.2 Update Gradient Styles
- Replace current gradients with DaisyUI-compatible modern gradients
- Current gradients to update:
  - `.dark-background`: `gray-800 → slate-700 → black` (flat, outdated)
  - `.main-gradient`: `gray-800 → slate-700 → black` (same issue)
  - `.greeting-color` / `.logo-color`: `red-400 → pink-500` (could be more vibrant)
  - `.social-bg`: Similar gray gradient

**Recommended new gradients using DaisyUI theme colors:**

```css
/* Main dark background - more sophisticated with diagonal flow */
.dark-background {
  @apply bg-gradient-to-br from-base-300 via-base-200 to-base-300;
}

/* Header/navigation - subtle progression */
.main-gradient {
  @apply bg-gradient-to-r from-base-300 via-base-200 to-base-100;
}

/* Text gradient - more vibrant, better contrast */
.greeting-color, .logo-color {
  @apply text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500;
}

/* Menu links - enhanced version */
.menu-links {
  @apply text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500 hover:text-green-300 focus:ring-white;
}

/* Social section - more dynamic */
.social-bg {
  @apply bg-gradient-to-br from-base-200 via-base-300 to-base-100;
}
```

**Alternative: Define custom gradient utilities in tailwind.config.js**

```js
theme: {
  extend: {
    backgroundImage: {
      'gradient-dark': 'linear-gradient(to bottom right, var(--fallback-b3,oklch(var(--b3))), var(--fallback-b2,oklch(var(--b2))), var(--fallback-b3,oklch(var(--b3))))',
      'gradient-text': 'linear-gradient(to right, rgb(251, 113, 133), rgb(244, 114, 182), rgb(192, 132, 252))',
      'gradient-header': 'linear-gradient(to right, var(--fallback-b3,oklch(var(--b3))), var(--fallback-b2,oklch(var(--b2))), var(--fallback-b1,oklch(var(--b1))))',
    }
  }
}
```

**Benefits of DaisyUI-integrated gradients:**
- Uses DaisyUI's `base-100/200/300` color variables for consistency
- Automatically adapts when switching DaisyUI themes
- More modern diagonal gradients (`bg-gradient-to-br`) for depth
- More vibrant text gradients for better visual impact
- Better accessibility with higher contrast options

**Files to update:**
- `src/styles/globals.css` - Update `.dark-background`, `.light-background`
- `src/styles/landing-dark.css` - Update all gradient classes
- `tailwind.config.js` - Optional: add custom gradient utilities
- Test all pages to ensure gradients work with DaisyUI theme variables

### 8.3 Update Container Classes
- Replace custom container styles with DaisyUI `container`
- Use DaisyUI spacing utilities (`space-y-*`, `gap-*`)
- Apply DaisyUI responsive utilities

### 8.4 Update Text Color Classes
- Replace custom text colors with DaisyUI semantic colors
- Use `text-base-content`, `text-primary`, `text-secondary`
- Update icon colors to match DaisyUI theme

---

## Phase 9: Testing & Refinement

### 9.1 Visual Regression Testing
- Test homepage rendering
- Test individual blog post pages
- Test all blog posts with various markdown features
- Test on mobile, tablet, desktop breakpoints
- Test dark/light themes (if implemented)

### 9.2 Functionality Testing
- Verify copy button works on all code blocks
- Verify syntax highlighting works for all languages used
- Verify line numbers display correctly
- Verify line highlighting works
- Verify image lazy loading works
- Verify navigation works
- Verify all links work

### 9.3 Performance Testing
- Run `npm run build` and check bundle size
- Compare before/after bundle size
- Verify no console errors
- Check Lighthouse scores
- Verify code splitting works

### 9.4 Accessibility Testing
- Test keyboard navigation
- Verify semantic HTML preserved
- Check color contrast ratios
- Test screen reader compatibility
- Verify ARIA labels where needed

---

## Phase 10: Final Cleanup & Documentation

### 10.1 Remove Dead Code
- Search for unused imports
- Remove commented-out code
- Delete unused utility functions
- Remove unused CSS classes

### 10.2 Update Dependencies
- Remove any other unused dependencies
- Update package.json scripts if needed
- Run `npm audit` and fix vulnerabilities

### 10.3 Git Cleanup
- Review all changed files
- Commit in logical chunks
- Write clear commit messages
- Update README if needed

---

## Files to Modify

### Core Changes
- [ ] `tailwind.config.js` - Add DaisyUI, remove custom config
- [ ] `package.json` - Dependencies changes
- [ ] `src/components/RenderMarkdown.tsx` - Add rehype-prism-plus
- [ ] `src/components/utils/CustomComponentsForMarkdown.tsx` - Simplify & add DaisyUI
- [ ] `src/styles/globals.css` - Clean up & add Prism styles

### New Files
- [ ] `src/components/CodeBlock.tsx` - Copy button component
- [ ] `src/styles/prism/prism-night-owl.css` - Prism theme

### Component Updates
- [ ] `src/components/BlogCard.tsx`
- [ ] `src/components/PostListItem.tsx`
- [ ] `src/components/GitHubCard.tsx`
- [ ] `src/components/TalkListItem.tsx`
- [ ] `src/components/posts/Content.tsx`
- [ ] `src/components/posts/Engage.tsx`
- [ ] `src/components/posts/FooterCard.tsx`
- [ ] `src/components/layout/*` (all layout components)

### Files to Review/Delete
- [ ] `src/styles/landing.css`
- [ ] `src/styles/landing-dark.css`
- [ ] `src/styles/loader.css`
- [ ] `src/styles/prism/themes/prism-atom-dark.css`

---

## Success Criteria

- [ ] All pages render correctly with DaisyUI styling
- [ ] Code blocks have syntax highlighting via rehype-prism-plus
- [ ] Copy button works on all code blocks
- [ ] Line numbers and highlighting work when specified in markdown
- [ ] Bundle size reduced or similar to before
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] All tests pass (if any)
- [ ] Mobile responsive design maintained
- [ ] Accessibility standards maintained
- [ ] Build completes successfully
- [ ] No custom CSS duplicating DaisyUI functionality

---

## Notes

- Work incrementally - commit after each phase
- Test thoroughly after Phases 2, 5, and 7
- Keep old components temporarily during migration
- Can implement dark/light theme toggle in Phase 4.3 if desired
- Consider creating a custom DaisyUI theme if brand colors are important
- Backup current styling before starting if needed
