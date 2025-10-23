# Figma Asset Export Guide

**⚠️ RECOMMENDED: Export manually from Figma for best quality and correct file formats**

The Figma API export URLs tend to return PNG format regardless of requested extension. For proper SVG logos and optimized images, manual export is recommended.

## Manual Export from Figma

**Figma File**: https://www.figma.com/design/KE8ormCSzgxvOtLhHXKpd7/Alliance-Image-Campaign-Landing-Page

### How to Export Assets

1. Open the Figma file (link above)
2. Select the layer/frame you want to export
3. In the right panel, scroll to "Export" section
4. Choose format (PNG, JPG, SVG) and scale
5. Click "Export [layer name]"
6. Save to `assets/images/` with the filename below

### Export Settings Recommendations

- **Logos**: SVG format (vector, scalable)
- **Photos/Images**: JPG format, 2x scale, 80-85% quality
- **Icons**: SVG format (if vector) or PNG 2x (if raster)
- **Backgrounds**: JPG format, 1x or 2x scale

## Required Assets (`assets/images/`)

### 🎨 Logos (Export as SVG)
**Priority: HIGH - Export these first!**

| Layer Name in Figma | Export As | Save As |
|---------------------|-----------|---------|
| Alliance-ColorLogo-OffWhite-Horizontal 1 | SVG | `alliance-logo-white.svg` |
| Alliance-ColorLogo-Navy-Horizontal 1 | SVG | `alliance-logo-navy.svg` |

**Location in Figma:**
- White logo: In "Hero alt" frame (node-id: 48:466)
- Navy logo: In "Frame 14" footer frame (node-id: 2:93)

### 🖼️ Hero Section Images

| Layer Name in Figma | Export As | Save As |
|---------------------|-----------|---------|
| faruk-tokluoglu-8fY8lWL6MfU-unsplash 1 | JPG 2x | `hero-background.jpg` |
| getty-images-e1dHVWf1SiI-unsplash 1 | PNG 2x | `hero-person-left.png` |
| istockphoto-1175053324-2048x2048 1 | PNG 2x | `hero-person-right.png` |

**Location in Figma:** Inside "Hero alt" frame (node-id: 48:453)

**Note:** The left and right person images need PNG format to preserve transparency/edges

### 📦 Info Card Images (Export as JPG, 2x)

| Layer Name in Figma | Export As | Save As |
|---------------------|-----------|---------|
| Frame 17 > Frame 5 (image) | JPG 2x | `dynamic-work.jpg` |
| Frame 19 > Frame 5 (image) | JPG 2x | `patient-impact.jpg` |
| Frame 20 (inside FAQ popup) | JPG 2x | `collaborative-care.jpg` |

**Location in Figma:**
- Dynamic Work: Frame 17 (node-id: 41:83)
- Patient Impact: Frame 19 (node-id: 41:106)
- Collaborative Care: Frame 20 in FAQ popup (node-id: 41:113)

### 👥 Testimonial Images (Export as PNG, 2x)

| Layer Name in Figma | Export As | Save As |
|---------------------|-----------|---------|
| 1_Jessica | PNG 2x | `jessica-wise.png` |
| 2_Tim | PNG 2x | `tim-ingram.png` |
| 4_India | PNG 2x | `india-harris-jones.png` |

**Location in Figma:**
- Jessica: Frame 10 (node-id: 1:210)
- Tim: Frame 21 (node-id: 41:140)
- India: Frame 22 (node-id: 41:147)

**Note:** These need PNG format with transparency so the CSS background colors (sage, peach, plum) show through behind the person. For testimonials 4-6, you'll need to add your own images or reuse the first three.

### 🎭 Background Images (Export as JPG, 2x)

| Layer Name in Figma | Export As | Save As |
|---------------------|-----------|---------|
| Frame 20 (full frame) | JPG 2x | `quote-background.jpg` |
| istockphoto-2198733823-2048x2048-Extended 2 | JPG 2x | `contact-background.jpg` |

**Location in Figma:**
- Quote background: Frame 20 (node-id: 41:113)
- Contact background: Inside "Frame 3" (node-id: 1:85)

### 💬 Icons

| Element | Status |
|---------|--------|
| Quote mark (") | Using text character in HTML |
| Play button icon | Inline SVG in HTML ✓ |
| Carousel arrows | Inline SVG in HTML ✓ |
| Close (×) button | Using HTML entity ✓ |

## Videos (`assets/videos/`)

You will need to provide the actual video files for the testimonials. Place them in `assets/videos/` with these filenames:

- `jessica-wise.mp4`
- `tim-ingram.mp4`
- `india-harris-jones.mp4`
- `testimonial-4.mp4`
- `testimonial-5.mp4`
- `testimonial-6.mp4`

**Recommended video specs:**
- Format: MP4 (H.264 codec)
- Resolution: 1080p or 720p
- Bitrate: 2-3 Mbps
- Duration: 30-90 seconds recommended

## Export Checklist

Track your progress as you export assets:

### Logos
- [x] `alliance-logo-white.svg` ✓
- [x] `alliance-logo-navy.svg` ✓

### Hero Images
- [x] `hero-background.jpg` ✓
- [x] `hero-person-left.png` (needs transparency) ✓
- [x] `hero-person-right.png` (needs transparency) ✓

### Info Card Images
- [x] `dynamic-work.jpg` ✓
- [x] `patient-impact.jpg` ✓
- [x] `collaborative-care.jpg` ✓

### Testimonial Images
- [x] `jessica-wise.png` (needs transparency for CSS background) ✓
- [x] `tim-ingram.png` (needs transparency for CSS background) ✓
- [x] `india-harris-jones.png` (needs transparency for CSS background) ✓
- [ ] `testimonial-4.png` (optional - can reuse above)
- [ ] `testimonial-5.png` (optional - can reuse above)
- [ ] `testimonial-6.png` (optional - can reuse above)

### Background Images
- [x] `quote-background.jpg` ✓
- [ ] `contact-background.jpg`

### Videos
- [ ] `jessica-wise.mp4`
- [ ] `tim-ingram.mp4`
- [ ] `india-harris-jones.mp4`
- [ ] `testimonial-4.mp4`
- [ ] `testimonial-5.mp4`
- [ ] `testimonial-6.mp4`

## Notes

- Some assets may be reused (e.g., the same image for multiple backgrounds)
- Optimize images for web before deployment (compress JPGs, optimize SVGs)
- Consider using WebP format for better compression
- Videos should be compressed and optimized for web streaming

## Image Optimization Tools

**Online:**
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [Squoosh](https://squoosh.app/) - Image compression & format conversion
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG optimization

**CLI:**
- ImageOptim, jpegoptim, optipng
- ffmpeg (for video compression)

**Build Tools:**
- imagemin (npm)
- sharp (npm)

## Quick Optimization Commands

### Images
```bash
# Optimize JPGs (requires jpegoptim)
jpegoptim --size=200k assets/images/*.jpg

# Optimize PNGs (requires optipng)
optipng -o7 assets/images/*.png
```

### Videos
```bash
# Compress video with ffmpeg
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
```
