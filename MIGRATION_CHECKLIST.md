# DaisyUI Migration Checklist

## Phase 1: Install DaisyUI & Setup ✅
- [x] Install daisyui package: `npm install daisyui@latest`
- [x] Update `tailwind.config.js`:
  - [x] Add DaisyUI to plugins array
  - [x] Configure themes (night/winter)
  - [x] Set darkTheme to "night"
- [x] Test build: `npm run build`
- [x] Verify no errors

## Phase 2: Migrate to rehype-prism-plus ✅
- [x] Install rehype-prism-plus: `npm install rehype-prism-plus`
- [x] Uninstall old packages: `npm uninstall react-syntax-highlighter @types/react-syntax-highlighter`
- [x] Update `src/components/RenderMarkdown.tsx`:
  - [x] Import rehype-prism-plus
  - [x] Add to rehypePlugins array
- [x] Update `src/components/utils/CustomComponentsForMarkdown.tsx`:
  - [x] Remove `code()` function
  - [x] Add DaisyUI classes to blockquote (alert)
  - [x] Add DaisyUI classes to table (table-zebra)
  - [x] Add DaisyUI classes to links (link-primary)
- [x] Create `src/styles/prism/prism-night-owl.css`
- [x] Import Prism theme in globals.css
- [x] Add rehype-prism-plus required CSS to globals.css
- [x] Test syntax highlighting on sample post

## Phase 3: Add Copy-to-Clipboard ✅
- [x] Create `src/components/CodeBlock.tsx`:
  - [x] Add copy button with state management
  - [x] Style with DaisyUI button classes
  - [x] Add hover effects and copied state feedback
- [x] Update `src/components/utils/CustomComponentsForMarkdown.tsx`:
  - [x] Add `pre()` function wrapping CodeBlock
  - [x] Extract language from className
- [x] Test copy button functionality

## Phase 4: Migrate Layout Components 🏗️
- [ ] Update Navigation/Header:
  - [ ] Replace with DaisyUI navbar component
  - [ ] Use navbar-start, navbar-center, navbar-end
  - [ ] Update buttons to btn variants
- [ ] Update Footer:
  - [ ] Replace with DaisyUI footer component
  - [ ] Use footer sections and typography
- [ ] Optional: Add theme toggle with localStorage

## Phase 5: Migrate Blog Components 📝
- [ ] Update `src/components/BlogCard.tsx`:
  - [ ] Replace with DaisyUI card
  - [ ] Use card-body, card-title, card-actions
- [ ] Update `src/components/PostListItem.tsx`:
  - [ ] Use DaisyUI card compact variant
  - [ ] Replace category tags with badge component
- [ ] Update `src/components/GitHubCard.tsx`:
  - [ ] Apply DaisyUI card styling
- [ ] Update `src/components/posts/Content.tsx`:
  - [ ] Wrap in DaisyUI article
  - [ ] Replace category tags with badge badge-primary
  - [ ] Use DaisyUI divider component
- [ ] Update `src/components/posts/Engage.tsx`:
  - [ ] Replace buttons with DaisyUI btn variants
- [ ] Update `src/components/posts/FooterCard.tsx`:
  - [ ] Apply DaisyUI card styling

## Phase 6: Clean Up Global Styles 🧹
- [ ] Update `src/styles/globals.css`:
  - [ ] Remove custom .prose overrides
  - [ ] Remove custom color utilities
  - [ ] Remove custom button/card styles
  - [ ] Keep only fonts, Prism imports, essential resets
- [ ] Update `tailwind.config.js`:
  - [ ] Remove custom typography theme extensions
  - [ ] Remove custom color definitions
  - [ ] Remove custom animation utilities
- [ ] Review `src/styles/landing.css` - migrate or delete
- [ ] Review `src/styles/landing-dark.css` - migrate or delete
- [ ] Review `src/styles/loader.css` - migrate or delete
- [ ] Delete `src/styles/prism/themes/prism-atom-dark.css`

## Phase 7: Update Prose Styling 📖
- [ ] Update `src/components/posts/Content.tsx`:
  - [ ] Wrap markdown in prose with DaisyUI theme
  - [ ] Use prose-lg or prose-xl
  - [ ] Add max-w-none
  - [ ] Apply dark mode variants
- [ ] Test all markdown features:
  - [ ] Inline code
  - [ ] Fenced code blocks
  - [ ] Line numbers
  - [ ] Line highlighting
  - [ ] Diff blocks
  - [ ] Images
  - [ ] Tables
  - [ ] Blockquotes

## Phase 8: Update Backgrounds & Gradients 🎨
- [ ] Replace custom background classes:
  - [ ] .dark-background → bg-base-100/200/300
  - [ ] .light-background → DaisyUI theme colors
- [ ] Update gradients to use DaisyUI variables:
  - [ ] .dark-background gradient
  - [ ] .main-gradient
  - [ ] .greeting-color / .logo-color
  - [ ] .menu-links
  - [ ] .social-bg
- [ ] Update container classes to DaisyUI container
- [ ] Update text colors to semantic colors (text-base-content, text-primary)

## Phase 9: Testing & Refinement ✅
- [ ] Visual regression testing:
  - [ ] Homepage
  - [ ] Individual blog post pages
  - [ ] Test on mobile/tablet/desktop
  - [ ] Test dark/light themes
- [ ] Functionality testing:
  - [ ] Copy button works
  - [ ] Syntax highlighting works
  - [ ] Line numbers display
  - [ ] Line highlighting works
  - [ ] Images lazy load
  - [ ] Navigation works
  - [ ] All links work
- [ ] Performance testing:
  - [ ] Run npm run build
  - [ ] Compare bundle sizes
  - [ ] Check Lighthouse scores
  - [ ] Verify no console errors
- [ ] Accessibility testing:
  - [ ] Keyboard navigation
  - [ ] Semantic HTML preserved
  - [ ] Color contrast ratios
  - [ ] Screen reader compatibility

## Phase 10: Final Cleanup 🎉
- [ ] Remove dead code:
  - [ ] Search for unused imports
  - [ ] Remove commented-out code
  - [ ] Delete unused utility functions
  - [ ] Remove unused CSS classes
- [ ] Update dependencies:
  - [ ] Run npm audit
  - [ ] Fix vulnerabilities
- [ ] Git cleanup:
  - [ ] Review all changed files
  - [ ] Commit in logical chunks
  - [ ] Write clear commit messages
  - [ ] Update README if needed
- [ ] Final verification:
  - [ ] Build succeeds
  - [ ] All tests pass
  - [ ] No TypeScript errors
  - [ ] Deploy preview works

---

## Current Status
**Branch:** `feature/daisyui-migration`  
**Current Phase:** Phase 1  
**Started:** January 6, 2026
