#!/usr/bin/env bash
# Usage: scripts/encode-hero.sh path/to/huck.mov [start_seconds] [duration_seconds]
# Produces web-optimised hero loops in public/video/: AV1/VP9 webm + H.264 mp4 + poster.
# Targets: 1080p max, muted, no audio track, ~6 s loop, < 2 MB each.
set -euo pipefail
IN="$1"; SS="${2:-0}"; T="${3:-6}"
OUT="$(dirname "$0")/../public/video"; mkdir -p "$OUT"
VF="fps=30,scale='min(1920,iw)':-2:flags=lanczos"
ffmpeg -y -ss "$SS" -t "$T" -i "$IN" -an -vf "$VF" -c:v libsvtav1 -crf 38 -preset 6 -pix_fmt yuv420p "$OUT/hero.av1.mp4"
ffmpeg -y -ss "$SS" -t "$T" -i "$IN" -an -vf "$VF" -c:v libx264 -crf 26 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart "$OUT/hero.h264.mp4"
# All-intra (keyint=1) so scroll-scrubbing currentTime is instant and smooth in both directions.
ffmpeg -y -ss "$SS" -t "$T" -i "$IN" -an -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 24 -preset slow -x264-params keyint=1 -pix_fmt yuv420p -movflags +faststart "$OUT/hero.scrub.mp4"
ffmpeg -y -ss "$SS" -i "$IN" -frames:v 1 -vf "scale='min(1920,iw)':-2" -c:v libwebp -quality 78 "$OUT/hero-poster.webp"
ls -lh "$OUT"
