#!/bin/bash

# Website Testing & Stats Collection Script
# Generates a comprehensive report of your website's health and performance

OUTPUT_FILE="website-stats-$(date +%Y%m%d-%H%M%S).txt"
TEMP_DIR="./temp-test-results"

echo "🚀 Website Testing & Stats Collection"
echo "======================================"
echo ""
echo "📝 Output file: $OUTPUT_FILE"
echo ""

# Create temp directory
mkdir -p "$TEMP_DIR"

# Initialize output file
{
    echo "=========================================="
    echo "   WEBSITE STATS & PERFORMANCE REPORT"
    echo "=========================================="
    echo ""
    echo "Generated: $(date)"
    echo "Website: Jerry Zhu Personal Website"
    echo ""
} > "$OUTPUT_FILE"

# Function to append to output with timestamp
log_section() {
    echo "" >> "$OUTPUT_FILE"
    echo "===========================================" >> "$OUTPUT_FILE"
    echo " $1" >> "$OUTPUT_FILE"
    echo "===========================================" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
}

# Function to check if dev server is running
check_dev_server() {
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# 1. TypeScript Type Check
log_section "1. TYPESCRIPT TYPE CHECK"
echo "🔍 Running TypeScript type check..."
{
    echo "Command: npm run type-check"
    echo ""
    npm run type-check 2>&1
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Type check passed!"
    else
        echo ""
        echo "❌ Type check failed!"
    fi
} >> "$OUTPUT_FILE"

# 2. Linting
log_section "2. ESLINT CHECK"
echo "🔍 Running ESLint..."
{
    echo "Command: npm run lint"
    echo ""
    npm run lint 2>&1
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Linting passed!"
    else
        echo ""
        echo "❌ Linting failed!"
    fi
} >> "$OUTPUT_FILE"

# 3. Build Test
log_section "3. PRODUCTION BUILD"
echo "🏗️  Building for production..."
{
    echo "Command: npm run build"
    echo ""
    BUILD_START=$(date +%s)
    npm run build 2>&1
    BUILD_END=$(date +%s)
    BUILD_TIME=$((BUILD_END - BUILD_START))
    
    echo ""
    echo "⏱️  Build time: ${BUILD_TIME}s"
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful!"
    else
        echo "❌ Build failed!"
    fi
} >> "$OUTPUT_FILE"

# 4. Bundle Size Analysis
log_section "4. BUNDLE SIZE ANALYSIS"
echo "📦 Analyzing bundle sizes..."
{
    echo "Next.js Build Output:"
    echo ""
    # Extract bundle info from last build
    if [ -d ".next" ]; then
        echo "Build Directory Size:"
        du -sh .next 2>&1 | head -1
        echo ""
        
        echo "Static Directory Size:"
        du -sh .next/static 2>&1 | head -1
        echo ""
        
        echo "Chunk Files:"
        find .next -name "*.js" -type f -exec du -h {} + 2>&1 | sort -rh | head -20
    else
        echo "❌ No .next directory found. Run build first."
    fi
} >> "$OUTPUT_FILE"

# 5. File Count Statistics
log_section "5. PROJECT STATISTICS"
echo "📊 Collecting project statistics..."
{
    echo "File Counts:"
    echo "------------"
    echo "TypeScript files: $(find src -name "*.ts" -o -name "*.tsx" | wc -l | xargs)"
    echo "JavaScript files: $(find src -name "*.js" -o -name "*.jsx" | wc -l | xargs)"
    echo "CSS files: $(find src -name "*.css" | wc -l | xargs)"
    echo "Component files: $(find src/components -name "*.tsx" | wc -l | xargs)"
    echo "  - Atoms: $(find src/components/atoms -name "*.tsx" 2>/dev/null | wc -l | xargs)"
    echo "  - Molecules: $(find src/components/molecules -name "*.tsx" 2>/dev/null | wc -l | xargs)"
    echo "  - Organisms: $(find src/components/organisms -name "*.tsx" 2>/dev/null | wc -l | xargs)"
    echo "Image files: $(find public -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.svg" -o -name "*.webp" \) | wc -l | xargs)"
    echo ""
    echo "Lines of Code:"
    echo "--------------"
    echo "Total TypeScript/JavaScript LOC:"
    find src -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs wc -l 2>/dev/null | tail -1
    echo ""
    echo "Total CSS LOC:"
    find src -name "*.css" | xargs wc -l 2>/dev/null | tail -1
    echo ""
    echo "Dependencies:"
    echo "-------------"
    echo "Production dependencies: $(node -p "Object.keys(require('./package.json').dependencies).length")"
    echo "Dev dependencies: $(node -p "Object.keys(require('./package.json').devDependencies).length")"
} >> "$OUTPUT_FILE"

# 6. Check if dev server is running for Lighthouse
DEV_SERVER_RUNNING=false
if check_dev_server; then
    DEV_SERVER_RUNNING=true
    echo "✅ Dev server is already running on port 3000"
