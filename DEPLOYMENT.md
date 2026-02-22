# FNA Concept Website - Deployment Guide

## Production Build

The production bundle has been successfully built and is ready for deployment.

### Build Output

- **Build Directory**: `dist/fna-concept-website/browser`
- **Bundle Size**: 
  - JavaScript: 223.71 kB (raw) / 59.84 kB (gzipped)
  - CSS: 22.28 kB (raw) / 4.95 kB (gzipped)
  - **Total**: 245.98 kB (raw) / 64.79 kB (gzipped)

### Build Command

```bash
npm run build
```

This command runs `ng build` with the production configuration, which includes:
- Code optimization and minification
- Output hashing for cache busting
- Tree-shaking to remove unused code
- No source maps (for security)
- License extraction

---

## Deployment Options

### Option 1: Deploy via Git (Recommended)

This is the easiest method for continuous deployment.

#### Steps:

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - FNA Concept website"
   ```

2. **Push to GitHub/GitLab/Bitbucket**:
   ```bash
   # Create a repository on GitHub, then:
   git remote add origin <your-repository-url>
   git branch -M main
   git push -u origin main
   ```

3. **Connect to Netlify**:
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider (GitHub/GitLab/Bitbucket)
   - Select your repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist/fna-concept-website/browser`
     - **Node version**: 20 (set in netlify.toml)
   - Click "Deploy site"

4. **Automatic Deployments**:
   - Every push to the `main` branch will trigger an automatic deployment
   - Pull requests will create preview deployments

---

### Option 2: Deploy via Netlify CLI

This method is useful for manual deployments or testing.

#### Steps:

1. **Install Netlify CLI** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```
   This will open a browser window for authentication.

3. **Initialize Netlify site** (first time only):
   ```bash
   cd fna-concept-website
   netlify init
   ```
   Follow the prompts to create a new site or link to an existing one.

4. **Deploy to production**:
   ```bash
   # Build the project first
   npm run build
   
   # Deploy to production
   netlify deploy --prod --dir=dist/fna-concept-website/browser
   ```

5. **Preview deployment** (optional):
   ```bash
   # Deploy to a preview URL first
   netlify deploy --dir=dist/fna-concept-website/browser
   ```

---

### Option 3: Manual Upload via Netlify Dashboard

For one-time deployments without Git or CLI.

#### Steps:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Create a ZIP file** of the build output:
   ```bash
   cd dist/fna-concept-website/browser
   zip -r ../../../fna-concept-build.zip .
   cd ../../..
   ```

3. **Upload to Netlify**:
   - Go to [Netlify](https://app.netlify.com/)
   - Drag and drop the `fna-concept-build.zip` file onto the Netlify dashboard
   - Or click "Add new site" → "Deploy manually" and upload the folder

---

## Netlify Configuration

The project includes a `netlify.toml` file with the following configuration:

### Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `dist/fna-concept-website/browser`
- **Node version**: 20

### Features Configured

1. **SPA Routing**: All routes redirect to `index.html` (status 200)
2. **Security Headers**:
   - X-Frame-Options: DENY (prevent clickjacking)
   - X-Content-Type-Options: nosniff (prevent MIME sniffing)
   - X-XSS-Protection: enabled
   - Referrer-Policy: strict-origin-when-cross-origin
   - Content-Security-Policy: configured for Angular app

3. **Cache Control**:
   - Static assets (JS, CSS, images): 1 year cache (immutable)
   - index.html: no cache (always fresh)
   - Favicon: 1 day cache

4. **Netlify Forms**: Automatically enabled via `data-netlify="true"` attribute in the contact form

---

## Verifying Deployment

After deployment, verify the following:

### 1. Site Accessibility
- Visit your Netlify URL (e.g., `https://your-site-name.netlify.app`)
- Check that the site loads correctly
- Test on mobile and desktop viewports

### 2. Navigation
- Click all navigation links to ensure smooth scrolling works
- Test the mobile hamburger menu
- Verify the "Demander un devis" CTA button scrolls to the contact form

### 3. Responsive Design
- Test on different screen sizes:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Verify layouts adapt correctly

### 4. Contact Form (see Task 21.2)
- Test form validation with invalid inputs
- Submit a test form (see next section for details)

### 5. Performance
- Run Lighthouse audit in Chrome DevTools
- Check Core Web Vitals:
  - First Contentful Paint (FCP) < 1.5s
  - Largest Contentful Paint (LCP) < 2.5s
  - Cumulative Layout Shift (CLS) < 0.1

---

## Custom Domain Setup (Optional)

To use a custom domain (e.g., `www.fnaconcept.fr`):

1. **In Netlify Dashboard**:
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain name

2. **Configure DNS**:
   - Add a CNAME record pointing to your Netlify subdomain
   - Or use Netlify DNS for automatic configuration

3. **Enable HTTPS**:
   - Netlify automatically provisions SSL certificates via Let's Encrypt
   - HTTPS is enabled by default

---

## Troubleshooting

### Build Fails on Netlify

**Issue**: Build command fails with errors

**Solutions**:
- Check that Node version is set to 20 in `netlify.toml`
- Verify all dependencies are in `package.json`
- Check build logs in Netlify dashboard for specific errors

### Site Shows 404 Errors

**Issue**: Navigation or page refresh shows 404

**Solutions**:
- Verify `netlify.toml` includes the SPA redirect rule
- Check that publish directory is set to `dist/fna-concept-website/browser`

### Forms Not Working

**Issue**: Contact form submissions don't work

**Solutions**:
- See Task 21.2 documentation for Netlify Forms verification
- Ensure form has `data-netlify="true"` attribute
- Check Netlify dashboard → Forms for submissions

### Slow Loading

**Issue**: Site loads slowly

**Solutions**:
- Run Lighthouse audit to identify issues
- Check image sizes and optimization
- Verify bundle sizes are within budgets (see angular.json)

---

## Deployment Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Test the build locally with `netlify dev` (if using Netlify CLI)
- [ ] Verify all content is in French
- [ ] Check responsive layouts on mobile and desktop
- [ ] Test form validation
- [ ] Run Lighthouse audit (Performance, Accessibility, SEO)
- [ ] Verify all images have alt text
- [ ] Test keyboard navigation
- [ ] Check color contrast ratios
- [ ] Review security headers in `netlify.toml`

---

## Continuous Deployment Workflow

Once Git-based deployment is set up:

1. **Development**:
   ```bash
   # Make changes locally
   npm start  # Test at http://localhost:4200
   ```

2. **Testing**:
   ```bash
   # Run tests
   npm test
   
   # Build production bundle
   npm run build
   ```

3. **Deployment**:
   ```bash
   # Commit and push
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

4. **Automatic Deployment**:
   - Netlify automatically detects the push
   - Runs the build command
   - Deploys to production
   - Sends notification when complete

---

## Support and Resources

- **Netlify Documentation**: https://docs.netlify.com/
- **Angular Deployment Guide**: https://angular.dev/tools/cli/deployment
- **Netlify Forms Documentation**: https://docs.netlify.com/forms/setup/
- **Netlify CLI Documentation**: https://docs.netlify.com/cli/get-started/

---

## Next Steps

After deployment, proceed to **Task 21.2** to verify Netlify Forms functionality in production.
