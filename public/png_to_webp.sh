#!/bin/bash

# Set input and output directories
INPUT_DIR="./"
OUTPUT_DIR="./webp_output"
QUALITY=80 # Change this value to control compression quality (0–100)

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Loop through all PNG files
for img in "$INPUT_DIR"/*.png; do
  if [ -f "$img" ]; then
    filename=$(basename "$img" .png)
    output_file="${OUTPUT_DIR}/${filename}.webp"
    echo "Converting $img -> $output_file"
    cwebp -q $QUALITY "$img" -o "$output_file"
  fi
done

echo "✅ Conversion complete. WebP images saved in $OUTPUT_DIR"
