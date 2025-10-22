# Alliance Image Campaign - Project Instructions

## Project Overview
Single-page landing site for the Alliance for Care at Home campaign promoting careers in home healthcare.

## Technology Stack
- **HTML5** - Semantic markup
- **SCSS** - Styling with BEM methodology
- **Vanilla JavaScript** - No frameworks
- **GitHub Pages** - Automatic deployment via GitHub Actions

## Design System

### Colors
- Off Black: `#0F0F0F`
- White: `#FFFFFF`
- Sage: `#A3C2BF`
- Peach: `#E5A369`
- Plum: `#5D113C`
- Cream: `#E7DAC4`
- Peach Light: `#F4CBAC`

### Breakpoints
- Mobile: ≤768px
- Tablet: ≤1024px
- Desktop: 1512px (max-width for content)

### Typography
- Primary: ITC Avant Garde Gothic Pro
- Secondary: Italiana
- Weights: Book (400), Medium (500), Demi (600), Bold (700)

## File Structure
```
├── index.html              # Main HTML entry point
├── src/
│   └── styles.scss         # SCSS source (compiles to assets/css/)
├── assets/
│   ├── css/                # Compiled CSS
│   ├── index.js            # JavaScript functionality
│   ├── images/             # Image assets
│   └── videos/             # Video files
└── .github/workflows/      # CI/CD
```

## Development Workflow

### Building CSS
```bash
npm run sass:watch    # Watch mode
npm run sass:build    # One-time build
```

### Git Commits
- NEVER include Claude attributions in commit messages
- Keep commits focused and descriptive
- Always build CSS before committing style changes

### Coding Standards
- Use BEM naming convention for CSS classes
- Mobile-first responsive design
- Semantic HTML5 elements
- Accessible markup (ARIA attributes, proper labeling)

## Key Components

### Hero Section
- Full-width with background image and color overlay
- Two person images positioned on left and right
- Desktop: Geometric color overlay (PNG)
- Mobile: Plum overlay (85% opacity) with both person images visible

### Navigation
- Sticky at top with shadow
- Desktop: Horizontal links with underline animation on hover/active
- Mobile: Collapsible menu with vertical list

### Info Cards
- Three cards with images flush to edges
- FAQ accordion expands inline with smooth animation
- Images anchored at top (align-items: flex-start)

### Testimonials Carousel
- Horizontal scroll, one card at a time
- Prev/next buttons with disabled states
- Keyboard navigation support

## Important Notes
- Images in info-cards should be flush to all edges (no padding/gap)
- FAQ accordions use max-height transitions, not display toggle
- Mobile menu overlays content, doesn't push it down
- Always use pointer cursor on interactive elements
