#!/bin/bash
# example.sh - Script designed to run via cron
# Sample crontab entry to schedule this every day at 2 AM:
# 0 2 * * * /path/to/example.sh >> /var/log/example_cron.log 2>&1

LOG_FILE="/tmp/cron_demo.log"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Cron job started" >> "$LOG_FILE"

disk_usage=$(df -h / | awk 'NR==2 {print $5}')
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Disk usage: $disk_usage" >> "$LOG_FILE"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Cron job finished" >> "$LOG_FILE"

cat "$LOG_FILE"
