# 🚀 Quick Start - Testing Your Website

## Run Complete Test Suite

```bash
npm run test:all
```

This single command will:
- ✅ Check TypeScript types
- ✅ Run ESLint
- ✅ Build for production
- ✅ Analyze bundle sizes
- ✅ Collect project stats
- ✅ Run Lighthouse audit
- ✅ Check security
- ✅ Verify SEO files
- ✅ Generate comprehensive report

## What You'll Get

### 1. Detailed Text Report
`website-stats-[timestamp].txt` containing:
- Build status and time
- Bundle size analysis
- Component counts
- Lighthouse scores
- Core Web Vitals
- Security audit
- File statistics
- Git info

### 2. Lighthouse JSON Report
`lighthouse-report-[timestamp].json` with:
- Full performance metrics
- Accessibility audit
- Best practices check
- SEO analysis
- PWA criteria

## How to Use

### First Time:
```bash
# Make sure you're in the project directory
cd /Users/jhome/Documents/GitHub/personal-website

# Run the test
npm run test:all
```

### With Dev Server Running:
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run comprehensive tests
npm run test:all
```

### Review Results:
```bash
# Open the latest report
open website-stats-*.txt

# Or view in terminal
cat website-stats-*.txt
```

## Expected Output

```
🚀 Website Testing & Stats Collection
======================================

📝 Output file: website-stats-20260210-173045.txt

🔍 Running TypeScript type check...
🔍 Running ESLint...
🏗️  Building for production...
📦 Analyzing bundle sizes...
📊 Collecting project statistics...
🔦 Running Lighthouse audit...
🔒 Checking for security vulnerabilities...
📂 Analyzing public assets...

✅ Testing complete!

📊 SUMMARY:
===========
Build Status:        ✅ PASS
Type Check:          ✅ PASS
Lint Check:          ✅ PASS
SEO Files:           ✅ COMPLETE

🔦 Lighthouse Scores:
  Performance:     93/100
  Accessibility:   98/100
  Best Practices:  96/100
  SEO:             100/100

📁 Total Build Size: 45M
📦 Component Count:  19
🖼️  Image Count:      38
```

## Other Useful Commands

```bash
# Just type checking
npm run type-check

# Just linting
npm run lint

# Just build
npm run build

# Build + lint + type check
npm run test:build

# Lighthouse only (dev server must be running)
npm run lighthouse

# Optimize images
npm run optimize-images
```

## Troubleshooting

### Script won't run:
```bash
chmod +x scripts/test-website.sh
```

### Port 3000 in use:
```bash
lsof -ti:3000 | xargs kill -9
```

### Lighthouse fails:
Make sure Chrome is installed and dev server is running.

## CI/CD Integration

Add to `.github/workflows/ci-cd.yml`:
```yaml
- name: Run comprehensive tests
  run: npm run test:all
```

## When to Run

- ✅ Before every commit
- ✅ Before deployment
- ✅ After major changes
- ✅ Weekly health check
- ✅ After dependency updates

---

**Ready? Run `npm run test:all` now! 🎯**
