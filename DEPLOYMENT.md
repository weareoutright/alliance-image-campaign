# Deployment Guide

## GitHub Pages (Automatic)

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Initial Setup

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Build and deployment** → **Source**, select **GitHub Actions**

2. **Push to main branch:**
   ```bash
   git push origin main
   ```

3. **Monitor deployment:**
   - Go to the **Actions** tab in your repository
   - Watch the "Deploy to GitHub Pages" workflow run
   - Once complete, your site will be live!

4. **Access your site:**
   - URL format: `https://[username].github.io/[repo-name]/`
   - Example: `https://yourusername.github.io/alliance-image-campaign/`

### How It Works

The workflow (`.github/workflows/deploy.yml`) automatically:
1. Checks out the code
2. Installs Node.js and npm dependencies
3. Compiles SCSS to minified CSS (`npm run sass:build:prod`)
4. Uploads the entire project as an artifact
5. Deploys to GitHub Pages

### Deployment Triggers

The site automatically deploys when:
- Code is pushed to the `main` branch
- Workflow is manually triggered (Actions tab → Deploy to GitHub Pages → Run workflow)

### What Gets Deployed

All files in the repository are deployed, including:
- `index.html` (root HTML file)
- `styles.css` (compiled from src/styles.scss)
- `src/` directory (source files)
- `assets/` directory (images, videos)
- Documentation files

### Troubleshooting

**Deployment failed?**
- Check the Actions tab for error messages
- Ensure `package.json` has correct build script
- Verify all dependencies are in `package.json`

**404 errors on deployed site?**
- Check that all asset paths are relative (no leading `/`)
- Verify images exist in `assets/images/`
- Check browser console for 404 errors

**CSS not updating?**
- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Check that SCSS compiled successfully in Actions log
- Verify `styles.css` was updated in the commit

**Videos not loading?**
- Videos must be in `assets/videos/` directory
- Videos must be committed to the repository
- Check file names match what's referenced in JavaScript

## Manual Deployment (Alternative)

If you prefer to deploy manually or to a different host:

### Build

```bash
# Install dependencies
npm install

# Build production CSS
npm run sass:build:prod
```

### Deploy to Static Host

Upload these files to your web host:
- `index.html`
- `styles.css`
- `src/` directory
- `assets/` directory

Supported hosts:
- **Netlify**: Drag and drop the project folder
- **Vercel**: `vercel --prod`
- **AWS S3**: `aws s3 sync . s3://your-bucket --exclude "node_modules/*"`
- **Traditional hosting**: FTP/SFTP upload

## Environment-Specific Configuration

If you need different configurations for different environments:

### Custom Domain

To use a custom domain with GitHub Pages:
1. Add a `CNAME` file to the repository root with your domain
2. Configure DNS with your domain provider
3. Enable HTTPS in GitHub Pages settings

### Base Path

If deploying to a subdirectory, you may need to adjust asset paths in `index.html`.

## Continuous Integration

The workflow runs on every push to `main`, providing:
- ✅ Automatic dependency installation
- ✅ SCSS compilation
- ✅ Deployment to production
- ✅ Rollback capability (via GitHub's deployment history)

## Deployment Checklist

Before deploying to production:
- [ ] All images are optimized and compressed
- [ ] All videos are added and compressed
- [ ] Tested on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Tested responsive design (mobile, tablet, desktop)
- [ ] Verified all links work
- [ ] Removed debug console.log statements
- [ ] Updated content (no placeholder text)
- [ ] Checked for accessibility issues
- [ ] Added analytics tracking (if needed)

## Rollback

If you need to rollback a deployment:
1. Go to the **Actions** tab
2. Find the previous successful deployment
3. Click "Re-run jobs" to redeploy that version

Or revert the commit:
```bash
git revert HEAD
git push origin main
```

## Support

For deployment issues:
- Check GitHub Actions logs
- Review GitHub Pages documentation: https://docs.github.com/en/pages
- File an issue in this repository
