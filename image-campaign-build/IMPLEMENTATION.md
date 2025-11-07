# WordPress Implementation Instructions

## Files Included
- `build/index.html` - Complete HTML with inlined JS and CSS
- `build/assets/images/` - All image assets (20 files)

## Implementation Steps

### 1. Upload Images to WordPress
Upload all images from `build/assets/images/` to your WordPress site.

**Recommended location:**
`/wp-content/uploads/alliance-campaign/images/`

### 2. Update the Asset Path
Open `build/index.html` and find the CSS `:root` declaration near the top of the `<style>` tag.

Update the `--asset-path` variable to match where you uploaded the images:

```css
:root {
  --asset-path: '/wp-content/uploads/alliance-campaign/images';
}
```

### 3. Add HTML to WordPress
Copy the contents of `build/index.html` (from `<body>` to `</body>`) into your WordPress page editor.

**Note:** The page includes inline JavaScript for interactive features (carousel, modals, etc.)

### 4. Test
Verify all images load correctly and interactive features work:
- Hero section images
- Info card images
- Testimonial carousel images
- Background images
- Modal functionality

## File Sizes
- HTML (with inlined CSS): ~66KB
- Total images: 20 files

## Support
If you need to make CSS changes after implementation, the styles are in the `<style>` tag in the `<head>` section.
