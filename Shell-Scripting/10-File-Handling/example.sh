#!/bin/bash
# example.sh - File handling demo

log_file="demo_log.txt"

echo "Log started at $(date)" > "$log_file"
echo "This is line 2" >> "$log_file"
echo "This is line 3" >> "$log_file"

if [ -f "$log_file" ]; then
  echo "$log_file exists. Reading contents:"
  while IFS= read -r line; do
    echo ">> $line"
  done < "$log_file"
fi

if [ -s "$log_file" ]; then
  echo "$log_file is not empty."
fi

cp "$log_file" "${log_file}.bak"
echo "Backup created: ${log_file}.bak"

rm "$log_file" "${log_file}.bak"
echo "Cleanup done."
