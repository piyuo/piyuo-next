#!/bin/bash

# Target directory
TARGET_DIR="public/videos"

# Check if the directory exists before proceeding
if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Directory '$TARGET_DIR' not found."
  exit 1
fi

echo "Scanning '$TARGET_DIR' for MP4 files..."

# Use find with -print0 to safely handle filenames with spaces or special characters
find "$TARGET_DIR" -type f -name "*.mp4" -print0 | while IFS= read -r -d '' mp4_file; do
  # Construct the WebM filename by replacing the extension
  webm_file="${mp4_file%.mp4}.webm"

  if [ -f "$webm_file" ]; then
    echo "Skipping: $webm_file (already exists)"
  else
    echo "Converting: $mp4_file -> $webm_file"

    # -nostdin is critical here; otherwise ffmpeg consumes the rest of the while-loop's input
    ffmpeg -nostdin -i "$mp4_file" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus "$webm_file"

    # Optional: check if conversion was successful
    if [ $? -eq 0 ]; then
      echo "Success: $webm_file created."
    else
      echo "Error converting $mp4_file"
    fi
  fi
done

echo "Video build process complete."