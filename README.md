# Alliance Image Campaign Landing Page

A responsive, single-page landing site for the Alliance for Care at Home campaign.

## 🎯 Project Overview

This landing page promotes careers in home healthcare, featuring:
- Hero section with dynamic imagery
- Information cards about working in home care
- Interactive carousel with video testimonials
- Resources section
- Contact call-to-action

## 🏗️ Tech Stack

- **HTML5** - Semantic markup
- **SCSS** - Styling with BEM methodology
- **Vanilla JavaScript** - Interactive functionality
- **No frameworks or build tools required**

## 📁 Project Structure

```
alliance-image-campaign/
├── index.html              # Main HTML file (served from root)
├── styles.css              # Compiled CSS (generated from src/)
├── styles.css.map          # CSS source map
├── package.json            # Project metadata
├── src/                    # Source files
│   ├── index.html          # HTML source
│   ├── index.js            # JavaScript source
│   └── styles.scss         # SCSS source
├── assets/
│   ├── images/            # Image assets
│   │   ├── hero-background.jpg
│   │   ├── hero-person-left.jpg
│   │   ├── hero-person-right.jpg
│   │   ├── alliance-logo-white.svg
│   │   ├── alliance-logo-navy.svg
│   │   ├── dynamic-work.jpg
│   │   ├── patient-impact.jpg
│   │   ├── collaborative-care.jpg
│   │   ├── jessica-wise.jpg
│   │   ├── tim-ingram.jpg
│   │   ├── india-harris-jones.jpg
│   │   ├── testimonial-4.jpg
│   │   ├── testimonial-5.jpg
│   │   ├── testimonial-6.jpg
│   │   ├── contact-background.jpg
│   │   └── quote-background.jpg
│   └── videos/            # Video files
│       ├── jessica-wise.mp4
│       ├── tim-ingram.mp4
│       ├── india-harris-jones.mp4
│       ├── testimonial-4.mp4
│       ├── testimonial-5.mp4
│       └── testimonial-6.mp4
└── README.md
```

## 🎨 Design Tokens

### Colors
- **Off Black**: `#0F0F0F` - Primary text color
- **White**: `#FFFFFF` - Background and text on dark backgrounds
- **Sage**: `#A3C2BF` - Card backgrounds and accents
- **Peach**: `#E5A369` - Interactive elements and highlights
- **Plum**: `#5D113C` - Card backgrounds and borders
- **Cream**: `#E7DAC4` - Subtle backgrounds
- **Peach Light**: `#F4CBAC` - Gradient backgrounds

### Typography
- **Font Family**: ITC Avant Garde Gothic Pro (primary), Italiana (secondary)
- **Font Weights**: Book (400), Medium (500), Demi (600), Bold (700)

### Breakpoints
- **Mobile**: ≤ 768px
- **Tablet**: ≤ 1024px
- **Desktop**: 1512px (max-width)

## 🚀 Getting Started

### GitHub Pages Deployment

This site is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

**Setup Instructions:**
1. Go to your repository Settings → Pages
2. Under "Build and deployment" → "Source", select "GitHub Actions"
3. Push to the `main` branch - the site will automatically build and deploy
4. Your site will be available at: `https://[username].github.io/[repo-name]/`

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:
- Install dependencies
- Compile SCSS to minified CSS
- Deploy all files to GitHub Pages

### Local Development

#### Prerequisites

You need a SCSS compiler. Options include:

1. **Using npm/node-sass**:
   ```bash
   npm install -g sass
   ```

2. **Using VS Code Extension**: Install "Live Sass Compiler"

3. **Using Dart Sass**: Download from https://sass-lang.com/install

### Compile SCSS

```bash
# Watch mode (auto-compile on save)
sass --watch styles.scss:styles.css

# One-time compile
sass styles.scss styles.css

# Minified production version
sass --style=compressed styles.scss:styles.css
```

### Running the Site

