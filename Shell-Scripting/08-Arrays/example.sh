#!/bin/bash
# example.sh - Arrays demo

servers=("web01" "web02" "db01")
echo "First server: ${servers[0]}"
echo "All servers: ${servers[@]}"
echo "Total servers: ${#servers[@]}"

servers+=("cache01")
echo "After adding: ${servers[@]}"

echo "-- Looping through servers --"
for s in "${servers[@]}"; do
  echo "Checking server: $s"
done

declare -A port_map
port_map=([http]=80 [https]=443 [ssh]=22)

echo "-- Service ports --"
for key in "${!port_map[@]}"; do
  echo "$key -> ${port_map[$key]}"
done
