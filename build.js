#!/usr/bin/env node

/**
 * Alliance Image Campaign - Build Script
 *
 * This script:
 * 1. Compiles and minifies SCSS to CSS
 * 2. Converts image paths to use CSS custom properties
 * 3. Inlines the CSS into index.html
 * 4. Copies all assets to /build folder
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  srcDir: __dirname,
  buildDir: path.join(__dirname, 'image-campaign-build'),
  scssFile: path.join(__dirname, 'src', 'styles.scss'),
  cssFile: path.join(__dirname, 'assets', 'css', 'styles.css'),
  htmlFile: path.join(__dirname, 'index.html'),
  assetsDir: path.join(__dirname, 'assets', 'images'),
  buildAssetsDir: path.join(__dirname, 'image-campaign-build', 'assets', 'images'),
  videosDir: path.join(__dirname, 'assets', 'videos'),
  buildVideosDir: path.join(__dirname, 'image-campaign-build', 'assets', 'videos'),
  assetPathVar: '--asset-path'
};

console.log('🚀 Starting build process...\n');

// Step 1: Compile SCSS to minified CSS
console.log('📦 Compiling and minifying SCSS...');
try {
  execSync(`sass --style=compressed ${CONFIG.scssFile}:${CONFIG.cssFile}`, {
    stdio: 'inherit'
  });
  console.log('✅ SCSS compiled successfully\n');
} catch (error) {
  console.error('❌ Error compiling SCSS:', error.message);
  process.exit(1);
}

// Step 2: Read the compiled CSS
console.log('📖 Reading compiled CSS...');
let css = fs.readFileSync(CONFIG.cssFile, 'utf8');

// Step 3: Convert image paths to use CSS variables
console.log('🔄 Converting image paths to CSS variables...');

// Find all url() references to images in the CSS
const urlPattern = /url\(['"]?\.\.\/images\/([^'")\s]+)['"]?\)/g;
const imagePaths = new Set();

// Collect all unique image paths
let match;
while ((match = urlPattern.exec(css)) !== null) {
  imagePaths.add(match[1]);
}

console.log(`   Found ${imagePaths.size} unique image references`);

// Replace image paths with CSS variable
css = css.replace(
  /url\(['"]?\.\.\/images\/([^'")\s]+)['"]?\)/g,
  'url(var(--asset-path)/$1)'
);

// Add CSS variable definition at the top with instructions
const cssVariableComment = `/*
 * WORDPRESS IMPLEMENTATION INSTRUCTIONS
 * =====================================
 *
 * Update the --asset-path variable below to point to where you upload the images.
 *
 * Examples:
 *   --asset-path: '/wp-content/uploads/alliance-campaign/images';
 *   --asset-path: '/wp-content/themes/your-theme/alliance/images';
 *   --asset-path: 'https://cdn.example.com/alliance/images';
 *
 * All image URLs in this stylesheet will automatically use this path.
 */

:root {
  --asset-path: '../assets/images'; /* Default path - UPDATE THIS for WordPress */
}