1. Compile the SCSS to CSS (see above)
2. Open `index.html` in a web browser
3. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js with http-server
   npx http-server
   ```

## ✨ Features Implemented

### 1. Hero Section
- Full-width hero with background images
- Overlapping decorative shapes
- Centered content with logo, title, and subtitle
- Responsive layout for mobile

### 2. Sticky Navigation
- Smooth scroll to sections
- Active section highlighting
- Mobile-responsive menu

### 3. Information Cards (About Section)
- Three card variations with different color themes
- FAQ button opens modal overlay
- Image-first stacking on mobile
- BEM naming convention

### 4. Quote Section
- Background image with gradient overlay
- Centered testimonial quote
- Attribution with name and title

### 5. Testimonials Carousel
- 6 testimonial cards
- One-at-a-time navigation with prev/next buttons
- Anchored to page width on left, extends to viewport edge on right
- Click card to open video modal
- Keyboard navigation (arrow keys)
- Disabled button states

### 6. Video Modal
- Full-screen video overlay
- Click to play testimonial videos
- Close with button, overlay click, or ESC key
- Body scroll lock when open

### 7. FAQ Modal
- Dynamic FAQ content based on card clicked
- Displays the "Collaborative Care Culture" card
- Includes sample FAQ questions and answers
- Close with overlay click or ESC key

### 8. Resources Section
- Multiple resource categories
- Two-column grid layout (single column on mobile)
- Hover effects on links
- Background gradient

### 9. Contact Section
- Background image with gradient overlay
- Email CTA button
- Responsive text sizing

### 10. Footer
- Logo and copyright information
- Privacy policy link
- Responsive layout

## 🎯 Key Interactive Features

### Carousel Functionality
- **Move one card at a time**: Buttons navigate through 6 testimonials
- **Disabled states**: Prev button disabled on first slide, Next disabled on last
- **Keyboard support**: Arrow keys navigate when not in modal
- **Smooth animations**: CSS transitions for slide movement

### Video Modal System
- **Dynamic video loading**: Loads video based on `data-video` attribute
- **Auto-play**: Video starts when modal opens
- **Pause and reset**: Video pauses and resets to start when closed
- **Accessible**: Keyboard controls (ESC to close)

### FAQ System
- **Dynamic content**: FAQ content generated based on button clicked
- **Reusable**: Can easily add more FAQ content
- **Card display**: Shows the "Collaborative Care Culture" info card

### Smooth Scroll Navigation
- **Anchor links**: Navigation smoothly scrolls to sections
- **Offset adjustment**: Accounts for sticky nav height
- **Active highlighting**: Current section highlighted in nav

## 📋 Next Steps

### Required Assets

You need to add the following assets to complete the implementation:

#### Images (`assets/images/`)
1. `hero-background.jpg` - Background for hero section
2. `hero-person-left.png` - Left person image in hero (PNG for transparency)
3. `hero-person-right.png` - Right person image in hero (PNG for transparency)
4. `alliance-logo-white.svg` - White logo for hero
5. `alliance-logo-navy.svg` - Navy logo for footer
6. `dynamic-work.jpg` - Image for "Dynamic Work" card
7. `patient-impact.jpg` - Image for "Patient Impact" card
8. `collaborative-care.jpg` - Image for "Collaborative Care" card
9. `jessica-wise.png` - Jessica Wise testimonial (PNG for transparent background)
10. `tim-ingram.png` - Tim Ingram testimonial (PNG for transparent background)
11. `india-harris-jones.png` - India Harris-Jones testimonial (PNG for transparent background)
12. `testimonial-4.png` through `testimonial-6.png` - Additional testimonials (PNG for transparent background)
13. `contact-background.jpg` - Contact section background
14. `quote-background.jpg` - Quote section background

#### Videos (`assets/videos/`)
1. `jessica-wise.mp4`
2. `tim-ingram.mp4`
3. `india-harris-jones.mp4`
4. `testimonial-4.mp4`
5. `testimonial-5.mp4`
6. `testimonial-6.mp4`

**Note**: All images from Figma can be downloaded using the export URLs provided in the design context.

### Asset Setup Commands

```bash
# Create asset directories
mkdir -p assets/images
mkdir -p assets/videos

# After downloading assets, organize them into these folders
```

### Content Updates

1. **Resources Section**: Update placeholder resource links with actual content
2. **FAQ Content**: Expand FAQ data in `index.js` with actual questions/answers
3. **Testimonial Names**: Update placeholder testimonial 4-6 with real names and titles

### Testing Checklist

- [ ] Compile SCSS to CSS
- [ ] Add all image assets
- [ ] Add all video assets
- [ ] Test responsive breakpoints (mobile, tablet, desktop)
- [ ] Test carousel navigation (buttons and keyboard)
- [ ] Test video modals for all 6 testimonials
- [ ] Test FAQ modals for all 3 cards
- [ ] Test smooth scroll navigation
- [ ] Test all hover states
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Accessibility testing (keyboard navigation, screen readers)
- [ ] Performance testing (image optimization, video loading)

### Optional Enhancements

1. **Loading States**: Add skeleton screens or loading indicators
2. **Animations**: Add entrance animations for sections using Intersection Observer
3. **Form**: Add actual contact form instead of email link
4. **Analytics**: Add Google Analytics or similar tracking
5. **SEO**: Add meta tags, Open Graph tags, structured data
6. **Performance**: Lazy load images and videos
7. **Progressive Enhancement**: Add service worker for offline support

## 🎨 BEM Methodology

This project uses BEM (Block Element Modifier) naming convention:

```scss
// Block
.testimonial-card { }

// Element
.testimonial-card__image { }
.testimonial-card__title { }

// Modifier
.testimonial-card--sage { }
.testimonial-card--peach { }
```

## 📱 Responsive Design

The site uses a mobile-first approach with the following breakpoints:

- **Mobile**: Default styles, optimized for ≤ 768px
- **Tablet**: Adjustments for 769px - 1024px
- **Desktop**: Full layout at 1512px max-width

Key responsive behaviors:
- Navigation: Stacked layout on mobile
- Info cards: Image-first stacking on mobile
- Carousel: Reduced card size and padding on mobile
- Hero: Adjusted image positioning on mobile
- Footer: Stacked layout on mobile

## 🔧 Customization

### Changing Colors

Edit the color variables in `styles.scss`:

```scss
$color-off-black: #0f0f0f;
$color-sage: #a3c2bf;
$color-peach: #e5a369;
// ... etc
```

### Adjusting Carousel

To change the number of slides, update in `index.js`:

```javascript
const totalSlides = 6; // Change this number
```

### Adding FAQ Content

Add new FAQ data in `index.js`:

```javascript
const faqData = {
  'your-new-faq': {
    title: 'Your FAQ Title',
    description: 'Your description',
    faqs: [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' }
    ]
  }
};
```

## 📄 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Note: Uses modern JavaScript (ES6+) and CSS features. For older browser support, consider:
- Transpiling JavaScript with Babel
- Adding CSS autoprefixer
- Including polyfills for modern APIs

## 📞 Support

For issues or questions about the implementation, refer to the `planning/implementation-plan.md` file.

---

Built with ❤️ for the Alliance for Care at Home
