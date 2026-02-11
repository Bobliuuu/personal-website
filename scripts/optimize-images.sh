#!/bin/bash

# Image Optimization Script
# Converts and optimizes images for web use

echo "🖼️  Image Optimization Script"
echo "=============================="

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Installing..."
    echo "Run: brew install imagemagick"
    exit 1
fi

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "⚠️  WebP tools not found. Installing..."
    echo "Run: brew install webp"
fi

# Optimize PNG files
echo ""
echo "📦 Optimizing PNG files..."
for img in public/**/*.png; do
    if [ -f "$img" ]; then
        echo "  Optimizing: $img"
        # Create optimized version
        convert "$img" -strip -quality 85 -define png:compression-level=9 "${img%.png}-optimized.png"
        
        # Convert to WebP
        if command -v cwebp &> /dev/null; then
            cwebp -q 85 "$img" -o "${img%.png}.webp"
        fi
    fi
done

# Optimize JPG files
echo ""
echo "📦 Optimizing JPG files..."
for img in public/**/*.{jpg,jpeg}; do
    if [ -f "$img" ]; then
        echo "  Optimizing: $img"
        # Create optimized version
        convert "$img" -strip -quality 85 -sampling-factor 4:2:0 "${img%.*}-optimized.jpg"
        
        # Convert to WebP
        if command -v cwebp &> /dev/null; then
            cwebp -q 85 "$img" -o "${img%.*}.webp"
        fi
    fi
done

echo ""
echo "✅ Optimization complete!"
echo ""
echo "Next steps:"
echo "1. Review optimized images"
echo "2. Replace originals if satisfied"
echo "3. Delete -optimized files or rename them"
echo ""
