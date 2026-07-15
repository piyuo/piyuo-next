#!/usr/bin/env bash

# Stop execution if a command fails
set -e

TARGET_DIR="public/images"
QUALITY=75

# Ensure target directory exists
if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Directory '$TARGET_DIR' does not exist."
  exit 1
fi

echo "Scanning '$TARGET_DIR' for PNG and JPEG files..."

# Find all PNG, JPG, JPEG files (case-insensitive) using -print0 for safe filename handling
find "$TARGET_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) -print0 | while IFS= read -r -d '' img_file; do

  # Replace file extension with .webp
  webp_file="${img_file%.*}.webp"

  # Check if the webp version already exists
  if [ -f "$webp_file" ]; then
    echo "Skipping: $webp_file (already exists)"
  else
    echo "Converting: $img_file -> $webp_file"

    # Convert using cwebp
    cwebp -quiet -q "$QUALITY" "$img_file" -o "$webp_file"
  fi
done

echo "Done! Image build process complete in '$TARGET_DIR'."