`;

css = cssVariableComment + css;

console.log('✅ Image paths converted to CSS variables\n');

// Step 4: Read HTML file
console.log('📖 Reading HTML file...');
let html = fs.readFileSync(CONFIG.htmlFile, 'utf8');

// Step 5: Inline the CSS
console.log('💉 Inlining CSS into HTML...');

// Remove the external CSS link
html = html.replace(
  /<link rel="stylesheet" href="assets\/css\/styles\.css">/,
  ''
);

// Add inlined CSS in a <style> tag in the <head>
html = html.replace(
  '</head>',
  `    <style>\n${css}\n    </style>\n</head>`
);

console.log('✅ CSS inlined successfully\n');

// Step 6: Clean and create build directory structure
console.log('📁 Creating build directory structure...');
if (fs.existsSync(CONFIG.buildDir)) {
  console.log('   Removing old build directory...');
  fs.rmSync(CONFIG.buildDir, { recursive: true, force: true });
}
fs.mkdirSync(CONFIG.buildDir, { recursive: true });
fs.mkdirSync(CONFIG.buildAssetsDir, { recursive: true });
fs.mkdirSync(CONFIG.buildVideosDir, { recursive: true });
console.log('✅ Build directories created\n');

// Step 7: Write the built HTML file
console.log('💾 Writing build/index.html...');
const buildHtmlPath = path.join(CONFIG.buildDir, 'index.html');
fs.writeFileSync(buildHtmlPath, html, 'utf8');
console.log('✅ Build HTML written successfully\n');

// Step 8: Copy image assets
console.log('🖼️  Copying image assets...');
const imageFiles = fs.readdirSync(CONFIG.assetsDir);
let copiedCount = 0;

imageFiles.forEach(file => {
  const srcPath = path.join(CONFIG.assetsDir, file);
  const destPath = path.join(CONFIG.buildAssetsDir, file);

  // Only copy files (not directories)
  if (fs.statSync(srcPath).isFile()) {
    fs.copyFileSync(srcPath, destPath);
    copiedCount++;
  }
});

console.log(`✅ Copied ${copiedCount} image files\n`);

// Step 9: Copy video assets
console.log('🎬 Copying video assets...');
let videoCount = 0;

if (fs.existsSync(CONFIG.videosDir)) {
  const videoFiles = fs.readdirSync(CONFIG.videosDir);

  videoFiles.forEach(file => {
    const srcPath = path.join(CONFIG.videosDir, file);
    const destPath = path.join(CONFIG.buildVideosDir, file);

    // Only copy files (not directories)
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);
      videoCount++;
    }
  });

  console.log(`✅ Copied ${videoCount} video files\n`);
} else {
  console.log('⚠️  No videos directory found, skipping...\n');
}

// Step 10: Generate implementation instructions
const videoSection = videoCount > 0 ? `

### 2. Upload Videos to WordPress
Upload all videos from \`build/assets/videos/\` to your WordPress site.

**Recommended location:**
\`/wp-content/uploads/alliance-campaign/videos/\`

**Important:** Update video \`src\` attributes in the HTML to match your upload path.` : '';

const instructions = `# WordPress Implementation Instructions

## Files Included
- \`build/index.html\` - Complete HTML with inlined JS and CSS
- \`build/assets/images/\` - All image assets (${copiedCount} files)${videoCount > 0 ? `
- \`build/assets/videos/\` - All video assets (${videoCount} files)` : ''}

## Implementation Steps

### 1. Upload Images to WordPress
Upload all images from \`build/assets/images/\` to your WordPress site.

**Recommended location:**
\`/wp-content/uploads/alliance-campaign/images/\`${videoSection}

### ${videoCount > 0 ? '3' : '2'}. Update the Asset Path
Open \`build/index.html\` and find the CSS \`:root\` declaration near the top of the \`<style>\` tag.

Update the \`--asset-path\` variable to match where you uploaded the images:

\`\`\`css
:root {
  --asset-path: '/wp-content/uploads/alliance-campaign/images';
}
\`\`\`

### ${videoCount > 0 ? '4' : '3'}. Add HTML to WordPress
Copy the contents of \`build/index.html\` (from \`<body>\` to \`</body>\`) into your WordPress page editor.

**Note:** The page includes inline JavaScript for interactive features (carousel, modals, etc.)

### ${videoCount > 0 ? '5' : '4'}. Test
Verify all images${videoCount > 0 ? ' and videos' : ''} load correctly and interactive features work:
- Hero section images
- Info card images
- Testimonial carousel images
- Background images${videoCount > 0 ? '\n- Video playback' : ''}
- Modal functionality

## File Sizes
- HTML (with inlined CSS): ~${Math.round(html.length / 1024)}KB
- Total images: ${copiedCount} files${videoCount > 0 ? `
- Total videos: ${videoCount} files` : ''}

## Support
If you need to make CSS changes after implementation, the styles are in the \`<style>\` tag in the \`<head>\` section.
`;

const instructionsPath = path.join(CONFIG.buildDir, 'IMPLEMENTATION.md');
fs.writeFileSync(instructionsPath, instructions, 'utf8');
console.log('📝 Implementation instructions written to build/IMPLEMENTATION.md\n');

// Summary
console.log('✨ Build complete!\n');
console.log('📦 Output:');
console.log(`   - ${buildHtmlPath}`);
console.log(`   - ${CONFIG.buildAssetsDir}/ (${copiedCount} images)`);
if (videoCount > 0) {
  console.log(`   - ${CONFIG.buildVideosDir}/ (${videoCount} videos)`);
}
console.log(`   - ${instructionsPath}`);
console.log('\n🎉 Ready for WordPress implementation!');