#!/bin/bash
# health_check.sh - Basic server health monitor
DISK_THRESHOLD=80
MEM_THRESHOLD=80

echo "===== Health Check: $(date) ====="

disk_usage=$(df -h / | awk 'NR==2 {gsub("%","",$5); print $5}')
echo "Disk usage: ${disk_usage}%"
if [ "$disk_usage" -ge "$DISK_THRESHOLD" ]; then
  echo "ALERT: Disk usage above ${DISK_THRESHOLD}%!"
fi

mem_usage=$(free | awk '/Mem:/ {printf "%.0f", $3/$2 * 100}')
echo "Memory usage: ${mem_usage}%"
if [ "$mem_usage" -ge "$MEM_THRESHOLD" ]; then
  echo "ALERT: Memory usage above ${MEM_THRESHOLD}%!"
fi

load=$(uptime | awk -F'load average:' '{print $2}')
echo "Load average:$load"

echo "===== Check complete ====="