else
    echo "⚠️  Dev server not running. Starting it..."
    npm run dev > /dev/null 2>&1 &
    DEV_PID=$!
    
    # Wait for server to start (max 30 seconds)
    echo "⏳ Waiting for dev server to start..."
    for i in {1..30}; do
        if check_dev_server; then
            DEV_SERVER_RUNNING=true
            echo "✅ Dev server started successfully!"
            break
        fi
        sleep 1
        echo -n "."
    done
    echo ""
fi

# 7. Lighthouse Audit (only if dev server is running)
if [ "$DEV_SERVER_RUNNING" = true ]; then
    log_section "6. LIGHTHOUSE PERFORMANCE AUDIT"
    echo "🔦 Running Lighthouse audit..."
    {
        echo "Command: npx -y lighthouse http://localhost:3000"
        echo "Target: http://localhost:3000"
        echo ""
        
        # Run Lighthouse and save to temp file
        npx -y lighthouse http://localhost:3000 \
            --output=json \
            --output-path="$TEMP_DIR/lighthouse-report.json" \
            --quiet \
            --chrome-flags="--headless" 2>&1 | grep -E "(Performance|Accessibility|Best Practices|SEO|Progressive Web App)" || echo "Running audit..."
        
        if [ -f "$TEMP_DIR/lighthouse-report.json" ]; then
            echo ""
            echo "📊 LIGHTHOUSE SCORES:"
            echo "-------------------"
            
            # Extract scores using node
            node -e "
                const report = require('./$TEMP_DIR/lighthouse-report.json');
                const categories = report.categories;
                console.log('Performance:      ' + Math.round(categories.performance.score * 100) + '/100');
                console.log('Accessibility:    ' + Math.round(categories.accessibility.score * 100) + '/100');
                console.log('Best Practices:   ' + Math.round(categories['best-practices'].score * 100) + '/100');
                console.log('SEO:              ' + Math.round(categories.seo.score * 100) + '/100');
                if (categories.pwa) {
                    console.log('PWA:              ' + Math.round(categories.pwa.score * 100) + '/100');
                }
                console.log('');
                console.log('📈 CORE WEB VITALS:');
                console.log('-------------------');
                const metrics = report.audits;
                if (metrics['largest-contentful-paint']) {
                    console.log('LCP:  ' + metrics['largest-contentful-paint'].displayValue);
                }
                if (metrics['total-blocking-time']) {
                    console.log('TBT:  ' + metrics['total-blocking-time'].displayValue);
                }
                if (metrics['cumulative-layout-shift']) {
                    console.log('CLS:  ' + metrics['cumulative-layout-shift'].displayValue);
                }
                if (metrics['speed-index']) {
                    console.log('SI:   ' + metrics['speed-index'].displayValue);
                }
            " 2>&1
            
            echo ""
            echo "✅ Lighthouse audit complete!"
            echo "Full report saved to: $TEMP_DIR/lighthouse-report.json"
        else
            echo "❌ Lighthouse audit failed or report not generated"
        fi
    } >> "$OUTPUT_FILE"
else
    log_section "6. LIGHTHOUSE AUDIT - SKIPPED"
    echo "⚠️  Dev server not running - skipping Lighthouse audit" | tee -a "$OUTPUT_FILE"
    echo "   To run Lighthouse, start dev server first: npm run dev" | tee -a "$OUTPUT_FILE"
fi

# 8. Security Check
log_section "7. SECURITY & DEPENDENCIES"
echo "🔒 Checking for security vulnerabilities..."
{
    echo "Command: npm audit"
    echo ""
    npm audit --production 2>&1 | head -30
    echo ""
    echo "Note: Run 'npm audit fix' to fix vulnerabilities"
} >> "$OUTPUT_FILE"

# 9. File Sizes
log_section "8. PUBLIC ASSETS SIZE"
echo "📂 Analyzing public assets..."
{
    echo "Largest files in /public:"
    echo "------------------------"
    find public -type f -exec du -h {} + 2>/dev/null | sort -rh | head -20
    echo ""
    echo "Total public directory size:"
    du -sh public 2>/dev/null
} >> "$OUTPUT_FILE"

# 10. Git Info
log_section "9. GIT REPOSITORY INFO"
echo "📋 Collecting git info..."
{
    echo "Branch: $(git branch --show-current 2>/dev/null || echo 'N/A')"
    echo "Last commit: $(git log -1 --pretty=format:'%h - %s (%an, %ar)' 2>/dev/null || echo 'N/A')"
    echo "Total commits: $(git rev-list --count HEAD 2>/dev/null || echo 'N/A')"
    echo "Contributors: $(git log --format='%an' | sort -u | wc -l | xargs)"
    echo ""
    echo "Modified files:"
    git status --short 2>/dev/null || echo "N/A"
} >> "$OUTPUT_FILE"

