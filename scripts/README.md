# Website Testing Scripts

## Test All Website Health Metrics

Run the comprehensive test suite:

```bash
npm run test:all
```

This script will:
1. ✅ Run TypeScript type checking
2. ✅ Run ESLint checks
3. ✅ Build for production
4. ✅ Analyze bundle sizes
5. ✅ Collect project statistics
6. ✅ Run Lighthouse audit (if dev server running)
7. ✅ Check security vulnerabilities
8. ✅ Verify SEO files
9. ✅ Generate comprehensive report

## Output

The script generates:
- `website-stats-[timestamp].txt` - Full detailed report
- `lighthouse-report-[timestamp].json` - Lighthouse JSON data

## Usage

### Option 1: With Dev Server Running
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run tests
npm run test:all
```

### Option 2: Auto-start Dev Server
```bash
# Just run the script - it will start dev server automatically
npm run test:all
```

## Individual Scripts

```bash
# Type check only
npm run type-check

# Build only
npm run build

# Full build test (lint + type + build)
npm run test:build

# Lighthouse only (requires dev server)
npm run lighthouse

# Optimize images
npm run optimize-images
```

## What Gets Tested

### Code Quality
- TypeScript compilation
- ESLint rules
- Type safety
- Import paths

### Performance
- Bundle sizes
- Build time
- First Load JS
- Code splitting

### SEO
- robots.txt presence
- sitemap.xml validity
- manifest.json (PWA)
- OG image generator

### Lighthouse Metrics
- Performance score
- Accessibility score
- Best Practices score
- SEO score
- Core Web Vitals (LCP, CLS, TBT, SI)

### Project Stats
- File counts by type
- Lines of code
- Component breakdown (atoms/molecules/organisms)
- Dependencies count
- Image count and sizes

### Security
- npm audit results
- Dependency vulnerabilities
- Outdated packages

## Example Output

```
==========================================
   WEBSITE STATS & PERFORMANCE REPORT
==========================================

Generated: Mon Feb 10 2026 17:30:45

📊 LIGHTHOUSE SCORES:
-------------------
Performance:      93/100
Accessibility:    98/100
Best Practices:   96/100
SEO:              100/100

📈 CORE WEB VITALS:
-------------------
LCP:  2.1s
TBT:  120ms
CLS:  0.03
SI:   2.5s

📊 SUMMARY:
===========
Build Status:        ✅ PASS
Type Check:          ✅ PASS
Lint Check:          ✅ PASS
SEO Files:           ✅ COMPLETE

📁 Total Build Size: 45M
📦 Component Count:  19
🖼️  Image Count:      38
```

## Troubleshooting

### Dev server doesn't start
```bash
# Kill any process on port 3000
lsof -ti:3000 | xargs kill -9

# Then run script again
npm run test:all
```

### Lighthouse fails
```bash
# Make sure Chrome is installed
# Or run manually after starting dev server:
npm run dev
# In another terminal:
npm run lighthouse
```

### Permission denied
```bash
chmod +x scripts/test-website.sh
```

## Continuous Monitoring

Run this script:
- Before every deployment
- After major changes
- Weekly for monitoring
- In CI/CD pipeline

Add to GitHub Actions:
```yaml
- name: Run website tests
  run: npm run test:all
```

---

**Happy Testing! 🚀**
