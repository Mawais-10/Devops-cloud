#!/bin/bash
# example.sh - String manipulation demo

str="DevOpsEngineer"
echo "Length: ${#str}"
echo "First 6 chars: ${str:0:6}"
echo "From index 6: ${str:6}"
echo "Replace first 'e' with 'E': ${str/e/E}"
echo "Replace all 'e' with 'E': ${str//e/E}"
echo "Uppercase: ${str^^}"
echo "Lowercase: ${str,,}"

first="Shell"
second="Scripting"
combined="$first $second"
echo "Combined: $combined"

csv="aws,docker,kubernetes,terraform"
IFS=',' read -ra tools <<< "$csv"
echo "-- Tools list --"
for tool in "${tools[@]}"; do
  echo "- $tool"
done