# 11. Environment Check
log_section "10. ENVIRONMENT CONFIGURATION"
echo "⚙️  Checking environment..."
{
    echo "Node version: $(node --version)"
    echo "NPM version: $(npm --version)"
    echo ""
    echo "Environment files:"
    ls -la | grep -E "^.*\.env" || echo "No .env files found"
    echo ""
    echo "Configuration files present:"
    ls -1 | grep -E "(next\.config|tsconfig|tailwind\.config|postcss\.config|docker|vercel\.json|nginx\.conf)" | sed 's/^/  ✓ /'
} >> "$OUTPUT_FILE"

# 12. SEO Files Check
log_section "11. SEO FILES VERIFICATION"
echo "🔍 Verifying SEO files..."
{
    echo "Checking required SEO files:"
    echo ""
    
    if [ -f "public/robots.txt" ]; then
        echo "✅ robots.txt exists"
        echo "   Preview:"
        head -5 public/robots.txt | sed 's/^/   /'
    else
        echo "❌ robots.txt missing"
    fi
    echo ""
    
    if [ -f "public/sitemap.xml" ]; then
        echo "✅ sitemap.xml exists"
        echo "   URLs found: $(grep -c "<loc>" public/sitemap.xml 2>/dev/null || echo "0")"
    else
        echo "❌ sitemap.xml missing"
    fi
    echo ""
    
    if [ -f "public/manifest.json" ]; then
        echo "✅ manifest.json exists (PWA ready)"
    else
        echo "❌ manifest.json missing"
    fi
    echo ""
    
    if [ -f "src/app/api/og/route.tsx" ]; then
        echo "✅ OG image generator exists"
    else
        echo "❌ OG image generator missing"
    fi
} >> "$OUTPUT_FILE"

# Cleanup
if [ -n "$DEV_PID" ] && ps -p $DEV_PID > /dev/null 2>&1; then
    echo ""
    echo "🧹 Stopping dev server..."
    kill $DEV_PID 2>/dev/null
    wait $DEV_PID 2>/dev/null
fi

# Final summary
log_section "12. SUMMARY"
{
    echo "Test completed at: $(date)"
    echo ""
    echo "📊 Quick Stats:"
    echo "--------------"
    echo "Build Status:        $(grep -q "✅ Build successful" "$OUTPUT_FILE" && echo "✅ PASS" || echo "❌ FAIL")"
    echo "Type Check:          $(grep -q "✅ Type check passed" "$OUTPUT_FILE" && echo "✅ PASS" || echo "❌ FAIL")"
    echo "Lint Check:          $(grep -q "✅ Linting passed" "$OUTPUT_FILE" && echo "✅ PASS" || echo "⚠️  CHECK")"
    echo "SEO Files:           $([ -f "public/robots.txt" ] && [ -f "public/sitemap.xml" ] && echo "✅ COMPLETE" || echo "⚠️  INCOMPLETE")"
    
    if [ -f "$TEMP_DIR/lighthouse-report.json" ]; then
        echo ""
        echo "🔦 Lighthouse Scores:"
        node -e "
            const report = require('./$TEMP_DIR/lighthouse-report.json');
            const categories = report.categories;
            console.log('  Performance:     ' + Math.round(categories.performance.score * 100) + '/100');
            console.log('  Accessibility:   ' + Math.round(categories.accessibility.score * 100) + '/100');
            console.log('  Best Practices:  ' + Math.round(categories['best-practices'].score * 100) + '/100');
            console.log('  SEO:             ' + Math.round(categories.seo.score * 100) + '/100');
        " 2>&1 || echo "  (Lighthouse not run)"
    fi
    
    echo ""
    echo "📁 Total Build Size: $(du -sh .next 2>/dev/null | cut -f1 || echo "N/A")"
    echo "📦 Component Count:  $(find src/components -name "*.tsx" 2>/dev/null | wc -l | xargs)"
    echo "🖼️  Image Count:      $(find public -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | wc -l | xargs)"
    echo ""
    echo "Full report saved to: $OUTPUT_FILE"
} >> "$OUTPUT_FILE"

# Display summary to console
echo ""
echo "✅ Testing complete!"
echo ""
echo "📊 SUMMARY:"
echo "==========="
tail -20 "$OUTPUT_FILE"
echo ""
echo "📝 Full report saved to: $OUTPUT_FILE"
echo ""

# Keep lighthouse report if it exists
if [ -f "$TEMP_DIR/lighthouse-report.json" ]; then
    mv "$TEMP_DIR/lighthouse-report.json" "lighthouse-report-$(date +%Y%m%d-%H%M%S).json"
    echo "🔦 Lighthouse JSON report saved separately"
fi

# Cleanup temp directory
rm -rf "$TEMP_DIR"

echo ""
echo "🎉 All tests completed!"
