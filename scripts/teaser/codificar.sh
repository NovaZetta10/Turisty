#!/usr/bin/env bash
# Une los fotogramas (fotogramas/) y los efectos de sonido (audio/efectos.wav) en H.264 1920×1080 30 fps.
#  - public/video/preview.mp4: imagen + efectos de sonido (sin voz en off)
#  - scripts/teaser/preview-sin-sonido.mp4: solo imagen
# Antes: node scripts/teaser/render.mjs <url> · python scripts/teaser/sonido.py
set -euo pipefail
cd "$(dirname "$0")"
FF=$(python -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")
RAIZ=../..

"$FF" -y -v error -framerate 30 -i fotogramas/f%04d.jpg \
  -vf "scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p" -c:v libx264 -profile:v high -preset slow -crf 19 -r 30 \
  -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -movflags +faststart -an preview-sin-sonido.mp4

"$FF" -y -v error -i preview-sin-sonido.mp4 -i audio/efectos.wav \
  -map 0:v -map 1:a -c:v copy -af "loudnorm=I=-16:TP=-1.5:LRA=11" -c:a aac -b:a 160k -ar 48000 -ac 2 \
  -movflags +faststart -shortest "$RAIZ/public/video/preview.mp4"
ls -l "$RAIZ/public/video/preview.mp4" preview-sin-sonido.mp4
