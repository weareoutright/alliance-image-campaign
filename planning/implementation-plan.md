# Alliance Image Campaign - Implementation Plan

## Project Overview
Static HTML landing page for Alliance care at home campaign with responsive design, image carousel, and video modals.

## Design References
- Desktop Design: `AllianceImageCampaign-DesktopDesign.png`
- Mobile Design: `AllianceImageCampaign-MobileDesign.png`

## Key Requirements
- Single-page site with anchor link navigation
- Responsive design (desktop and mobile)
- Image/text cards stack image-first on mobile
- Carousel: anchored to page width on left, extends to viewport edge on right
- 6 carousel images that launch local videos in modals
- Carousel controls move one image at a time
- Footer adapts similar to hero section from desktop to mobile

## Implementation Phases

### Phase 1: Figma Design Extraction
- Connect to Figma MCP server to extract design tokens (colors, typography, spacing)
- Export necessary image assets and icons
- Document responsive breakpoints and layout specifications

### Phase 2: Project Structure Setup
- Create `index.html` as the main landing page
- Create `styles.css` for styling
- Update `index.js` for carousel and modal functionality
- Set up folder structure for assets (images, videos)

### Phase 3: HTML Structure
Build semantic HTML with the following sections:
- Navigation (anchor links to page sections)
- Hero section: "Meet patients where they are"
- "Why work in care at home?" section (4 image/text cards)
- "Hear from those in the field" section (carousel with 6 images)
- "Explore more with these resources" section
- Footer with "Get in touch" contact form

### Phase 4: CSS Styling
- Desktop-first responsive design with mobile breakpoints
- Card stacking behavior (image-first on mobile)
- Carousel: anchored to page width on left, extends to viewport edge on right
- Apply all Figma design tokens (colors, fonts, spacing)
- Hover states and interactive elements

### Phase 5: JavaScript Functionality
- Smooth scroll navigation for anchor links
- Carousel implementation:
  - 6 images total
  - One-at-a-time navigation (prev/next controls)
  - Click to open video modal
- Video modal system:
  - Opens local video files
  - Close functionality
  - Accessible keyboard controls

### Phase 6: Testing & Polish
- Test responsive behavior across breakpoints
- Verify carousel navigation and modal functionality
- Ensure smooth scrolling and anchor navigation works
- Cross-browser compatibility check
- Accessibility review

## Current Status
- Awaiting Figma MCP server configuration to extract design specifications
- Once MCP is configured, will proceed with full implementation

## Todo List
1. [in_progress] Connect to Figma and extract design specifications
2. [pending] Create HTML structure with all sections
3. [pending] Build CSS styling with responsive design
4. [pending] Implement carousel functionality
5. [pending] Implement video modal system
6. [pending] Add smooth scroll navigation
7. [pending] Test responsive behavior and functionality