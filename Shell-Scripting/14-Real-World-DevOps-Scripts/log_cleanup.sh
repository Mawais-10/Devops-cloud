#!/bin/bash
# log_cleanup.sh - Delete log files older than N days
set -euo pipefail

LOG_DIR="${1:-/var/log/myapp}"
DAYS_OLD="${2:-7}"

if [ ! -d "$LOG_DIR" ]; then
  echo "Directory $LOG_DIR does not exist. Nothing to clean."
  exit 0
fi

echo "Deleting .log files older than $DAYS_OLD days from $LOG_DIR..."
find "$LOG_DIR" -type f -name "*.log" -mtime +"$DAYS_OLD" -print -delete

echo "Cleanup complete."
